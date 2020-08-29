$(function () {
  var borrowid = sessionStorage.getItem("borid") // 获取订单id
  var uid = localStorage.getItem("uid") //获取用户id

  var chargemoney = $("#chargemoney").val(); //获取投资金额
  // console.log(borrowid);
  // 传入ajax
  $.ajax({
    type: "get",
    url: "http://127.0.0.1:8848/getborrowinfo.php",
    data: {
      borrowid: borrowid
    },
    dataType: "json",
    success: function (borrdata) {
      // console.log(borrdata);
      for (var key in borrdata) {
        $(".userid").html(borrdata.userid)
        $("#borrowmoney").html(Number(borrdata.borrowmoney).toFixed(2))
        $("#interest").html(Number(borrdata.interest).toFixed(2))
        $("#borrowtime").html(borrdata.borrowtime)
        $("#bouns").html(Number(borrdata.bouns).toFixed(2))
        $("#repaytype").html(borrdata.repaytype == 0 ? "按月分期" : "按月到期")
        $("#minbid").html(Number(borrdata.minbid).toFixed(2))
        $("#surplus").html((Number(borrdata.borrowmoney) - Number(borrdata.ownmoney)).toFixed(2))
      }
      // Echarts图表
      option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['借款金额', '已借款']
        },
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [{
              value: borrdata.borrowmoney,
              name: '借款金额'
            },
            {
              value: borrdata.ownmoney,
              name: '已借款'
            },
          ]
        }]
      };
      //获取dom容器
      var myChart = echarts.init(document.getElementById('chartmain'));
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  });
  // 提交投资
  $("#investment").click(function () {
    // 验证登录
    var chargemoney = $("#chargemoney").val();
    var uid = localStorage.getItem("uid");
    var username = localStorage.getItem("username");

    if (!(uid && username)) {
      alert("请先登录...");
      location.href = "/login.html";
    } else {
      if (chargemoney == "") {
        alert("请输入您要投资的金额!!!")
      } else {
        $.ajax({
          type: "post",
          url: "http://127.0.0.1:8848/invest.php",
          data: {
            id: uid,
            borrowid: borrowid,
            chargemoney: chargemoney
          },
          success: function (charData) {
            if (charData == "ok") {
              location.href = "/index.html"
              alert("恭喜!!投资成功!!")
            } else if (charData == "10001") {
              alert("哎呀!!钱不够!1")
              location.href = "/charge.html"
            } else if (charData == "10002") {
              alert("投资失败!!!")
            } else if (charData == "10003") {
              alert("扣钱失败!!!")
            }
          }
        });
      }
    }
  })


})