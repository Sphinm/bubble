const App = getApp(); //通过getApp方法来引用全局对象
Page({
  data: {
    openId: ''
  },

  onLoad: function(options) {
    this.setData({
      openId: wx.getStorageSync('openid')
    })
  },
  showTips(){
    wx.showToast({
      title: '暂未开放，敬请期待',
      icon: 'none',
    })
  },
  step_details(){
    wx.navigateTo({
      url: 'pages/rules/rules'
    })
  },
  gold_details() {
    this.showTips()
  },
  help() {
    wx.navigateTo({
      url: '/pages/rules/rules'
    })
  },
  copyInfo(){
    wx.showToast({
      title: '复制成功',
      icon: 'none',
    })
  },
  onShareAppMessage: function() {}
});