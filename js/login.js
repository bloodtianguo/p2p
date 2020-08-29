$(function () {

  $("#login").click(function () {
    // 用户名
    var reg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/; //字母和数字
    var username = $("#username").val();
    var pwd = $("#pwd").val();

    if (!reg.test(username) || username == "") {
      // 初步验证
      $(".user").html("请输入正确的账号").addClass("erro");
      return false;
    } else {
      // ajax验证
      $.ajax({
        type: "POST",
        url: "http://127.0.0.1:8848/login.php",
        data: {
          username: username,
          pwd: pwd
        },
        success: function (res) {
          if (res === "fail") {
            alert("用户名或密码错误!")
          } else {
            //向本地存储存放数据和id名
            localStorage.setItem("uid", res);
            localStorage.setItem("username", username);
            location.href = "/";
          }
        }
      });
    }
  });
  // 点击唤出二维码
  $(".Scan-code1").click(function () {
    $(this).addClass("dino").next().removeClass("dino");
    $(".QR").removeClass("dino").next().addClass("dino");
  });
  $(".Scan-code2").click(function () {
    $(".Scan-code1").removeClass("dino")
    $(this).addClass("dino");
    $(".QR").addClass("dino").next().removeClass("dino");
  })

})