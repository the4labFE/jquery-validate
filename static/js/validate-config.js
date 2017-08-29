$.extend($.validator.messages, {
    required: "这是必填字段",
    ip: "输入格式不正确",
    number: '请输入数字',
    max: "输入超过了最大值",
	min: "输入小于最小值",
    minlength: $.validator.format( "输入字符不能少于 {0} 个." ),
    maxlength: $.validator.format( "输入字符不能多于 {0} 个." ),
    mask: "网关不可达",
    remote: "该名称已存在",
    equalTo: "两次输入密码不匹配",
    notEqualTo: "新密码不能与原始密码相同",
    pw  : "必须包含数字、英文字母、特殊字符, 并且大于等于8位",
    url: "url格式不正确",
    email: "邮箱格式不正确"
});

//ip验证
$.validator.addMethod("ip",function(value,element,params){
    var ipReg = /^(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;

    if( value === '' ) {
        return true;
    }

    return ipReg.test( value );

},"输入格式不正确");

$.validator.addMethod("cird",function(value,element,params){
    var ipReg = /^(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\/(?:30|31|[1-2]?\d)$/;

    if( value === '' ) {
        return true;
    }

    return ipReg.test( value );

},"输入格式不正确");

//两个字段不相等
$.validator.addMethod( 'notEqualTo', function(value, element, param) {
    if( value !== $( param ).val() ) {
        return true;
    }
    return false;
} )

//password格式
$.validator.addMethod( 'pw', function(value, element, param) {
    if( typeof value != 'string' || !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*_])[\da-zA-Z~!@#$%^&*]{8,}$/.test( value ) ) {
        return false;
    }
    return true;
} )

//网关格式
$.validator.addMethod("mask",function(value,element,params){
    var ipArr = $( '#config input[name="IP"]' ).val().split( '.' ),
        gatewayArr = $( '#config input[name="gateway"]' ).val().split( '.' ),
        netmaskArr = value.split( '.' ),
        len = 4,
        i = 0;
    if( ipArr.length !== len || gatewayArr.length !== len || netmaskArr.length !== len ) {
        return false;
    }
    for( ; i < len; i++ ) {
        if( ( ipArr[ i ] & netmaskArr[ i ] ) !== ( gatewayArr[ i ] & netmaskArr[ i ] ) ) {
            return false;
        }
    }
    return true;

},"网关不可达");

//邮箱 表单验证规则
jQuery.validator.addMethod("mail", function (value, element) {
	var mail = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/;
	return this.optional(element) || (mail.test(value));
}, "邮箱格式不对");

//电话验证规则
jQuery.validator.addMethod("phone", function (value, element) {
    var phone = /^0\d{2,3}-\d{7,8}$/;
    return this.optional(element) || (phone.test(value));
}, "电话格式如：0371-68787027");

//区号验证规则  
jQuery.validator.addMethod("ac", function (value, element) {
    var ac = /^0\d{2,3}$/;
    return this.optional(element) || (ac.test(value));
}, "区号如：010或0371");

//无区号电话验证规则  
jQuery.validator.addMethod("noactel", function (value, element) {
    var noactel = /^\d{7,8}$/;
    return this.optional(element) || (noactel.test(value));
}, "电话格式如：68787027");

//手机验证规则  
jQuery.validator.addMethod("mobile", function (value, element) {
    var mobile = /^1[3|4|5|7|8]\d{9}$/;
	return this.optional(element) || (mobile.test(value));
}, "手机格式不对");

//邮箱或手机验证规则  
jQuery.validator.addMethod("mm", function (value, element) {
    var mm = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/;
	return this.optional(element) || (mm.test(value));
}, "格式不对");

//电话或手机验证规则  
jQuery.validator.addMethod("tm", function (value, element) {
    var tm=/(^1[3|4|5|7|8]\d{9}$)|(^\d{3,4}-\d{7,8}$)|(^\d{7,8}$)|(^\d{3,4}-\d{7,8}-\d{1,4}$)|(^\d{7,8}-\d{1,4}$)/;
    return this.optional(element) || (tm.test(value));
}, "格式不对");

//年龄 表单验证规则
jQuery.validator.addMethod("age", function(value, element) {   
	var age = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/;
	return this.optional(element) || (age.test(value));
}, "不能超过120岁"); 
// 20-60   /^([2-5]\d)|60$/

//传真
jQuery.validator.addMethod("fax",function(value,element){
    var fax = /^(\d{3,4})?[-]?\d{7,8}$/;
    return this.optional(element) || (fax.test(value));
},"传真格式如：0371-68787027");

//验证当前值和目标val的值相等 相等返回为 false
jQuery.validator.addMethod("equalTo2",function(value, element){
    var returnVal = true;
    var id = $(element).attr("data-rule-equalto2");
    var targetVal = $(id).val();
    if(value === targetVal){
        returnVal = false;
    }
    return returnVal;
},"不能和原始密码相同");

//大于指定数
jQuery.validator.addMethod("gt",function(value, element){
    var returnVal = false;
    var gt = $(element).data("gt");
    if(value > gt && value != ""){
        returnVal = true;
    }
    return returnVal;
},"不能小于0 或空");

//汉字
jQuery.validator.addMethod("chinese", function (value, element) {
    var chinese = /^[\u4E00-\u9FFF]+$/;
    return this.optional(element) || (chinese.test(value));
}, "格式不对");

//指定数字的整数倍
jQuery.validator.addMethod("times", function (value, element) {
    var returnVal = true;
    var base=$(element).attr('data-rule-times');
    if(value%base!=0){
        returnVal=false;
    }
    return returnVal;
}, "必须是发布赏金的整数倍");

//身份证
jQuery.validator.addMethod("idCard", function (value, element) {
    var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//(15位)
    var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//(18位)

    return this.optional(element) || (isIDCard1.test(value)) || (isIDCard2.test(value));
}, "格式不对");


// 字符验证       
jQuery.validator.addMethod("stringCheck", function(value, element) {       
    return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);       
 }, "只能包括中文字、英文字母、数字和下划线");   

 // 中文字两个字节       
jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {       
   var length = value.length;       
   for(var i = 0; i < value.length; i++){       
        if(value.charCodeAt(i) > 127){       
         length++;       
         }       
   }       
    return this.optional(element) || ( length >= param[0] && length <= param[1] );       
 }, "请确保输入的值在3-15个字节之间(一个中文字算2个字节)");   

// 身份证号码验证       
jQuery.validator.addMethod("isIdCardNo", function(value, element) {       
     return this.optional(element) || isIdCardNo(value);       
}, "请正确输入您的身份证号码");

// 手机号码验证       
jQuery.validator.addMethod("isMobile", function(value, element) {       
    var length = value.length;   
    var mobile =/^[1][3-8]+\\d{9}/;   
   return this.optional(element) || (length == 11 && mobile.test(value));       
}, "请正确填写您的手机号码");       

 // 电话号码验证       
jQuery.validator.addMethod("isTel", function(value, element) {       
    var tel = /^\d{3,4}-?\d{7,9}$/;    //电话号码格式010-12345678   
    return this.optional(element) || (tel.test(value));       
}, "请正确填写您的电话号码");   

// 联系电话(手机/电话皆可)验证   
jQuery.validator.addMethod("isPhone", function(value,element) {   
    var length = value.length;   
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;   
    var tel = /^\d{3,4}-?\d{7,9}$/;   
    return this.optional(element) || (tel.test(value) || mobile.test(value));   
}, "请正确填写您的联系电话");   

 // 邮政编码验证       
 jQuery.validator.addMethod("isZipCode", function(value, element) {       
    var tel = /^[0-9]{6}$/;       
    return this.optional(element) || (tel.test(value));       
 }, "请正确填写您的邮政编码");