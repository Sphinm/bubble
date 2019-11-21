var rewardedVideoAd = null

// https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/ad/banner-ad.html

Page({

  data: {
    is_done: false, // 
  },

  onLoad: function(options) {
    this.initVedio() // 激励视频广告初始化
  },

  initVedio() {
    if (wx.createRewardedVideoAd) {
      rewardedVideoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-1c6d8e43bac5c6f1'
      })
      rewardedVideoAd.onError((err) => {
        // 走入错误回调则正常调用方法
        if (this.type_redpack == 'slider_redpack') {
          this.getRedPackReward(this.slider_grade)
          wx.showToast({
            title: '拆包成功',
            icon: 'none'
          })
        } else if (this.type_redpack == 'vedio_tip') {
          this.getStepNum(this.type_info)
          setTimeout(() => {
            this.data.is_done = false
          }, 1000)
        }
        // this.data.is_done = false
      })
      rewardedVideoAd.onClose((status) => {
        if (status && status.isEnded || status === undefined) {
          // 正常播放结束，下发奖励
          if (this.type_redpack == 'slider_redpack') {
            this.getRedPackReward(this.slider_grade)
            wx.showToast({
              title: '拆包成功',
              icon: 'none'
            })
          } else if (this.type_redpack == 'vedio_tip') {
            this.getStepNum(this.type_info)
            setTimeout(() => {
              this.data.is_done = false
            }, 1000)
          }
        } else {
          // 播放中途退出进行提示
          wx.showToast({
            title: '播放中途退出无法领取奖励',
            icon: 'none'
          })
          this.data.is_done = false
        }
      })
    } else {
      wx.showToast({
        title: '当前微信版本过低,请升级后使用',
        icon: 'none'
      })
    }
  },

  onShareAppMessage: function() {

  }
})