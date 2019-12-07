function a(a, e, n, d) {
    a.globalData.getDataScuess || (a.globalData.getDataScuess = !0, l.GETDATAWITHUSERID(o.HOMEPAGE_SIMPLE_INDEX, function(a) {
        "OK" == a.code && (e.data.exchangeRat = a.data.index.exchangeRate, e.setData({
            indexd: a.data.index
        }), t.INIT(e)), d();
    }));
}

getApp();

var e = require("../../../utils/event.js"), t = require("./init.js"), n = require("../../../utils/request.js"), o = require("../../../utils/urls.js"), d = require("../../../utils/wglogin.js"), i = require("./notice.js"), s = require("../../../utils/room.js"), l = require("../../../utils/urlGL.js"), u = require("../../../utils/team.js"), g = require("../../../utils/util.js");

module.exports = {
    getRDT: function(n, o, l, m, c) {
        n.globalData.getRunDataFlag ? (o.data.leavePage ? o.data.leavePage = !1 : o.setData({
            canShowCoupon: !1
        }), n.globalData.getDataScuess || a(n, o, m), o.data.showVideoRedBag || wx.getWeRunData({
            success: function(a) {
                if (o.setData({
                    runAuthor: !0
                }), null != o.data.pageName && !n.globalData.showAuthorizedMask && -1 != decodeURIComponent(o.data.pageName).indexOf("teamInfo")) {
                    var c = o.data.pageName;
                    o.data.pageName = null, "call" == o.data.teamShareType ? u.CHECKMEMBER(o.data.teamId, function(a) {
                        "OK" == a.code ? 1 == a.data.result ? wx.navigateTo({
                            url: decodeURIComponent(c)
                        }) : (n.globalData.teamTipTxt = "您不是该团队成员", wx.navigateTo({
                            url: "/pages/team/team"
                        })) : "TEAM_SPORT_NOT_EXIST" == a.code ? (n.globalData.teamTipTxt = a.msg, wx.navigateTo({
                            url: "/pages/team/team"
                        })) : wx.showToast({
                            title: a.msg,
                            icon: "none",
                            duration: 3e3
                        });
                    }) : "invite" == o.data.teamShareType && u.JOINTEAM(o.data.teamId, function(a) {
                        "OK" == a.code ? wx.navigateTo({
                            url: decodeURIComponent(c)
                        }) : "TEAM_SPORT_ALREADY_JOIN" == a.code ? wx.navigateTo({
                            url: decodeURIComponent(c + "&tip=" + a.msg)
                        }) : "TEAM_SPORT_NOT_EXIST" == a.code ? (n.globalData.teamTipTxt = a.msg, wx.navigateTo({
                            url: "/pages/team/team"
                        })) : wx.showToast({
                            title: a.msg,
                            icon: "none",
                            duration: 3e3
                        });
                    });
                }
                l(a.encryptedData, a.iv, function(a) {
                    if (wx.stopPullDownRefresh(), "OK" == a.code) {
                        if (1 == n.globalData.userVersion) {
                            var l = g.formateDateOther(new Date());
                            o.data.value.timestamp = l, wx.getStorage({
                                key: "uppie",
                                success: function(t) {
                                    if (l > t.data.timestamp || 1 == t.data.mask) if (t.data.mask = !0, t.data.timestamp = l, 
                                    wx.setStorage({
                                        key: "uppie",
                                        data: t.data
                                    }), a.data.index.stepUpper <= a.data.index.todayStepNum) {
                                        o.setData({
                                            todayStepNums: a.data.index.todayStepNum,
                                            numsMask: !0
                                        });
                                        var n = {
                                            event: "synchronous_ceiling_forward_page_click",
                                            activity_name: "曝光"
                                        };
                                        e.EVENT_LOG(n);
                                    } else o.setData({
                                        todayStepNums: a.data.index.todayStepNum,
                                        numsMask: !1
                                    }); else t.data.mask = !1, t.data.timestamp = l, wx.setStorage({
                                        key: "uppie",
                                        data: t.data
                                    }), o.setData({
                                        todayStepNums: a.data.index.todayStepNum,
                                        numsMask: !1
                                    }), console.log(o.data.numsMask);
                                },
                                fail: function(e) {
                                    o.data.value.mask = !0, wx.setStorage({
                                        key: "uppie",
                                        data: o.data.value
                                    }), a.data.index.stepUpper <= a.data.index.todayStepNum ? o.setData({
                                        todayStepNums: a.data.index.todayStepNum,
                                        numsMask: !0
                                    }) : o.setData({
                                        todayStepNums: a.data.index.todayStepNum,
                                        numsMask: !1
                                    });
                                }
                            });
                        }
                        o.setData({
                            gotRunFlag: !0
                        }), -1 == n.globalData.phoneModel.indexOf("iPhone 6 Plus") && i.NTC(o, s.UNREAD), 
                        n.globalData.isIndex = !0, n.globalData.isnewuser = a.data.index.newEdition, o.setData({
                            canShowCoupon: !0
                        }), o.data.indexPushResultShow || o.data.showinterstitialAdFlag || o.data.moonCakeMask || setTimeout(function() {
                            o.showInterstitialAd();
                        }, 3e3), m = a.data.index.exchangeRate, n.globalData.exchangeRate = a.data.index.exchangeRate;
                        var u = a.data.index.balance, c = parseFloat(u);
                        n.globalData.balance = u, n.globalData.allStempNumber = a.data.index.userStepNum, 
                        o.data.exchangeRat = a.data.index.exchangeRate, o.data.slice = 0, o.setData({
                            stepNum: a.data.index.stepNum,
                            balanceNum: c.toFixed(2),
                            gotRunFlag: !0,
                            hiddenBubbleTip: !0,
                            indexd: a.data.index
                        }), t.INIT(o);
                    } else d.LOGOUT();
                });
            },
            fail: function(a) {
                console.log(a), n.globalData.getRunDataFlag = !1;
                var g = {
                    event: "homePage_getSteps",
                    activity_name: "获取授权信息失败"
                };
                if (e.EVENT_LOG(g), null != o.data.pageName && !n.globalData.showAuthorizedMask && -1 != decodeURIComponent(o.data.pageName).indexOf("teamInfo")) {
                    var c = o.data.pageName;
                    o.data.pageName = null, "call" == o.data.teamShareType ? u.CHECKMEMBER(o.data.teamId, function(a) {
                        "OK" == a.code ? 1 == a.data.result ? wx.navigateTo({
                            url: decodeURIComponent(c)
                        }) : (n.globalData.teamTipTxt = "您不是该团队成员", wx.navigateTo({
                            url: "/pages/team/team"
                        })) : "TEAM_SPORT_NOT_EXIST" == a.code ? (n.globalData.teamTipTxt = a.msg, wx.navigateTo({
                            url: "/pages/team/team"
                        })) : wx.showToast({
                            title: a.msg,
                            icon: "none",
                            duration: 3e3
                        });
                    }) : "invite" == o.data.teamShareType && u.JOINTEAM(o.data.teamId, function(a) {
                        "OK" == a.code ? wx.navigateTo({
                            url: decodeURIComponent(c)
                        }) : "TEAM_SPORT_ALREADY_JOIN" == a.code ? wx.navigateTo({
                            url: decodeURIComponent(c + "&tip=" + a.msg)
                        }) : "TEAM_SPORT_NOT_EXIST" == a.code ? (n.globalData.teamTipTxt = a.msg, wx.navigateTo({
                            url: "/pages/team/team"
                        })) : wx.showToast({
                            title: a.msg,
                            icon: "none",
                            duration: 3e3
                        });
                    });
                }
                l("", "", function(a) {
                    if (wx.stopPullDownRefresh(), "OK" == a.code) {
                        o.setData({
                            gotRunFlag: !1
                        }), -1 == n.globalData.phoneModel.indexOf("iPhone 6 Plus") && i.NTC(o, s.UNREAD), 
                        n.globalData.isIndex = !0, n.globalData.isnewuser = a.data.index.isNewUser, o.data.showGuide || o.setData({
                            canShowCoupon: !0
                        }), m = a.data.index.exchangeRate, n.globalData.exchangeRate = a.data.index.exchangeRate;
                        var e = a.data.index.balance, l = parseFloat(e);
                        n.globalData.balance = e, n.globalData.allStempNumber = a.data.index.todayStepNum, 
                        o.data.exchangeRat = a.data.index.exchangeRate, o.data.slice = 0, o.setData({
                            stepNum: a.data.index.stepNum,
                            balanceNum: l.toFixed(2)
                        }), -1 == n.globalData.phoneModel.indexOf("iPhone 6 Plus") ? o.setData({
                            indexd: a.data.index
                        }) : o.data.indexd = a.data.index, t.INIT(o);
                    } else d.LOGOUT();
                });
            }
        })) : wx.getSetting({
            success: function(a) {
                a.authSetting["scope.werun"] ? (n.globalData.getRunDataFlag = !0, o.setData({
                    gotRunFlag: !0
                })) : o.setData({
                    gotRunFlag: !1
                });
            },
            fail: function(a) {
                console.log(a);
            }
        });
    },
    UPDATESPORT: function() {
        var a = {};
        a.userId = d.USERINFO().userId, n.POST({
            url: o.UPDATESPORTFLAG,
            params: a,
            success: function(a) {},
            fail: function(a) {}
        });
    },
    getRunData: a
};