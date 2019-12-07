var t = getApp(), e = require("../../4EB7EE366DA41FDF28D18631D72D15A6.js"), a = require("../../F83475E66DA41FDF9E521DE16C0D15A6.js"), s = require("../../7F36CF766DA41FDF1950A771F63D15A6.js"), n = require("../../699D33376DA41FDF0FFB5B30171D15A6.js"), o = !0, i = null;

Page({
    data: {
        swiperContent: [ "三生三世邀请了31人，累计赚了118.65元", "小鱼邀请了98人，累计赚了187.9元", "清竹邀请了489人，累计赚了815元", "星空最美兑换了运动智能手环2个", "余军刚刚成功提现了100元", "小美正在浏览商品", "追梦人正在试玩任务赚钱", "次啊奥通过幸运转盘抽到平衡车一台" ],
        swiperContent1: [ "三生三世昨天提现1元", "小鱼昨天提现1元", "清竹昨天提现1元", "星空昨天提现1元", "余军昨天提现1元", "小美昨天提现1元", "追梦昨天提现1元", "次啊奥昨天提现1元" ],
        kf_float: !1,
        is_ball: !1,
        kf_win: !1,
        tan: !1,
        tan_win: !1,
        showGuanzhu: !1,
        pointTishi: !1,
        actBuoy: null,
        showCol: !1,
        tongzhiYearData: 0,
        shareJinbi: 0,
        shareOrder: null,
        hasOrderIng: !1,
        shareGoldInfo: null,
        isUserId: !1,
        firstTixian: !1,
        userInfo: null,
        stepDisplay: 0,
        goldRewards: null,
        redStatus: 0,
        redMoney: 0,
        animationData: {},
        actionData: {},
        luckPop: !1,
        redPop: !1,
        goodsList: [],
        goldIcon: 0,
        continueTry: !1,
        actPop: null,
        showRunAuthorize: !1,
        collect: null,
        guanzhu: null,
        sharePop: !1,
        shareSucPop: !1,
        hiddenFestival: !0,
        showAddBtn: !0,
        userId: "",
        goodInfo: null,
        stepPop: !1,
        stepGold: 0,
        gdtVideoPop: !1,
        gdtStatus: !1,
        adinfo: {
            all: !0
        },
        ok: !1,
        add_desk: !1,
        add_win: !1
    },
    onLoad: function(e) {
        var a = this;
        self = this, self.get_onenine(), self.checkStatus(), "android" == t.globalData.system && ("1023" == t.globalData.scene ? this.az_desk(!0) : this.az_desk(!1), 
        self.setData({
            card_show: !0
        }));
        var s = {};
        if (e.scene) {
            var n = decodeURIComponent(e.scene).split("&");
            for (var o in n) {
                var i = n[o].split("=");
                s[i[0]] = i[1];
            }
        } else if (e.q) {
            var d = decodeURIComponent(e.q).split("?")[1].split("&");
            for (var r in d) {
                var u = d[r].split("=");
                s[u[0]] = u[1];
            }
        } else s = e;
        wx.setStorageSync("shareUser", s), "1089" == t.globalData.scene ? this.setData({
            showCol: !1
        }) : this.setData({
            showCol: !0
        }), setTimeout(function() {
            a.data.showCol && a.setData({
                showCol: !1
            });
        }, 8e3), wx.getStorageSync("userId") ? (this.onLoadFuc(), self.show_newwin()) : t.indexOnload = function() {
            self.onLoadFuc(), self.show_newwin();
        }, t.getGoodList(0, function(t) {
            self.setData({
                goodsList: t
            });
        });
    },
    checkStatus: function() {
        var t = this;
        wx.request({
            url: "https://online-run.litemob.com/daka/main/getversionswitch",
            method: "GET",
            data: {
                type: 16
            },
            success: function(e) {
                200 == e.data.code && (e.data.data.switch ? t.setData({
                    new_ok: !0
                }) : t.setData({
                    new_ok: !1
                }));
            }
        });
    },
    add_desk: function() {
        this.setData({
            add_desk: !0
        });
    },
    close_addwin: function() {
        this.setData({
            add_desk: !1
        });
    },
    onLoadFuc: function() {
        this.getActBuoy(), this.setData({
            isUserId: !0,
            userId: wx.getStorageSync("userId"),
            goodInfo: null
        });
        var a = 0;
        wx.getStorageSync("isLogin") ? (self.setData({
            isAuthorize: !0
        }), 6 == wx.getStorageSync("shareUser").source && (a = 1), t.httpsGet({
            url: t.getData("/userlogin"),
            data: {
                user_id: wx.getStorageSync("userId"),
                pid: wx.getStorageSync("shareUser").userId,
                type: a
            },
            success: function(t) {
                200 == t.data.code && (0 != t.data.data.old && wx.showModal({
                    title: "温馨提示",
                    content: "由于您一个月未登录跑步赚，您的运动币和余额已被清空",
                    showCancel: !1,
                    confirmText: "我知道了"
                }));
            }
        }), e([ 14 ], function(t) {
            var e = t.type_14 ? t.type_14 : null;
            self.setData({
                actPop: e
            });
        })) : self.setData({
            isAuthorize: !1
        });
    },
    onShow: function() {
        self = this, self.get_ad(), self.checkStatus(), this.bannerData(), this.indexAction(), 
        this.show_new(), wx.getStorageSync("userId") ? this.onShowFuc() : t.indexOnshow = function() {
            self.onShowFuc();
        };
    },
    onShowFuc: function() {
        if (this.setData({
            ok: t.globalData.ok
        }), this.contact_statu(), this.getlimitout(), t.adFlag(this, 100, function() {
            self.showLuoji();
        }), this.liulanStatus(), t.shareInfo(1), this.loadVideo(), this.gdtCoin(), this.videoCoin(), 
        this.getShareOrder(), this.getOrderIng(), this.getRunData(), this.getInfo(), 0 == t.globalData.tryStart) this.requestTwo(), 
        this.requestAd(), self.selectComponent("#adList").requestAd(); else {
            var e = t.globalData.tryAd;
            33 == e.type ? t.tryStatus({
                self: this,
                sucCb: function() {
                    33 == e.type && (wx.showToast({
                        title: "前往首页领取",
                        icon: "none",
                        duration: 3e3
                    }), self.selectComponent("#adList").requestAd());
                }
            }) : t.tryStatus({
                self: this,
                sucCb: function() {
                    self.adLiveGdtCoin();
                }
            });
        }
    },
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
    teachNextStep: function(t) {
        var e = Number(t.currentTarget.dataset.step);
        3 === e ? (e = 0, this.isShowLingqu(), this.openFreeRed()) : e += 1, this.setData({
            teachStep: e
        });
    },
    liulanStatus: function() {
        t.httpsGet({
            url: t.getData("/get_shop_ball"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && self.setData({
                    qddStatus: t.data.data
                });
            }
        });
    },
    getLiulan: function() {
        t.httpsGet({
            url: t.getData("/get_look_gold"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && self.numDonghua(self.data.qddStatus.is_look_status, function() {
                    self.liulanStatus(), self.rewardYes();
                });
            }
        });
    },
    getXiadan: function() {
        t.httpsGet({
            url: t.getData("/down_shop_gold"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && self.numDonghua(self.data.qddStatus.is_down_status, function() {
                    self.liulanStatus(), self.rewardYes();
                });
            }
        });
    },
    indexAction: function() {
        var t = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease-out"
        });
        this.ation = e, this.animation = t;
        var a = !0;
        this.coinAniInterval = setInterval(function() {
            a ? (this.animation.translateY("8px").step(), this.ation.translateY("-8px").step(), 
            a = !a) : (this.animation.translateY("0px").step(), this.ation.translateY("0px").step(), 
            a = !a), this.setData({
                animationData: t.export(),
                actionData: e.export()
            });
        }.bind(this), 1e3);
    },
    onHide: function() {
        this.setData({
            tan_win: !1
        }), this.coinAniInterval && clearInterval(this.coinAniInterval), this.orderInterval && clearInterval(this.orderInterval), 
        this.data.gdtStatus && this.adLiveGdtCoin();
    },
    onShareAppMessage: function(e) {
        var a = e.target ? e.target.dataset.source : 1, s = t.globalData.shareInfo;
        return s.path = "/pages/index/index?source=" + a + "&userId=" + wx.getStorageSync("userId"), 
        s;
    },
    onPullDownRefresh: function() {
        wx.showNavigationBarLoading(), this.getRunData(), this.requestAd(), this.selectComponent("#adList").requestAd();
    },
    getapp: function() {
        t.httpsGet({
            url: t.getData("/getapp"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && self.setData({
                    appAd: t.data.data
                });
            }
        });
    },
    showLuoji: function() {
        t.show_luoji(this, "adunit-f527d40e02df45e6");
    },
    gdtLoad: function() {
        this.setData({
            gdtStatus: !0
        });
    },
    bannerErr: function() {
        t.bannerErr(this, "adunit-f527d40e02df45e6");
    },
    watchVideo: function(e) {
        var a = this, s = e.target.dataset.id;
        t.watchVideo(s, function() {
            self.data.is_video ? a.adLiveVideoCoin() : a.adLiveGdtCoin();
        });
    },
    bannerData: function() {
        t.httpsGet({
            url: t.getData("/bannerData"),
            success: function(t) {
                var e = String(t.data.data.award), a = e.slice(0, e.length - 3) + "," + e.slice(-3);
                self.setData({
                    bannerMoney: a
                });
            }
        });
    },
    showLuck: function() {
        self.setData({
            tryAd: null,
            luckPop: !0
        });
    },
    loadVideo: function() {
        (i = wx.createRewardedVideoAd({
            adUnitId: "adunit-2c197d142442f06d"
        })).load().then(function() {
            self.setData({
                videoStatus: !0
            });
        }).catch(function(t) {
            self.setData({
                videoStatus: !1
            });
        }), i.onError(function(t) {
            console.log(t);
        });
    },
    showVideoAdBuoy: function() {
        this.data.videoStatus ? (i.show(), i.onClose(function(e) {
            i.offClose(), o && (o = !1, e.isEnded ? (t.ready_click(5), self.adLiveVideoCoin(), 
            o = !0) : o = !0);
        })) : wx.showToast({
            title: "今日次数用完，明天再来看",
            icon: "none"
        });
    },
    goReds: function() {
        wx.navigateTo({
            url: "/pages/reds/reds"
        });
    },
    lingquDati: function() {
        self.numDonghua(this.data.goldRewards.answer_money, function() {
            t.httpsGet({
                url: t.getAnswer("/getGold"),
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function(t) {
                    200 == t.data.code && self.rewardYes();
                }
            });
        });
    },
    showVideoPop: function() {
        this.setData({
            gdtVideoPop: !0
        });
    },
    rewardYes: function() {
        t.jinbiPlay(), o = !0, this.getRewards();
    },
    getdoubleaward: function(e) {
        var a = e.target.dataset.money;
        this.numDonghua(a, function() {
            t.httpsGet({
                url: t.getData("/getdoubleaward"),
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function(t) {
                    200 == t.data.code && (wx.showToast({
                        title: "签到翻倍领取成功",
                        icon: "none"
                    }), self.getRewards());
                }
            });
        });
    },
    actBuoyTap: function(e) {
        var s = e.currentTarget.dataset.tap, n = this.data.actBuoy;
        if (0 == n[s].existence) "金币奖励" == n[s].activity_name ? (this.setData({
            videoIndex: s
        }), self.showVideoPop()) : "视频福利" == n[s].activity_name ? self.showVideoAd1(s) : "现金红包" == n[s].activity_name ? a(n, s, function() {
            wx.navigateTo({
                url: n[s].act_url
            }), self.buoyGo(s);
        }) : a(n, s, function() {
            self.buoyGo(s);
        }); else {
            if (1 != n[s].existence) return;
            t.jinbiPlay(), self.numDonghua(n[s].award, function() {
                t.httpsGet({
                    url: t.getAdvert("/activity/getActAward"),
                    data: {
                        user_id: wx.getStorageSync("userId"),
                        openid: wx.getStorageSync("openId"),
                        act_id: n[s].id
                    },
                    success: function(t) {
                        200 == t.data.code ? (self.rewardYes(), self.getActBuoy()) : o = !0;
                    }
                });
            });
        }
    },
    getGoodInfo: function(e, a) {
        var s = "", n = null;
        1 == e ? (s = "/goods/info", n = {
            project: 0,
            openid: wx.getStorageSync("openId"),
            good_id: a
        }) : 2 == e ? (s = "/goods/getShopInfo", n = {
            good_id: a,
            openid: wx.getStorageSync("openId"),
            project: 0,
            user_id: wx.getStorageSync("userId"),
            type: 2
        }) : (s = "/goods/info", n = {
            good_id: a,
            openid: wx.getStorageSync("openId"),
            project: 0,
            user_id: wx.getStorageSync("userId")
        }), t.httpsGet({
            url: t.getShop(s),
            data: n,
            success: function(t) {
                var e = t.data.data;
                self.setData({
                    goodInfo: e
                }), self.getActBuoy();
            }
        });
    },
    buoyGo: function(t) {
        var e = this.data.actBuoy;
        if (0 != e[t].good_type) self.getGoodInfo(e[t].good_type, e[t].good_id); else if ("邀请奖励" == e[t].activity_name) self.showSharePop(); else if ("商城" == e[t].activity_name) {
            var a = e[t].act_url ? e[t].act_url : 3;
            wx.setStorageSync("goodTab", a), wx.switchTab({
                url: "/pages/shop/shop"
            });
        } else "挑战赛" == e[t].activity_name ? wx.switchTab({
            url: "/pages/stepChallenge/stepChallenge"
        }) : wx.navigateTo({
            url: e[t].act_url
        });
        this.getActBuoy();
    },
    showVideoAd: function(t) {
        var e = this.data.actBuoy, s = t.currentTarget.dataset.index;
        this.data.videoStatus ? (i.show(), i.onClose(function(t) {
            i.offClose(), o && (o = !1, t.isEnded ? (o = !0, a(e, s, function() {
                wx.showToast({
                    title: "前往首页领取",
                    icon: "none",
                    duration: 3e3
                }), self.setData({
                    gdtVideoPop: !1
                }), self.getActBuoy();
            })) : o = !0);
        })) : wx.showToast({
            title: "今日次数用完，明天再来看",
            icon: "none"
        });
    },
    showVideoAd1: function(t) {
        var e = this.data.actBuoy;
        this.data.videoStatus ? (i.show(), i.onClose(function(s) {
            i.offClose(), o && (o = !1, s.isEnded ? (o = !0, a(e, t, function() {
                wx.showToast({
                    title: "前往首页领取",
                    icon: "none",
                    duration: 3e3
                }), self.setData({
                    gdtVideoPop: !1
                }), self.getActBuoy();
            })) : o = !0);
        })) : wx.showToast({
            title: "今日次数用完，明天再来看",
            icon: "none"
        });
    },
    goDati: function() {
        wx.navigateTo({
            url: "/questionPages/new_index/new_index"
        });
    },
    goBalance: function() {
        wx.navigateTo({
            url: "/pages/remaining/remaining"
        });
    },
    isTrue: function() {
        this.setData({
            isAuthorize: !0
        });
    },
    openFreeRed: function() {
        var t = this.data.goldRewards.is_packet;
        t = t ? 1 : 3, this.setData({
            redStatus: t
        });
    },
    chaiFreeRed: function() {
        o && (o = !1, t.httpsGet({
            url: t.getData("/packetfree"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                var e = self.data.goldRewards;
                e.is_packet = !1, self.setData({
                    goldRewards: e,
                    redMoney: t.data.data.packet_money,
                    redStatus: 2
                }), self.rewardYes();
            }
        }));
    },
    getRunData: function() {
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.werun"] || null == e.authSetting["scope.werun"] ? wx.login({
                    success: function(e) {
                        wx.getWeRunData({
                            success: function(a) {
                                self.setData({
                                    showRunAuthorize: !1
                                }), t.httpsPost({
                                    url: t.getData("/getstep"),
                                    data: {
                                        user_id: wx.getStorageSync("userId"),
                                        iv: encodeURIComponent(a.iv),
                                        encryptedData: encodeURIComponent(a.encryptedData),
                                        code: e.code
                                    },
                                    success: function(t) {
                                        self.getRewards(), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh(), 200 == t.data.code ? self.setData({
                                            stepDisplay: t.data.data.step
                                        }) : wx.showToast({
                                            title: t.data.message,
                                            icon: "none"
                                        });
                                    }
                                });
                            },
                            fail: function() {
                                self.getRewards(), wx.showToast({
                                    title: "获取步数失败",
                                    icon: "none"
                                }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                            }
                        });
                    }
                }) : (self.getRewards(), self.setData({
                    showRunAuthorize: !0
                }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh());
            }
        });
    },
    getRewards: function() {
        t.httpsGet({
            url: t.getData("/indexballs"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && (self.setData({
                    goldRewards: t.data.data,
                    goldIcon: t.data.data.gold_coin_balance
                }), t.data.data.is_packet && (wx.getStorageSync("isLogin") || self.data.teachStep || self.openFreeRed()));
            }
        });
    },
    modelSubmit: function(e) {
        t.modelSubmit(e);
    },
    requestAd: function() {
        var t = this;
        s([ 33 ], function(e) {
            if (e) {
                var a = e.type_33 ? e.type_33 : null;
                t.setData({
                    luckAds: a
                });
            } else self.setData({
                luckAds: null
            });
        });
    },
    requestTwo: function() {
        t.requestTwo(function() {
            var e = t.globalData.attention, a = t.globalData.collect;
            1 == a.collect_status && "1089" == t.globalData.scene ? t.httpsPost({
                url: t.getData("/savecollect"),
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function() {
                    a.collect_status = 2, self.setData({
                        collect: a,
                        guanzhu: e
                    });
                }
            }) : self.setData({
                collect: a,
                guanzhu: e
            });
        });
    },
    getOrderIng: function() {
        t.httpsPost({
            url: t.getData("/getfororder"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code ? self.setData({
                    hasOrderIng: !0
                }) : self.setData({
                    hasOrderIng: !1
                });
            }
        });
    },
    timeDown: function(t) {
        var e = this;
        this.orderInterval = setInterval(function() {
            var t = e.data.orderTime.split(":"), a = parseInt(t[0]), s = parseInt(t[1]), n = parseInt(t[2]);
            if (--n < 0 && (n = 59, --s < 0 && (s = 59, --a < 0))) return a = 0, s = 0, n = 0, 
            clearInterval(self.orderInterval), void self.getShareOrder();
            var o = (a = a < 10 ? "0" + a : a) + ":" + (s = s < 10 ? "0" + s : s) + ":" + (n = n < 10 ? "0" + n : n);
            self.setData({
                orderTime: o
            });
        }, 1e3);
    },
    getShareOrder: function() {
        t.httpsGet({
            url: t.getShop("/goods/share_order"),
            data: {
                openid: wx.getStorageSync("openId"),
                project: 0
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var e = t.data.data;
                    3 == e.good_type ? e.goodUrl = "/pages/bargain/bargain?id=" + e.id : e.goodUrl = "/pages/details/details?id=" + e.id, 
                    self.setData({
                        shareOrder: e,
                        orderTime: t.data.data.time
                    }), self.orderInterval && clearInterval(self.orderInterval), self.timeDown(t.data.data.time);
                }
            }
        });
    },
    getInfo: function() {
        t.getInfo(function(e) {
            self.setData({
                userInfo: e,
                firstTixian: t.globalData.firstTixian
            });
        });
    },
    indexAd: function() {
        this.requestAd(), this.selectComponent("#adList").requestAd();
    },
    getActBuoy: function() {
        e([ 16 ], function(t) {
            var e = t.type_16 ? t.type_16 : null, a = [];
            for (var s in e) 2 != e[s].existence && a.push(e[s]);
            self.setData({
                actBuoy: a
            });
        });
    },
    gdtCoin: function() {
        t.httpsGet({
            url: t.getData("/getGuangdaintongRed"),
            data: {
                user_id: wx.getStorageSync("userId"),
                type: 1
            },
            success: function(t) {
                200 == t.data.code && self.setData({
                    gdtCoin: t.data.data.amount
                });
            }
        });
    },
    videoCoin: function() {
        t.httpsGet({
            url: t.getData("/getGuangdaintongRed"),
            data: {
                user_id: wx.getStorageSync("userId"),
                type: 2
            },
            success: function(t) {
                200 == t.data.code && self.setData({
                    videoCoin: t.data.data.amount
                });
            }
        });
    },
    adLiveGdtCoin: function() {
        t.httpsGet({
            url: t.getData("/guandiantong"),
            data: {
                user_id: wx.getStorageSync("userId"),
                type: 1
            },
            success: function(t) {
                200 == t.data.code ? (wx.showToast({
                    title: "前往首页领取额外奖励",
                    icon: "none",
                    duration: 3e3
                }), self.setData({
                    gdtStatus: !1
                }), self.gdtCoin()) : (self.setData({
                    gdtStatus: !1
                }), wx.showToast({
                    title: "奖励次数达到限制",
                    icon: "none",
                    duration: 3e3
                }));
            }
        });
    },
    adLiveVideoCoin: function() {
        t.httpsGet({
            url: t.getData("/guandiantong"),
            data: {
                user_id: wx.getStorageSync("userId"),
                type: 2
            },
            success: function(t) {
                200 == t.data.code ? (wx.showToast({
                    title: "前往首页领取额外奖励",
                    icon: "none",
                    duration: 3e3
                }), self.videoCoin()) : wx.showToast({
                    title: "奖励次数达到限制",
                    icon: "none",
                    duration: 3e3
                });
            }
        });
    },
    getGdtCoin: function(e) {
        var a = e.currentTarget.dataset.money;
        this.numDonghua(a, function() {
            t.httpsGet({
                url: t.getData("/GetAward"),
                data: {
                    user_id: wx.getStorageSync("userId"),
                    type: 1
                },
                success: function(t) {
                    200 == t.data.code && self.gdtCoin();
                }
            });
        });
    },
    getVideoCoin: function(e) {
        var a = e.currentTarget.dataset.money;
        this.numDonghua(a, function() {
            t.httpsGet({
                url: t.getData("/GetAward"),
                data: {
                    user_id: wx.getStorageSync("userId"),
                    type: 2
                },
                success: function(t) {
                    200 == t.data.code && self.videoCoin();
                }
            });
        });
    },
    numDonghua: function(t, e) {
        var a = this, s = 0;
        this.addMoneyInterval || (this.addMoneyInterval = setInterval(function() {
            var o = a.data.goldIcon;
            if (++s > 10) return clearInterval(self.addMoneyInterval), self.addMoneyInterval = null, 
            void (e && e());
            o = n.numAdd(o, t / 10), a.setData({
                goldIcon: o
            });
        }, 30));
    },
    addGold: function(e) {
        if (o) {
            o = !1, self.isShowLingqu();
            var a = e.currentTarget.dataset.id;
            switch (a = a || 0) {
              case "1":
                t.jinbiPlay();
                var s = self.data.goldRewards.sign_money;
                self.numDonghua(s, function() {
                    wx.navigateTo({
                        url: "/pages/signIn/signIn",
                        success: function() {
                            self.rewardYes();
                        }
                    });
                });
                break;

              case "2":
                t.jinbiPlay();
                var n = self.data.goldRewards.enjoy_money;
                self.numDonghua(n, function() {
                    t.httpsPost({
                        url: t.getData("/getgold"),
                        data: {
                            user_id: wx.getStorageSync("userId")
                        },
                        success: function(t) {
                            200 == t.data.code && (self.rewardYes(), wx.navigateTo({
                                url: "/pages/friendsAddition/friendsAddition"
                            }));
                        }
                    });
                });
                break;

              case "3":
                var i = e.currentTarget.dataset.index, d = self.data.luckAds[i];
                if (self.setData({
                    tryIndex: i,
                    tryAd: d
                }), 0 == d.existence) self.setData({
                    luckPop: !0
                }), wx.nextTick(function() {
                    o = !0;
                }); else {
                    t.jinbiPlay();
                    var r = parseInt(d.vir_money);
                    self.numDonghua(r, function() {
                        t.httpsPost({
                            url: t.getAdvert("/advert/pbz_getLuckCoin"),
                            data: {
                                openid: wx.getStorageSync("openId"),
                                ad_id: d.id
                            },
                            success: function(t) {
                                200 == t.data.code && (self.selectComponent("#adList").requestAd(), self.rewardYes(), 
                                self.requestAd());
                            }
                        });
                    });
                }
                break;

              case "4":
                t.adFlag(this, 100, function() {
                    self.showLuoji(), t.jinbiPlay();
                    var e = self.data.goldRewards.gold_coin;
                    self.numDonghua(e, function() {
                        t.httpsPost({
                            url: t.getData("/getStepGold"),
                            data: {
                                user_id: wx.getStorageSync("userId")
                            },
                            success: function(t) {
                                self.data.appAd;
                                self.data.adinfo.all && self.setData({
                                    stepPop: !0,
                                    stepGold: e
                                }), 200 == t.data.code && self.rewardYes();
                            }
                        });
                    });
                });
                break;

              case "5":
                t.jinbiPlay();
                var u = self.data.collect.collect_vir;
                self.numDonghua(u, function() {
                    t.httpsPost({
                        url: t.getData("/getsgaward"),
                        data: {
                            user_id: wx.getStorageSync("userId"),
                            type: 2
                        },
                        success: function(t) {
                            if (200 == t.data.code) {
                                var e = self.data.collect;
                                e.collect_status = 3, self.setData({
                                    collect: e
                                }), self.rewardYes();
                            }
                        }
                    });
                });
                break;

              case "6":
                t.jinbiPlay();
                var c = self.data.goldRewards.invite_money;
                self.numDonghua(c, function() {
                    t.httpsPost({
                        url: t.getData("/friendsrewardlist"),
                        data: {
                            user_id: wx.getStorageSync("userId")
                        },
                        success: function(e) {
                            200 == e.data.code && (self.setData({
                                shareSucPop: !0,
                                shareGoldInfo: e.data.data,
                                shareJinbi: c
                            }), t.httpsPost({
                                url: t.getData("/getgoldcoin"),
                                data: {
                                    user_id: wx.getStorageSync("userId")
                                },
                                success: function() {
                                    self.rewardYes();
                                }
                            }));
                        }
                    });
                });
                break;

              case "7":
                t.jinbiPlay();
                var l = self.data.guanzhu.vipcn_vir;
                self.numDonghua(l, function() {
                    t.httpsPost({
                        url: t.getData("/getsgaward"),
                        data: {
                            user_id: wx.getStorageSync("userId"),
                            type: 1
                        },
                        success: function(t) {
                            if (200 == t.data.code) {
                                var e = self.data.guanzhu;
                                e.vipcn_status = 3, self.setData({
                                    guanzhu: e
                                }), self.rewardYes();
                            }
                        }
                    });
                });
                break;

              case "8":
                t.jinbiPlay();
                var g = self.data.goldRewards.wakeup_money;
                self.numDonghua(g, function() {
                    t.httpsGet({
                        url: t.getData("/getgoldcoin"),
                        data: {
                            user_id: wx.getStorageSync("userId"),
                            type: 1
                        },
                        success: function(t) {
                            200 == t.data.code && self.rewardYes();
                        }
                    });
                });
            }
        }
    },
    getVideo: function(e) {
        if (o) {
            o = !1, self.isShowLingqu();
            var a = e.currentTarget.dataset.money;
            self.numDonghua(a, function() {
                t.httpsGet({
                    url: t.getData("/getallvideoaward"),
                    data: {
                        user_id: wx.getStorageSync("userId")
                    },
                    success: function(t) {
                        200 == t.data.code && (self.rewardYes(), self.getInfo());
                    }
                });
            });
        }
    },
    oneStep: function() {
        var t = this, e = wx.createAnimation({
            duration: 18e3
        });
        this.tongzhiYear = e, e.left("-630rpx").step(), this.setData({
            tongzhiYearData: e.export()
        }), setTimeout(function() {
            var e = wx.createAnimation({
                duration: 0
            });
            t.nextTongzhi = e, e.left("630rpx").step(), t.setData({
                tongzhiYearData: e.export()
            }), wx.nextTick(function() {
                self.oneStep();
            });
        }, 17500);
    },
    hiddenCol: function() {
        this.setData({
            showCol: !1
        });
    },
    isShowLingqu: function() {
        var t = wx.getStorageSync("lingquNum") ? wx.getStorageSync("lingquNum") : 0, e = !1;
        wx.getStorageSync("userFirst") && (t < 2 ? (e = !0, wx.setStorageSync("lingquNum", t + 1)) : wx.setStorageSync("userFirst", 0)), 
        this.setData({
            pointTishi: e
        });
    },
    getUser: function(e) {
        t.getUser(e, function() {
            t.getInfo(function(t) {
                self.setData({
                    isAuthorize: !0
                });
            });
        });
    },
    hiddenAll: function() {
        var t = this, e = 600;
        this.data.ok || (e = 0), setTimeout(function() {
            t.setData({
                followStatus: !1,
                addToMyapp: !1,
                actPop: null,
                luckPop: !1,
                redStatus: 0,
                sharePop: !1,
                shareSucPop: !1,
                goodInfo: null,
                stepPop: !1,
                gdtVideoPop: !1,
                is_video: !1,
                is_banner: !1,
                is_Ad: !1,
                is_share: !1,
                gdtStatus: !1,
                tan_win: !1,
                kf_win: !1
            }), o = !0;
        }, e);
    },
    hiddenTry: function() {
        this.setData({
            continueTry: !1
        });
    },
    tryResult: function(e) {
        var a = e.currentTarget.dataset.index, s = (e.currentTarget.dataset.type, this.data.luckAds);
        t.tryPlay(s, a);
    },
    showMyApp: function() {
        this.setData({
            addToMyapp: !0,
            showAddBtn: !1
        });
    },
    showPutForward: function() {
        this.setData({
            followStatus: !0
        });
    },
    actGo: function(t) {
        var e, s = t.currentTarget.dataset.type, n = t.currentTarget.dataset.index;
        14 == s && (e = this.data.actPop, this.setData({
            actPop: null
        })), a(e, n, function() {
            e[n].appid || wx.navigateTo({
                url: e[n].act_url
            });
        });
    },
    collectSignIn: function() {
        wx.navigateTo({
            url: "/pages/signIn/signIn",
            success: function() {}
        });
    },
    showSharePop: function() {
        this.setData({
            sharePop: !0
        });
    },
    goShop: function(t) {
        var e = t.currentTarget.dataset.tab;
        wx.setStorageSync("goodTab", e), wx.navigateTo({
            url: "/pages/shop/shop"
        });
    },
    show_new: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(a) {
                var s = a.system.split(" ")[0];
                wx.request({
                    url: t.getData("/packet_is_tan"),
                    method: "POST",
                    data: {
                        user_id: wx.getStorageSync("userId"),
                        os: s
                    },
                    success: function(t) {
                        "Tan" == t.data.data.is ? e.setData({
                            tan: !0
                        }) : e.setData({
                            tan: !1
                        });
                    }
                });
            }
        });
    },
    show_newwin: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(a) {
                var s = a.system.split(" ")[0];
                wx.request({
                    url: t.getData("/packet_is_tan"),
                    method: "POST",
                    data: {
                        user_id: wx.getStorageSync("userId"),
                        os: s
                    },
                    success: function(t) {
                        "Tan" == t.data.data.is ? e.setData({
                            tan_win: !0
                        }) : e.setData({
                            tan_win: !1
                        });
                    }
                });
            }
        });
    },
    add_card: function() {
        var e = this;
        wx.request({
            url: t.getData("/card_create"),
            method: "POST",
            data: {
                openid: wx.getStorageSync("openId")
            },
            success: function(t) {
                if ("" == t.data.data.code) {
                    var a = JSON.stringify({
                        nonce_str: t.data.data.random,
                        timestamp: t.data.data.time,
                        signature: t.data.data.sign,
                        openid: t.data.data.openid
                    });
                    wx.addCard({
                        cardList: [ {
                            cardId: t.data.data.card_id,
                            cardExt: a
                        } ],
                        success: function(t) {
                            var a = encodeURIComponent(t.cardList[0].code);
                            e.open_card(a);
                        }
                    });
                } else e.quick_open(t.data.data.card_id, t.data.data.code);
            }
        });
    },
    open_card: function(e) {
        wx.request({
            url: t.getData("/card_decode"),
            method: "POST",
            data: {
                code: e,
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                wx.openCard({
                    cardList: [ {
                        cardId: t.data.data.card_id,
                        code: t.data.data.code
                    } ],
                    success: function(t) {}
                });
            }
        });
    },
    quick_open: function(t, e) {
        wx.openCard({
            cardList: [ {
                cardId: t,
                code: e
            } ],
            success: function(t) {}
        });
    },
    open_four: function() {
        var e = this;
        this.data.videoStatus && (i.show(), i.onClose(function(a) {
            i.offClose(), o && (o = !1, a.isEnded ? (e.selectComponent("#redbags").createpacket(), 
            o = !0, t.ready_click(2)) : o = !0);
        }));
    },
    open_first: function() {
        var e = this;
        this.data.videoStatus ? (i.show(), i.onClose(function(a) {
            i.offClose(), o && (o = !1, a.isEnded ? (e.selectComponent("#redbags").chaiFree(), 
            t.ready_click(1), o = !0) : o = !0);
        })) : this.selectComponent("#redbags").chaiFree();
    },
    get_onenine: function() {
        var e = this;
        wx.request({
            url: t.get_qdd("/main/get1_9to5"),
            method: "GET",
            data: {
                page: 2
            },
            success: function(t) {
                e.setData({
                    shop_list: t.data.data
                });
            }
        });
    },
    az_desk: function(e) {
        var a = this;
        wx.request({
            url: t.getData("/desk_check"),
            method: "POST",
            data: {
                user_id: wx.getStorageSync("userId"),
                desktop: e
            },
            success: function(t) {
                a.setData({
                    add_win: t.data.data.desktop,
                    desk_fb: t.data.data.jiangli,
                    desk_price: t.data.data.price
                });
            }
        });
    },
    get_addjl: function() {
        var e = this;
        wx.request({
            url: t.getData("/desk_ball "),
            method: "POST",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                e.rewardYes(), e.az_desk();
            }
        });
    },
    get_contact: function() {
        this.setData({
            kf_win: !0
        });
    },
    contact_statu: function() {
        var e = this;
        wx.request({
            url: t.getData("/checkTask"),
            method: "GET",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    kf_float: t.data.data.status,
                    is_ball: t.data.data.is_ball,
                    kf_price: t.data.data.price
                });
            }
        });
    },
    getkf: function() {
        var e = this;
        wx.request({
            url: t.getData("/getKefuTask"),
            method: "GET",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                e.contact_statu(), e.rewardYes();
            }
        });
    },
    add_jl: function() {
        wx.request({
            url: t.getData("/addKefuTask"),
            method: "GET",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                console.log("加记录成功");
            }
        });
    },
    get_ad: function() {
        var e = this;
        wx.request({
            url: t.getData("/miniCustomType"),
            method: "GET",
            data: {
                type: 1
            },
            success: function(t) {
                e.setData({
                    self_ad: t.data.data
                });
            }
        });
    }
});