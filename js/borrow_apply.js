$(function () {

  // 正则验证规则
  var res1 = /^([1-9][0-9]*){1,3}$/

  // 取Inv
  var Inv = sessionStorage.getItem("Inv");
  console.log(Inv);
  switch (Inv) {
    case "1":
      $("#Tit2").text("信用借款").addClass("col40b");
      break;
    case "2":
      $("#Tit2").text("汽车借款").addClass("colec7");
      break;
    case "3":
      $("#Tit2").text("房屋借款").addClass("col2ca");
      break;
    default:
      alert("请稍后~~~")
      break;
  }
  // 验证

  $("#Btn").click(function () {
    if ($("#borrowmoney").val() == '' || $("#interest").val() == '' || $("#minbid").val() == '' || $("#bouns").val() == '' || $("#title").val() == '' || $("#info").val() == '') {
      alert("请输入完整")
      return false;
    } else {
      $.ajax({
        url: "http://127.0.0.1:8848/borrow.php",
        type: "POST",
        data: {
          acc: localStorage.getItem("username"),
          borrowmoney: $("#borrowmoney").val(),
          interest: $("#interest").val(),
          borrowtime: $("#borrowtime").val(),
          repaytype: $("[name='repaytype']:checked").val(),
          minbid: $("#minbid").val(),
          bouns: $("#bouns").val(),
          days: $("#days").val(),
          title: $("#title").val(),
          info: $("#info").val()
        },
        success: function (data) {
          if (data === "ok") {
            alert("申请提交成功,等待审核...");
            location.href = "/";
          } else {
            alert("申请提交失败,请稍后再试~~~");
          }
        }
      })
    }


  });





})