$(function(){

});

function loginName() {
    var loginname = $("#userLoginName").val();

    $.ajax({
        url: "/selectloginname",
        type: "post",
        datatype: "text",
        data: {
            "loginname": loginname
        },
        success: function (result) {
            if (result == "success") {
                layer.msg("用户名已存在！");
            }
            if (result == "fail") {

            }
        }
    })
}

function loginpass() {
    var userpass = $("#userPass").val();
    var userpass1 = $("#userPass1").val();

    if (userpass != userpass1) {
        layer.msg("两次密码输入不一致！")
    }
}

function regfun() {
    var loginname = $("#userLoginName").val();
    var userpass = $("#userPass").val();

    $.ajax({
        url:"/reguer",
        type:"post",
        data:{
            "loginname":loginname,"userpass":userpass
        },
        success: function (result) {
            if (result == "success") {
                layer.msg('注册成功！')
                location.href = "/login";
            }
        }

    })
}