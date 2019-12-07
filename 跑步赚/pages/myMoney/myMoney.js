var t = getApp(), a = null, e = (require("../../7F36CF766DA41FDF1950A771F63D15A6.js"), 
require("../../699D33376DA41FDF0FFB5B30171D15A6.js")), o = null, n = !0;

Page({
    data: {
        showGuanzhu: !1,
        problemPop: !1,
        red_status: 0,
        luck_dou: !0,
        kf_win: !1,
        tixianData: {
            status: 0,
            money: 0,
            lastMoney: 0,
            isKoushui: !0,
            turn_down: !1
        },
        userInfo: null,
        firstTixian: !1,
        firstPop: !1,
        exchangePop: !1,
        exchangeContent: !1,
        exchangeStatus: !1,
        transformPop: !1,
        transformCoin: 0,
        gdtLoadStatus: !1,
        videoStatus: !0,
        gdtStatus: !1,
        adinfo: {
            all: !1
        },
        ok: !1,
        fiveAgain: !1,
        open_info: !1
    },
    getlimitout: function() {
        t.httpsGet({
            url: t.getData("/getlimitout"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code ? a.setData({
                    showGuanzhu: !0
                }) : a.setData({
                    showGuanzhu: !1
                });
            }
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
            if (!n) return;
            n = !1, o.show().catch(function() {
                o.load().then(function() {
                    return o.show();
                }).catch(function(t) {
                    a.transform(), console.log("激励视频 广告显示失败");
                });
            }), o.onClose(function(e) {
                o.offClose(), e.isEnded ? (console.log("看完了"), n = !0, t.ready_click(6), a.transform()) : (n = !0, 
                console.log("没看完"));
            });
        } else this.transform();
    },
    loadVideo: function() {
        (o = wx.createRewardedVideoAd({
            adUnitId: "adunit-6c220d6eee965175"
        })).load().then(function() {
            console.log("加载成功"), a.setData({
                videoStatus: !0
            });
        }).catch(function(t) {
            console.log(t.errMsg), a.setData({
                videoStatus: !1
            });
        }), o.onError(function(t) {
            console.log(t);
        });
    },
    showVideoAd: function(t) {
        if (this.data.videoStatus) {
            if (!n) return;
            n = !1, o.show().catch(function() {
                o.load().then(function() {
                    return o.show();
                }).catch(function(t) {
                    console.log("激励视频 广告显示失败");
                });
            }), o.onClose(function(t) {
                o.offClose(), t.isEnded ? (console.log("看完了"), n = !0, a.videoAdLive()) : (n = !0, 
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
        this.open_close(), this.contact_statu(), this.checkStatus(), this.getlimitout(), 
        this.loadVideo(), a.show_new(), a.priority(), this.setData({
            ok: t.globalData.ok
        }), this.setData({
            card_show: !0
        });
    },
    contact_statu: function() {
        var a = this;
        wx.request({
            url: t.getData("/checkTask"),
            method: "GET",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    kf_float: t.data.data.status
                });
            }
        });
    },
    onHide: function() {
        this.data.gdtStatus && this.transform();
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
    numDonghua: function(t, o) {
        var n = this, s = 0;
        this.addMoneyInterval || (this.addMoneyInterval = setInterval(function() {
            var i = n.data.userInfo, r = i.gold_coin, d = i.property;
            if (++s > 10) return clearInterval(a.addMoneyInterval), a.addMoneyInterval = null, 
            void (o && o());
            i.gold_coin = e.numSub(r, t / 10), i.property = e.numAdd(d, t / 1e4), console.log(r), 
            n.setData({
                userInfo: i
            });
        }, 30));
    },
    showKoushui: function(a) {
        var e = a.currentTarget.dataset.status, o = a.currentTarget.dataset.money ? a.currentTarget.dataset.money : 0;
        if (0 == e) e = 2, this.setData({
            tixianData: {
                status: e,
                money: o,
                lastMoney: 80 * o / 100,
                turn_down: this.data.open_info
            }
        }); else {
            if ("ios" == t.globalData.system) {
                if (!this.data.isFirstStatus) return;
                if (1 == o) {
                    if (2 == this.data.isFirstStatus.a) return void this.setData({
                        firstPop: !0,
                        curMoney: o
                    });
                } else if (5 == o && 2 == this.data.isFirstStatus.b) return void this.setData({
                    firstPop: !0,
                    curMoney: o
                });
            }
            var n = 80 * o / 100;
            this.setData({
                tixianData: {
                    status: 1,
                    money: o,
                    lastMoney: n,
                    isKoushui: !0,
                    system: t.globalData.system,
                    turn_down: this.data.open_info
                },
                curMoney: o
            });
        }
    },
    newGoTixian: function(e) {
        var o = "";
        if (e.detail.formId && "the formId is a mock one" != e.detail.formId) {
            o = e.detail.formId, console.log(o), this.setData({
                tixianData: {
                    status: 0,
                    money: 0,
                    isKoushui: !1,
                    turn_down: this.data.open_info
                }
            });
            this.data.userInfo;
            var n = e.currentTarget.dataset.money;
            t.httpsPost({
                url: t.getData("/xcx/fetchmoney"),
                data: {
                    user_id: wx.getStorageSync("userId"),
                    property: n,
                    form_id: o
                },
                success: function(e) {
                    200 == e.data.code ? (a.isFirst(), wx.showToast({
                        title: e.data.message,
                        icon: "none",
                        duration: 3e3
                    }), t.getInfo(function(e) {
                        console.log(t.globalData.firstTixian), a.setData({
                            userInfo: e,
                            firstTixian: t.globalData.firstTixian
                        });
                    })) : 202 == e.data.code ? a.setData({
                        firstPop: !0
                    }) : wx.showToast({
                        title: e.data.message,
                        icon: "none",
                        duration: 3e3
                    });
                }
            });
        }
    },
    showProblemPop: function() {
        this.setData({
            problemPop: !0
        });
    },
    hiddenAll: function() {
        var a = this, e = 600;
        t.globalData.ok || (e = 0), setTimeout(function() {
            a.setData({
                problemPop: !1,
                tixianData: {
                    status: 0,
                    money: 0
                },
                firstPop: !1,
                exchangePop: !1,
                transformPop: !1,
                is_video: !1,
                is_banner: !1,
                is_Ad: !1,
                is_share: !1,
                fiveAgain: !1,
                gdtStatus: !1,
                red_status: 0,
                share_show: !1,
                kf_win: !1
            });
        }, e);
    },
    onShareAppMessage: function(a) {
        var e;
        "button" == a.from ? (e = 10, console.log("分享按钮分享出去的")) : (e = " ", console.log("右上角分享出去的"));
        var o = t.globalData.shareInfo;
        return o.path = "/pages/index/index?source=" + e + "&userId=" + wx.getStorageSync("userId"), 
        o;
    },
    isFirst: function() {
        t.httpsGet({
            url: t.getData("/xcx/OneTx"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && a.setData({
                    isFirstStatus: t.data.data
                });
            }
        });
    },
    onLoad: function() {
        a = this, t.shareInfo(7), this.isFirst(), t.getInfo(function(e) {
            a.setData({
                userInfo: e,
                firstTixian: t.globalData.firstTixian
            });
        }), 0 == wx.getStorageSync("isLogin") ? (t.globalData.isAuthorize = !1, a.setData({
            isAuthorize: !1
        })) : (t.globalData.isAuthorize = !0, a.setData({
            isAuthorize: !0
        }));
    },
    getUser: function(e) {
        t.getUser(e, function(e) {
            t.globalData.isAuthorize = !0, a.setData({
                userInfo: e.data,
                isAuthorize: !0
            }), a.withdraw();
        }, function() {
            wx.showModal({
                title: "提现",
                content: "首次提现需要授权登录，点击重新提现"
            });
        });
    },
    tixian: function(e) {
        this.data.userInfo;
        var o = e.currentTarget.dataset.money;
        t.httpsPost({
            url: t.getData("/fetchmoney"),
            data: {
                user_id: wx.getStorageSync("userId"),
                property: o
            },
            success: function(e) {
                200 == e.data.code && t.getInfo(function(e) {
                    console.log(t.globalData.firstTixian), a.setData({
                        userInfo: e,
                        firstTixian: t.globalData.firstTixian
                    });
                });
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
    getPhone: function(e) {
        if ("getPhoneNumber:ok" == e.detail.errMsg) {
            var o = encodeURIComponent(e.detail.iv), n = encodeURIComponent(e.detail.encryptedData);
            wx.login({
                success: function(e) {
                    t.httpsPost({
                        url: t.getData("/tel"),
                        data: {
                            user_id: wx.getStorageSync("userId"),
                            code: e.code,
                            iv: o,
                            encryptedData: n
                        },
                        success: function(e) {
                            200 == e.data.code ? (console.log("手机号获取成功"), t.getInfo(function(t) {
                                a.setData({
                                    userInfo: t
                                });
                            })) : wx.showToast({
                                title: "获取手机号失败",
                                icon: "none"
                            });
                        }
                    });
                }
            });
        } else wx.showToast({
            title: "为了您的资金安全，本次提现需要获取您的实名制手机号，获取成功后即可立即去提现",
            icon: "none",
            duration: 5e3
        });
    },
    goApp: function() {
        t.httpsGet({
            url: t.getData("/appregister"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && console.log("去APP提现成功");
            }
        });
    },
    show_new: function() {
        var a = this;
        wx.getSystemInfo({
            success: function(e) {
                var o = e.system;
                console.log(e), console.log(e.platform), console.log(o);
                var n = o.split(" ")[0];
                console.log("系统信息" + n), wx.request({
                    url: t.getData("/packet_is_tan"),
                    method: "POST",
                    data: {
                        user_id: wx.getStorageSync("userId"),
                        os: n
                    },
                    success: function(t) {
                        console.log(t), "Tan" == t.data.data.is ? (a.setData({
                            tan: !0
                        }), a.every_tan()) : a.setData({
                            tan: !1
                        });
                    }
                });
            }
        });
    },
    rotateClick: function(t) {
        this.setData({
            ima_show: !0
        });
    },
    open_red: function() {
        var a = this;
        wx.request({
            url: t.getData("/packet_status"),
            method: "POST",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                3 != t.data.data.status ? a.setData({
                    red_status: t.data.data.status,
                    luck_money: t.data.data.money
                }) : a.again_four();
            }
        });
    },
    every_tan: function() {
        var a = this;
        wx.request({
            url: t.getData("/packet_status"),
            method: "POST",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                1 == t.data.data.status && a.setData({
                    red_status: t.data.data.status
                });
            }
        });
    },
    open_luck: function() {
        var a = this;
        wx.request({
            url: t.getData("/packet_begin"),
            method: "POST",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && (a.setData({
                    red_status: 2,
                    luck_money: t.data.data.money
                }), a.rotateClick(), a.get_self());
            }
        });
    },
    luck_double: function(a) {
        var e = a.currentTarget.dataset.id, n = a.currentTarget.dataset.status, s = this;
        wx.createRewardedVideoAd && ((o = wx.createRewardedVideoAd({
            adUnitId: "adunit-36f3b420a29e210a"
        })).onLoad(function() {}), o.onError(function(t) {}), o.onClose(function(a) {
            o.offClose(), a && a.isEnded ? (console.log("视频正常关闭"), t.ready_click(9), 0 == n ? s.begin_double() : 1 == n ? s.four_double(e) : 2 == n && s.look_video()) : wx.showToast({
                title: "时间不足",
                icon: "none",
                duration: 2e3
            });
        })), o && o.show().catch(function() {
            o.load().then(function() {
                return o.show();
            }).catch(function(t) {
                console.log("激励视频 广告显示失败");
            });
        });
    },
    begin_double: function() {
        var a = this;
        wx.request({
            url: t.getData("/packet_begin_double"),
            method: "GET",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && (a.setData({
                    luck_money: t.data.data.money,
                    luck_dou: !1
                }), a.rotateClick(), a.get_self());
            }
        });
    },
    again_four: function() {
        var a = this;
        wx.request({
            url: t.getData("/packet_create_four"),
            method: "POST",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                console.log(t), a.setData({
                    red_status: 3,
                    four: t.data.data.list,
                    new_gold: t.data.data.gold
                }), a.priority();
            }
        });
    },
    open_newred: function(a) {
        var e = this;
        wx.request({
            url: t.getData("/packet_four"),
            method: "POST",
            data: {
                user_id: wx.getStorageSync("userId"),
                id: a.currentTarget.dataset.id
            },
            success: function(t) {
                200 == t.data.code && (e.again_four(), e.get_self(), e.rotateClick());
            }
        });
    },
    four_double: function(a) {
        var e = this;
        wx.request({
            url: t.getData("/packet_four_double"),
            method: "POST",
            data: {
                user_id: wx.getStorageSync("userId"),
                id: a
            },
            success: function(t) {
                200 == t.data.code && (e.again_four(), e.get_self(), e.rotateClick());
            }
        });
    },
    look_video: function() {
        var a = this;
        wx.request({
            url: t.getData("/packet_add_video"),
            method: "POST",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && (a.rotateClick(), a.get_self(), a.priority(), wx.showToast({
                    title: "奖励领取成功!",
                    icon: "none",
                    duration: 2e3
                }));
            }
        });
    },
    get_self: function() {
        t.getInfo(function(t) {
            a.setData({
                userInfo: t
            });
        });
    },
    get_User: function(e) {
        t.getUser(e, function() {
            t.getInfo(function(t) {
                a.setData({
                    isAuthorize: !0
                });
            }), a.open_red();
        });
    },
    get_share: function() {
        this.setData({
            share_show: !0
        });
    },
    priority: function() {
        var a = this;
        wx.request({
            url: t.getData("/packet_list_status"),
            method: "POST",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                console.log(t), a.setData({
                    sequence: t.data.data.is
                });
            }
        });
    },
    waring: function() {
        wx.showToast({
            title: "请完成前两个任务解锁此任务",
            icon: "none",
            duration: 2e3
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
    get_contact: function() {
        this.setData({
            kf_win: !0
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
    open_close: function() {
        var a = this;
        t.httpsGet({
            url: "https://online-run.litemob.com/daka/main/getversionswitch",
            data: {
                type: 425
            },
            success: function(t) {
                200 == t.data.code && (t.data.data.switch ? a.setData({
                    open_info: !0
                }) : a.setData({
                    open_info: !1
                }));
            }
        });
    }
});