$(function () {
  var Rule = document.getElementById("Rule");
  Rule.onclick = function () {
    if (this.checked) {
      document.getElementById("login").disabled = false;
    } else {
      document.getElementById("login").disabled = true;
      alert("请勾选使用协议")
    }
  }

  // 验证规则开始
  var regus = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/; //账号规则
  var regpw = /^[a-zA-Z0-9]{4,10}$/; //密码规则
  var reg = /^\w{3,12}@\w{1,5}\.[a-z]{2,3}$/; //邮箱规则
  var regnk = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/ //昵称规则
  // 各种值需要放入各自函数中
  // 标杆
  var uFfag = false,
    nFfag = false,
    pFfag = false,
    p2Ffag = false,
    eFfag = false
  // 验证规则结束

  $("#username").blur(function () {
    var username = $("#username").val();
    // 用户名验证
    if (!regus.test(username) || username == "") {
      // 初步验证
      $(".user").html("请输入正确的用户名格式").addClass("erro");
    } else {
      $(".user").html("");
      // 验证重名
      $.ajax({
        type: "get",
        url: "http://127.0.0.1:8848/accrepeat.php",
        data: {
          username: username
        },
        success: function (resus) {
          if (resus === "fail") {
            $(".user").html("用户名已注册!!!").addClass("erro");
            uFfag = false;
            return false;
          } else {
            $(".user").html("用户名可用!!!").removeClass("erro").addClass("erro2");
            uFfag = true;
          }
        }
      })
    }
  })
  //验证昵称
  $("#nickname").blur(function () {
    var nickname = $("#nickname").val(); //密码
    if (!regnk.test(nickname) || nickname == "") {
      // 初步验证
      $(".nick").html("请输入符合规则的昵称").addClass("erro");
      nFfag = false;
      return false;
    } else {
      nFfag = true;
      $(".nick").html("昵称可用").removeClass("erro").addClass("erro2");
    }
  })
  //验证密码
  $("#pwd").blur(function () {
    var pwd = $("#pwd").val(); //密码
    if (!regpw.test(pwd) || pwd == "") {
      // 初步验证
      $(".pwd").html("请输入符合规则的密码").addClass("erro");
      pFfag = false;
      return false;
    } else {
      pFfag = true;
      $(".pwd").html("密码可用").removeClass("erro").addClass("erro2");
    }
  })
  //验证密码是否一致
  $("#pwd2").blur(function () {
    var pwd = $("#pwd").val(); //密码
    var pwd2val = $("#pwd2").val(); //再次输入密码
    if (pwd2val !== pwd || pwd2val == "") {
      $(".pwd2").html("两次输入的密码不一致").addClass("erro");
      p2Ffag = false;
      return false;
    } else {
      p2Ffag = true;
      $(".pwd2").html("密码一致").removeClass("erro").addClass("erro2");
    }
  })

  //验证邮箱是否符合规则
  $("#email").blur(function () {
    var email = $("#email").val(); //邮箱内容
    if (!reg.test(email) || email == "") {
      // 初步验证
      $(".email").html("请输入正确的邮箱").addClass("erro");
      eFfag = false;
      return false;
    } else {
      eFfag = true;
      $(".email").html("成功").removeClass("erro").addClass("erro2");
    }
  })
  // 总验证
  $("#login").click(function () {
    if (uFfag && nFfag && pFfag && p2Ffag && eFfag) {
      $.ajax({
        type: "post",
        url: "http://127.0.0.1:8848/reg.php",
        data: {
          username: $("#username").val(),
          pwd: $("#pwd").val(),
          email: $("#email").val(),
          nickname: $("#nickname").val()
        },
        success: function (resp) {
          if (resp === "ok") {
            alert("恭喜!注册成功");
            location.href = "./login.html";
          } else {
            alert("哦豁!注册失败!请重试")
          }
        }
      });
    } else {
      $("#username").blur();
      $("#nickname").blur();
      $("#pwd").blur();
      $("#pwd2").blur();
      $("#email").blur();
    }
  })
})