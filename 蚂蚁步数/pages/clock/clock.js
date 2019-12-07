var e = require("../../utils/util.js"), t = require("../../utils/globalDefine.js"), n = require("../../network/httpRequest.js");

Page({
    data: {
        userInfo: {},
        ruleModal: !0,
        clockDetails: {},
        countDown: {},
        stepNumOnly: 0,
        progressWidth: 0,
        successModal: !0,
        errorModal: !0,
        rewardModal: !0
    },
    intervalId: null,
    bindShowRuleModal: function() {
        this.setData({
            ruleModal: !1
        });
    },
    bindHideRuleModal: function() {
        this.setData({
            ruleModal: !0
        });
    },
    bindShowSuccessModal: function() {
        this.setData({
            successModal: !1
        });
    },
    bindHideSuccessModal: function() {
        this.setData({
            successModal: !0
        });
    },
    bindShowErrorModal: function() {
        this.setData({
            errorModal: !1
        });
    },
    bindHideErrorModal: function() {
        this.setData({
            errorModal: !0
        });
    },
    bindShowReward: function() {
        var e = this.data.clockDetails;
        e.preIssue.joinState && e.preIssue.clockState && !e.preIssue.isReceived && e.preIssue.rewardAmount > 0 && this.setData({
            rewardModal: !1
        });
    },
    bindHideReward: function() {
        this.setData({
            rewardModal: !0
        });
    },
    bindGetClockReward: function() {
        var e = this;
        n.getClockReward().then(function(n) {
            if (n.rewardNum) {
                var a = t.userInfo;
                a.rewardNum = n.rewardNum, t.setUserLoginInfo(a);
            }
            e.setData({
                rewardModal: !0
            });
        }).catch(function() {
            e.setData({
                rewardModal: !0
            });
        });
    },
    bindReqSignUpClock: function(e) {
        var a = this, s = {
            formId: ""
        };
        s.formId = e.detail.formId, n.reqSignUpClock(s).then(function(e) {
            if (e.registrationResult) a.bindShowErrorModal(); else {
                a.bindShowSuccessModal(), a.getClockDetails();
                var n = t.userInfo;
                n.rewardNum = e.userTotalReward, t.setUserLoginInfo(n);
            }
        });
    },
    getClockDetails: function() {
        var e = this;
        n.getClockDetails().then(function(t) {
            e.setData({
                clockDetails: t || {}
            }), e.startRemainTimer(t.nextIssue.expiredDate, t.nextIssue.currentDate), e.checkSession(), 
            e.bindShowReward();
        });
    },
    calcWidthFunc: function(e) {
        var t = this, n = t.data.clockDetails, a = 0;
        a = n.currentIssue ? e < n.currentIssue.targetSteps ? 640 * e / n.currentIssue.targetSteps : 640 : 0, 
        t.setData({
            progressWidth: a
        });
    },
    bindReqUserClock: function() {
        var e = this;
        n.reqUserClock().then(function(t) {
            e.getClockDetails();
        });
    },
    checkSession: function() {
        var e = this;
        wx.checkSession({
            success: function() {
                e.getUserStepData();
            },
            fail: function() {
                wx.login({
                    success: function(t) {
                        t.code ? e.getUserStepData(t.code) : uitl.log("登录失败！" + t.errMsg);
                    }
                });
            }
        });
    },
    getUserStepData: function(e) {
        var t = this;
        wx.canIUse("getWeRunData") ? wx.getWeRunData({
            success: function(a) {
                var s = {};
                s.code = e || "", s.encryptedData = a.encryptedData || "", s.iv = a.iv || "", s.scene = "todayClock", 
                n.getMySteps(s).then(function(e) {
                    var n = e.stepNumOnly || 0;
                    t.setData({
                        stepNumOnly: n
                    }), t.calcWidthFunc(n);
                }).catch(function(e) {});
            },
            fail: function(e) {
                wx.getSetting({
                    success: function(e) {
                        var t = e.authSetting["scope.werun"];
                        t || void 0 == t ? wx.showToast({
                            title: "您手机微信版本过低不支持步数功能",
                            icon: "none",
                            duration: 5e3
                        }) : wx.showToast({
                            title: "未授权微信运动，请点击获取步数授权重试",
                            icon: "none",
                            duration: 5e3
                        });
                    }
                });
            }
        }) : wx.showToast({
            title: "您手机微信版本过低不支持步数功能",
            icon: "none",
            duration: 5e3
        });
    },
    updateRemainTime: function() {
        var t = this, n = t.remainStamp;
        if (n < 0) return t.stopRemainTimer(), t.getClockDetails(), !1;
        var a = parseInt(n / 1e3 / 60 / 60, 10), s = parseInt(n / 1e3 / 60 % 60, 10), i = parseInt(n / 1e3 % 60, 10);
        this.remainStamp = n - 1e3, t.setData({
            countDown: {
                hours: e.formatNumber(a),
                minutes: e.formatNumber(s),
                seconds: e.formatNumber(i)
            }
        });
    },
    startRemainTimer: function(e, t) {
        var n = this, a = e - t;
        n.remainStamp = a, n.stopRemainTimer();
        var s = setInterval(function() {
            n.updateRemainTime();
        }, 1e3);
        n.intervalId = s;
    },
    stopRemainTimer: function() {
        var e = this.intervalId;
        clearInterval(e);
    },
    onWxLoginCallBack: function() {},
    onPullDownRefresh: function() {
        this.getClockDetails();
    },
    onLoad: function() {},
    onShow: function() {
        this.getShareImg(), this.getClockDetails();
        var e = t.userInfo;
        null != e.userId && void 0 != e.userId && this.setData({
            userInfo: e
        });
    },
    onHide: function() {
        this.stopRemainTimer();
    },
    onUnload: function() {
        this.stopRemainTimer();
    },
    getShareImg: function() {
        var e = this, t = {};
        t.imageType = 1, n.getShareImg(t).then(function(t) {
            var n = t.redImage || "";
            e.shareImgDesc = n.imgDesc, e.shareImgUrl = n.imgUrl;
        });
    },
    onShareAppMessage: function(n) {
        var a = this, s = t.getUserLoginInfo().userId || "";
        return "button" === n.from && e.log(n.target), {
            title: a.shareImgDesc || "步数可换钱，运动币可提现",
            path: "/pages/index/index?referrerId=" + s,
            imageUrl: a.shareImgUrl || "/images/common/share-cover.png",
            success: function(t) {
                e.log("--- 转发回调成功 ---");
            }
        };
    }
});