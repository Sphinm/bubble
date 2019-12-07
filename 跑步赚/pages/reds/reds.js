var t = getApp(), e = null, a = 0, n = require("../../7F36CF766DA41FDF1950A771F63D15A6.js"), o = null, d = !0, s = null;

Page({
    data: {
        everyWeekRed: null,
        everyWeekFriends: null,
        redList: null,
        topAd: null,
        gdtPop: !1,
        rulesPop: !1
    },
    hideTry: function() {
        var e = this, a = 600;
        t.globalData.ok || (a = 0), setTimeout(function() {
            e.setData({
                continueTry: !1
            });
        }, a);
    },
    showRulesPop: function() {
        this.setData({
            rulesPop: !0
        });
    },
    loadVideo: function() {
        (o = wx.createRewardedVideoAd({
            adUnitId: "adunit-e0bbda336d0e1388"
        })).load().then(function() {
            e.setData({
                videoStatus: !0
            });
        }).catch(function(t) {
            e.setData({
                videoStatus: !1
            });
        }), o.onError(function(t) {
            console.log(t);
        });
    },
    showVideoAd: function() {
        if (this.data.videoStatus) {
            if (!d) return;
            d = !1, o.show().catch(function() {
                o.load().then(function() {
                    return o.show();
                }).catch(function(t) {});
            }), o.onClose(function(a) {
                d = !0, o.offClose(), a.isEnded && (t.ready_click(7), e.gtdAdLive());
            });
        } else wx.showToast({
            title: "今日次数用完，明天再来看",
            icon: "none"
        });
    },
    hidePop: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                gdtPop: !1,
                rulesPop: !1
            });
        }, 600);
    },
    gtdAdLive: function() {
        this.setData({
            gdtAd: !1
        }), t.httpsGet({
            url: t.getRed("/frontEndJudge"),
            data: {
                user_id: wx.getStorageSync("userId"),
                r_p_id: e.data.curRedId
            },
            success: function() {
                wx.showToast({
                    title: "去领取运动币吧",
                    icon: "none",
                    duration: 3e3
                }), e.redList();
            }
        });
    },
    onHide: function() {
        this.data.gdtAd && this.data.gdtPop && (this.gdtInterval = setInterval(function() {
            a++;
        }, 1e3));
    },
    onLoad: function() {
        wx.createInterstitialAd && ((s = wx.createInterstitialAd({
            adUnitId: "adunit-b1e035862b749b3a"
        })).onLoad(function() {}), s.onError(function(t) {}), s.onClose(function() {}));
    },
    onShow: function() {
        if (e = this, t.shareInfo(1), this.setData({
            userId: wx.getStorageSync("userId")
        }), this.redList(), this.everyWeekRed(), this.everyWeekFriends(), this.requestAd(), 
        this.loadVideo(), a && (clearInterval(this.gdtInterval), a >= 5 ? this.gtdAdLive() : wx.showToast({
            title: "试玩不足5秒"
        }), a = 0), 0 != t.globalData.tryStart) {
            var n = t.globalData.tryAd;
            34 == n.type && t.tryStatus({
                self: this,
                sucCb: function() {
                    wx.showToast({
                        title: n.vir_money + "运动币已自动加入余额中",
                        icon: "none",
                        duration: 3e3
                    }), e.everyWeekRed(), e.everyWeekFriends();
                }
            });
        }
        s && s.show().catch(function(t) {
            console.error(t);
        });
    },
    gdtLoad: function() {
        this.setData({
            gdtAd: !0
        });
    },
    showGdtPop: function() {
        this.setData({
            gdtPop: !0
        });
    },
    everyWeekRed: function() {
        t.httpsGet({
            url: t.getRed("/eveyweek"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && e.setData({
                    everyWeekRed: t.data.data
                });
            }
        });
    },
    requestAd: function() {
        n([ 34 ], function(t) {
            if (t) {
                var a = t.type_34;
                e.setData({
                    topAd: a
                });
            } else e.setData({
                topAd: null
            });
        });
    },
    goTry: function(e) {
        var a = e.currentTarget.dataset.index, n = this.data.topAd;
        t.tryPlay(n, a);
    },
    everyWeekFriends: function() {
        t.httpsGet({
            url: t.getRed("/eveyweekfriend"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var a = t.data.data;
                    0 == a.length && (a = null), e.setData({
                        everyWeekFriends: a
                    });
                }
            }
        });
    },
    redList: function() {
        t.httpsGet({
            url: t.getRed("/list"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var a = t.data.data, n = "";
                    if (0 == a.length) a = null; else for (var o in a) if (1 == a[o].status) {
                        n = a[o].id;
                        break;
                    }
                    console.log(1), e.setData({
                        redList: a,
                        curRedId: n
                    });
                }
            }
        });
    },
    getRed: function(a) {
        var n = a.currentTarget.dataset.id;
        t.httpsGet({
            url: t.getRed("/GetRedPacket"),
            data: {
                user_id: wx.getStorageSync("userId"),
                r_p_id: n
            },
            success: function(t) {
                200 == t.data.code ? (wx.showToast({
                    title: "领取成功"
                }), e.everyWeekRed(), e.everyWeekFriends(), e.redList()) : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            }
        });
    },
    onShareAppMessage: function() {
        var e = t.globalData.shareInfo;
        return e.path = "pages/index/index?source=6&userId=" + wx.getStorageSync("userId"), 
        e;
    }
});