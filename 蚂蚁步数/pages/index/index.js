var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
  return typeof t;
} : function (t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = getApp(), a = require("../../utils/util.js"), i = require("../../utils/globalDefine.js"), n = require("../../network/httpRequest.js");

Page({
  data: {
    hasUserInfo: !1,
    userInfo: {},
    stepInfo: {},
    stepNum: 0,
    ruleModal: !0,
    invitedResModal: !0,
    authWeRun: 1,
    referralList: [],
    openRedModal: {
      status: !0
    },
    failModal: !0,
    failTitle: "",
    tencentADList: [],
    newUserModal: !0,
    floadTaskInfo: null,
    taskObj: {},
    allTaskObj: {},
    getStepsModal: !0,
    isCanVideoAd: !1,
    jumpModal: 0,
    jumpInfo: {},
    isShowAddTips: !1,
    stepWidth: 0,
    testFlag: 1,
    systemInforms: {},
    guideStep: 6,
    getCount: 0,
    isShowModalAd: !1,
    videoRewardModal: {
      flag: !0
    },
    followModal: !0,
    followList: [],
    fastTakeModal: !0,
    fastTakeObj: {
      status: !1
    },
    takeRemainStamp: "",
    downloadInfo: {},
    goodsList: [],
    integralNum: 0,
    integralVideoFlag: 1,
    telBillModal: {
      flag: !0
    },
    inputValue: "",
    elevenStatus: 0
  },
  timer: "",
  timeDelay: 0,
  delayConfig: [],
  videoAd: {},
  delayRewardNum: 10,
  fastTakeTimer: "",
  btnDisable: !1,
  elevenAd: "",
  eleventTimer: "",
  loadEleven: function () {
    wx.createInterstitialAd && (this.elevenAd = wx.createInterstitialAd({
      adUnitId: "adunit-892d833486b535fc"
    }), this.elevenAd.onLoad(function () { }), this.elevenAd.onError(function (t) { }),
      this.elevenAd.onClose(function () { }));
  },
  bindElevenAd: function () {
    var t = this.elevenAd;
    clearInterval(this.eleventTimer), this.setData({
      elevenStatus: 2
    }), t && t.show().catch(function (t) {
      wx.showToast({
        title: "暂无内容，稍后再试...",
        icon: "none",
        duration: 5e3
      });
    });
  },
  bindExchangeBill: function () {
    var t = this, e = this.data.inputValue;
    if (!/^1[3456789]\d{9}$/.test(e)) return wx.showModal({
      title: "提示",
      content: "手机号码有误，请重填！",
      showCancel: !1
    }), !1;
    wx.showModal({
      title: "兑换提示",
      content: "将花费积分兑换话费，充值手机号：" + e,
      success: function (a) {
        if (a.confirm) {
          var o = t.data.telBillModal.iesId, s = {
            phone: e,
            iesId: o
          };
          n.getGoodsReward(s).then(function (e) {
            e.curTotalIntegral >= 0 ? (t.setData({
              integralNum: e.curTotalIntegral
            }), i.setIntegral(e.curTotalIntegral), wx.showModal({
              title: "提示",
              content: "话费兑换成功",
              showCancel: !1
            })) : wx.showToast({
              title: "兑换失败",
              icon: "none",
              duration: 3e3
            }), t.bindHideTelBill();
          });
        } else a.cancel && t.bindHideTelBill();
      }
    });
  },
  bindKeyInput: function (t) {
    this.setData({
      inputValue: t.detail.value
    });
  },
  bindToDetails: function (t) {
    var e = t.target.dataset.iesid, a = t.target.dataset.type, n = t.target.dataset.value, o = parseInt(t.target.dataset.num), s = this.data.integralNum;
    if (2 == a) s >= o ? this.bindShowTelBill(n, e) : wx.showModal({
      title: "提示",
      content: "积分不足",
      showCancel: !1
    }); else {
      var r = "../goods-details/goods?iesid=" + e;
      i.safetySwitchPage(r);
    }
  },
  bindShowTelBill: function (t, e) {
    this.setData({
      telBillModal: {
        flag: !1,
        value: t,
        iesId: e
      }
    });
  },
  bindHideTelBill: function () {
    this.setData({
      telBillModal: {
        flag: !0
      }
    });
  },
  bindGoDownloadStep: function () {
    i.safetySwitchPage("../download-step/download");
  },
  bindShowFollow: function () {
    this.setData({
      followModal: !1
    });
  },
  bindHideFollow: function () {
    this.setData({
      followModal: !0
    });
  },
  bindHideVideoReward: function () {
    this.setData({
      videoRewardModal: {
        flag: !0
      }
    }), wx.pageScrollTo && wx.pageScrollTo({
      scrollTop: 700,
      duration: 300
    });
  },
  bindFinishGuide: function () {
    this.clickGuideNext(), this.setGuideStep(6);
  },
  bindShowAddTips: function () {
    this.setData({
      isShowAddTips: !0
    });
  },
  bindHideAddTips: function () {
    this.setData({
      isShowAddTips: !1
    });
  },
  bindHideSystemModal: function () {
    this.setData({
      systemInforms: 0
    });
  },
  bindShowJumpModal: function () {
    this.setData({
      jumpModal: 1
    });
  },
  bindHideJumpModal: function () {
    this.setData({
      jumpModal: 0
    }), this.checkSession(), this.data.userInfo.newUserReward && this.bindShowNewUser();
  },
  bindShowGetSteps: function () {
    if (4 === this.data.authWeRun) this.checkSession(); else {
      this.setData({
        getStepsModal: !1
      });
      this.clickFloadTask("2"), this.showModalAd();
    }
  },
  bindHideGetSteps: function () {
    var t = this, e = t.timeDelay, i = t.data.guideStep, n = t.delayRewardNum, o = t.data.userInfo.rewardNum;
    t.clickGuideNext(), o > n && e > 0 && i > 5 ? setTimeout(function () {
      t.setData({
        getStepsModal: !0
      }), t.timeDelay = a.timeDelay(t.delayConfig) || 0;
    }, e) : (t.setData({
      getStepsModal: !0
    }), t.timeDelay = a.timeDelay(t.delayConfig) || 0);
  },
  bindShowNewUser: function () {
    this.data.jumpModal || this.setData({
      newUserModal: !1
    });
  },
  bindHideNewUser: function () {
    this.setData({
      newUserModal: !0
    });
  },
  bindGetNewUserReward: function () {
    var t = this;
    t.setData({
      newUserModal: !0
    }), t.checkSession();
  },
  bindShowFailModal: function (t) {
    this.setData({
      failModal: !1,
      failTitle: t
    }), this.showModalAd();
  },
  bindHideFailModal: function () {
    var t = this, e = t.timeDelay, i = t.delayRewardNum, n = t.data.userInfo.rewardNum;
    a.log("delayRewardNum:" + i + " timeDelay:" + e), t.clickGuideNext(), n > i && e > 0 ? setTimeout(function () {
      t.setData({
        failModal: !0
      }), t.timeDelay = a.timeDelay(t.delayConfig) || 0;
    }, e) : (t.setData({
      failModal: !0
    }), t.timeDelay = a.timeDelay(t.delayConfig) || 0);
  },
  bindShowRuleModal: function () {
    this.setData({
      ruleModal: !1
    });
  },
  bindHideRuleModal: function () {
    this.setData({
      ruleModal: !0
    });
  },
  bindShowInvitedRes: function () {
    this.setData({
      invitedResModal: !1
    });
  },
  bindHideInvitedRes: function () {
    var t = this.data.userInfo;
    t.invitedResult = 6, this.setData({
      invitedResModal: !0,
      userInfo: t
    }), i.setUserLoginInfo(t);
  },
  bindShowOpenRed: function (t, e, a) {
    this.setData({
      openRedModal: {
        status: !1,
        number: t,
        text: e || "",
        type: a || 1
      }
    }), this.showModalAd();
  },
  bindHideOpenRed: function () {
    var t = this, e = t.timeDelay, i = t.data.guideStep, n = t.delayRewardNum, o = t.data.userInfo.rewardNum;
    t.clickGuideNext(), o > n && e > 0 && i > 5 ? setTimeout(function () {
      t.setData({
        openRedModal: {
          status: !0
        }
      }), t.timeDelay = a.timeDelay(t.delayConfig) || 0;
    }, e) : (t.setData({
      openRedModal: {
        status: !0
      }
    }), t.timeDelay = a.timeDelay(t.delayConfig) || 0);
  },
  bindGoPersonal: function () {
    if (4 === this.data.authWeRun) this.checkSession(); else {
      wx.switchTab({
        url: "../personal/personal"
      });
    }
  },
  bindGoInviteRed: function () {
    wx.switchTab({
      url: "../invite-reward/reward"
    });
  },
  bindGoMatch: function () {
    wx.switchTab({
      url: "../match/match"
    });
  },
  bindDoTasks: function (t) {
    this.setData({
      failModal: !0
    });
  },
  bindGoComplaint: function () {
    i.safetySwitchPage("../complaint/complaint");
  },
  bindGoReward: function (t) {
    var e = t.currentTarget.dataset.type;
    this.remainStamp < 0 ? this.clickFloadTask(e) : this.bindShowFailModal("还未到领取时间");
  },
  bindGoReward1: function (t) {
    var e = t.currentTarget.dataset.type, a = t.currentTarget.dataset.rid;
    this.data.floadTaskInfo.pageReward.type1.size > 0 ? this.clickFloadTask(e, a) : this.clickGuideNext();
  },
  bindPoster: function () {
    var t = "../poster/poster?steps=" + this.data.stepNum;
    i.safetySwitchPage(t);
  },
  bindShowFastTake: function () {
    var t = this, e = t.data.fastTakeObj, i = new Date().getTime(), n = null, o = null;
    try {
      n = wx.getStorageSync("takeLastTime") || null;
    } catch (t) { }
    if (n) if (parseFloat(n.split("|")[1]) === e.type) {
      if ((o = parseInt(n.split("|")[0])) - i < 0) return wx.showToast({
        title: "红包已过期",
        icon: "none",
        duration: 3e3
      }), void t.showFloatFast();
    } else {
      o = i + 864e5;
      try {
        wx.setStorageSync("takeLastTime", o + "|" + e.type);
      } catch (t) { }
    } else {
      o = i + 864e5;
      try {
        wx.setStorageSync("takeLastTime", o + "|" + e.type);
      } catch (t) { }
    }
    t.fastTakeTimer = setInterval(function () {
      var e = new Date().getTime(), i = o - e;
      i < 0 && (clearTimeout(t.fastTakeTimer), wx.showToast({
        title: "红包已过期",
        icon: "none",
        duration: 3e3
      }), t.showFloatFast(), t.setData({
        fastTakeModal: !0
      }));
      var n = parseInt(i / 1e3 / 60 / 60, 10), s = parseInt(i / 1e3 / 60 % 60, 10), r = parseInt(i / 1e3 % 60, 10), d = a.formatNumber(n) + ":" + a.formatNumber(s) + ":" + a.formatNumber(r);
      t.setData({
        takeRemainStamp: d
      });
    }, 1e3), this.setData({
      fastTakeModal: !1
    });
  },
  bindHideFastTake: function () {
    clearTimeout(this.fastTakeTimer), this.setData({
      fastTakeModal: !0,
      takeRemainStamp: ""
    });
  },
  showFloatFast: function () {
    var e = this;
    if (this.data.userInfo.userId) {
      var a = function () {
        var a = {
          status: !1
        }, n = i.getTakeConfig(), o = e.data.userInfo, s = i.getTakeHistory();
        if (s.length > 0) for (var r = 0; r < s.length; r++) if (1 === s[r].withdrawalType) return e.setData({
          fastTakeObj: a
        }), {
            v: void 0
          };
        for (var d = 0; d < n.length; d++) {
          var l = function (t) {
            if (o.rewardNum >= n[t].minLimit && o.rewardNum < n[t].maxLimit && 2 === n[t].withdrawalType) {
              a.num = n[t].receivedAmount, a.type = n[t].receivedType, a.surplus = parseFloat(o.rewardNum - n[t].receivedAmount).toFixed(2);
              var i = new Date().getTime(), r = null;
              try {
                r = wx.getStorageSync("takeLastTime") || null;
              } catch (t) { }
              if (r && parseFloat(r.split("|")[1]) === a.type && parseInt(r.split("|")[0]) - i < 0) return e.setData({
                fastTakeObj: a
              }), {
                  v: {
                    v: void 0
                  }
                };
              if (s.length > 0) for (var d = 0; d < s.length; d++) if (2 === s[d].withdrawalType && a.num < s[d].withdrawalAmonut) return e.setData({
                fastTakeObj: {
                  status: !1
                }
              }), {
                  v: {
                    v: void 0
                  }
                };
              !s.some(function (e) {
                if (e.receivedType === n[t].receivedType) return !0;
              }) && o.allowWithdrawal && (a.status = !0);
            }
          }(d);
          if ("object" === (void 0 === l ? "undefined" : t(l))) return l.v;
        }
        e.setData({
          fastTakeObj: a
        });
      }();
      if ("object" === (void 0 === a ? "undefined" : t(a))) return a.v;
    }
  },
  bindReqTakeCash: function () {
    var t = this;
    if (t.btnDisable) return !1;
    t.btnDisable = !0;
    var e = {};
    e.receivedType = t.data.fastTakeObj.type, n.reqTakeCash(e).then(function (e) {
      setTimeout(function () {
        t.btnDisable = !1;
      }, 1e3);
      var a = t.data.userInfo;
      a.rewardNum = e.totalReward || 0, i.setUserLoginInfo(a), t.setData({
        userInfo: a
      }), t.bindHideFastTake(), wx.showToast({
        title: "24小时内转账到微信零钱包请留意",
        icon: "none",
        duration: 5e3
      }), t.getTakeHistory();
    }).catch(function () {
      t.btnDisable = !1, t.bindHideFastTake();
    });
  },
  getTakeHistory: function () {
    var t = this;
    n.getTakeHistory().then(function (e) {
      var a = e.withdrawalConfig || [], n = e.withdrawalRecords || [];
      i.setTakeConfig(a), i.setTakeHistory(n), t.showFloatFast();
    });
  },
  getUserInfo: function (t) {
    if (this.bindFinishGuide(), t.detail.userInfo) {
      var e = {};
      e.iv = t.detail.iv, e.encryptedData = t.detail.encryptedData, n.requestWxLogin(e),
        this.setData({
          newUserModal: !0
        });
    }
  },
  getWeChatAdList: function () {
    var t = this;
    n.getWechatAdList().then(function (e) {
      var n = e.tencentADList || [], o = e.delayConfig || [], s = {};
      if (i.setAdList(n), t.delayConfig = o, t.timeDelay = a.timeDelay(o) || 0, t.delayRewardNum = e.delayRewardNum || 10,
        t.loadVideoAdObj(), 6 === n.length && n[5].openFlag) {
        t.loadEleven();
        var r = setTimeout(function () {
          t.setData({
            elevenStatus: 1
          });
        }, 5e3);
        t.eleventTimer = r;
      }
      e.downloadList && i.setDownloadList(e.downloadList), e.myPageDownloadInfo && (s = e.myPageDownloadInfo,
        wx.getSystemInfo && wx.getSystemInfo({
          success: function (e) {
            1 === s.deviceType ? "android" !== e.platform && "devtools" !== e.platform || (s.show = 1) : 2 === s.deviceType ? "ios" !== e.platform && "devtools" !== e.platform || (s.show = 1) : 3 === s.deviceType ? "android" !== e.platform && "ios" !== e.platform && "devtools" !== e.platform || (s.show = 1) : s.show = 0,
              t.setData({
                downloadInfo: s
              });
          }
        }), i.setDownloadInfo(s)), t.setData({
          tencentADList: n,
          videoADSwitch: e.videoADSwitch || 0
        });
    });
  },
  getRewardReq: function (t) {
    var e = this, a = parseInt(t.currentTarget.dataset.state) || 0, i = parseInt(t.currentTarget.dataset.status), o = parseInt(t.currentTarget.dataset.type);
    if (4 === e.data.authWeRun) return this.checkSession(), !1;
    if (a) e.bindShowFailModal("您已领取此红包"); else if (i) {
      var s = e.data.stepInfo.redEnvelopeId, r = {};
      r.redEnvelopeId = s, r.rewardSeq = o, n.getRewardReq(r).then(function (t) {
        if (t && t.rewardNum) {
          var a = e.data.stepInfo, i = e.data.userInfo, s = "", r = "";
          10 === o ? (s = a.details[o - 1].reward, r = "太棒了！您已经领取今日所有红包") : (s = a.details[o - 1].reward,
            r = "步数达到" + a.details[o].step + "可累计领" + a.details[o].reward + "运动币"), i.rewardNum = t.rewardNum,
            e.setData({
              userInfo: i
            }), n.getStepConfig().then(function (t) {
              e.setData({
                stepInfo: t.stepInfo || ""
              });
            }), e.bindShowOpenRed(s, r, 2), e.showFloatFast();
        }
      });
    } else e.bindShowFailModal("步数还不够领取此红包");
  },
  getIntegralInfo: function () {
    var t = this;
    n.getIntegralInfo().then(function (e) {
      var a = e.userCurIntegral || 0;
      t.setData({
        integralNum: a,
        integralVideoFlag: e.integralVideoFlag
      }), i.setIntegral(a);
    });
  },
  getGoodsList: function () {
    var t = this;
    n.getGoodsList().then(function (e) {
      t.setData({
        goodsList: e.shopList || []
      });
    });
  },
  onWxLoginCallBack: function () {
    this.getCurPageData();
  },
  getCurPageData: function () {
    var t = this, e = i.userInfo;
    null != e.userId && void 0 != e.userId && (t.setData({
      userInfo: e,
      hasUserInfo: e.hasInfo,
      testFlag: i.getTestFlag()
    }), n.getStepConfig().then(function (e) {
      t.setData({
        stepInfo: e.stepInfo || ""
      });
    }), e.isNewUser || t.checkSession(), 1 === e.invitedResult && t.bindShowInvitedRes(),
      e.newUserReward && (t.bindShowNewUser(), t.setData({
        authWeRun: 4
      })), t.getFloadList(), t.getTaskList(), t.getTakeHistory(), t.getGoodsList(), t.getIntegralInfo());
  },
  checkSession: function () {
    var t = this;
    wx.checkSession({
      success: function () {
        t.getUserStepData();
      },
      fail: function () {
        wx.login({
          success: function (e) {
            e.code ? t.getUserStepData(e.code) : uitl.log("登录失败！" + e.errMsg);
          }
        });
      }
    });
  },
  getUserStepData: function (t) {
    var e = this;
    if (e.data.jumpModal) return !1;
    wx.canIUse("getWeRunData") ? wx.getWeRunData({
      success: function (a) {
        var i = {};
        i.code = t || "", i.encryptedData = a.encryptedData || "", i.iv = a.iv || "", n.getMySteps(i).then(function (t) {
          var a = t.stepNum || 0;
          e.setData({
            stepNum: a,
            authWeRun: 1
          }), e.calcWidthFunc(a);
        }).catch(function (t) { });
      },
      fail: function (t) {
        wx.getSetting({
          success: function (t) {
            var a = t.authSetting["scope.werun"];
            a || void 0 == a ? (wx.showToast({
              title: "您手机微信版本过低不支持步数功能",
              icon: "none",
              duration: 5e3
            }), e.setData({
              authWeRun: 3
            })) : (e.setData({
              authWeRun: 2
            }), wx.showToast({
              title: "未授权微信运动，请点击获取步数授权重试",
              icon: "none",
              duration: 5e3
            }));
          }
        });
      }
    }) : (wx.showToast({
      title: "您手机微信版本过低不支持步数功能",
      icon: "none",
      duration: 5e3
    }), e.setData({
      authWeRun: 3
    }));
  },
  getFloadList: function () {
    var t = this;
    t.data.userInfo.userId && n.getFloadList().then(function (e) {
      t.setData({
        floadTaskInfo: e || null
      }), t.startRemainTimer();
    });
  },
  clickFloadTask: function (t, e) {
    var a = this, o = {};
    o.typeId = t, e && (o.rid = e), n.clickFloadTask(o).then(function (e) {
      if (2 == t) a.checkSession(); else if (1 == t) {
        if (e.totalReward) {
          var n = i.userInfo;
          n.rewardNum = e.totalReward, i.setUserLoginInfo(n), a.setData({
            userInfo: n
          });
        }
        e.redEnvelopeAmount && a.bindShowOpenRed(e.redEnvelopeAmount, "多个好友多条财路", 1);
      } else if (3 == t) {
        if (e.totalReward) {
          var o = i.userInfo;
          o.rewardNum = e.totalReward, i.setUserLoginInfo(o), a.setData({
            userInfo: o
          });
        }
        if (e.redEnvelopeAmount) {
          var s = e.nextTime || 2;
          a.bindShowOpenRed(e.redEnvelopeAmount, "每" + s + "个小时领1次", 1), a.showFloatFast();
        }
      }
      a.getFloadList();
    });
  },
  clickAddSteps: function () {
    this.clickFloadTask("2"), this.bindHideGetSteps();
  },
  bindOpenSetting: function (t) {
    t.detail.authSetting["scope.werun"] && this.setData({
      authWeRun: 1
    });
  },
  getReferralList: function () {
    var t = this;
    n.getReferralList().then(function (e) {
      var a = e.referralList || [];
      t.setData({
        referralList: a
      });
    }).catch(function (t) { });
  },
  getShareImg: function () {
    var t = this, e = {};
    e.imageType = 1, n.getShareImg(e).then(function (e) {
      var a = e.redImage || "";
      t.shareImgDesc = a.imgDesc, t.shareImgUrl = a.imgUrl;
    });
  },
  getTaskList: function () {
    var t = this;
    t.data.hasUserInfo && n.getTaskList().then(function (e) {
      for (var a = e.taskRewardList, i = [], n = [], o = e.ATTENTION_LIMIT || 20, s = t.data.userInfo.rewardNum, r = 0; r < a.length; r++) a[r].receiveFlag || (100 == a[r].taskType ? s > o && n.push(a[r]) : i.push(a[r]));
      t.setData({
        taskObj: i[0] || {},
        allTaskObj: e || {},
        followList: n
      });
    });
  },
  bindJumpApp: function (t) {
    var e = this, a = t.currentTarget.dataset.appid, i = t.currentTarget.dataset.appurl;
    wx.navigateToMiniProgram({
      appId: a,
      path: i,
      extraData: {
        foo: "bar"
      },
      envVersion: "release",
      success: function (t) {
        var i = {};
        i.appId = a, n.reportAppJump(i).then(function (t) {
          e.bindHideJumpModal();
        });
      }
    });
  },
  updateRemainTime: function () {
    var t = this, e = t.remainStamp, i = t.data.floadTaskInfo;
    if (e < 0) return t.stopRemainTimer(), i.remainStamp = "可领取", t.setData({
      floadTaskInfo: i
    }), !1;
    var n = parseInt(e / 1e3 / 60 / 60, 10), o = parseInt(e / 1e3 / 60 % 60, 10), s = parseInt(e / 1e3 % 60, 10);
    this.remainStamp = e - 1e3, i.remainStamp = a.formatNumber(n) + ":" + a.formatNumber(o) + ":" + a.formatNumber(s),
      t.setData({
        floadTaskInfo: i
      });
  },
  startRemainTimer: function () {
    var t = this, e = t.data.floadTaskInfo.pageReward.type3;
    if (e.expireTime) {
      var a = e.expireTime - e.currentTime;
      t.remainStamp = a;
    }
    t.stopRemainTimer();
    var i = setInterval(function () {
      t.updateRemainTime();
    }, 1e3);
    t.timer = i;
  },
  stopRemainTimer: function () {
    var t = this.timer;
    clearInterval(t);
  },
  calcWidthFunc: function (t) {
    for (var e = this, a = e.data.stepInfo.details, i = 0, n = 0; n < a.length; n++) {
      if (a[n].step > t) {
        var o = 0;
        o = 0 === n ? 75 * t / a[0].step : 80 + 150 * (n - 1) + 150 / (a[n].step - a[n - 1].step) * (t - a[n - 1].step),
          e.setData({
            stepWidth: o
          });
        break;
      }
      t > 8e4 && e.setData({
        stepWidth: 1430
      }), a[n].state && (i += 1);
    }
    i > 1 && e.setData({
      getCount: i
    });
  },
  formSubmit: function (t) {
    var e = t.detail.formId;
    if (a.log("submitId：" + e), e.indexOf(" ") < 0) {
      var i = {};
      i.formId = e, n.saveSubmitId(i);
    }
  },
  getSystemInforms: function () {
    var t = this;
    n.getSystemInforms().then(function (e) {
      if (e) {
        var a = e;
        t.setData({
          systemInforms: a
        }), a.maintenanceNoticeFlag && !a.closeFlag && wx.hideTabBar();
      }
    });
  },
  getGuideStep: function () {
    var t = wx.getStorageSync("guideStep") || 6;
    return this.setData({
      guideStep: t
    }), t;
  },
  setGuideStep: function (t) {
    try {
      wx.setStorageSync("guideStep", t);
    } catch (t) { }
  },
  clickGuideNext: function () {
    var t = this, e = t.getGuideStep();
    e > 0 && e < 6 && (t.setGuideStep(e + 1), t.getGuideStep(), 2 === e && t.checkSession());
  },
  showModalAd: function () {
    var t = wx.getStorageSync("showAdCount"), e = wx.getStorageSync("showAdNextTime");
    if (e) {
      var a = new Date().getTime();
      if (a - e > 36e5) {
        this.setData({
          isShowModalAd: !0
        });
        try {
          wx.setStorageSync("showAdNextTime", a);
        } catch (t) { }
        try {
          wx.setStorageSync("showAdCount", 1);
        } catch (t) { }
      } else if (t > 0 && t < 20) {
        this.setData({
          isShowModalAd: !0
        }), t += 1;
        try {
          wx.setStorageSync("showAdCount", t);
        } catch (t) { }
      } else t >= 8 && this.setData({
        isShowModalAd: !1
      });
    } else {
      this.setData({
        isShowModalAd: !0
      });
      var i = new Date().getTime();
      try {
        wx.setStorageSync("showAdNextTime", i);
      } catch (t) { }
      try {
        wx.setStorageSync("showAdCount", 1);
      } catch (t) { }
    }
  },
  loadVideoAdObj: function () {
    var t = this, e = wx.getStorageSync("videoAdLimit") || "", i = 1;
    if (e) {
      var n = e.split("|");
      a.log(n);
      var o = a.formatTime(new Date()).split(" ")[0], s = n[0], r = parseInt(n[1]);
      s === o && r > 15 && (i = 0, t.setData({
        isCanVideoAd: !1
      }));
    }
    if (wx.createRewardedVideoAd && i) {
      var d = wx.createRewardedVideoAd({
        adUnitId: "adunit-fd86bb4790f00cce"
      });
      t.videoAd = d, d.load().then(function () {
        t.setData({
          isCanVideoAd: !0
        });
      }).catch(function (e) {
        console.log("loadErr：" + e.errMsg), t.setData({
          isCanVideoAd: !1
        });
      }), d.onError(function (e) {
        console.log("onError：" + e.errMsg), t.setData({
          isCanVideoAd: !1
        });
      });
    }
  },
  getDoubleReward: function () {
    var t = this, e = t.videoAd;
    e.load().then(function () {
      e.show().then(function () {
        return a.log("成功调用视频");
      }).catch(function (t) {
        return a.log(t.errMsg);
      });
    }).catch(function (e) {
      console.log("getRewardLoadErr：" + e.errMsg), t.setData({
        isCanVideoAd: !1
      });
    }), t.onVideoClose();
  },
  onVideoClose: function () {
    var t = this, e = t.videoAd;
    e.onClose(function (o) {
      e.offClose(), o && o.isEnded || void 0 === o ? n.getIntegralReward().then(function (e) {
        var n = e.totalIntegral || "";
        t.setData({
          videoRewardModal: {
            flag: !1,
            rewardAmount: e.rewardAmount || ""
          },
          integralNum: n,
          isCanVideoAd: !1
        }), i.setIntegral(n), t.getIntegralInfo();
        var o = wx.getStorageSync("videoAdLimit") || "", s = a.formatTime(new Date()).split(" ")[0], r = 1;
        if (o) {
          var d = o.split("|"), l = d[0], u = parseInt(d[1]);
          l === s && (r = u + 1);
        }
        a.log(s + "|" + r);
        try {
          wx.setStorageSync("videoAdLimit", s + "|" + r);
        } catch (t) { }
      }) : wx.showModal({
        title: "积分奖励",
        content: "看完视频后才能获得积分奖励",
        cancelText: "下次再说",
        confirmText: "观看视频",
        success: function (a) {
          a.confirm && (e.show(), t.onVideoClose());
        }
      });
    });
  },
  bindJumpBoutique: function (t) {
    var e = t.currentTarget.dataset.appid, a = t.currentTarget.dataset.appurl, i = t.currentTarget.dataset.type;
    3 === i ? wx.navigateToMiniProgram({
      appId: e,
      path: a,
      extraData: {
        foo: "bar"
      },
      envVersion: "release"
    }) : 4 == i && wx.previewImage({
      current: a,
      urls: [a]
    });
  },
  onLoad: function (t) {
    e.aldstat.sendEvent("用户进入首页");
  },
  onShow: function () {
    this.getWeChatAdList(), this.getFloadList(), this.getShareImg(), this.getTaskList(),
      this.getSystemInforms(), this.getGuideStep(), this.setData({
        userInfo: i.getUserLoginInfo(),
        integralNum: i.getIntegral(),
        followModal: !0
      });
  },
  onUnload: function () {
    this.stopRemainTimer();
  },
  onHide: function () {
    this.stopRemainTimer(), 6 === this.data.tencentADList.length && this.data.tencentADList[5].openFlag && this.setData({
      elevenStatus: 1
    });
  },
  bindRefresh: function () {
    this.checkSession();
  },
  onPullDownRefresh: function () {
    this.data.guideStep > 5 ? (this.setData({
      ruleModal: !0,
      invitedResModal: !0,
      openRedModal: {
        status: !0
      },
      failModal: !0
    }), this.checkSession(), this.getFloadList()) : wx.stopPullDownRefresh();
  },
  onShareAppMessage: function (t) {
    var e = this, i = this.data.userInfo.userId || "";
    return "button" === t.from && (a.log(t.target), e.setData({
      failModal: !0
    })), {
        title: e.shareImgDesc || "步数可换钱，运动币可提现",
        path: "/pages/index/index?referrerId=" + i,
        imageUrl: e.shareImgUrl || "/images/common/share-cover.png",
        success: function (t) {
          a.log("--- 转发回调成功 ---");
        }
      };
  }
});