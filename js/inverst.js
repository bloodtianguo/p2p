$(function () {
  // 按钮动画
  $(".see").bind("click", function (event) {
    $(this).css('animation', 'bttn 0.4s');
  });
  $(".see").each(function () {
    $(this)[0].addEventListener("animationend", function () {
      $(this).css("animation", "");
    });
  });
  // 传按钮的val值
  $(".invest-main").on("click", ".see", function () {
    sessionStorage.setItem("Inv", $(this).val());
    location.href = "/#personal/borrow_apply";
  })

})