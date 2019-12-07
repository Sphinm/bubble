var e = require("./utils/activity.js"), t = require("./utils/utils.js");

require("./utils/thinkingdata.js");

var n = 0, a = 0;

App({
    onLaunch: function() {
        if (wx.getSystemInfoSync().SDKVersion >= "2.4.3" && !wx.getStorageSync("navigationInfo")) {
            var e = wx.getMenuButtonBoundingClientRect(), n = wx.getSystemInfoSync().statusBarHeight, a = 2 * e.top + e.height - n;
            if (2 * e.top - n > 0) {
                var i = {
                    navigationHeight: a,
                    statusBarHeight: n
                };
                wx.setStorageSync("navigationInfo", i);
            }
        }
        wx.removeStorage({
            key: "releaseInfo",
            success: function(e) {}
        });
        var o = wx.getStorageSync("userInfo");
        t.isEmpty(o) && (o = wx.getStorageSync("hjh_userInfo")), o.userId && (this.thinkingdata.login(o.userId), 
        this.globalData.thinkDataGlobal = o.userId, this.thinkingdata.init()), this.storeLoginCount();
        var s = this;
        wx.getSystemInfo({
            success: function(e) {
                s.globalData.phoneModel = e.model, e.system.indexOf("Android") > -1 ? s.globalData.systemName = "android" : s.globalData.systemName = "ios", 
                e.windowHeight > 624 ? s.globalData.isIphoneX = !0 : s.globalData.isIphoneX = !1, 
                s.globalData.navHeight = e.statusBarHeight + 76;
                var t = e.SDKVersion;
                if (t = t.replace(/\./g, ""), parseInt(t) < 190) wx.showModal({
                    title: "提示",
                    content: "当前微信版本过低，建议升级后使用",
                    showCancel: !1
                }); else if (parseInt(t) >= 1990 || parseInt(t) > 199) {
                    var n = wx.getUpdateManager();
                    n.onUpdateReady(function() {
                        wx.showModal({
                            title: "更新提示",
                            content: "新版本已经准备好，是否重启应用？",
                            success: function(e) {
                                if (e.confirm) {
                                    n.applyUpdate();
                                    var t = {
                                        event: "mini_program_update_forward_page_click",
                                        activity_name: "确定"
                                    };
                                    EVENTS.EVENT_LOG(t, function(e) {});
                                } else {
                                    var a = {
                                        event: "mini_program_update_forward_page_click",
                                        activity_name: "取消"
                                    };
                                    EVENTS.EVENT_LOG(a, function(e) {});
                                }
                            }
                        });
                        var e = {
                            event: "mini_program_update_forward_page_click",
                            activity_name: "曝光"
                        };
                        EVENTS.EVENT_LOG(e, function(e) {});
                    });
                }
            }
        });
        var l = new Date();
        this.globalData.loginTime = this.dateFtt("yyyy-MM-dd hh:mm:ss", l);
    },
    dateFtt: function(e, t) {
        var n = {
            "y+": t.getFullYear(),
            "M+": t.getMonth() + 1,
            "d+": t.getDate(),
            "h+": t.getHours(),
            "m+": t.getMinutes(),
            "s+": t.getSeconds(),
            "q+": Math.floor((t.getMonth() + 3) / 3),
            S: t.getMilliseconds()
        };
        /(y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length)));
        for (var a in n) new RegExp("(" + a + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? n[a] : ("00" + n[a]).substr(("" + n[a]).length)));
        return e;
    },
    onShow: function(e) {
        this.globalData.scene = e.scene;
        wx.getStorageSync("userInfo");
        var t = Date.parse(new Date());
        n = t / 1e3, wx.getNetworkType({
            success: function(e) {
                wx.setStorageSync("network", e.networkType);
            }
        }), wx.getStorageSync("system") || wx.getSystemInfo({
            success: function(e) {
                wx.setStorageSync("system", e);
            }
        });
    },
    onHide: function() {
        this.globalData.getRunDataFlag = !0, this.globalData.hide = !0, this.globalData.flag = !1, 
        this.globalData.getDataScuess = !1;
        var e = require("./utils/event.js"), t = Date.parse(new Date()), i = (a = t / 1e3) - n, o = {
            event: e.EVENT_LOG_OPERATIONHOURS,
            total_time: i
        };
        e.EVENT_LOG(o, function(e) {});
    },
    globalData: {
        getRunDataFlag: !0,
        userVersion: !0,
        thinkDataGlobal: "",
        phoneModel: "",
        testFourth: !1,
        scene: "",
        navHeight: 0,
        phone: null,
        textFlg: null,
        hide: !1,
        globalFlag: !1,
        isnewuser: !1,
        userInfo: {},
        userLogindetail: {},
        balance: 0,
        allStempNumber: 0,
        getinfo: !1,
        flag: !1,
        isShowModel: !1,
        cls: null,
        isIndex: null,
        banner: "",
        systemName: "",
        exchangeRate: null,
        isRefreshList: null,
        haveDefaultAddress: !0,
        channelId: "",
        productValueImg: "",
        addRuleImg: "",
        showAuthorizedMask: !0,
        teamTipTxt: "",
        getDataScuess: !1,
        isIphoneX: !1,
        setOnce: !1,
        loginTime: "",
        createTime: "",
        share_cardid: "",
        loginUserId: "",
        gotoTop: !1,
        videoAdTime: 0,
        levelLimitsTest: !1,
        videoFlage: !1,
        communityTabIndex: 1
    },
    countDown: function(e) {
        var t = this;
        t.setData({
            videoAdTime: e
        }), app.globalData.videoAdTime = e, e > 0 && setTimeout(function() {
            t.countDown(e - 1);
        }, 1e3);
    },
    finishTask: function() {
        if (1089 == this.globalData.scene || 1023 == this.globalData.scene || 1035 == this.globalData.scene) {
            var t, n = require("./utils/event.js");
            1089 == this.globalData.scene ? 1 == wx.getStorageSync("userInfo").newEdition ? (console.log("appjs,newEdition", wx.getStorageSync("userInfo").newEdition), 
            t = 8, e.FINISHTASKB(t, function(e) {
                if (console.log("FINISHTASKB", e), "OK" == e.code && 8 == t) {
                    var a = {
                        event: n.EVENT_LOG_EXCHANGESTEP,
                        activity_type: "B版本添加到小程序",
                        activity_name: "B版本完成任务"
                    };
                    n.EVENT_LOG(a, function(e) {});
                }
            }, function(e) {
                console.log("FINISHTASKB");
            })) : this.fininshTaskFn(3) : 1023 == this.globalData.scene ? 1 == wx.getStorageSync("userInfo").newEdition ? (t = 9, 
            e.FINISHTASKB(t, function(e) {
                if (console.log("FINISHTASKB"), "OK" == e.code && 9 == t) {
                    var a = {
                        event: n.EVENT_LOG_EXCHANGESTEP,
                        activity_type: "B版本添加至桌面",
                        activity_name: "B版本完成任务"
                    };
                    n.EVENT_LOG(a, function(e) {});
                }
            }, function(e) {})) : this.fininshTaskFn(2) : 1035 == this.globalData.scene && this.fininshTaskFn(7);
        }
    },
    fininshTaskFn: function(t) {
        var n = require("./utils/event.js");
        e.FINISHTASK(t, function(e) {
            if ("OK" == e.code) if (app.globalData.scene = "", 2 == t) {
                var a = {
                    event: n.EVENT_LOG_EXCHANGESTEP,
                    activity_type: "添加至桌面",
                    activity_name: "完成任务"
                };
                n.EVENT_LOG(a, function(e) {});
            } else if (3 == t) {
                var i = {
                    event: n.EVENT_LOG_EXCHANGESTEP,
                    activity_type: "添加到小程序",
                    activity_name: "完成任务"
                };
                n.EVENT_LOG(i, function(e) {});
            }
        }, function(e) {});
    },
    storeLoginCount: function() {
        var e = new Date().toLocaleDateString(), t = wx.getStorageSync("hjhLoginCount");
        t && void 0 != t && "undefined" != t && "{}" != JSON.stringify(t) && "NaN" != t && null != t ? e == t.timeDate ? t.count = t.count + 1 : (t.count = 1, 
        t.timeDate = e) : ((t = {}).count = 1, t.timeDate = e), wx.setStorageSync("hjhLoginCount", t);
    }
});