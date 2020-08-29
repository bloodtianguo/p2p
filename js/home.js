$(function () {
  // // 功能
  // $(".Notice1").click(function () {
  //   $(".Notice1-main").addClass("blnn")
  //   $(".Notice2-main").removeClass("blnn")
  // });
  // $(".Notice2").click(function () {
  //   $(this).last().children().addClass("bractive1")
  //   $(".Notice2-main").removeClass("bnr").addClass("blnn")
  //   $(".Notice1-main").removeClass("blnn")
  // });

  // 债权精选
  var page = 1;
  var row = 2;
  loadData()

  function loadData() {
    $.ajax({
      type: "get",
      url: "http://127.0.0.1:8848/getborrow.php",
      data: {
        page: page,
        row: row
      },
      dataType: "json",
      success: function (Bdata) {
        // 分页
        var total = Bdata.total; //总记录数
        var pageSize = Math.ceil(total / row); //总页数

        $('#page').pagenation({
          nowPage: page, //当前页
          pageNum: pageSize, //总页数
          callback: function (pag) { //回调函数
            page = pag //改变全局变量 当前页的数据
            loadData(); //重新调用加载数据的函数
          }
        });
        // 渲染
        var lists = Bdata.list;
        var Bhtml = "";
        for (var i = 0; i < lists.length; i++) {
          Bhtml += "<tr>"
          Bhtml += "<th scope='row'>"
          Bhtml += '<span class="sons1">精</span>'
          Bhtml += "</th>"
          Bhtml += "<td>" + lists[i].userid + "</td>" //借款人id
          Bhtml += "<td>" + lists[i].title + "</td>" //借款标题
          Bhtml += "<td>" + Number(lists[i].interest).toFixed(2) + "%</td>" //年利率
          Bhtml += "<td>" + Number(lists[i].borrowmoney).toFixed(2) + "</td>" //金额
          Bhtml += "<td>" + (lists[i].repaytype == 0 ? "按月分期" : "按月到期") + "</td>" //还款方式
          Bhtml += " <td>" + ((lists[i].ownmoney / lists[i].borrowmoney).toFixed(2) * 100) + "%</td>" //进度
          Bhtml += "<td>"
          Bhtml += '<a href="javascript:;" class="btns" data-borid = "' + lists[i].id + '">查看</a>'
          Bhtml += "</td>"
          Bhtml += "</tr>"
        }
        // 放入
        $("#borrow-list").html(Bhtml);
      }
    });
  }
  // 回话储存订单id
  $("#borrow-list").on("click", "a.btns", function () {
    var borid = $(this).data('borid');
    sessionStorage.setItem("borid", borid);
    // 跳转
    location.href = "/borrow_info.html"
  })
})