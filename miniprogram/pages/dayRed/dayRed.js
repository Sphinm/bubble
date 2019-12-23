Page({
  data: {
    everyWeekRed: {
      countUp: 0,
      gold: 0,
      fri_week: 0,
      refresh: 0
    },
    rulesPop: false,
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

  showRulesPop(){
    this.setData({
      rulesPop: true
    })
  },

  hidePop(){
    this.setData({
      rulesPop: false
    })
  },

  onShareAppMessage: function () {
    return {
      title: '天天有红包，大奖领不停~',
      path: '/pages/index/index',
      imageUrl: '/images/red_pack.png'
    }
  }
})