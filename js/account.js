$(function () {
  checkLogin();
  // 获取ID
  var uid = localStorage.getItem("uid");
  var username = localStorage.getItem("username");
  if (uid != "") {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:8848/getuserinfo.php",
      data: {
        id: uid
      },
      dataType: "json",
      success: function (resacc) {
        for (var key in resacc) {
          $("#" + key).html(resacc[key])
          localStorage.setItem("nickname", resacc.nickname)
        }
      }
    });
  }
})