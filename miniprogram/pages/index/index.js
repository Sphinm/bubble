const App = getApp(); //通过getApp方法来引用全局对象

Page({
  data: {
    userInfo: {},
    has_login: false, // 防止连续点击授权弹版
    cdn04: App.globalData.cdn04
  },

  onLoad: function(options) {
    this.setData({
      has_login: false
    })
    this.fetchSetting();
  },

  getUserInfo(e) {
    if (!this.data.has_login && e.detail.userInfo) {
      this.setData({
        has_login: true,
        userInfo: e.detail.userInfo,
      });
      wx.showToast({
        title: '登录成功',
        icon: 'none',
        duration: 1000
      })
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