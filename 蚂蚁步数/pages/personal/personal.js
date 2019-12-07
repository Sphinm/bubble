function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = require("../../utils/util.js"), i = require("../../utils/globalDefine.js"), n = require("../../network/httpRequest.js");

Page((t = {
    data: {
        userInfo: {},
        takeModal: !0,
        tencentADList: [],
        canTakeStatus: !1,
        receivedType: 0,
        takeClicked: !1,
        takeDataList: [],
        deviceShow: 0,
        tipsModal: {
            status: !0
        }
    },
    remainingNum: 0,
    bindShowTipsModal: function(e) {
        this.setData({
            takeModal: !0,
            tipsModal: {
                status: !1,
                tipsDec: e.tipsDec,
                tipsMain: e.tipsMain
            }
        });
    },
    bindHideTipsModal: function() {
        this.setData({
            tipsModal: {
                status: !0
            }
        });
    },
    bindToExchangeHistory: function() {
        i.safetySwitchPage("../exchange/exchange");
    },
    bindShowTakeModal: function() {
        var e = parseInt(this.data.userInfo.rewardNum), t = this.data.canTakeStatus;
        t = e >= 50, this.setData({
            takeModal: !1,
            canTakeStatus: t
        });
    },
    bindHideTakeModal: function() {
        this.setData({
            takeModal: !0
        });
    },
    bindSelectItem: function(e) {
        var t = parseInt(e.currentTarget.dataset.type), a = parseInt(e.currentTarget.dataset.number);
        this.remainingNum = a, this.setData({
            receivedType: t
        });
    },
    bindGetReward: function() {
        var e = this, t = parseInt(e.data.userInfo.rewardNum), a = e.data.receivedType;
        if (e.remainingNum <= 0) e.bindShowTipsModal({
            tipsDec: "该金额提现人数到达上限！",
            tipsMain: "登录蚂蚁步数APP立即提现0.3元，每日可获取双倍收益，助你早日提现!"
        }); else if (t < 50) e.bindShowTipsModal({
            tipsDec: "总金额未满50元",
            tipsMain: "登录蚂蚁步数APP立即提现0.3元，每日可获取双倍收益，助你早日提现!"
        }); else if (t < 75 && 8 === a) e.bindShowTipsModal({
            tipsDec: "总金额未满75元",
            tipsMain: "登录蚂蚁步数APP立即提现0.3元，每日可获取双倍收益，助你早日提现!"
        }); else if (t < 100 && 9 === a) e.bindShowTipsModal({
            tipsDec: "总金额未满100元",
            tipsMain: "登录蚂蚁步数APP立即提现0.3元，每日可获取双倍收益，助你早日提现!"
        }); else {
            var s = {};
            s.receivedType = a, e.setData({
                takeClicked: !0
            }), n.reqTakeCash(s).then(function(t) {
                var a = e.data.userInfo;
                a.rewardNum = t.totalReward || 0, i.setUserLoginInfo(a), e.setData({
                    userInfo: a,
                    takeClicked: !1
                }), e.bindHideTakeModal(), wx.showModal({
                    title: "提示",
                    content: "24小时内转账到微信零钱包请留意",
                    showCancel: !1
                }), e.getTakeHistory();
            }).catch(function() {
                setTimeout(function() {
                    e.getTakeData();
                }, 1500), e.setData({
                    takeClicked: !1
                });
            });
        }
    },
    getWeChatAdList: function() {
        var e = this, t = i.getDownloadInfo();
        e.setData({
            tencentADList: i.getAdList(),
            downloadInfo: t
        });
    },
    bindGoClock: function() {
        wx.switchTab({
            url: "../clock/clock"
        });
    },
    bindGoMatch: function() {
        wx.switchTab({
            url: "../match/match"
        });
    },
    bindGoCalorie: function() {
        i.safetySwitchPage("../calorie/calorie");
    },
    bindGoDownloadStep: function() {
        i.safetySwitchPage("../download-step/download");
    },
    getUserInfo: function(e) {
        var t = this;
        if (e.detail.userInfo) {
            var a = {};
            a.iv = e.detail.iv, a.encryptedData = e.detail.encryptedData, n.requestWxLogin(a).then(function(e) {
                var a = i.userInfo;
                a.userId && t.setData({
                    userInfo: a
                }), wx.showToast({
                    title: "更新成功"
                });
            });
        }
    },
    getTakeData: function() {
        var e = this;
        n.getTakeData().then(function(t) {
            var a = i.getTakeHistory(), n = t.withdrawalCnt;
            if (a.length > 0) for (var s = 0; s < a.length; s++) for (var o = 0; o < n.length; o++) a[s].receivedType == n[o].receivedType && n.splice(o, 1);
            e.setData({
                takeDataList: n,
                receivedType: n[0].receivedType
            }), e.remainingNum = n[0].remainingNum || 0;
        });
    },
    getTakeHistory: function() {
        var e = this;
        n.getTakeHistory().then(function(t) {
            var a = t.withdrawalRecords || [];
            i.setTakeHistory(a), e.getTakeData();
        });
    },
    onWxLoginCallBack: function() {},
    onLoad: function(e) {
        this.getWeChatAdList();
    },
    onShow: function() {
        var e = this, t = i.userInfo;
        null != t.userId && void 0 != t.userId && (e.setData({
            userInfo: t
        }), t.rewardNum >= 50 && e.getTakeData()), e.bindHideTipsModal();
    }
}, e(t, "onWxLoginCallBack", function() {}), e(t, "onShareAppMessage", function(e) {
    return "button" === e.from && a.log(e.target), {
        title: "步数可换钱，运动币可提现",
        path: "/pages/index/index",
        imageUrl: "/images/common/share-cover.png",
        success: function(e) {
            a.log("--- 转发回调成功 ---");
        }
    };
}), t));