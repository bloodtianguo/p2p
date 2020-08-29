$(function () {
  // 点击button的兄弟去掉activefou
  $(".Btns button").click(function () {
    $(this).parent().children().removeClass("activefou"); //交换样式
    $(this).addClass("activefou");
  })
  // 查看按钮动画
  $(".see").bind("click", function (event) {
    $(this).css('animation', 'bttn 0.4s');
  });
  $(".see").each(function () {
    $(this)[0].addEventListener("animationend", function () {
      $(this).css("animation", "");
    });
  });

})