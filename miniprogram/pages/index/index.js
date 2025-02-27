const App = getApp(); //通过getApp方法来引用全局对象
const db = wx.cloud.database(); // 初始化数据库
// 引入 async 模块
const regeneratorRuntime = require("../../utils/runtime-module")
import {
  randomArray,
  getTimeStamp,
  getUUID
} from "../../utils/utils";
import CountUp from '../../utils/countUp'
import wxCharts from "../../utils/wxcharts-min";
import {
  configData
} from '../../config/config.js'

/**
 * 用户进入小程序先随机展示气泡和红包，当用户授权后存入 user 表中
 */
Page({
  data: {
    userInfo: {},
    has_login: true, // 是否登录
    cdn04: App.globalData.cdn04,
    tipList: [], // 气泡列表
    onClickStatus: false, // 是否正在点击中
    onClickGold: false, // 防止频繁点击金币
    onReview: false, // 默认是未审核，true 表示在审核中
    totalStep: 0, // 今日总步数（所有种类的步数）
    todayStep: 0, // 今日步数（除微信步数）
    weixinStep: 0, // 微信步数
    isFirst: false, // 当 todayStep 为0时，我们判断这个是否是没有获取到数据
    animationData: "", // 动画
    goldNum: 0, // 金币数量
    rate: 0, // 步数兑换金币 1000：1，金币兑换钱 100：1；步数必须整数（千位）兑换，金额兑换保留两位小数
    showToast: false, // 兑换金币弹窗展示与否
    menus: [{
        name: "历史上的今天",
        url: "/pages/today-history/index",
        style: "background-color: #D3D5B0;",
      }
    ],
    tipsRecordList: [{
        headImage: '',
        nickname: 'TEST NICKNAME',
        money: 16.6
      },
      {
        headImage: '',
        nickname: 'headImage 是的复活节',
        money: 56.9
      },
      {
        headImage: '',
        nickname: '适当放宽看过',
        money: 130
      }
    ]
  },

  onLoad(options) {
    this.fetchSetting();
    this.updateRunData();
    this.fecthConfig()
    this.fetchTips();
    const openid = wx.getStorageSync('openid')
    if (openid) {
      this.fetchTodayStep()
      this.fecthGold()
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.fetchTodayStep()
    this.fecthGold()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 600)
  },

  // 获取金币
  fecthGold() {
    const that = this
    if (!wx.getStorageSync('openid')) return
    wx.cloud.callFunction({
      name: "openapi",
      data: {
        action: "fetchGoldNum",
        openid: wx.getStorageSync('openid'),
      },
      success(res) {
        let totalGold = 0
        if (res.result && res.result.data.length) {
          for (const item of res.result.data) {
            totalGold += item.gold_num
          }
        }
        that.setData({
          goldNum: totalGold ? totalGold : 0
        })
      }
    });
  },

  // 获取今日步数
  fetchTodayStep(type = '') {
    const that = this
    if (!wx.getStorageSync('openid')) return
    wx.cloud.callFunction({
      name: "openapi",
      data: {
        action: "fetchStepNum",
        openid: wx.getStorageSync('openid'),
        minTime: getTimeStamp('start'),
        maxTime: getTimeStamp()
      },
      success(res) {
        let todayStep = 0
        if (res.result && res.result.data.length) {
          for (const item of res.result.data) {
            if (item.bubble_title != '微信步数') {
              todayStep += item.bubble_step
            }
          }
        }
        that.setData({
          todayStep: todayStep
        })
        if (type == 'login') {
          that.setData({
            totalStep: todayStep + that.data.weixinStep
          })
        }
      }
    });
  },

  // 获取全局配置
  fecthConfig() {
    const that = this
    wx.cloud.callFunction({
      name: "openapi",
      data: {
        action: "fectchInitConfig",
      },
      success: res => {
        const {
          onReview,
          initTipList
        } = res.result.data[0]
        that.setData({
          onReview: onReview
        })
        wx.setStorageSync('onReview', onReview)
      },
      fail: err => {
        console.error("[云函数] [fectchInitConfig] 调用失败", err);
      },
    });
  },

  // 更新全局配置
  updateConfig() {
    wx.cloud.callFunction({
      name: "openapi",
      data: {
        action: "updateBubbleConfig",
        config: configData
      },
      success: res => {
        console.log(res)
      },
      fail: err => {
        console.error("[云函数] [updateBubbleConfig fail] 调用失败", err);
      },
    });
  },

  // 获取用户信息
  async getUserInfo(e) {
    const that = this
    wx.showLoading({
      title: '登录中...'
    })
    if (this.data.has_login && e.detail.userInfo) {
      await this.fetchSetting()
      this.setData({
        has_login: false,
        userInfo: e.detail.userInfo,
      });
      console.log('openid1', wx.getStorageSync('openid'))
      setTimeout(() => {
        console.log('openid2', wx.getStorageSync('openid'))
        that.fetchTodayStep('login')
        that.fecthGold()
        wx.hideLoading()
        wx.showToast({
          title: "登录成功",
          icon: "none",
          duration: 1200,
        });
      }, 2000)
    } else {
      wx.hideLoading()
      wx.showToast({
        title: "为了更好的服务，请您先授权哦",
        icon: "none",
      });
    }
  },

  showGold() {
    // 金币展示页面，可以直接跳转个人中心
  },

  // 清除动画
  clearAnimate() {
    let animation = wx.createAnimation({
      duration: 800,
      timingFunction: "ease",
      delay: 200
    });
    this.animation = animation;
    animation.opacity(0).step().opacity(1).step();
    this.setData({
      animationData: animation.export(),
    });
  },

  // 触发动画
  triggerAnimate() {
    const that = this;
    let animation = wx.createAnimation({
      duration: 1200,
      timingFunction: "ease",
    });
    this.animation = animation;
    animation.opacity(0).step();
    this.setData({
      animationData: animation.export(),
    });
  },

  // 获取微信运动步数
  updateRunData() {
    const that = this;
    wx.showLoading()
    const todayStep = that.data.todayStep
    wx.getWeRunData({
      success(res) {
        wx.hideLoading()
        const cloudID = res.cloudID;
        wx.cloud.callFunction({
            name: "openapi",
            data: {
              action: "getWeRunAllData",
              weRunData: wx.cloud.CloudID(cloudID),
            },
          })
          .then(res1 => {
            that.setData({
              weixinStep: res1.result[res1.result.length - 1].step,
              totalStep: res1.result[res1.result.length - 1].step + that.data.todayStep
            });
            // 将数据存储在集合中
            // that.showCharts(res1.result);
          });
      },
      fail(err) {
        wx.hideLoading()
        wx.showToast({
          title: "提示",
          content: "未获得步数授权，步数获取失败",
          showCancel: true,
          cancelText: "知道了",
          confirmText: "去授权",
          success(res) {
            if (res.confirm) wx.openSetting();
          },
        });
      },
    });
  },

  // 步数记录表
  showCharts(data) {
    // 返回步数
    const arr = data.map(item => item.step);
    const time = data.map(item => new Date(item.timestamp * 1000).getDate())
    const res = wx.getSystemInfoSync();
    new wxCharts({
      canvasId: "lineCanvas",
      type: "line",
      categories: time.slice(-7),
      animation: true,
      series: [{
        name: "日期",
        data: arr.slice(-7),
      }],
      xAxis: {
        disableGrid: true,
      },
      yAxis: {
        title: '微信运动步数',
        min: 0,
        max: 20000,
      },
      width: res.windowWidth,
      height: 200,
      dataPointShape: true,
      extra: {
        lineStyle: "curve",
      },
    });
  },

  /**
   * 获取气泡列表
   * 调用云函数和数据库需要将 this 保存
   * 每次刷新取四条随机数据
   * is_remove: 是否从删除的记录过来的
   * is_end: 今日气泡消耗与否，2 为已消耗
   * 首次登录 endTimeStamp 为空，给一个默认值 0
   */
  fetchTips(index = -1) {
    const that = this;
    const {
      bubble_list,
      endTimeStamp = 0,
      is_end
    } = wx.getStorageSync("bubble_total");
    // 当前时间小于当日零点
    // 不要随机取数组，利用差集得到结果
    if (+new Date() < endTimeStamp && is_end == 1) {
      if (index == -1) {
        this.setData({
          tipList: bubble_list.length > 5 ? randomArray(bubble_list) : bubble_list,
        });
      } else {
        that.clearAnimate();
        setTimeout(() => {
          that.setData({
            onClickStatus: false,
            tipList: bubble_list.length > 5 ? that.assignArr(bubble_list, index) : bubble_list,
          });
        }, 1200)
      }
    } else if (+new Date() > endTimeStamp) {
      wx.showLoading();
      db.collection("bubble").get({
        success(res) {
          wx.hideLoading();
          wx.setStorageSync("bubble_total", {
            endTimeStamp: getTimeStamp(),
            bubble_list: res.data,
            is_end: 1
          });
          that.setData({
            tipList: res.data.length > 5 ? randomArray(res.data) : res.data,
          });
        },
        fail(err) {
          console.log("fail", err);
        },
      });
    } else {
      this.setData({
        tipList: []
      });
    }
  },

  // 点击气泡后将数据插入指定位置
  assignArr(arr, index) {
    const temp = this.data.tipList
    const item = arr[Math.floor(Math.random() * arr.length)]
    temp.splice(index, 1, item)
    return temp
  },

  /**
   * 每次点击一个气泡删除表中一个数据并重新获取四条新的数据
   * 在这里处理相关业务逻辑，如广告逻辑处理、气泡后续操作等
   */
  getStep(e) {
    const {
      index,
      item
    } = e.currentTarget.dataset;
    console.log("气泡索引", index, item);
    const flag = this._toggleClickStatus('onClickStatus')
    if (flag) return
    // 点击添加记录, 成功后更新列表
    this._clickBubble(item, index);
    this._updateItem(index);
    this.triggerAnimate();
  },

  // 新增自定义字段
  _updateItem(index) {
    const arr = this.data.tipList;
    arr[index].is_exist = 1;
    this.setData({
      tipList: arr,
    });
  },

  // 兑换步数
  async changeTo(e) {
    const step = this.data.totalStep
    const today = this.data.todayStep
    const isFirst = this.data.isFirst
    if (!today && !isFirst) {
      await this.fetchTodayStep()
      await this.updateRunData()
      wx.showModal({
        content: "步数更新成功，请重新再试！",
        showCancel: false
      })
      this.setData({
        isFirst: true
      })
      return
    }
    if (step < 1000) {
      wx.showModal({
        content: "您的步数低于1000无法兑换金币，多走一点再来兑换吧！",
        showCancel: false
      })
    } else {
      this.setData({
        showToast: true,
        rate: Math.floor(step / 1000)
      })
    }
  },

  // 隐藏兑换弹窗 
  hideChangeNum() {
    this.setData({
      showToast: false
    })
  },

  // 兑换金币逻辑，将步数消耗，且新增金币
  // 在 bubble_record 将步数设为负数
  exChangeNum() {
    const that = this
    const flag = this._toggleClickStatus('onClickGold')
    if (flag) return
    const goldNum = this.data.goldNum
    const rate = this.data.rate
    const totalStep = this.data.totalStep
    if (totalStep < rate * 1000) {
      wx.showModal({
        content: "当前数据异常，请下拉刷新",
        showCancel: false
      })
      this.hideChangeNum()
      return
    }
    const openid = wx.getStorageSync('openid')
    wx.cloud.callFunction({
      name: "openapi",
      data: {
        action: "updateGoldNum",
        gold_num: rate,
        openid: openid,
        gold_id: getUUID()
      },
      success: res => {
        that.hideChangeNum()
        that.setData({
          goldNum: goldNum + rate,
          totalStep: totalStep - rate * 1000
        })
        wx.showToast({
          title: `恭喜您兑换成功 ${rate} 个金币`,
          icon: 'none'
        })
        // 气泡消耗动画
        that.initCountUpStep(totalStep, totalStep - rate * 1000, 'totalStep')
        wx.cloud.callFunction({
          name: "openapi",
          data: {
            action: "addBubbleRecord",
            bubble_step: -(rate * 1000),
            bubble_title: '兑换金币',
            bubble_type: 10,
            bubble_id: '',
            openid: openid,
            record_id: getUUID()
          },
          success: res => {
            setTimeout(() => {
              that.setData({
                onClickGold: false
              })
            }, 3000)
          }
        });
      },
      fail: err => {
        that.hideChangeNum()
        wx.showToast({
          title: `兑换金币失败，请稍后重试`,
          icon: 'none'
        })
        setTimeout(() => {
          that.setData({
            onClickGold: false
          })
        }, 2000)
      },
    });
  },

  // 切换点击状态并且提示
  _toggleClickStatus(status) {
    if (this.data[status]) {
      wx.showToast({
        title: status == 'onClickStatus' ? '请您慢点戳！' : '请间隔一分钟再兑换哦',
        icon: 'none',
        mask: true,
        duration: 1500
      })
      return true
    } else {
      if (status == 'onClickStatus') {
        this.setData({
          onClickStatus: true
        })
      } else {
        this.setData({
          onClickGold: true
        })
      }
      return false
    }
  },

  // 点击气泡更新步数并入库
  _clickBubble(item, index) {
    const that = this;
    const totalStep = Number(that.data.totalStep)
    const bubble_step = Number(item.bubble_step)
    const openid = wx.getStorageSync('openid')
    wx.cloud.callFunction({
      name: "openapi",
      data: {
        action: "addBubbleRecord",
        bubble_step: bubble_step,
        bubble_title: item.bubble_title,
        bubble_type: item.bubble_type,
        bubble_id: item.bubble_id,
        openid: openid,
        record_id: getUUID()
      },
      success: res => {
        if (res.result._id) {
          const {
            bubble_list
          } = wx.getStorageSync("bubble_total");
          bubble_list.splice(bubble_list.findIndex(bubble => bubble._id === item._id), 1);
          wx.setStorageSync("bubble_total", {
            endTimeStamp: getTimeStamp(),
            bubble_list: bubble_list,
            is_end: bubble_list.length ? 1 : 2 // 当日消耗完设置为 2
          });
          // 气泡消耗动画
          that.initCountUpStep(totalStep, totalStep + bubble_step, 'totalStep')
          that.setData({
            totalStep: totalStep + bubble_step
          });
          that.fetchTips(index);
        }
      },
      fail: err => {
        console.error("[云函数] [addBubbleRecord fail] 调用失败", err);
      },
    });
  },

  // 数字滚动动画
  initCountUpStep(old, num, type) {
    if (!this.countUp) {
      this.countUp = new CountUp(type, num, {
        startVal: old,
        useGrouping: false,
        useEasing: true,
        duration: 1.667, // 增加缓动效果
        smartEasingThreshold: 999999,
      }, this)
      this.countUp.start()
    } else {
      this.countUp.update(num)
    }
  },

  // 获取系统设置
  fetchSetting() {
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.fetchOpenId(res.userInfo);
              App.globalData.userInfo = res.userInfo;
              this.setData({
                has_login: false,
                userInfo: res.userInfo,
              });
            },
          });
        }
      },
      fail: err => {
        console.log("getSetting", err);
      },
    });
  },

  // 用户登录入库
  fetchOpenId(params) {
    const that = this
    wx.cloud.callFunction({
      name: "login",
      data: params,
      success: res => {
        App.globalData.openid = res.result.openid;
        wx.setStorageSync('openid', res.result.openid)
      },
      fail: err => {
        console.error("[云函数] [login fail] 调用失败", err);
      },
    });
  },

  // 用户分享
  onShareAppMessage(res) {
    const openid = e.from == 'button' ? wx.getStorageSync('openid') : ''
    return {
      title: "90%的人还不知道，每天走路可以赚零花钱",
      imageUrl: "https://diandian-1258683431.file.myqcloud.com/campaign/share.png",
      path: `/pages/index/index?openid=${openid}`
    };
  },
});