const App = getApp(); //通过getApp方法来引用全局对象
const db = wx.cloud.database(); // 初始化数据库
import {
  randomArray
} from '../../utils/utils.js'
// import wxCharts from "../../utils/wxcharts-min";

/**
 * 用户进入小程序先随机展示气泡和红包，当用户授权后存入 user 表中
 */
Page({
  data: {
    userInfo: {},
    has_login: true, // 是否登录
    cdn04: App.globalData.cdn04,
    tipList: [],
    stepList: [],
  },

  onLoad: function(options) {
    this.fetchSetting();
    this.fetchTips();
    this.updateRunData();
    // this.getInitData()
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

  updateRunData() {
    const that = this;
    wx.getWeRunData({
      success(res) {
        const cloudID = res.cloudID;
        wx.cloud
          .callFunction({
            name: "openapi",
            data: {
              action: "getWeRunData",
              weRunData: wx.cloud.CloudID(cloudID),
            },
          })
          .then(res1 => {
            that.setData({
              stepList: res1.result,
            });
            console.log(res1);
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
      series: [{
        name: "步数",
        data: arr.slice(0, 7),
      }, ],
      xAxis: {
        disableGrid: true,
      },
      yAxis: {
        min: 0,
        max: 30000,
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
   */
  fetchTips() {
    const that = this;
    db.collection("bubble").get({
      success(res) {
        console.log('fetchTips', res.data.length)
        that.setData({
          tipList: res.data.length > 4 ? randomArray(res.data) : res.data,
        });
      },
      fail(err) {
        console.log("fail", err);
      },
    });
  },

  /**
   * 每次点击一个气泡删除表中一个数据并重新获取四条新的数据
   * 在这里处理相关业务逻辑，如广告逻辑处理、气泡后续操作等
   */
  getStep(e) {
    const {
      index,
      item
    } = e.currentTarget.dataset
    console.log(index, item)
    // 删除点击的记录, 删除成功后更新列表
    this._clickBubble(item._id)
  },

  _clickBubble(id) {
    const that = this
    wx.cloud.callFunction({
      name: "openapi",
      data: {
        action: 'removeBubble',
        id: id
      },
      success: res => {
        if (res.result.errMsg == 'collection.remove:ok') {
          that.fetchTips()
        }
      },
      fail: err => {
        console.error("[云函数] [removeBubble fail] 调用失败", err);
      },
    });
  },

  fetchSetting() {
    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.fetchOpenId();
          wx.getUserInfo({
            success: res => {
              App.globalData.userInfo = res.userInfo;
              this.setData({
                has_login: false,
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
        // console.log(App.globalData)
      },
      fail: err => {
        console.error("[云函数] [login fail] 调用失败", err);
      },
    });
  },

  onShareAppMessage: function() {},

  getInitData() {
    const that = this
    db.collection('initData').get().then(res => {
      that.initData(res.data)
    })
  },

  formatData(data) {
    const totalTipList = [];
    for (let item of data) {
      for (let i = 0; i < item.num; i++) {
        if (i == item.num - 1) delete item.num;
        delete item._id
        totalTipList.push(item);
      }
    }
    return totalTipList;
  },

  initData(data) {
    const bubbleList = this.formatData(data)
    console.log(bubbleList)
    for (const item of bubbleList) {
      wx.cloud.callFunction({
        name: "openapi",
        data: {
          action: 'testAddBubble',
          item: item
        },
        success: res => {
          console.log(
            "[云函数] [testAddBubble  ",
            res
          );
        },
        fail: err => {
          console.error("[云函数] [testAddBubble fail] 调用失败", err);
        },
      });
    }
  }
});