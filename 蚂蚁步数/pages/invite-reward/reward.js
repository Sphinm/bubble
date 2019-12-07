function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

var t, r = require("../../utils/util.js"), a = require("../../utils/globalDefine.js"), i = require("../../network/httpRequest.js");

Page((t = {
    data: {
        rewardList: [],
        currentTime: "",
        openRedModal: !0,
        rewardNumber: 0
    },
    timer: "",
    bindShowOpenRed: function() {
        this.setData({
            openRedModal: !1
        });
    },
    bindHideOpenRed: function() {
        this.setData({
            openRedModal: !0
        });
    },
    bindGoRule: function() {
        a.safetySwitchPage("../rule/rule");
    },
    bindGoHistory: function() {
        a.safetySwitchPage("../history-red/history");
    },
    getShareImg: function() {
        var e = this, t = {};
        t.imageType = 1, i.getShareImg(t).then(function(t) {
            var r = t.redImage || "";
            e.shareImgDesc = r.imgDesc, e.shareImgUrl = r.imgUrl;
        });
    },
    getRewardRedList: function() {
        var e = this;
        i.getRewardRedList().then(function(t) {
            var r = t.openRedEnvelopeList || [];
            e.setData({
                rewardList: r,
                currentTime: t.currentTime
            }), e.startRemainTimer();
        });
    },
    getInviteReward: function(e) {
        var t = this, r = {};
        r.typeId = e.target.dataset.type, r.rId = e.target.dataset.rid, i.getOpenInviteRed(r).then(function(e) {
            t.bindShowOpenRed(), t.getRewardRedList(), t.setData({
                rewardNumber: e.referrerReward || 0
            });
        });
    },
    formSubmit: function(e) {
        if (parseInt(e.detail.formId)) {
            r.log("submitId：" + e.detail.formId);
            var t = {};
            t.formId = e.detail.formId, i.saveSubmitId(t);
        }
    },
    updateRemainTime: function() {
        var e = this, t = e.remainStamp1, a = e.remainStamp2, i = e.remainStamp3;
        if (t < 0 || a < 0 || i < 0) return e.stopRemainTimer(), e.getRewardRedList(), !1;
        var n = parseInt(t / 1e3 / 60 / 60, 10), m = parseInt(t / 1e3 / 60 % 60, 10), s = parseInt(t / 1e3 % 60, 10), o = parseInt(a / 1e3 / 60 / 60, 10), d = parseInt(a / 1e3 / 60 % 60, 10), u = parseInt(a / 1e3 % 60, 10), p = parseInt(i / 1e3 / 60 / 60, 10), f = parseInt(i / 1e3 / 60 % 60, 10), g = parseInt(i / 1e3 % 60, 10);
        this.remainStamp1 = t - 1e3, this.remainStamp2 = a - 1e3, this.remainStamp3 = i - 1e3;
        var h = e.data.rewardList;
        h[0].remainStamp = r.formatNumber(n) + ":" + r.formatNumber(m) + ":" + r.formatNumber(s), 
        h[1].remainStamp = r.formatNumber(o) + ":" + r.formatNumber(d) + ":" + r.formatNumber(u), 
        h[2].remainStamp = r.formatNumber(p) + ":" + r.formatNumber(f) + ":" + r.formatNumber(g), 
        e.setData({
            rewardList: h
        });
    },
    startRemainTimer: function() {
        var e = this, t = e.data.rewardList, r = t[0].expireDate - this.data.currentTime, a = t[1].expireDate - this.data.currentTime, i = t[2].expireDate - this.data.currentTime;
        this.remainStamp1 = r, this.remainStamp2 = a, this.remainStamp3 = i, e.stopRemainTimer();
        var n = setInterval(function() {
            e.updateRemainTime();
        }, 1e3);
        e.timer = n;
    },
    stopRemainTimer: function() {
        var e = this.timer;
        clearInterval(e);
    },
    onWxLoginCallBack: function() {},
    onLoad: function() {},
    onShow: function() {
        this.getShareImg(), this.getRewardRedList();
    },
    onHide: function() {
        this.stopRemainTimer();
    },
    onUnload: function() {
        this.stopRemainTimer();
    },
    onPullDownRefresh: function() {
        this.getRewardRedList();
    }
}, e(t, "getShareImg", function() {
    var e = this, t = {};
    t.imageType = 1, i.getShareImg(t).then(function(t) {
        var r = t.redImage || "";
        e.shareImgDesc = r.imgDesc, e.shareImgUrl = r.imgUrl;
    });
}), e(t, "onShareAppMessage", function(e) {
    var t = this, i = a.getUserLoginInfo().userId || "";
    if ("button" === e.from) {
        r.log(e.target);
        var n = e.target.dataset.type, m = e.target.dataset.rid;
        t.setData({
            openRedModal: !0,
            failModal: !0
        });
    }
    return {
        title: t.shareImgDesc || "步数可换钱，运动币可提现",
        path: "/pages/index/index?referrerId=" + i + "&typeId=" + n + "&rId=" + m,
        imageUrl: t.shareImgUrl || "/images/common/share-cover.png",
        success: function(e) {
            r.log("--- 转发回调成功 ---");
        }
    };
}), t));