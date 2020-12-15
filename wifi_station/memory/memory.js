Page({
  data: {
    inputText: '',
    input: ''
  },

  onShow(){
    const self = this
    let userText = wx.getStorageSync('userText')
    if(userText){
      self.data.inputText = userText
      self.setData(self.data)
    }else{
      self.data.inputText = userText
      self.setData(self.data)
    }
  },
  
  onInputText: function(e){
    const self = this
    const value = e.detail.value
    if(value){
      wx.setStorageSync('userText',value)
    }else{
      wx.setStorageSync('userText',this.data.input)
    }
  }
})