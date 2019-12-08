const App = getApp(); //通过getApp方法来引用全局对象
const db = wx.cloud.database(); // 初始化数据库
import { randomArray, getTimeStamp, getUUID } from "../../utils/utils";
import CountUp from '../../utils/countUp'
import wxCharts from "../../utils/wxcharts-min";

/**
 * 用户进入小程序先随机展示气泡和红包，当用户授权后存入 user 表中
 */
Page({
  data: {
    userInfo: {},
    has_login: false, // 是否登录
    cdn04: App.globalData.cdn04,
    tipList: [],
    totalStep: 0,
    animationData: "",
    menus: [
      {
        name: "历史上的今天",
        url: "/pages/today-history/index",
        style: "background-color: #E8D3A9;",
      },
      {
        name: "周公解梦",
        url: "/pages/dream/dream",
        style: "background-color: #D3D5B0;",
      },
    ],
  },

  onLoad: function(options) {
    console.log('options', options)
    this.fetchSetting();
    this.fetchTips();
    this.updateRunData();
  },

  getUserInfo(e) {
    if (this.data.has_login && e.detail.userInfo) {
      this.setData({
        has_login: false,
        userInfo: e.detail.userInfo,
      });
      wx.showToast({
        title: "登录成功",
        icon: "none",
        duration: 1000,
      });
    }
  },

  clearAnimate() {
    let animation = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
    });
    this.animation = animation;
    animation.opacity(1).step();
    this.setData({
      animationData: animation.export(),
    });
  },

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

  updateRunData() {
    const that = this;
    const localTotal = wx.getStorageSync('totalStep')
    wx.getWeRunData({
      success(res) {
        const cloudID = res.cloudID;
        wx.cloud
          .callFunction({
            name: "openapi",
            data: {
              action: "getWeRunAllData",
              weRunData: wx.cloud.CloudID(cloudID),
            },
          })
          .then(res1 => {
            that.setData({
              totalStep: localTotal ? localTotal : res1.result[0].step
            });
            // 将数据存储在集合中
            // that.showCharts(res1.result);
          });
      },
      fail(err) {
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

  // 收集 formid
  getFormId(e) {
    const formId = e.detail.formId;
    const touser = App.globalData.openid;
    wx.cloud.callFunction({
      name: "openapi",
      data: {
        action: "collectFormId",
        formId: formId,
        touser: touser,
        inviteName: "测试测试",
        date: new Date(),
        result: "我发送模板消息成功了",
        content: "模板消息详情内容",
      },
      success(res) {
        console.log("[云函数] [openapi collectFormId] 发送成功: ", res);
      },
      fail(err) {
        console.error("[云函数] [openapi collectFormId] 发送失败: ", err);
      },
    });
  },

  showCharts(data) {
    // 返回步数
    const arr = data.map(item => item.step);
    const res = wx.getSystemInfoSync();

    new wxCharts({
      canvasId: "lineCanvas",
      type: "line",
      categories: ["1", "2", "3", "4", "5", "6", "7"],
      animation: true,
      series: [
        {
          name: "步数",
          data: arr.slice(0, 7),
        },
      ],
      xAxis: {
        disableGrid: true,
      },
      yAxis: {
        min: 0,
        max: 20000,
      },
      width: res.windowWidth,
      height: 180,
      dataLabel: false,
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
  fetchTips() {
    const that = this;
    const { bubble_list, endTimeStamp = 0, is_end } = wx.getStorageSync("bubble_total");
    // 当前时间小于当日零点
    if (+new Date() < endTimeStamp && is_end == 1) {
      this.setData({
        tipList:
          bubble_list.length > 4 ? randomArray(bubble_list) : bubble_list,
      });
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

  /**
   * 每次点击一个气泡删除表中一个数据并重新获取四条新的数据
   * 在这里处理相关业务逻辑，如广告逻辑处理、气泡后续操作等
   */
  getStep(e) {
    const { index, item } = e.currentTarget.dataset;
    console.log("气泡索引", index, item);
    // 点击添加记录, 成功后更新列表
    this._clickBubble(item);
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
  changeTo(e) {
    const { step } = e.currentTarget.dataset;
    console.log(step)
    wx.showModal({
      content: "步数为 0 无法兑换燃力，多走一点步数再来兑换吧！",
      showCancel: !1
    })
  },

  /** 
   * 点击气泡更新步数并入库
   */
  _clickBubble(item) {
    const that = this;
    const totalStep = Number(that.data.totalStep)
    const step_nums = Number(item.step_nums)
    const openid = openid ? openid : wx.getStorageSync('openid')
    wx.cloud.callFunction({
      name: "openapi",
      data: {
        action: "addBubbleRecord",
        step_nums: step_nums,
        title: item.title,
        type: item.type,
        bubble_id: item.bubble_id,
        openid: openid,
        record_id: getUUID()
      },
      success: res => {
        that.clearAnimate();
        if (res.result.errMsg == "collection.add:ok") {
          const { bubble_list } = wx.getStorageSync("bubble_total");
          bubble_list.splice(bubble_list.findIndex(bubble => bubble._id === item._id), 1);
          wx.setStorageSync("bubble_total", {
            endTimeStamp: getTimeStamp(),
            bubble_list: bubble_list,
            is_end: bubble_list.length ? 1 : 2 // 当日消耗完设置为 2
          });
          that.initCountUpStep(totalStep, totalStep + step_nums, 'totalStep')
          that.setData({
            totalStep: totalStep + step_nums
          });
          if (!bubble_list.length) {
            wx.setStorageSync('totalStep', that.data.totalStep)
          }
          that.fetchTips();
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
        smartEasingThreshold: 999
      }, this)
      this.countUp.start()
    } else {
      this.countUp.update(num)
    }
  },

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

  fetchOpenId(params) {
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

  onShareAppMessage(res) {
    return {
      title: "90%的人还不知道，每天走路可以赚零花钱",
      path: `/pages/index/index`,
    };
  },
});
