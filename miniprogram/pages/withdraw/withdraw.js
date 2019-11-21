const app = getApp()
let global = app.globalData
// import {
//   getWithdrawInfo
// } from '../../utils/api.js'
// import {
//   turnOut,
//   showToast,
//   formatCoin
// } from '../../utils/util.js'

Page({
  data: {
    navHeight: global.navHeight,
    version_t: global.version_t,
    source_matrix: global.source_matrix,
    cdn04: global.cdn04,
  },

  onLoad(options) {
    App.zhuge.track('点击_全民浇水_提现页面', {})
  },

  onShow() {
    this.getWithDraw()
  },

  getWithDraw() {
    var that = this
    let user_id = wx.getStorageSync('userId')
    if (!this.data.source_id) {
      this.setData({
        user_id
      })
    }
    wx.showLoading()
    getWithdrawInfo(user_id, res => {
      wx.hideLoading()
      if (res.data.code != 200) {
        showToast(res.data.msg)
      } else {
        let info = res.data.data

        that.setData({
          account_money: formatCoin(info.total_balance),
          info
        })
      }
    })
  },

  dontWithdraw() {
    showToast('金币不足')
  },

  bindsuccess: function(e) {
    turnOut(e, "成功")
  },

  bindfail: function(e) {
    turnOut(e, "失败")
  },

  // 自定义返回按钮
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})