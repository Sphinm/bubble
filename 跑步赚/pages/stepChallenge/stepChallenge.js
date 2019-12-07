var t = getApp(), a = null;

Page({
    data: {
        numList: [ 0, 0, 0, 0, 0, 0 ],
        isshowReward: !1,
        allSecond: 0,
        challengeInfo: null,
        challengeRank: null,
        challUserInfo: null,
        joinPop: !1,
        endPop: !1
    },
    hidePop: function() {
        a.setData({
            joinPop: !1,
            endPop: !1
        });
    },
    showNoStart: function() {
        wx.showToast({
            title: "暂未开赛",
            icon: "none"
        });
    },
    timeString: function(t, a) {
        var e = "";
        return e = t > 0 ? t + a : "", e;
    },
    daojishi: function(t) {
        var a = Math.floor(t / 60 / 60 / 24), e = this.timeString(a, "天"), n = Math.floor(t / 60 / 60) % 24, i = this.timeString(n, "时");
        a && !n && (i = "0时");
        var o = Math.floor(t / 60) % 60, s = this.timeString(o, "分");
        !a && !n || o || (s = "0分");
        var l = t % 60, r = this.timeString(l, "秒");
        (a || n || o) && !l && (r = "0秒");
        var h = e + i + s + r;
        t <= 0 && (clearInterval(this.downTime), this.getChallengeStatus()), this.setData({
            remainTime: h
        });
    },
    setNumList: function(t) {
        var a = String(t);
        if (a.length < 6) for (var e = 6 - a.length, n = 0; n < e; n++) a = 0 + a;
        var i = a.split("");
        this.setData({
            numList: i
        });
    },
    getChallengeStatus: function() {
        t.httpsGet({
            url: t.getData("/challengeindex"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                if (200 == t.data.code) {
                    a.downTime && clearInterval(a.downTime);
                    var e = t.data.data;
                    a.setNumList(e.challenge_info.award);
                    var n = !1, i = !1, o = !1;
                    0 == e.status && 1 == e.res_data.is_tan_start && (n = !0), 1 == e.status && (0 != e.user_info.award && (o = !0), 
                    1 == e.res_data.is_tan_end && (i = !0)), a.setData({
                        allSecond: e.time,
                        challengeInfo: e.challenge_info,
                        challUserInfo: e.user_info,
                        joinPop: n,
                        endPop: i,
                        isshowReward: o
                    }), wx.nextTick(function() {
                        a.setData({
                            challengeRank: e.ranklist
                        });
                    }), a.daojishi(a.data.allSecond), a.downTime = setInterval(function() {
                        a.setData({
                            allSecond: a.data.allSecond - 1
                        }), a.daojishi(a.data.allSecond);
                    }, 1e3);
                } else wx.showToast({
                    title: "请稍后重试",
                    icon: "none"
                });
            }
        });
    },
    showReward: function() {
        this.setData({
            endPop: !0
        });
    },
    onShow: function() {
        a = this, t.shareInfo(9), this.getChallengeStatus();
    },
    onHide: function() {
        clearInterval(this.downTime);
    },
    onShareAppMessage: function(a) {
        var e = t.globalData.shareInfo;
        return e.path = "/pages/index/index?source=9&userId=" + wx.getStorageSync("userId"), 
        console.log(e), e;
    }
});