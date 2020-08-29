$(function () {
  // 返回顶部
  // 滑动滚动条
  $('.aside').hide();
  $(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
      $('.aside').fadeIn(1000);
    } else {
      $(".aside").fadeOut(1000);
    }
  });

  $(".goTop").click(function () {
    $("body,html").animate({
        scrollTop: 0
      },
      800
    );
  });
  loadHash();
  //监听hash发生改变
  window.onhashchange = loadHash;
  //根据hash动态加载主体的html片段
  //home invest borrow personal
  function loadHash() {
    var hash = location.hash;
    if (hash == "") hash = "#home"
    switch (hash) {
      case ("#home"):
        $(".main").load("../../pages/home.html");
        break
      case ("#invest"):
        $(".main").load("../../pages/invest.html");
        break
      case ("#borrow"):
        $(".main").load("../../pages/borrow.html");
        break

      case ("#personal"):
        $(".main").load("../../pages/personal.html", function () {
          $(".main-right").load("../../pages/personal/account.html")
        })
        activeClick(hash);
        break

        //引入借款项目 loan.html 
      case ("#personal/loan"):
        // 点击
        if ($(".main-right").length) {
          // 导入
          $(".main-right").load("../../pages/personal/loan.html")
        } else {
          $(".main").load("../../pages/personal.html", function () {
            $(".main-right").load("../../pages/personal/loan.html");
          });
        }
        activeClickSib(hash)
        break

        //引入账户信息 account.html
      case ("#personal/account"):
        // 点击
        if ($(".main-right").length) {
          // 导入
          $(".main-right").load("../../pages/personal/account.html")
        } else {
          $(".main").load("../../pages/personal.html", function () {
            $(".main-right").load("../../pages/personal/account.html");
          });
        }
        activeClickSib(hash)
        break

        //引入实名认证 Realname.html
      case ("#personal/Realname"):
        // 点击
        if ($(".main-right").length) {
          // 导入
          $(".main-right").load("../../pages/personal/Realname.html")
        } else {
          $(".main").load("../../pages/personal.html", function () {
            $(".main-right").load("../../pages/personal/Realname.html");
          });
        }
        activeClickSib(hash)
        break

        //引入账户流水 accountflow.html
      case ("#personal/accountflow"):
        // 点击
        if ($(".main-right").length) {
          // 导入
          $(".main-right").load("../../pages/personal/accountflow.html")
        } else {
          $(".main").load("../../pages/personal.html", function () {
            $(".main-right").load("../../pages/personal/accountflow.html");
          });
        }
        activeClickSib(hash)
        break

        //引入充值明细 Recdeta.html
      case ("#personal/Recdeta"):
        // 点击
        if ($(".main-right").length) {
          // 导入
          $(".main-right").load("../../pages/personal/Recdeta.html")
        } else {
          $(".main").load("../../pages/personal.html", function () {
            $(".main-right").load("../../pages/personal/Recdeta.html");
          });
        }
        activeClickSib(hash)
        break

        //引入个人资料 updateuser.html
      case ("#personal/updateuser"):
        // 点击
        if ($(".main-right").length) {
          // 导入
          $(".main-right").load("../../pages/personal/updateuser.html")
        } else {
          $(".main").load("../../pages/personal.html", function () {
            $(".main-right").load("../../pages/personal/updateuser.html");
          });
        }
        activeClickSib(hash)
        break

        // 导入借款
      case ("#personal/borrow_apply"):
        $(".main").load("../../pages/personal.html", function () {
          $(".main-right").load("../../pages/personal/borrow_apply.html")
        })
        break

      default:
        $(".main").load("../../pages/404.html");
        break
    }
    activeClick(hash);
  }

  // 二级跳转
  function activeClickSib(hash) {
    // 去掉自带active
    $(".Sibe-item li a").removeClass("actives");
    // 添加
    $('.Sibe-item li a[href="' + hash + '"]').addClass("actives");
  }

  // 一级跳转
  function activeClick(hash) {
    $('.con-nav .nav1[href="' + hash + '"]').addClass("active").parent().siblings().find('a').removeClass("active");
  }

  // 登录跳转后
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
  // 注销点击事件 事件委派
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
})