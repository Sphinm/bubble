// pages/dayRed/dayRed.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    redList: [
      {
        money: 220,   // 红包金币数量
        status: 1,    // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0,     // 当前档位已邀请好友数量
        condition: 2, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
      {
        money: 300,   // 红包金币数量
        status: 0,    // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0,     // 当前档位已邀请好友数量
        condition: 2, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
      {
        money: 400,   // 红包金币数量
        status: 0,    // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0,     // 当前档位已邀请好友数量
        condition: 2, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
      {
        money: 500,   // 红包金币数量
        status: 0,    // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0,     // 当前档位已邀请好友数量
        condition: 2, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
      {
        money: 600,   // 红包金币数量
        status: 0,    // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0,     // 当前档位已邀请好友数量
        condition: 2, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
      {
        money: 700,   // 红包金币数量
        status: 0,    // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0,     // 当前档位已邀请好友数量
        condition: 2, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
      {
        money: 800,   // 红包金币数量
        status: 0,    // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0,     // 当前档位已邀请好友数量
        condition: 2, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})