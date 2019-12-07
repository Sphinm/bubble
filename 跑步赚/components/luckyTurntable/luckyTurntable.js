var t = getApp(), a = !0, e = !0, o = null;

Component({
    properties: {},
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
        var e = this;
        e.getlimitout(), a = !1, setInterval(function() {
            var t;
            t = e.data.pmdToggle ? "http://oss.litemob.net/running/icon/%E7%81%AF_2.png" : "http://oss.litemob.net/running/icon/%E7%81%AF_1.png", 
            e.setData({
                pmdToggle: !e.data.pmdToggle,
                pmdBg: t
            });
        }, 500), t.getInfo(function(t) {
            e.setData({
                userInfo: t
            });
        }), t.httpsGet({
            url: t.getData("/getprize?program_type=2"),
            success: function(t) {
                e.setData({
                    costJinbi: t.data.data.cost
                }), a = !0;
            }
        }), this.rewardAll(), this.rewardSwiper(), this.loadVideo();
    },
    methods: {
        getlimitout: function() {
            t.httpsGet({
                url: t.getData("/getlimitout"),
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function(t) {
                    200 == t.data.code ? self.setData({
                        showGuanzhu: !0
                    }) : self.setData({
                        showGuanzhu: !1
                    });
                }
            });
        },
        loadVideo: function() {
            var t = this;
            (o = wx.createRewardedVideoAd({
                adUnitId: "adunit-2c197d142442f06d"
            })).load().then(function() {
                t.setData({
                    videoStatus: !0
                });
            }).catch(function(a) {
                t.setData({
                    videoStatus: !1
                });
            }), o.onError(function(t) {
                console.log(t);
            });
        },
        showVideoAd: function(a) {
            var n = this, d = a.currentTarget.dataset.index;
            console.log(d), this.data.videoStatus ? (o.show(), o.onClose(function(a) {
                o.offClose(), e && (e = !1, a.isEnded ? (e = !0, t.ready_click(10), 1 == d ? n.bye() : 2 == d && n.look_add()) : e = !0);
            })) : wx.showToast({
                title: "今日次数用完，明天再来看",
                icon: "none"
            });
        },
        bye: function() {
            var e = this;
            wx.request({
                url: t.getData("/xiexiehuigu"),
                method: "GET",
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function(o) {
                    wx.showToast({
                        title: "金币已加到余额",
                        icon: "none",
                        duration: 2e3
                    }), t.getInfo(function(t) {
                        e.setData({
                            userInfo: t
                        });
                    }), t.httpsGet({
                        url: t.getData("/getprize?program_type=2"),
                        success: function(t) {
                            e.setData({
                                costJinbi: t.data.data.cost
                            }), a = !0;
                        }
                    }), this.rewardAll(), this.rewardSwiper();
                }
            });
        },
        look_add: function() {
            var e = this;
            wx.request({
                url: t.getData("/xingyunlibao"),
                method: "GET",
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function(o) {
                    wx.showToast({
                        title: "翻倍成功",
                        icon: "none",
                        duration: 2e3
                    }), t.getInfo(function(t) {
                        e.setData({
                            userInfo: t
                        });
                    }), t.httpsGet({
                        url: t.getData("/getprize?program_type=2"),
                        success: function(t) {
                            e.setData({
                                costJinbi: t.data.data.cost
                            }), a = !0;
                        }
                    }), this.rewardAll(), this.rewardSwiper();
                }
            });
        },
        hidePop: function() {
            var e = this, o = 600;
            t.globalData.ok || (o = 0), setTimeout(function() {
                e.setData({
                    redPop: !1,
                    choujiangPop: !1,
                    runCoinBuzuPop: !1,
                    runRewardPop: !1,
                    no_get: !1
                }), a = !0;
            }, o);
        },
        showChoujiangRule: function() {
            this.setData({
                choujiangPop: !0
            });
        },
        goChoujiang: function(e) {
            var o = this, n = this.data.userInfo;
            t.httpsGet({
                url: t.getData("/dogetprize"),
                data: {
                    user_id: wx.getStorageSync("userId"),
                    program_type: 2
                },
                success: function(e) {
                    if (200 == e.data.code) {
                        var d = e.data.data, r = e.data.data.result, i = 0, s = 0;
                        if (0 == r.type) 100 == r.amount ? (s = 30 + Math.floor(30 * Math.random()), i = o.data.jiaodu + (360 - o.data.jiaodu % 360) + s + 1440) : 40 == r.amount ? (s = 120 + Math.floor(30 * Math.random()), 
                        i = o.data.jiaodu + (360 - o.data.jiaodu % 360) + s + 1440) : 30 == r.amount ? (s = 210 + Math.floor(30 * Math.random()), 
                        i = o.data.jiaodu + (360 - o.data.jiaodu % 360) + s + 1440) : 50 == r.amount ? (s = 255 + Math.floor(30 * Math.random()), 
                        i = o.data.jiaodu + (360 - o.data.jiaodu % 360) + s + 1440) : (s = 300 + Math.floor(30 * Math.random()), 
                        i = o.data.jiaodu + (360 - o.data.jiaodu % 360) + s + 1440); else if (1 == r.type) {
                            if (1 == r.amount) {
                                var u = 165 + Math.floor(30 * Math.random());
                                i = o.data.jiaodu + (360 - o.data.jiaodu % 360) + u + 1440;
                            }
                        } else 4 == r.type ? (s = 75 + Math.floor(30 * Math.random()), i = o.data.jiaodu + (360 - o.data.jiaodu % 360) + s + 1440) : 8888 == r.amount ? (s = -30 + Math.floor(30 * Math.random()), 
                        i = o.data.jiaodu + (360 - o.data.jiaodu % 360) + s + 1440) : (s = 300 + Math.floor(30 * Math.random()), 
                        i = o.data.jiaodu + (360 - o.data.jiaodu % 360) + s + 1440);
                        o.setData({
                            jiaodu: i
                        }), setTimeout(function() {
                            a = !0, o.rewardAll(), n.gold_coin = d.gold_coin, 1 == r.type ? o.setData({
                                redPop: !0,
                                curRedId: d.order_id,
                                curRedInfo: r
                            }) : 4 == r.type ? (o.setData({
                                no_get: !0
                            }), t.getInfo(function(t) {
                                o.setData({
                                    userInfo: t
                                });
                            }), t.httpsGet({
                                url: t.getData("/getprize?program_type=2"),
                                success: function(t) {
                                    o.setData({
                                        costJinbi: t.data.data.cost
                                    }), a = !0;
                                }
                            }), o.rewardAll(), o.rewardSwiper()) : (t.jinbiPlay(), o.setData({
                                runRewardPop: !0,
                                runReward: r.amount
                            })), o.setData({
                                userInfo: n
                            });
                        }, 3e3);
                    } else wx.showToast({
                        title: e.data.message
                    }), a = !0;
                }
            });
        },
        moneyChoujiang: function() {
            this.setData({
                runCoinBuzuPop: !1
            });
            var t = this.data.userInfo;
            t.property >= .04 ? (t.property = t.property - .04, this.setData({
                userInfo: t
            }), this.goChoujiang()) : wx.showToast({
                title: "余额不足，去赚话费币吧",
                icon: "none",
                duration: 3e3,
                success: function() {
                    a = !0;
                }
            });
        },
        start: function() {
            if (a) {
                a = !1;
                var t = this.data.userInfo, e = this.data.costJinbi;
                t.gold_coin >= e ? (t.gold_coin = t.gold_coin - e, this.setData({
                    userInfo: t
                }), this.goChoujiang()) : this.setData({
                    runCoinBuzuPop: !0
                });
            }
        },
        rewardAll: function() {
            var a = this;
            t.httpsGet({
                url: t.getData("/getuserorder"),
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function(t) {
                    if (200 == t.data.code) {
                        var e = t.data.data ? t.data.data : null;
                        a.setData({
                            rewardList: e
                        });
                    }
                }
            });
        },
        rewardSwiper: function() {
            var a = this;
            t.httpsGet({
                url: t.getData("/broadcast"),
                success: function(t) {
                    if (200 == t.data.code) {
                        var e = t.data.data ? t.data.data : null;
                        a.setData({
                            rewardSwiper: e
                        });
                    }
                }
            });
        },
        rewardRedInfo: function(a) {
            var e = this, o = a.currentTarget.dataset.id;
            t.httpsGet({
                url: t.getData("/getorderinfo"),
                data: {
                    user_id: wx.getStorageSync("userId"),
                    order_id: o
                },
                success: function(t) {
                    if (200 == t.data.code) {
                        var a = t.data.data;
                        e.setData({
                            redPop: !0,
                            curRedInfo: a,
                            curRedId: a.id
                        });
                    }
                }
            });
        },
        getMoney: function() {
            var a = this;
            this.setData({
                redPop: !1
            }), t.httpsGet({
                url: t.getData("/getredprize"),
                data: {
                    user_id: wx.getStorageSync("userId"),
                    order_id: a.data.curRedId
                },
                success: function(t) {
                    200 == t.data.code ? (a.rewardAll(), a.setData({
                        redPop: !1
                    }), wx.showToast({
                        title: "您的中奖红包已计入到“我的余额”中",
                        duration: 3e3,
                        icon: "none"
                    })) : wx.showToast({
                        title: t.data.message,
                        icon: "none"
                    });
                }
            });
        }
    }
});