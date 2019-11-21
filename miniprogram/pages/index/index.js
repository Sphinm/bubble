const App = getApp(); //通过getApp方法来引用全局对象

/**
 * 用户进入小程序先随机展示气泡和红包，当用户授权后存入 user 表中
 */
Page({
  data: {
    userInfo: {},
    has_login: true, // 是否登录
    cdn04: App.globalData.cdn04
  },

  onLoad: function(options) {
    this.setData({
      has_login: true
    })
  },

  getUserInfo(e) {
    if (!this.data.has_login && e.detail.userInfo) {
      this.setData({
        has_login: false,
        userInfo: e.detail.userInfo,
      });
      this.fetchSetting()
      // wx.showToast({
      //   title: '登录成功',
      //   icon: 'none',
      //   duration: 1000
      // })
    }
  },

  fetchSetting() {
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.fetchOpenId()
          wx.getUserInfo({
            success: res => {
              App.globalData.userInfo = res.userInfo;
              this.setData({
                userInfo: res.userInfo,
              });
            },
          });
        }
      },
    });
  },

  fetchOpenId() {
    wx.cloud.callFunction({
      name: "login",
      data: {},
      success: res => {
        console.log(
          "[云函数] [login success] user openid: ",
          res.result.openid
        );
        App.globalData.openid = res.result.openid;
        console.log(App.globalData)
      },
      fail: err => {
        console.error("[云函数] [login fail] 调用失败", err);
      },
    });
  },

  onShareAppMessage: function() {},
});