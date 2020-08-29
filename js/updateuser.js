$(function () {
  var id = localStorage.getItem("uid")
  var nickname = localStorage.getItem("nickname")
  var regEmail = /^([a-zA-Z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
  $(".nickname").html(nickname)
  $("#phone").blur(function () {
    var phone = $(this).val()
  })
  $("#email").blur(function () {
    var email = $(this).val()
    if (!regEmail.test(email)) {
      alert("邮箱格式错误!!!")
    } else {
      alert("邮箱格式正确!!!")
    }
  })
  $("#btN").click(function () {
    var phone = $("#phone").val()
    var email = $("#email").val()

    if (phone !== "" && email !== "") {
      $.ajax({
        type: "post",
        url: "http://127.0.0.1:8848/updateuser.php",
        data: {
          id: id,
          nickname: nickname,
          phone: phone,
          email: email
        },
        success: function (response) {
          if (response == "ok") {
            alert("修改成功")
          } else {
            alert("修改失败!!")
          }
        }
      });
    } else {
      alert("请填写完整!!");
    }
  })
})