/**
 * 限时红包玩法：
 * 限时红包采用分档邀请制度，每一档对应不同的金额和邀请人数，通过客服发送红包
 * 头部显示用户昵称和头像、活动规则、红包总额和邀请的新好友数量、活动进行时间
 * 每一档的进度条点击显示邀请的人数和时间
 */
Page({
  data: {
    initData: {
      money: 0,
      friends: 0,
    },
    endTime: '', // 时间戳
    rulesPop: false,
    redList: [{
        money: 0.5, // 红包数量
        status: 1, // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0, // 当前档位已邀请好友数量
        condition: 10, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
      {
        money: 1.2, // 红包数量
        status: 0, // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0, // 当前档位已邀请好友数量
        condition: 20, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
      {
        money: 2, // 红包数量
        status: 0, // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0, // 当前档位已邀请好友数量
        condition: 30, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
      {
        money: 2.8, // 红包数量
        status: 0, // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0, // 当前档位已邀请好友数量
        condition: 40, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
      {
        money: 4, // 红包数量
        status: 0, // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0, // 当前档位已邀请好友数量
        condition: 50, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
      {
        money: 4.8, // 红包数量
        status: 0, // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0, // 当前档位已邀请好友数量
        condition: 60, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
      {
        money: 7, // 红包数量
        status: 0, // 0 待解锁、1 去完成、 2 领取、 3 已领取
        count: 0, // 当前档位已邀请好友数量
        condition: 70, // 当前档位需要邀请的好友数量 
        condition_type: 1, // 1 邀请好友、 2 唤醒好友、 3 看视频奖励
      },
    ]
  },

  onLoad(options) {
    this.fetchInitConfig()
    this.fetchUserList()
  },

  formatTime(time) {
    var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
    return date.toJSON().substr(0, 19).replace('T', ' ');
  },

  // 获取红包初始化配置
  fetchInitConfig() {
    const time = this.formatTime(1578239999000)
    this.setData({
      endTime: time
    })
  },

  // 获取邀请好友列表
  fetchUserList() {

  },

  showRulesPop() {
    this.setData({
      rulesPop: true
    })
  },

  hidePop() {
    this.setData({
      rulesPop: false
    })
  },

  onShareAppMessage: function() {
    const openid = wx.getStorageSync('openid')
    return {
      title: '限时活动，领现金红包~',
      path: `/pages/index/index?shareId=${openid}&activeType=cashPack`,
      imageUrl: '/images/red_pack.png'
    }
  }
})