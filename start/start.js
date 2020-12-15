Page({
  data: {
    nowDate: '',
    weekday: ''
  },
    
  onLoad(){
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    this.setData({
      nowDate: currentdate
    })
    this.setData({
      weekday:weekday[currentDate]
    })
  }
})
var today=new Date();
var currentDate=today.getDay();//获取存储当前日期
var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];