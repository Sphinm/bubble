var t = require("../../utils/util.js"), e = require("../../utils/globalDefine.js"), a = require("../../network/httpRequest.js");

Page({
    data: {
        userInfo: {},
        ruleModal: !0,
        matchInfo: {},
        rankingList: [],
        rewardArr: [ 0, 0, 0, 0, 0 ],
        totalPeople: 0,
        remainStampText: "",
        openRedModal: !0,
        rankingReward: 0,
        tencentADList: [],
        matchType: 2
    },
    intervalId: null,
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
    bindMatchTab: function(t) {
        var e = this, a = e.data.matchType, n = parseInt(t.currentTarget.dataset.type);
        n != a && (e.setData({
            matchType: n
        }), 1 === n ? e.switchMatchData(e.dailyRankingObject || {}) : e.switchMatchData(e.weeklyRankingObject || {}));
    },
    bindGetReward: function() {
        var t = this, e = t.data.matchInfo;
        a.getMatchReward().then(function(a) {
            e.myInfo.receivedFlag = 1, t.bindShowOpenRed(), t.setData({
                matchInfo: e,
                rankingReward: a.rankingReward
            });
        });
    },
    getMatchInfo: function() {
        var t = this;
        a.getMatchInfo().then(function(e) {
            var a = t.data.matchType, n = e.dailyRankingObject || {}, i = e.weeklyRankingObject || {};
            1 === a ? t.switchMatchData(n) : t.switchMatchData(i), t.dailyRankingObject = n, 
            t.weeklyRankingObject = i;
        });
    },
    switchMatchData: function(t) {
        for (var e = this, a = t.rankingList || [], n = 0; n < a.length; n++) a[n].userName = unescape(a[n].userName || "匿名用户"), 
        a[n].userHeadImg = a[n].userHeadImg || "/images/common/default.png", a[n].totalStep > 1e4 && a[n].totalStep < 1e8 ? a[n].totalStep = parseFloat((a[n].totalStep / 1e4).toFixed(2)) + "万" : a[n].totalStep > 1e8 && (a[n].totalStep = parseFloat((a[n].totalStep / 1e8).toFixed(2)) + "亿");
        t.myInfo && (t.myInfo.userName = unescape(t.myInfo.userName || "匿名用户"), t.myInfo.userHeadImg = t.myInfo.userHeadImg || "/images/common/default.png", 
        t.myInfo.totalStep > 1e4 && t.myInfo.totalStep < 1e8 ? t.myInfo.totalStep = parseFloat((t.myInfo.totalStep / 1e4).toFixed(2)) + "万" : t.myInfo.totalStep > 1e8 && (t.myInfo.totalStep = parseFloat((t.myInfo.totalStep / 1e8).toFixed(2)) + "亿"));
        var i = (t.totalReward + "" || 0).split(""), r = 5 - i.length;
        if (r > 0) for (var o = 0; o < r; o++) i.unshift("0");
        e.setData({
            matchInfo: t,
            rankingList: a,
            rewardArr: i,
            totalPeople: t.totalPeople
        }), e.startRemainTimer(t.endDate, t.currentDate);
    },
    getShareImg: function() {
        var t = this, e = {};
        e.imageType = 1, a.getShareImg(e).then(function(e) {
            var a = e.redImage || "";
            t.shareImgDesc = a.imgDesc, t.shareImgUrl = a.imgUrl;
        });
    },
    updateRemainTime: function() {
        var e = this, a = e.remainStamp;
        if (a < 0) {
            e.stopRemainTimer();
            var n = e.data.matchInfo;
            return n.rankingState = 2, e.setData({
                matchInfo: n,
                remainStampText: "活动已结束，正在结算中~"
            }), !1;
        }
        var i = parseInt(a / 1e3 / 60 / 60 / 24, 10), r = parseInt(a / 1e3 / 60 / 60 % 24, 10), o = parseInt(a / 1e3 / 60 % 60, 10), s = parseInt(a / 1e3 % 60, 10);
        this.remainStamp = a - 1e3;
        var c = "活动结束倒计时：" + t.formatNumber(i) + "天" + t.formatNumber(r) + "时" + t.formatNumber(o) + "分" + t.formatNumber(s) + "秒";
        e.setData({
            remainStampText: c
        });
    },
    startRemainTimer: function(t, e) {
        var a = this, n = t - e;
        a.remainStamp = n, a.stopRemainTimer();
        var i = setInterval(function() {
            a.updateRemainTime();
        }, 1e3);
        a.intervalId = i;
    },
    updateTotalData: function() {
        var t = this;
        a.updateTotalData().then(function(e) {
            var a = (e.totalReward + "" || 0).split(""), n = 5 - a.length;
            if (n > 0) for (var i = 0; i < n; i++) a.unshift("0");
            t.setData({
                rewardArr: a,
                totalPeople: e.totalPeople
            });
        });
    },
    stopRemainTimer: function() {
        var t = this.intervalId;
        clearInterval(t);
    },
    getWeChatAdList: function() {
        this.setData({
            tencentADList: e.getAdList()
        });
    },
    bindScrollPage: function() {
        var t = this, e = t.data.matchType;
        if (t.data.rankingList.length > 99) return wx.showToast({
            title: "排行榜只显示前一百名",
            icon: "none",
            duration: 2e3
        }), !1;
        var n = 1, i = t.dailyRankingObject, r = t.weeklyRankingObject;
        if (1 === e) {
            var o = i.curPage;
            n = o + 1;
        } else {
            var s = r.curPage;
            n = s + 1;
        }
        var c = {};
        c.pageType = e, c.curPage = n, a.getPageOfRank(c).then(function(a) {
            var o = a.paginationList || [];
            if (1 === e) {
                var s = i.rankingList.concat(o);
                t.dailyRankingObject.curPage = n, t.dailyRankingObject.rankingList = s, t.switchMatchData(t.dailyRankingObject);
            } else {
                var c = r.rankingList.concat(o);
                t.weeklyRankingObject.curPage = n, t.weeklyRankingObject.rankingList = c, t.switchMatchData(t.weeklyRankingObject);
            }
        });
    },
    onWxLoginCallBack: function() {},
    bindRefresh: function() {
        this.getMatchInfo();
    },
    onPullDownRefresh: function() {
        this.getMatchInfo();
    },
    onLoad: function() {
        this.getWeChatAdList();
    },
    onShow: function() {
        this.getMatchInfo(), this.getShareImg();
        var t = e.userInfo;
        null != t.userId && void 0 != t.userId && this.setData({
            userInfo: t
        });
    },
    onHide: function() {
        this.stopRemainTimer();
    },
    onUnload: function() {
        this.stopRemainTimer();
    },
    onShareAppMessage: function(a) {
        var n = this, i = e.getUserLoginInfo().userId || "";
        return "button" === a.from && (t.log(a.target), n.setData({
            openRedModal: !0,
            ruleModal: !0
        })), {
            title: n.shareImgDesc || "步数可换钱，运动币可提现",
            path: "/pages/index/index?referrerId=" + i,
            imageUrl: n.shareImgUrl || "/images/common/share-cover.png",
            success: function(e) {
                t.log("--- 转发回调成功 ---");
            }
        };
    }
});