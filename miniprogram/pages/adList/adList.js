Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskList: [
      {
        id: 1,
        icon: '/images/mine_icon/icon_play.png',
        title: '看视频赚金币',
        reward: 5,
        rightBtn: '去观看',
        desc: '看视频，即可获得5个金币',
      },
      {
        id: 2,
        icon: '/images/mine_icon/mined.png',
        title: '邀请好友',
        reward: 3000,
        rightBtn: '去邀请',
        desc: '邀请好友，即可获赠3000步',
      },
      {
        id: 3,
        icon: '/images/mine_icon/poster.png',
        title: '每日签到',
        reward: 0,
        rightBtn: '去完成',
        desc: '完成今日签到即可获得1888步奖励',
      },
      {
        id: 4,
        icon: '/images/mine_icon/waitget.png',
        title: '运动步数',
        rightBtn: '去兑换',
        desc: '',
      },
      {
        id: 5,
        icon: '/images/mine_icon/activityd.png',
        title: '天天领红包',
        reward: 0,
        rightBtn: '抢红包',
        desc: '红包天天领',
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  doTask(e) {
    console.log(e.currentTarget.dataset.origin)
  },

  onShareAppMessage() {

  }
})