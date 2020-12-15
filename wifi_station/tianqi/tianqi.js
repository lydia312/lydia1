

const devicesId = "642666934" // 填写在OneNet上获得的devicesId 形式就是一串数字 例子:9939133
const api_key = "cungQFF9FCBxau9NxhTDO2LXkK0=" // 填写在OneNet上的 api-key 例子: VeFI0HZ44Qn5dZO14AuLbWSlSlI=

Page({
  data: {
    temp: '',
    humi: '',
    ad1: '',
    ad2: '',
    ad3: '',
    ad4: '',
    ad5: '',
    ad6: '',
    ad7: '',
    ad8: '',
    ad9: '',
    ad10: '',
    ad11: '',
    ad12: '',
  },

  /**
   * @description 页面下拉刷新事件
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: "正在获取"
    })
    this.getDatapoints().then(datapoints => {
      this.update(datapoints)
      wx.hideLoading()
    }).catch((error) => {
      wx.hideLoading()
      console.error(error)
    })
  },

  /**
   * @description 页面加载生命周期
   */
  onLoad: function () {
    console.log(`your deviceId: ${devicesId}, apiKey: ${api_key}`)

    //每隔6s自动获取一次数据进行更新
    const timer = setInterval(() => {
      this.getDatapoints().then(datapoints => {
        this.update(datapoints)
      })
    }, 5000)
    

    wx.showLoading({
      title: '加载中'
    })

    this.getDatapoints().then((datapoints) => {
      wx.hideLoading()
      this.firstDraw(datapoints)
    }).catch((err) => {
      wx.hideLoading()
      console.error(err)
      clearInterval() //首次渲染发生错误时禁止自动刷新
    })
  },

  /**
   * 向OneNet请求当前设备的数据点
   * @returns Promise
   */
  getDatapoints: function () {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://api.heclouds.com/devices/${devicesId}/datapoints?datastream_id=Temperature,Humidity&limit=20`,
        /**
         * 添加HTTP报文的请求头, 
         * 其中api-key为OneNet的api文档要求我们添加的鉴权秘钥
         * Content-Type的作用是标识请求体的格式, 从api文档中我们读到请求体是json格式的
         * 故content-type属性应设置为application/json
         */
        header: {
          'content-type': 'application/json',
          'api-key': api_key
        },
        success: (res) => {
          const status = res.statusCode
          const response = res.data
          if (status !== 200) { // 返回状态码不为200时将Promise置为reject状态
            reject(res.data)
            return ;
          }
          if (response.errno !== 0) { //errno不为零说明可能参数有误, 将Promise置为reject
            reject(response.error)
            return ;
          }

          if (response.data.datastreams.length === 0) {
            reject("当前设备无数据, 请先运行硬件实验")
          }

          //程序可以运行到这里说明请求成功, 将Promise置为resolve状态
          resolve({
            temperature: response.data.datastreams[0].datapoints.reverse(),
            humidity: response.data.datastreams[1].datapoints.reverse()
          })
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  /**
   * @param {Object[]} datapoints 从OneNet云平台上获取到的数据点
   * 传入获取到的数据点, 函数自动更新图标
   */
  update: function (datapoints) {
    var wheatherData = this.convert(datapoints);
    this.setData({
      humi: wheatherData.humidity[wheatherData.humidity.length - 1],
      temp: wheatherData.tempe[wheatherData.tempe.length - 1]
    })
  },

  /**
   * 
   * @param {Object[]} datapoints 从OneNet云平台上获取到的数据点
   * 传入数据点, 返回使用于图表的数据格式
   */
  convert: function (datapoints) {
    
    var categories = [];
    var humidity = [];
    var tempe = [];

    var length = datapoints.humidity.length
    for (var i = 0; i < length; i++) {
      categories.push(datapoints.humidity[i].at.slice(5, 19));
      humidity.push(datapoints.humidity[i].value);
      tempe.push(datapoints.temperature[i].value);
    }
    
    return {
      categories: categories,
      humidity: humidity,
      tempe: tempe
    }
  },

  /**
   * 
   * @param {Object[]} datapoints 从OneNet云平台上获取到的数据点
   * 传入数据点, 函数将进行图表的初始化渲染
   */

  firstDraw: function (datapoints) {

    //得到屏幕宽度
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var wheatherData = this.convert(datapoints);
  },

  adviseinput: function(){
    var that = this;
      wx.cloud.callFunction({
        name: "ad",
        success: function(res){  
          var result1 = res.result.data[0]
          var result2 = res.result.data[1]
          var result3 = res.result.data[2]
          var result4 = res.result.data[3]
          var result5 = res.result.data[4]
          var result6 = res.result.data[5]
          var result7 = res.result.data[6]
          var result8 = res.result.data[7]
          var result9 = res.result.data[8]
          var result10 = res.result.data[9]
          var result11 = res.result.data[10]
          var result12 = res.result.data[11];
          that.setData({
          ad1: result1.send,
          ad2: result2.send,
          ad3: result3.send,
          ad4: result4.send,
          ad5: result5.send,
          ad6: result6.send,
          ad7: result7.send,
          ad8: result8.send,
          ad9: result9.send,
          ad10: result10.send,
          ad11: result11.send,
          ad12: result12.send
          })   
        }
      })
    }
})