var t = require("B710CC046DA41FDFD176A403FADC15A6.js").apiUrl, a = (require("4E31B9726DA41FDF2857D1759BFC15A6.js"), 
null), e = null, o = require("699D33376DA41FDF0FFB5B30171D15A6.js");

App({
    globalData: {
        height: 0,
        navHeight: 0,
        navTop: 0,
        windowHeight: 0,
        clientWidth: 375,
        clientHeight: 0,
        userInfo: null,
        tryStart: 0,
        firstTixian: !1,
        otherTixian: !1,
        tryAd: null,
        tryIndex: 0,
        ok: !1,
        ex_ok: !1,
        system: "android",
        shareInfo: {
            path: "",
            title: "",
            imageUrl: ""
        }
    },
    getUrl: function(t) {
        return "https://online.litemob.com/run" + t;
    },
    getQdd: function(a) {
        return t.qdd + a;
    },
    get_qdd: function(t) {
        return "https://online.litemob.com/qdd" + t;
    },
    shareInfo: function(t, e) {
        a.httpsGet({
            url: a.getData("/sharecard"),
            data: {
                type: t
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var o = t.data.data, n = a.globalData.shareInfo;
                    n.title = o.des, n.imageUrl = o.image, a.globalData.shareInfo = n, e && e();
                }
            }
        });
    },
    onLaunch: function(t) {
        var e;
        e = t.query.xcx_channel ? t.query.xcx_channel : " ";
        var n = t.query, s = wx.getMenuButtonBoundingClientRect();
        console.log(s), a = this, wx.showTabBarRedDot({
            index: 1
        }), o.getUpdate(), wx.getSystemInfo({
            success: function(t) {
                var e = t.system;
                a.globalData.height = t.statusBarHeight;
                var o = t.statusBarHeight, n = s.top, i = o + s.height + 2 * (s.top - o);
                a.globalData.navHeight = i, a.globalData.navTop = n, a.globalData.windowHeight = t.windowHeight, 
                -1 === e.indexOf("Android") ? a.globalData.system = "ios" : (a.globalData.system = "android", 
                a.globalData.clientWidth = t.screenWidth, a.globalData.clientHeight = t.screenHeight, 
                a.globalData.navHeight = t.statusBarHeight + 46);
            }
        }), this.isUser(n, e);
    },
    onShow: function(t) {
        this.globalData.scene = t.scene, this.checkStatus(), this.check_ex();
    },
    checkStatus: function() {
        a.httpsGet({
            url: "https://online-run.litemob.com/daka/main/getversionswitch",
            data: {
                type: 16
            },
            success: function(t) {
                200 == t.data.code && (t.data.data.switch ? a.globalData.ok = !0 : a.globalData.ok = !1);
            }
        });
    },
    check_ex: function() {
        a.httpsGet({
            url: "https://online-run.litemob.com/daka/main/getversionswitch",
            data: {
                type: 424
            },
            success: function(t) {
                200 == t.data.code && (t.data.data.switch ? a.globalData.ex_ok = !0 : a.globalData.ex_ok = !1);
            }
        });
    },
    loadVideo: function(t, o) {
        (e = wx.createRewardedVideoAd({
            adUnitId: o
        })).load().then(function() {
            t.setData({
                is_video: !0
            });
        }).catch(function(o) {
            e.offError(), a.videoErr(t);
        }), e.onError(function(o) {
            e.offError(), a.videoErr(t);
        });
    },
    videoErr: function(t) {
        t.setData({
            is_video: !1
        }), t.data.banner ? t.setData({
            is_banner: !0
        }) : !t.data.banner && t.data.ad && t.setData({
            is_Ad: !0
        });
    },
    watchVideo: function(t, o) {
        console.log("看视频的位置" + t), e && e.show().catch(function() {
            e.load().then(function() {
                return e.show();
            }).catch(function(t) {});
        }), e.onClose(function(n) {
            e.offClose(), n && n.isEnded ? (a.ready_click(t), o && o()) : wx.showToast({
                title: "时间不足",
                icon: "none",
                duration: 2e3
            });
        });
    },
    adFlag: function(t, a, e) {
        wx.request({
            url: "https://online-run.litemob.com/daka/main/getadvertswitch",
            data: {
                position: a
            },
            success: function(o) {
                200 == o.data.code ? ("[]" == JSON.stringify(o.data.data) && (o.data.data.all = !1), 
                t.setData({
                    adinfo: o.data.data,
                    first: o.data.data.switch_result.first,
                    video: o.data.data.switch_result.is_video,
                    ad: o.data.data.switch_result.is_ADs,
                    banner: o.data.data.switch_result.is_banner,
                    position: a
                }), e && e()) : t.setData({
                    adinfo: !1
                });
            }
        });
    },
    videoFlag: function(t) {
        a.httpsGet({
            url: "https://online-run.litemob.com/daka/main/getvideoswitch",
            success: function(e) {
                200 == e.data.code && (a.globalData.videoFlag = e.data.data, t && t());
            }
        });
    },
    show_luoji: function(t, a) {
        "banner" == t.data.first && t.data.banner ? t.setData({
            is_banner: !0
        }) : "banner" != t.data.first || t.data.banner || t.bannerErr(), "video" == t.data.first && t.data.video ? this.loadVideo(t, a) : "video" != t.data.first || t.data.video || (t.data.banner ? t.setData({
            is_banner: !0
        }) : !t.data.banner && t.data.ad && t.setData({
            is_Ad: !0
        })), "ADs" == t.data.first && t.data.ad ? t.setData({
            is_Ad: !0
        }) : "ADs" != t.data.first || t.data.ad || (t.data.video ? this.loadVideo(t, a) : t.data.banner ? t.setData({
            is_banner: !0
        }) : t.data.ad && t.setData({
            is_Ad: !0
        }));
    },
    bannerErr: function(t, e) {
        t.setData({
            is_banner: !1
        }), "banner" == t.data.first && t.data.ad ? t.setData({
            is_Ad: !0
        }) : "banner" == t.data.first && !t.data.ad && t.data.video && a.loadVideo(t, e), 
        "video" == t.data.first && t.data.ad && t.setData({
            is_Ad: !0
        }), "ADs" == t.data.first && t.data.ad && t.setData({
            is_Ad: !0
        });
    },
    tapLoading: function(t) {
        wx.showLoading({
            title: "加载中..."
        }), t && t();
    },
    getData: function(a) {
        return t.run + a;
    },
    getAnswer: function(a) {
        return t.answer + a;
    },
    getShop: function(a) {
        return t.shop + a;
    },
    getRed: function(a) {
        return t.red + a;
    },
    getAdvert: function(a) {
        return t.advert + a;
    },
    httpsGet: function(t) {
        o.reqGet(t);
    },
    httpsPost: function(t) {
        o.reqPost(t);
    },
    isUser: function(t, e) {
        var o = t.source ? t.source : 0, n = t.userId ? t.userId : "";
        wx.login({
            success: function(t) {
                a.httpsPost({
                    url: a.getData("/login"),
                    data: {
                        code: t.code,
                        pid: n,
                        type: o,
                        channel: e
                    },
                    success: function(t) {
                        if (a.statistics(t.data.data.id), 200 == t.data.code) {
                            var e = t.data.data;
                            e.unionid ? (wx.setStorageSync("isLogin", 1), a.globalData.isAuthorize = !0) : (wx.setStorageSync("isLogin", 0), 
                            a.globalData.isAuthorize = !1), wx.getStorageSync("openId") || wx.setStorageSync("openId", e.openid), 
                            wx.getStorageSync("unionId") || wx.setStorageSync("unionId", e.unionid), e.is_older ? wx.setStorageSync("userFirst", 1) : wx.setStorageSync("userFirst", 0), 
                            wx.setStorageSync("userId", e.id), a.indexOnload && a.indexOnload(), a.indexOnshow && a.indexOnshow(), 
                            a.appOnload && a.appOnload();
                        } else console.log(t.data.message);
                    }
                });
            }
        });
    },
    getUser: function(t, e, o) {
        if ("getUserInfo:ok" === t.detail.errMsg) {
            var n = encodeURIComponent(t.detail.encryptedData), s = encodeURIComponent(t.detail.iv);
            wx.login({
                success: function(o) {
                    var i = wx.getStorageSync("shareUser"), d = i.source ? i.source : 0, r = i.userId ? i.userId : "", c = i.id ? i.id : "", l = t.detail.userInfo;
                    console.log("登录人:" + l.nickName), console.log("登录渠道:" + d), console.log("邀请人id:" + r), 
                    console.log("邀请商品id:" + c), a.httpsPost({
                        url: a.getData("/accredit"),
                        data: {
                            user_id: wx.getStorageSync("userId"),
                            type: d,
                            pid: r,
                            shop_id: c,
                            code: o.code,
                            encryptedData: n,
                            iv: s
                        },
                        success: function(t) {
                            200 == t.data.code ? (a.globalData.isAuthorize = !0, wx.setStorageSync("isLogin", 1), 
                            e && e(t.data), 4 == d && wx.showModal({
                                title: "助力好友",
                                content: "是否帮忙好友砍价？",
                                cancelText: "否",
                                confirmText: "是",
                                success: function(t) {
                                    t.confirm ? a.httpsGet({
                                        url: a.getData("/iskanjia"),
                                        data: {
                                            user_id: wx.getStorageSync("userId"),
                                            is_kanjia: 1
                                        },
                                        success: function(t) {}
                                    }) : t.cancel && a.httpsGet({
                                        url: a.getData("/iskanjia"),
                                        data: {
                                            user_id: wx.getStorageSync("userId"),
                                            is_kanjia: 2
                                        },
                                        success: function(t) {}
                                    });
                                }
                            })) : wx.showToast({
                                title: t.data.message,
                                icon: "none"
                            });
                        }
                    });
                }
            });
        } else o && o();
    },
    getInfo: function(t, e) {
        var o = wx.getStorageSync("shareUser").userId ? wx.getStorageSync("shareUser").userId : "";
        a.httpsPost({
            url: a.getData("/userinfo"),
            data: {
                user_id: wx.getStorageSync("userId"),
                pid: o
            },
            success: function(e) {
                if (200 == e.data.code) {
                    var o = e.data.data;
                    a.globalData.userInfo = o, !o.draw_money_num && o.convertible_amount >= 1 ? a.globalData.firstTixian = !0 : a.globalData.firstTixian = !1, 
                    o.draw_money_num && o.convertible_amount >= 5 ? a.globalData.otherTixian = !0 : a.globalData.otherTixian = !1, 
                    t && t(o);
                } else wx.showToast({
                    title: e.data.message,
                    icon: "none"
                });
            },
            fail: function(t) {
                wx.showToast({
                    title: "请求用户信息失败",
                    icon: "none"
                });
            }
        });
    },
    tryPlay: function(t, e) {
        console.log(t[e]), a.httpsPost({
            url: a.getAdvert("/advert/pbz_adClick"),
            data: {
                ad_id: t[e].id,
                openid: wx.getStorageSync("openId"),
                pro_id: t[e].pro_id,
                type: t[e].type,
                jump_type: t[e].jump_type,
                main_id: t[e].main_id
            },
            success: function(a) {
                200 == a.data.code && (console.log("试玩的广告名字：", t[e].ad_name), 0 == t[e].jump_type ? console.log("直跳点击汇报成功") : console.log("中间页点击汇报成功"));
            }
        }), 1 != t[e].existence && 1 != t[e].jump_type && (this.tryTime && (clearInterval(this.tryTime), 
        this.tryTime = null, this.globalData.tryStart = 0), this.tryTime = setInterval(function() {
            a.globalData.tryStart += 1;
        }, 1e3), a.globalData.tryAd = t[e], a.globalData.tryIndex = e);
    },
    modelSubmit: function(t, e) {
        var o, n = t.detail.target.dataset.type;
        t.detail.formId && "the formId is a mock one" != t.detail.formId && (o = t.detail.formId, 
        a.httpsPost({
            url: a.getData("/createpush"),
            data: {
                user_id: wx.getStorageSync("userId"),
                form_id: o,
                template_type: n
            },
            success: function(t) {
                t.data.code, e && e(t.data);
            }
        }));
    },
    tryStatus: function(t) {
        var e = a.globalData.tryAd;
        if (t.self.setData({
            tryAd: e,
            tryIndex: a.globalData.tryIndex
        }), a.tryTime) {
            clearInterval(a.tryTime), a.tryTime = null;
            var o = a.globalData.tryStart;
            if (o < e.second && o > 0) t.failCb ? t.failCb() : wx.showToast({
                title: "主人多陪我玩一会好不好鸭~~",
                icon: "none"
            }), a.globalData.tryStart = 0; else {
                if (0 == o) return;
                a.httpsPost({
                    url: a.getAdvert("/advert/pbz_adLive"),
                    data: {
                        user_id: wx.getStorageSync("userId"),
                        openid: wx.getStorageSync("openId"),
                        ad_id: e.id,
                        main_id: e.main_id,
                        jump_type: e.jump_type,
                        pro_id: e.pro_id,
                        type: e.type
                    },
                    success: function(e) {
                        200 == e.data.code ? (a.globalData.tryStart = 0, t.self.requestAd(), t.sucCb && t.sucCb()) : (a.globalData.tryStart = 0, 
                        wx.showToast({
                            title: e.data.message
                        }));
                    }
                });
            }
        }
    },
    jinbiPlay: function() {
        var t = wx.createInnerAudioContext();
        t.src = "/source/jinbi.wav", t.autoplay = !0, t.obeyMuteSwitch = !0;
    },
    requestTwo: function(t) {
        a.httpsPost({
            url: a.getData("/userkeep"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            header: {},
            success: function(e) {
                if (200 == e.data.code) {
                    var o = e.data.data ? e.data.data : null;
                    o && (a.globalData.collect = o.collect ? o.collect : null, a.globalData.attention = o.attention ? o.attention : null, 
                    t && t());
                }
            }
        });
    },
    dotCollect: function(t) {
        a.httpsPost({
            url: a.getAdvert("/dot/createstat"),
            data: {
                user_id: wx.getStorageSync("userId"),
                dot_page: t
            },
            success: function(a) {
                200 == a.data.code ? console.log(t + "打点成功") : console.log(t + "打点失败");
            }
        });
    },
    getGoodList: function(t, e) {
        var o = null;
        o = void 0 === t ? {
            project: 0
        } : {
            project: 0,
            type: t
        }, a.httpsGet({
            url: a.getShop("/goods/list"),
            data: o,
            success: function(t) {
                200 == t.data.code ? e && e(t.data.data) : wx.showToast({
                    title: "商品列表获取失败",
                    icon: "none"
                });
            }
        });
    },
    changeAddress: function(t) {
        wx.getSetting({
            success: function(e) {
                !1 === e.authSetting["scope.address"] ? wx.openSetting() : wx.chooseAddress({
                    success: function(e) {
                        console.log(e);
                        var o = a.globalData.userInfo;
                        o.attr = e.provinceName + e.cityName + e.countyName + e.detailInfo, o.real_name = e.userName, 
                        o.phone = e.telNumber, o.postalCode = e.postalCode, a.httpsGet({
                            url: a.getData("/shipments"),
                            data: {
                                user_id: wx.getStorageSync("userId"),
                                phone: o.phone,
                                attr: o.attr,
                                real_name: o.real_name
                            },
                            success: function(e) {
                                200 == e.data.code && (console.log("地址保存成功"), a.globalData.userinfo = o, t && t());
                            }
                        });
                    }
                });
            }
        });
    },
    statistics: function(t) {
        wx.getSystemInfo({
            success: function(e) {
                wx.request({
                    url: a.getData("/userSystem"),
                    method: "POST",
                    data: {
                        user_id: t,
                        os: e.system
                    },
                    success: function(t) {}
                });
            }
        });
    },
    ready_click: function(t) {
        wx.request({
            url: a.getData("/video_count"),
            method: "POST",
            data: {
                user_id: wx.getStorageSync("userId"),
                type: t
            },
            success: function(t) {
                console.log(t);
            }
        });
    }
});