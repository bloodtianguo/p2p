 $(function () {
   // 登录信息
   var uid = localStorage.getItem("uid");
   var username = localStorage.getItem("username");
   //从本地获取id与用户名
   if (uid && username) {
     // 替换
     $("#login-text").html('<a href="#">' + username + '</a>');
     $("#login-reg").html('<a href="#" id="login-out">注销</a>')
   } else {
     $("#login-text").html('<a href="./login.html">登录</a>');
     $("#login-reg").html('<a href="./register.html">注册</a>')
   }
   // 调用注销函数
   $("#login-reg").on("click", "#login-out", function () {
     // 询问
     if (confirm("你确定要注销么?")) {
       // 删除加到本地的用户数据
       localStorage.removeItem("uid");
       localStorage.removeItem("username");
       $("#login-text").html('<a href="./login.html">登录</a>');
       $("#login-reg").html('<a href="../register.html">注册</a>')
     }
     return false;
   })
   //  传参

   $("#BtN").click(function () {
     console.log($("#chargemoney").val());
     if ($("#bankcode").val() == '' || $("#chargemoney").val() == '') {
       alert("开户银行与充值金额为必选")
       return false;
     } else {
       $.ajax({
         url: "http://127.0.0.1:8848//charge.php",
         type: "POST",
         data: {
           id: localStorage.getItem("uid"),
           bankcode: $("#bankcode").val(),
           chargemoney: $("#chargemoney").val(),
         },
         success: function (data) {
           if (data === "ok") {
             alert("充值成功!!!");
             location.href = "/";
           } else {
             alert("穷逼!!!");
           }
         }
       });
     }

   })

 })