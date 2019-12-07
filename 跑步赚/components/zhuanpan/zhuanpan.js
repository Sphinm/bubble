var a = getApp(), t = !0;

Component({
    properties: {
        isFree: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        pmdToggle: !0,
        pmdBg: "http://oss.litemob.net/running/icon/%E7%81%AF_1.png",
        jiaodu: 0,
        userInfo: null,
        rewardSwiper: null,
        rewardList: null,
        redPop: !1,
        curRedId: "",
        curRedInfo: null,
        choujiangPop: !1,
        runCoinBuzuPop: !1,
        runRewardPop: !1,
        runReward: 0
    },
    attached: function() {
        var o = this;
        t = !1, setInterval(function() {
            var a;
            a = o.data.pmdToggle ? "http://oss.litemob.net/running/icon/%E7%81%AF_2.png" : "http://oss.litemob.net/running/icon/%E7%81%AF_1.png", 
            o.setData({
                pmdToggle: !o.data.pmdToggle,
                pmdBg: a
            });
        }, 500), a.getInfo(function(a) {
            o.setData({
                userInfo: a
            });
        }), a.httpsGet({
            url: a.getData("/getprize?program_type=2"),
            success: function(a) {
                o.setData({
                    costJinbi: a.data.data.cost
                }), t = !0;
            }
        }), this.rewardAll(), this.rewardSwiper();
    },
    methods: {
        hidePop: function() {
            var o = this, e = 600;
            a.globalData.ok || (e = 0), setTimeout(function() {
                o.setData({
                    redPop: !1,
                    choujiangPop: !1,
                    runCoinBuzuPop: !1,
                    runRewardPop: !1
                }), t = !0;
            }, e);
        },
        showChoujiangRule: function() {
            this.setData({
                choujiangPop: !0
            });
        },
        goChoujiang: function(o) {
            var e = this, d = this.data.userInfo;
            a.httpsGet({
                url: a.getAnswer("/StageFifteenAward"),
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function(o) {
                    if (200 == o.data.code) {
                        var r = o.data.data, n = o.data.data.result, i = 0, s = 0;
                        if (0 == n.type) if (100 == n.amount) {
                            var u = 165 + Math.floor(30 * Math.random());
                            i = e.data.jiaodu + (360 - e.data.jiaodu % 360) + u + 1440;
                        } else 50 == n.amount ? (s = 75 + Math.floor(30 * Math.random()), i = e.data.jiaodu + (360 - e.data.jiaodu % 360) + s + 1440) : (s = 255 + Math.floor(30 * Math.random()), 
                        i = e.data.jiaodu + (360 - e.data.jiaodu % 360) + s + 1440); else 1 == n.type ? 1 == n.amount ? (s = 30 + Math.floor(30 * Math.random()), 
                        i = e.data.jiaodu + (360 - e.data.jiaodu % 360) + s + 1440) : 2 == n.amount ? (s = 210 + Math.floor(30 * Math.random()), 
                        i = e.data.jiaodu + (360 - e.data.jiaodu % 360) + s + 1440) : (s = 120 + Math.floor(30 * Math.random()), 
                        i = e.data.jiaodu + (360 - e.data.jiaodu % 360) + s + 1440) : 8888 == n.amount ? (s = -30 + Math.floor(30 * Math.random()), 
                        i = e.data.jiaodu + (360 - e.data.jiaodu % 360) + s + 1440) : (s = 300 + Math.floor(30 * Math.random()), 
                        i = e.data.jiaodu + (360 - e.data.jiaodu % 360) + s + 1440);
                        e.setData({
                            jiaodu: i
                        }), setTimeout(function() {
                            t = !0, e.rewardAll(), d.gold_coin = r.gold_coin, 1 == n.type ? e.setData({
                                redPop: !0,
                                curRedId: r.order_id,
                                curRedInfo: n
                            }) : (a.jinbiPlay(), e.setData({
                                runRewardPop: !0,
                                runReward: n.amount
                            })), e.setData({
                                userInfo: d
                            });
                        }, 3e3);
                    } else wx.showToast({
                        title: o.data.message
                    }), t = !0;
                }
            });
        },
        moneyChoujiang: function() {
            this.setData({
                runCoinBuzuPop: !1
            });
            var a = this.data.userInfo;
            a.property >= .04 ? (a.property = a.property - .04, this.setData({
                userInfo: a
            }), this.goChoujiang()) : wx.showToast({
                title: "余额不足，去赚运动币吧",
                icon: "none",
                duration: 3e3,
                success: function() {
                    t = !0;
                }
            });
        },
        start: function() {
            if (this.triggerEvent("chou"), t) if (t = !1, this.data.isFree) this.setData({
                isFree: !1
            }), this.goChoujiang(); else {
                var a = this.data.userInfo, o = this.data.costJinbi;
                a.gold_coin >= o ? (a.gold_coin = a.gold_coin - o, this.setData({
                    userInfo: a
                }), this.goChoujiang()) : this.setData({
                    runCoinBuzuPop: !0
                });
            }
        },
        rewardAll: function() {
            var t = this;
            a.httpsGet({
                url: a.getData("/getuserorder"),
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function(a) {
                    if (200 == a.data.code) {
                        var o = a.data.data ? a.data.data : null;
                        t.setData({
                            rewardList: o
                        });
                    }
                }
            });
        },
        rewardSwiper: function() {
            var t = this;
            a.httpsGet({
                url: a.getData("/broadcast"),
                success: function(a) {
                    if (200 == a.data.code) {
                        var o = a.data.data ? a.data.data : null;
                        t.setData({
                            rewardSwiper: o
                        });
                    }
                }
            });
        },
        rewardRedInfo: function(t) {
            var o = this, e = t.currentTarget.dataset.id;
            a.httpsGet({
                url: a.getData("/getorderinfo"),
                data: {
                    user_id: wx.getStorageSync("userId"),
                    order_id: e
                },
                success: function(a) {
                    if (200 == a.data.code) {
                        var t = a.data.data;
                        o.setData({
                            redPop: !0,
                            curRedInfo: t,
                            curRedId: t.id
                        });
                    }
                }
            });
        },
        getMoney: function() {
            var t = this;
            this.setData({
                redPop: !1
            }), a.httpsGet({
                url: a.getData("/getredprize"),
                data: {
                    user_id: wx.getStorageSync("userId"),
                    order_id: t.data.curRedId
                },
                success: function(a) {
                    200 == a.data.code ? (t.rewardAll(), t.setData({
                        redPop: !1
                    }), wx.showToast({
                        title: "您的中奖红包已计入到“我的余额”中",
                        duration: 3e3,
                        icon: "none"
                    })) : wx.showToast({
                        title: a.data.message,
                        icon: "none"
                    });
                }
            });
        }
    }
});