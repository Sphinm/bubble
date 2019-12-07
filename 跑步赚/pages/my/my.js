var t = getApp(), a = null, e = null, o = !0;

Page({
    data: {
        showGuanzhu: !1,
        myGold: null,
        newYearPop: !1,
        contactPop: !1,
        pro_dl: !1,
        new_ad: !0,
        is: !0,
        contactPopData: {
            name: "帮助",
            getThing: "相关提示",
            image: "http://litemob-adn.oss-cn-beijing.aliyuncs.com//M6ea805edaaff4ac540f7da979a9706cb%E9%A6%96%E9%A1%B5_%E8%81%94%E7%B3%BB%E6%88%91%E4%BB%AC_%E5%AE%A2%E6%9C%8D%E4%BC%9A%E8%AF%9D.png"
        },
        userInfo: null,
        vipDesPop: !1,
        vipDes: [ {
            level: "VIP 1",
            reward: "0~200",
            bili: 0
        }, {
            level: "VIP 2",
            reward: "0~200",
            bili: 0
        }, {
            level: "VIP 1",
            reward: "0~200",
            bili: 0
        }, {
            level: "VIP 1",
            reward: "0~200",
            bili: 0
        }, {
            level: "VIP 1",
            reward: "0~200",
            bili: 0
        }, {
            level: "VIP 1",
            reward: "0~200",
            bili: 0
        }, {
            level: "VIP 1",
            reward: "0~200",
            bili: 0
        }, {
            level: "VIP 1",
            reward: "0~200",
            bili: 0
        }, {
            level: "VIP 1",
            reward: "0~200",
            bili: 0
        }, {
            level: "VIP 1",
            reward: "0~200",
            bili: 0
        }, {
            level: "VIP 1",
            reward: "0~200",
            bili: 0
        }, {
            level: "VIP X",
            reward: "10000~",
            bili: 200
        } ],
        isAuthorize: !1,
        getMorePop: !1,
        ok: !1,
        autoplay: !1,
        showGdtBanner: !0
    },
    hideGdtSwiper: function() {
        this.setData({
            showGdtBanner: !1
        });
    },
    onLoad: function() {
        this.setData({
            height: t.globalData.height,
            pro_dl: !0
        });
    },
    goShop: function(t) {
        var a = t.currentTarget.dataset.tab;
        wx.setStorageSync("goodTab", a), wx.navigateTo({
            url: "/pages/shop/shop"
        });
    },
    goShop: function(t) {
        var a = t.currentTarget.dataset.tab;
        wx.setStorageSync("goodTab", a), wx.navigateTo({
            url: "/pages/shop/shop"
        });
    },
    showVipDes: function() {
        this.setData({
            vipDesPop: !0
        });
    },
    showGetMore: function() {
        this.setData({
            getMorePop: !0
        });
    },
    showNewYearPop: function() {
        this.setData({
            newYearPop: !0
        });
    },
    getprice: function() {
        t.httpsPost({
            url: t.getData("/getgoldinfo"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var e = t.data.data;
                    a.setData({
                        myGold: e
                    });
                }
            }
        });
    },
    onShareAppMessage: function(a) {
        var e = t.globalData.shareInfo;
        return e.path = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        e;
    },
    hiddenAll: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                vipDesPop: !1,
                newYearPop: !1,
                getMorePop: !1,
                contactPop: !1,
                transformPop: !1,
                exchangePop: !1,
                is_video: !1,
                is_banner: !1,
                is_Ad: !1,
                is_share: !1,
                pro_dl: !1
            });
        }, 10), e && video.offClose();
    },
    toggleContact: function() {
        this.setData({
            contactPop: !this.data.contactPop
        });
    },
    getapp: function() {
        t.httpsGet({
            url: t.getData("/getapp"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var e = t.data.data, o = !1;
                    1 == e.app && (o = !0), a.setData({
                        appAd: e,
                        showGuanzhu: o
                    });
                }
            }
        });
    },
    goDati: function() {
        wx.navigateTo({
            url: "/questionPages/new_index/new_index"
        });
    },
    gdtLoad: function() {
        this.setData({
            gdtStatus: !0
        });
    },
    bannerErr: function() {
        t.bannerErr(this, "adunit-f527d40e02df45e6");
    },
    watchVideo: function() {
        var a = this;
        if (this.data.videoStatus) {
            if (!o) return;
            o = !1, e.show().catch(function() {
                e.load().then(function() {
                    return e.show();
                }).catch(function(t) {
                    a.transform(), console.log("激励视频 广告显示失败");
                });
            }), e.onClose(function(n) {
                e.offClose(), n.isEnded ? (t.ready_click(6), o = !0, a.transform()) : o = !0;
            });
        } else this.transform();
    },
    loadVideo: function() {
        (e = wx.createRewardedVideoAd({
            adUnitId: "adunit-6c220d6eee965175"
        })).load().then(function() {
            console.log("加载成功"), a.setData({
                videoStatus: !0
            });
        }).catch(function(t) {
            console.log(t.errMsg), a.setData({
                videoStatus: !1
            });
        }), e.onError(function(t) {
            console.log(t);
        });
    },
    showVideoAd: function(t) {
        if (this.data.videoStatus) {
            if (!o) return;
            o = !1, e.show().catch(function() {
                e.load().then(function() {
                    return e.show();
                }).catch(function(t) {
                    console.log("激励视频 广告显示失败");
                });
            }), e.onClose(function(t) {
                e.offClose(), t.isEnded ? (console.log("看完了"), o = !0, a.videoAdLive()) : (o = !0, 
                console.log("没看完"));
            });
        } else wx.showToast({
            title: "今日次数用完，明天再来看",
            icon: "none"
        });
    },
    gdtAdLoad: function() {
        this.setData({
            gdtLoadStatus: !0
        });
    },
    videoAdLive: function() {
        t.httpsGet({
            url: t.getData("/guandiantong"),
            data: {
                user_id: wx.getStorageSync("userId"),
                type: 2
            },
            success: function(t) {
                200 == t.data.code ? wx.showToast({
                    title: "前往首页领取视频奖励",
                    icon: "none",
                    duration: 3e3
                }) : wx.showToast({
                    title: "奖励次数达到限制",
                    icon: "none",
                    duration: 3e3
                });
            }
        });
    },
    onShow: function() {
        var e = this;
        a = this, this.new_version(), this.getlimitout(), this.get_ad(), this.loadVideo(), 
        this.getapp(), t.shareInfo(1), this.setData({
            autoplay: !0,
            ok: t.globalData.ok,
            userId: wx.getStorageSync("userId")
        }), this.setData({
            userId: wx.getStorageSync("userId")
        }), this.selectComponent("#adList").requestAd(), 0 === wx.getStorageSync("chunjieFuli") && (a.setData({
            newYearPop: !0
        }), wx.removeStorageSync("chunjieFuli")), this.getprice(), t.globalData.tryStart ? setTimeout(function() {
            e.getInfo();
        }, 3e3) : this.getInfo();
    },
    onHide: function() {
        this.setData({
            autoplay: !1,
            pro_dl: !1
        }), this.data.gdtStatus && this.transform();
    },
    getInfo: function() {
        var e = !1;
        t.getInfo(function(o) {
            0 == wx.getStorageSync("isLogin") ? (t.globalData.isAuthorize = !1, e = !1) : (t.globalData.isAuthorize = !0, 
            e = !0), a.setData({
                userInfo: o,
                isAuthorize: e
            });
        });
    },
    getUser: function(a) {
        var e = this;
        t.getUser(a, function(t) {
            e.getInfo();
        });
    },
    showLuoji: function() {
        t.show_luoji(this, "adunit-f527d40e02df45e6");
    },
    checkStatus: function() {
        var t = this;
        wx.request({
            url: "https://online-run.litemob.com/daka/main/getversionswitch",
            method: "GET",
            data: {
                type: 16
            },
            success: function(a) {
                200 == a.data.code && (a.data.data.switch ? t.setData({
                    new_ok: !0
                }) : t.setData({
                    new_ok: !1
                }));
            }
        });
    },
    transform: function() {
        var e = this.data.userInfo.gold_coin;
        if (e < 10) this.setData({
            exchangeContent: "您的运动币不足10枚，无法转换",
            exchangePop: !0,
            exchangeStatus: !1
        }); else {
            var o = e - e % 10;
            a.numDonghua(o, function() {
                t.httpsPost({
                    url: t.getData("/transform"),
                    data: {
                        user_id: wx.getStorageSync("userId")
                    },
                    success: function(e) {
                        if (200 == e.data.code) {
                            var o = e.data.data;
                            a.setData({
                                exchangeContent: o.gold_coin + "枚运动币已成功转换为" + o.property + "元",
                                exchangePop: !0,
                                exchangeStatus: !0,
                                transformPop: !1
                            }), t.getInfo(function(t) {
                                a.setData({
                                    userInfo: t
                                });
                            });
                        } else wx.showToast({
                            title: e.data.message,
                            icon: "none"
                        });
                    }
                });
            });
        }
    },
    showTransform: function() {
        var e = this.data.userInfo.gold_coin, o = e - e % 10;
        e < 10 ? this.setData({
            exchangeContent: "您的运动币不足10枚，无法转换",
            exchangePop: !0,
            exchangeStatus: !1
        }) : t.globalData.ex_ok ? a.setData({
            transformPop: !0,
            transformCoin: o
        }) : a.transform();
    },
    numDonghua: function(t, e) {
        var o = this, n = 0;
        this.addMoneyInterval || (this.addMoneyInterval = setInterval(function() {
            var i = o.data.userInfo, s = i.gold_coin, r = i.property;
            if (++n > 10) return clearInterval(a.addMoneyInterval), a.addMoneyInterval = null, 
            void (e && e());
            i.gold_coin = a.sub(s, t / 10), i.property = a.add(r, t / 1e4), console.log(s), 
            o.setData({
                userInfo: i
            });
        }, 30));
    },
    add: function(t, e) {
        var o, n, i;
        try {
            o = t.toString().split(".")[1].length;
        } catch (t) {
            o = 0;
        }
        try {
            n = e.toString().split(".")[1].length;
        } catch (t) {
            n = 0;
        }
        return i = Math.pow(10, Math.max(o, n)), (a.mul(t, i) + a.mul(e, i)) / i;
    },
    sub: function(t, e) {
        var o, n, i;
        try {
            o = t.toString().split(".")[1].length;
        } catch (t) {
            o = 0;
        }
        try {
            n = e.toString().split(".")[1].length;
        } catch (t) {
            n = 0;
        }
        return i = Math.pow(10, Math.max(o, n)), (a.mul(t, i) - a.mul(e, i)) / i;
    },
    mul: function(t, a) {
        var e = 0, o = t.toString(), n = a.toString();
        try {
            e += o.split(".")[1].length;
        } catch (t) {}
        try {
            e += n.split(".")[1].length;
        } catch (t) {}
        return Number(o.replace(".", "")) * Number(n.replace(".", "")) / Math.pow(10, e);
    },
    get_ad: function() {
        var a = this;
        wx.request({
            url: t.getData("/miniCustomType"),
            method: "GET",
            data: {
                type: 2
            },
            success: function(t) {
                a.setData({
                    self_ad: t.data.data
                });
            }
        });
    },
    add_card: function() {
        var a = this;
        wx.request({
            url: t.getData("/card_create"),
            method: "POST",
            data: {
                openid: wx.getStorageSync("openId")
            },
            success: function(t) {
                if ("" == t.data.data.code) {
                    var e = JSON.stringify({
                        nonce_str: t.data.data.random,
                        timestamp: t.data.data.time,
                        signature: t.data.data.sign,
                        openid: t.data.data.openid
                    });
                    wx.addCard({
                        cardList: [ {
                            cardId: t.data.data.card_id,
                            cardExt: e
                        } ],
                        success: function(t) {
                            var e = encodeURIComponent(t.cardList[0].code);
                            a.open_card(e);
                        }
                    });
                } else a.quick_open(t.data.data.card_id, t.data.data.code);
            }
        });
    },
    open_card: function(a) {
        wx.request({
            url: t.getData("/card_decode"),
            method: "POST",
            data: {
                code: a,
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
    quick_open: function(t, a) {
        wx.openCard({
            cardList: [ {
                cardId: t,
                code: a
            } ],
            success: function(t) {}
        });
    },
    new_version: function() {
        var a = this;
        wx.request({
            url: t.getData("/audit/is_my_page"),
            method: "GET",
            success: function(t) {
                a.setData({
                    is: t.data.data.is
                });
            }
        });
    },
    getlimitout: function() {
        t.httpsGet({
            url: t.getData("/getlimitout"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code ? a.setData({
                    show: !0
                }) : a.setData({
                    show: !1
                });
            }
        });
    },
    hf_desc: function() {
        wx.showToast({
            title: "话费币余额不足",
            icon: "none",
            duration: 2e3
        });
    },
    hf_des: function() {
        wx.showToast({
            title: "余额不足兑换",
            icon: "none",
            duration: 2e3
        });
    }
});