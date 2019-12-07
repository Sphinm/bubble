function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t, a = getApp(), i = require("../../utils/room.js"), n = require("../../utils/team.js"), o = require("../../utils/request.js"), r = require("../../utils/mine.js"), s = require("../../utils/wglogin.js"), d = require("../../utils/urlGL.js"), c = require("../../utils/urls.js"), u = require("../../utils/event.js"), l = require("./js/getWeRunData.js"), g = require("./js/onGotUserInfo.js"), p = require("./js/init.js"), h = require("./js/share.js"), _ = require("./js/goods.js"), v = require("../../utils/activity.js"), T = require("../../utils/util.js"), m = d.TYPEVALUE(), E = {}, f = {}, w = "", N = "", I = "", y = !1, D = null, S = "", A = "", V = "", b = {}, x = null, R = !0, L = 0, O = 0, C = 0, k = 0, B = 1, P = "", G = "", F = null, U = null, K = "", H = null;

Page((t = {
    data: {
        v5Image: "",
        tochMoveFlage: !1,
        hintImageUrlFlage: !1,
        playList: [],
        playFlage: !1,
        isAutoLoginFlag: !1,
        getInterfaceFlage: !0,
        doubleReward: !1,
        shareIn: !1,
        nickName: "",
        hjhShareType: 2,
        showinterstitialAdFlag: !1,
        bottomNoGoods: !0,
        showOrdinaryFlag: !1,
        homeGoodsList: {},
        randomGoodsBool: !1,
        bubbleArr: [],
        elasticFrame: -1,
        videoId: "",
        showAddDesktop: !1,
        linkHaveAuthorize: !1,
        noVirtualAd: !1,
        phoneMode6p: -1 != a.globalData.phoneModel.indexOf("iPhone 6 Plus"),
        randomBubble: !1,
        randomParms: {},
        randomVideoParms: {},
        balanceNum: "",
        indexd: {},
        stepShareType: "",
        showCoupon: !1,
        stepCollectShare: !1,
        stepCount: 0,
        showAnsewrBtn: !1,
        showAddShare: !1,
        addShareNum: 0,
        showChangeNum: !1,
        stepIncreaseId: "",
        entranceNum: 0,
        adVedioLoad: !1,
        showGuide: !1,
        canShowCoupon: !1,
        guideStep: 0,
        showBuyTip: !1,
        goodsHelpId: "",
        goodsId: "",
        pageName: null,
        gotRunFlag: !0,
        exchangeRat: "",
        indexGoodsList: [],
        showModal: !0,
        authorRize: !1,
        showAuthorize: !1,
        showAuthorizedMask: !1,
        runAuthor: !1,
        isShow: !0,
        infoF: !0,
        stepNum: 0,
        slice: 0,
        subshow: !0,
        animationData: "",
        siginResult: {},
        exchangeBgImg: "",
        shareContent: "我正在用步数换商品，快来跟我一起抢！",
        shareImageurl: "/images/share1.png",
        showRewardBtn: !1,
        showRewardRedTip: !1,
        mask: !1,
        showChange: 0,
        changeVideoId: "",
        changeVideoInfo: {},
        exchangeId: null,
        activeFlage: !1,
        moreGoodsList: [],
        isLast: !1,
        pageNum: 1,
        pageSize: 10,
        activityList: [],
        timeFlg: !1,
        lasttimes: 0,
        isFristLogin: !0,
        noBottomAd: !1,
        noTimeAd: !1,
        noHelpAd: !1,
        noInviteAd: !1,
        testShareInfo: {},
        hiddenBubbleTip: !0,
        showRecallPopup: !1,
        showFireRule: !1,
        recallStep: 2e3,
        enter_time: 0,
        showIntroduction: !1,
        showFirstChange: !1,
        indexPushResultShow: !1,
        indexPushResult: {},
        teamId: "",
        teamShareType: "",
        showVideoPopup: !1,
        clickTab: !1,
        popupIndex: -1,
        lvPopupList: [],
        openCountDown: !1,
        levelLimitsTest: !1,
        targetInfo: null,
        changeShareLinkUrl: "",
        userVersion: !0,
        guideGoods: [],
        diamondValue: "",
        firePower: "",
        diamondMask: !1,
        todayStepNums: 0,
        numsMask: !1,
        value: {
            mask: !0
        },
        taskOnOff: !1,
        popExchangeStepNum_visible: !1,
        popExchangeStepNumInfo: {},
        isAdditionVideo: !1,
        goodFriendStepNum: 0,
        showBagClose: !0,
        newAviseFlag: !1,
        popTaskHidden: !0,
        popTaskAnimation: {},
        rollExchangeRecordList: [],
        mallAdvert: {},
        popActivityRem_show: !1
    },
    onTabItemTap: function(e) {
        if (!this.data.clickTab) {
            this.data.clickTab = !0;
            var t = {
                event: "homePage_tab_button_click",
                activity_name: e.text,
                activity_type: e.index + ""
            };
            u.EVENT_LOG(t);
        }
    },
    onLoad: function(e) {
        var t = this;
        if (D = null, e.teamId && void 0 != e.teamId && (t.data.teamId = e.teamId, t.data.teamShareType = e.teamShareType), 
        e.videoId && void 0 != e.videoId && (t.data.videoId = e.videoId, I = e.videoId), 
        b = {}, e.channelId && void 0 != e.channelId && "undefined" != e.channelId) V = e.channelId; else if (e.flag && void 0 != e.flag && (w = "链接分享", 
        N = e.flag, a.globalData.share_cardid = e.flag), e.share_events && void 0 != e.share_events && (P = e.share_events), 
        e.share_loc && void 0 != e.share_loc && (G = e.share_loc), e.pageName && void 0 != e.pageName && (t.data.pageName = e.pageName, 
        -1 != decodeURIComponent(t.data.pageName).indexOf("teamInfo") ? t.setData({
            linkHaveAuthorize: !0
        }) : -1 != decodeURIComponent(t.data.pageName).indexOf("/apptransit/apptransit") && s.LOGOUT()), 
        e.userId && void 0 != e.userId) S = e.userId, A = e.source, e.goodsHelpId && void 0 != e.goodsHelpId && "undefined" != e.goodsHelpId && (t.data.goodsHelpId = e.goodsHelpId), 
        e.goodsId && void 0 != e.goodsId && "undefined" != e.goodsId && (t.data.goodsId = e.goodsId, 
        K = e.userId), w = "链接分享", N = e.flag, e.pageName && void 0 != e.pageName && (t.data.pageName = e.pageName); else if (e.scene && void 0 != e.scene) {
            var i = decodeURIComponent(e.scene);
            console.log(i);
            var n = i.split("$");
            S = i, w = "二维码";
            var o = n.pop();
            if (console.log(o), 30 == o && (w = "每日打卡-小程序码"), 31 == o) {
                S = n[0] + "$" + o;
                var r = "/pages/subpackage/wish/wishInfo/wishInfo?friendId=" + n[0] + "&wishId=" + n[1];
                t.data.pageName = encodeURIComponent(r);
            }
        } else w = e.source && void 0 != e.source && "undefined" != e.source ? e.source : "self";
        a.globalData.isShowModel = !1, "" == a.globalData.thinkDataGlobal && s.USERINFO().userId && (a.thinkingdata.login(s.USERINFO().userId), 
        a.globalData.thinkDataGlobal = s.USERINFO().userId, a.thinkingdata.init());
    },
    getShareInfo: function() {
        if (!this.data.shareIn) {
            var e = this;
            h.SHARECARD("INVITE", function(t) {
                "OK" == t.code && (e.data.shareIn = !0, e.data.shareContent = t.data.result.content, 
                e.data.shareImageurl = t.data.result.imgUrl, e.data.nickName = t.data.result.nickName ? t.data.result.nickName : "");
            });
        }
    },
    finishTask: function() {
        if (a.globalData.scene && "" != a.globalData.scene && (1089 == a.globalData.scene || 1023 == a.globalData.scene || 1035 == a.globalData.scene)) {
            var e = void 0;
            1089 == a.globalData.scene ? (e = 8, v.FINISHTASKB(e, function(t) {
                if ("OK" == t.code && 8 == e) {
                    a.globalData.scene = "";
                    var i = {
                        event: u.EVENT_LOG_EXCHANGESTEP,
                        activity_type: "B版本添加到小程序",
                        activity_name: "B版本完成任务"
                    };
                    u.EVENT_LOG(i);
                }
            }, function(e) {})) : 1023 == a.globalData.scene && (e = 9, v.FINISHTASKB(e, function(t) {
                if (a.globalData.scene = "", a.globalData.scene = "", "OK" == t.code && 9 == e) {
                    var i = {
                        event: u.EVENT_LOG_EXCHANGESTEP,
                        activity_type: "B版本添加至桌面",
                        activity_name: "B版本完成任务"
                    };
                    u.EVENT_LOG(i);
                }
            }, function(e) {}));
        }
    },
    linkMyFriends: function() {
        var e = {
            event: "homePage_click",
            activity_type: "3"
        };
        u.EVENT_THINKDATATRACK(e), wx.navigateTo({
            url: "/pages/mine_new/friendList/friendList"
        });
    },
    formSubmit: function(e) {
        var t = this;
        i.CHECKINDEXID(e.detail.formId, function(e) {
            t.setData({
                subshow: !e.data.show
            });
        });
    },
    cancel2: function() {
        i.CHECKINDEXID("", function(e) {}), this.setData({
            subshow: !0
        });
    },
    more: function() {
        wx.navigateTo({
            url: "/pages/index/list/list"
        });
    },
    onShow: function() {
        var e = this;
        wx.getStorage({
            key: "newFirst",
            success: function(t) {
                t.data && e.setData({
                    newFirst: t.data
                });
            }
        });
        var t = Date.parse(new Date());
        if (wx.getStorage({
            key: "playcont",
            success: function(a) {
                console.log(a.data), a.data && -1 == a.data.awardStatus && 0 != a.data.rewardStep && (console.log(t - a.data), 
                (t - a.data.timestamp) / 1e3 < a.data.viewSecond ? (wx.showToast({
                    title: "领取失败,时间不足" + a.data.viewSecond + "秒",
                    icon: "none",
                    duration: 2e3
                }), wx.removeStorage({
                    key: "playcont",
                    success: function(e) {
                        console.log(e);
                    }
                })) : e.getPlayPrize(a.data.id, a.data.viewSecond, a.data.appid));
            }
        }), wx.getStorage({
            key: "getInterface",
            success: function(a) {
                t - a.data < 1e4 ? e.data.getInterfaceFlage = !1 : e.data.getInterfaceFlage = !0;
            }
        }), e.data.getInterfaceFlage || !this.data.pageName || null == this.data.pageName) {
            if (wx.getStorageSync("lookFireRule") ? e.setData({
                showFireRule: !1
            }) : e.setData({
                showFireRule: !0
            }), e.data.clickTab = !1, 1 == a.globalData.gotoTop && e.gotoTop(), e.setData({
                mask: !1,
                showChange: 0,
                showAddShare: !1
            }), y) return void (y = !1);
            if (e.data.activeFlage && e.data.timeFlg) {
                var i = Number(new Date().getTime()) - Number(e.data.lasttimes);
                e.data.timeFlg = !1, e.data.activeFlage = !1, i > 2e3 && (e.data.addShareNum ? o.POST({
                    url: c.INDEX_ADDSHARE,
                    params: {
                        stepNum: e.data.addShareNum,
                        stepIncreaseId: e.data.stepIncreaseId
                    },
                    success: function(t) {
                        e.setData({
                            addShareNum: 0
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                }) : 3 != e.data.elasticFrame && r.ACTIVE(s.USERINFO().userId, e.data.exchangeId, function(t) {
                    e.data.exchangeId = "";
                }, function(t) {
                    e.data.exchangeId = "";
                }), e.linkChangeShareUrl());
            }
            e.getUserInfor(), wx.showShareMenu({
                withShareTicket: !0
            });
        }
        var n = new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString() + new Date().getDate().toString();
        if (console.log("nowday", n), n <= 20191212) try {
            var d = wx.getStorageSync("activityRem_date");
            d && d == n ? e.setData({
                popActivityRem_show: !1
            }) : e.setData({
                popActivityRem_show: !0
            }), wx.setStorageSync("activityRem_date", n);
        } catch (t) {
            e.setData({
                popActivityRem_show: !0
            }), console.error(t);
        }
    },
    userLogin: function(e) {
        var t = this;
        if (null != t.data.pageName && !a.globalData.showAuthorizedMask && s.USERINFO().userId && -1 != decodeURIComponent(t.data.pageName).indexOf("teamInfo")) {
            var o = t.data.pageName;
            t.data.pageName = null, "call" == t.data.teamShareType ? n.CHECKMEMBER(t.data.teamId, function(e) {
                "OK" == e.code ? 1 == e.data.result ? wx.navigateTo({
                    url: decodeURIComponent(o)
                }) : (a.globalData.teamTipTxt = "您不是该团队成员", wx.navigateTo({
                    url: "/pages/team/team"
                })) : "TEAM_SPORT_NOT_EXIST" == e.code ? (a.globalData.teamTipTxt = e.msg, wx.navigateTo({
                    url: "/pages/team/team"
                })) : wx.showToast({
                    title: e.msg,
                    icon: "none",
                    duration: 3e3
                });
            }) : "invite" == t.data.teamShareType && n.JOINTEAM(t.data.teamId, function(e) {
                "OK" == e.code ? wx.navigateTo({
                    url: decodeURIComponent(o)
                }) : "TEAM_SPORT_ALREADY_JOIN" == e.code ? wx.navigateTo({
                    url: decodeURIComponent(o + "&tip=" + e.msg)
                }) : "TEAM_SPORT_NOT_EXIST" == e.code ? (a.globalData.teamTipTxt = e.msg, wx.navigateTo({
                    url: "/pages/team/team"
                })) : wx.showToast({
                    title: e.msg,
                    icon: "none",
                    duration: 3e3
                });
            });
        }
        if (R) {
            R = !1, s.LOGIN(function(n) {
                if (n && (t.getUserInfor(), n.showGuide)) {
                    t.setData({
                        randomGoodsBool: !0
                    });
                    var o = {
                        event: "homepage_test001_new_user_forward_page",
                        activity_name: "曝光"
                    };
                    u.EVENT_LOG(o), n.shareVideo && t.setData({
                        showGuide: !0
                    });
                    var r = {
                        event: "new_user_guide_page_click",
                        activity_name: "曝光"
                    };
                    u.EVENT_LOG(r);
                }
                if (t.userRecallRepost(), 0 == t.data.indexGoodsList.length && n && _.getIndexGoodsList(t), 
                l.getRunData(a, t, "", function() {}), t.initAdVedio(), t.data.showModal || -1 == decodeURIComponent(t.data.pageName).indexOf("teamInfo")) if (n) {
                    var g = void 0;
                    if (wx.getStorage({
                        key: "newFirst",
                        success: function(e) {
                            e.data && (g = e.data);
                        }
                    }), g) t.setData({
                        newFirst: g
                    }), wx.setStorage({
                        key: "newFirst",
                        data: g
                    }); else if (n.showGuide) {
                        t.setData({
                            newFirst: !0
                        });
                        wx.setStorage({
                            key: "newFirst",
                            data: !0
                        });
                    } else {
                        t.setData({
                            newFirst: !1
                        });
                        wx.setStorage({
                            key: "newFirst",
                            data: !1
                        });
                    }
                    n.showGuide && n.newEdition || l.getRDT(a, t, i.INDEX, "", e);
                } else l.getRDT(a, t, i.INDEX, "", e);
                !1 === e ? (_.getIndexGoodsList(t), t.hideMoreGoodsList()) : 1 == a.globalData.isRefreshList && (_.getIndexGoodsList(t), 
                t.hideMoreGoodsList(), a.globalData.isRefreshList = !1), R = !0, "" == a.globalData.thinkDataGlobal && (a.thinkingdata.login(s.USERINFO().userId), 
                a.globalData.thinkDataGlobal = s.USERINFO().userId, a.thinkingdata.init()), "" != V && "undefined" != V && void 0 != V && (w = "第三方渠道", 
                N = V);
                var p = T.getLoginCounts(), h = "首次登录";
                if (1 != p && (h = "非首次登录"), w && void 0 != w && "undefined" != w) {
                    var v = d.SCENEVALUE()[a.globalData.scene], m = w;
                    N && (m = "分享登录");
                    var E = {
                        event: "app_enter_source",
                        share_card_id: N + "",
                        activity_type: v,
                        login_enter_source: v,
                        login_enter_type: m,
                        login_enter_share_events: P,
                        login_enter_share_loc: G,
                        login_enter_first_or_not: h
                    };
                    if ("" != I && (E.login_content_videoid = I + ""), a.globalData.createTime && "" != a.globalData.createTime && (E.registration_time = a.globalData.createTime), 
                    N && "" != N) {
                        var f = s.USERINFO().userId + "", y = N.substr(f.length);
                        E.login_enter_share_time = d.timestampToTime(y);
                    }
                    u.EVENT_LOG(E), w = "", N = "", P = "", G = "", I = "";
                }
                if (t.newMsgReminder(), 1 != L) {
                    var D = {};
                    D.loginCount = p, d.GETDATAWITHPARAMS(c.INDEX_PUSH_GETPUSH, D, function(e) {
                        "OK" == e.code && (L = 1, e.data.result && "{}" != JSON.stringify(e) && t.setData({
                            indexPushResult: e.data.result,
                            indexPushResultShow: !0
                        }));
                    }, function(e) {
                        console.log(c.INDEX_PUSH_GETPUSH, e);
                    });
                }
                t.finishTask(), t.data.isFristLogin && (t.data.isFristLogin = !1, null != t.data.pageName && -1 == decodeURIComponent(t.data.pageName).indexOf("teamInfo") && (-1 != decodeURIComponent(t.data.pageName).indexOf("communityHomepage") ? wx.switchTab({
                    url: decodeURIComponent(t.data.pageName) + "?enterSource=2"
                }) : -1 != decodeURIComponent(t.data.pageName).indexOf("videoInfo/videoInfo") ? n && n.shareVideo ? wx.navigateTo({
                    url: decodeURIComponent(t.data.pageName) + "&shareVideo=" + n.shareVideo
                }) : wx.navigateTo({
                    url: decodeURIComponent(t.data.pageName)
                }) : -1 != decodeURIComponent(t.data.pageName).indexOf("shareLand/shareLand") && K == n.userId ? wx.navigateTo({
                    url: "/pages/index/goodlist/goodlist?goodid=" + t.data.goodsId
                }) : wx.navigateTo({
                    url: decodeURIComponent(t.data.pageName)
                }), t.data.pageName = null));
            }, function() {}, S, A, V, this.data.goodsHelpId, this.data.goodsId, this.data.videoId), 
            t.data.getInterfaceFlage && (t.data.getInterfaceFlage = !1);
            var r = Date.parse(new Date());
            wx.setStorage({
                key: "getInterface",
                data: r
            });
        }
    },
    onReady: function() {
        var e = this;
        if (s.ISLOGIN()) {
            if (_.getIndexGoodsList(e), e.getRollExchangeRecord(), e.data.isFristLogin = !1, 
            null != e.data.pageName && -1 == decodeURIComponent(e.data.pageName).indexOf("teamInfo")) {
                var t = e.data.pageName;
                e.data.pageName = null, -1 != decodeURIComponent(t).indexOf("communityHomepage") ? wx.switchTab({
                    url: decodeURIComponent(t)
                }) : -1 != decodeURIComponent(t).indexOf("shareLand/shareLand") && K == s.USERINFO().userId ? wx.navigateTo({
                    url: "/pages/index/goodlist/goodlist?goodid=" + e.data.goodsId
                }) : wx.navigateTo({
                    url: decodeURIComponent(t)
                });
            }
            e.getShareInfo(), e.config();
        }
    },
    touchStart: function(e) {
        O = e.timeStamp;
    },
    touchEnd: function(e) {
        C = e.timeStamp;
    },
    onGotUserInfo: function(e) {
        if (C - O < 350) {
            var t = e.timeStamp, a = k;
            k = t, t - a > 300 && (1 == e.currentTarget.dataset.prize ? wx.navigateTo({
                url: "/pages/activity/luckyWheel/luckyWheel"
            }) : g.OGTUI(e));
        }
    },
    confirmRunData: function() {
        var e = {
            event: u.EVENT_LOG_SPORT
        };
        u.EVENT_LOG(e);
    },
    confirmRunDataBtn: function(e) {
        this.setData({
            gotRunFlag: !0,
            canShowCoupon: !1
        }), l.UPDATESPORT();
    },
    cancelRunData: function() {
        this.setData({
            gotRunFlag: !0
        });
    },
    hideballAuthorRize: function(e) {
        var t = this;
        if (17 == e.currentTarget.dataset.butype || 19 == e.currentTarget.dataset.butype) wx.getWeRunData({
            success: function(a) {
                t.hideball(e);
            },
            fail: function(a) {
                t.data.eventBall = e, t.setData({
                    hiddenBubbleTip: !1
                });
            }
        }); else if (100 == e.currentTarget.dataset.butype || 0 == e.currentTarget.dataset.butype) {
            t.hideball(e);
            var a = e.currentTarget.dataset.path;
            -1 != a.search("pages/communityHomepage/community") ? wx.switchTab({
                url: a,
                fail: function() {
                    wx.showToast({
                        title: "该功能已关闭",
                        icon: "none"
                    });
                }
            }) : wx.navigateTo({
                url: a,
                fail: function() {
                    wx.showToast({
                        title: "该功能已关闭",
                        icon: "none"
                    });
                }
            });
        } else -3 == e.currentTarget.dataset.butype ? t.getPlayList() : t.hideball(e);
    },
    cancelBubbleTip: function() {
        this.setData({
            hiddenBubbleTip: !0
        });
    },
    linkAuthorize: function() {
        y = !0;
    },
    confirmBubbleTip: function(e) {
        var t = this;
        t.setData({
            hiddenBubbleTip: !0
        }), e.detail.authSetting["scope.werun"] && (t.hideball(t.data.eventBall), l.getRDT(a, t, i.INDEX, "", !0), 
        l.UPDATESPORT());
    },
    deleateArrBall: function(e) {
        for (var t = [], a = this.data.bubbleArr, i = 0; i < a.length; i++) a[i].id != e && t.push(a[i]);
        "" != e && e && this.setData({
            bubbleArr: t,
            moveball: e
        });
    },
    hideball: function(t) {
        if (this.data.eventBall = "", !this.data.randomBubble && !this.data.showAddDesktop) {
            if (t) {
                if ("76" == t.currentTarget.dataset.butype) return;
                b = t.currentTarget.dataset;
                var n = "none";
                "100" == t.currentTarget.dataset.butype && (n = t.currentTarget.dataset.path);
                var r = {
                    event: u.EVENT_LOG_EXCHANGESTEP,
                    activity_type: b.explain,
                    activity_name: "点击",
                    enter_source: n
                };
                if (u.EVENT_LOG(r), "300" == t.currentTarget.dataset.butype) return wx.navigateTo({
                    url: t.currentTarget.dataset.path
                }), void this.deleateArrBall(b.text);
                if ("110" == t.currentTarget.dataset.butype) return this.deleateArrBall(b.text), 
                void wx.navigateTo({
                    url: "/pages/activity/signView/signViewB/signViewB"
                });
                if ("-1" == t.currentTarget.dataset.butype) return this.deleateArrBall(b.text), 
                void wx.navigateTo({
                    url: "/pages/answer/pages/answer"
                });
                if ("10" == t.currentTarget.dataset.butype) return this.deleateArrBall(b.text), 
                void wx.navigateTo({
                    url: "/pages/activity/signView/signViewB/signViewB"
                });
                if ("9" == t.currentTarget.dataset.butype) return this.deleateArrBall(b.text), void wx.navigateTo({
                    url: "/pages/activity/signView/newSignIn/newSignIn"
                });
                if ("-2" == t.currentTarget.dataset.butype) return void wx.navigateTo({
                    url: "/pages/activity/signView/newSignIn/newSignIn"
                });
                if ("41" == t.currentTarget.dataset.butype) return this.deleateArrBall(b.text), 
                void this.setData({
                    showAddDesktop: !0
                });
                if ("40" == t.currentTarget.dataset.butype || "0" == t.currentTarget.dataset.butype) return this.deleateArrBall(b.text), 
                void ("40" == t.currentTarget.dataset.butype && wx.navigateTo({
                    url: "/pages/subpackage/setup/bindPhone/bindPhone?source=0&ballParams=" + JSON.stringify(t)
                }));
            }
            if ("{}" != JSON.stringify(b)) {
                if (!(!t || "24" != t.currentTarget.dataset.butype || this.data.randomBubble || b.con && null != b.con && void 0 != b)) return this.deleateArrBall(b.text), 
                void this.gotoApplicationScuess();
                if (!t || "26" != t.currentTarget.dataset.butype && "111" != t.currentTarget.dataset.diamondtype) if (t && "110" == t.currentTarget.dataset.diamondtype) wx.navigateTo({
                    url: "/pages/videoFirepower/videoFirepower?enter_source=1"
                }); else {
                    if (t && "1" == t.currentTarget.dataset.butype) {
                        var s = {
                            event: "homePage_friendsBall_button_click"
                        };
                        u.EVENT_THINKDATATRACK(s);
                    }
                    this.voice("/audios/2.mp3");
                    var d = b.text, g = this, h = [], _ = {};
                    b.refid && void 0 != b.refid && (_.refId = b.refid), b.butype && void 0 != b.butype && (_.stepType = b.butype), 
                    _.stepNum = b.con, b.diamondtype && void 0 != b.diamondtype && (_.diamondNum = b.diamondnum, 
                    _.diamondType = b.diamondtype, b.userawarddiamondid && (_.userAwardDiamondId = b.userawarddiamondid)), 
                    o.POST({
                        url: c.API_COLLECT,
                        params: _,
                        success: function(t) {
                            var a = wx.getStorageSync("checkBox");
                            T.formateDateOther(new Date()) > a ? g.setData({
                                isAutoLoginFlag: !1
                            }) : g.setData({
                                isAutoLoginFlag: !0
                            }), t.data.result.addNum && g.data.adVedioLoad && !g.data.isAutoLoginFlag ? g.setData({
                                doubleReward: !0,
                                goodFriendStepNum: _.stepNum
                            }) : g.setData({
                                doubleReward: !1
                            }), b.diamondtype && void 0 != b.diamondtype && g.setData(e({}, "indexd.firePowerValue", t.data.result.diamondNumValue)), 
                            g.setData({
                                stepNum: t.data.result.stepNum
                            }), "7" == b.butype ? g.setData({
                                showRecallPopup: !0,
                                recallStep: b.con
                            }) : "6" == b.butype ? g.getSinInfo() : "17" == b.butype ? wx.navigateTo({
                                url: "/pages/index/productValue/productValue"
                            }) : "12" == b.butype || "13" == b.butype || "14" == b.butype || "15" == b.butype || "16" == b.butype ? "on" == E.task && g.setData({
                                stepCollectShare: !0,
                                stepCount: b.con,
                                stepShareType: "20"
                            }) : "4" == b.butype && "on" == E.friend ? g.setData({
                                stepCollectShare: !0,
                                stepCount: b.con,
                                stepShareType: "21"
                            }) : "2" == b.butype && "on" == E.invite ? g.setData({
                                stepCollectShare: !0,
                                stepCount: b.con,
                                stepShareType: "22"
                            }) : "22" == b.butype && "on" == E.question ? g.setData({
                                stepCollectShare: !0,
                                stepCount: b.con,
                                stepShareType: "23"
                            }) : "1" == b.butype && "on" == E.addShare && g.showAddShareFn(b.con, t.data.result.stepIncreaseId), 
                            b = {};
                        },
                        fail: function(e) {}
                    });
                    var v = !1;
                    if (g.data.bubbleArr) for (var m = 0; m < g.data.bubbleArr.length; m++) g.data.bubbleArr[m].id != d && (h.push(g.data.bubbleArr[m]), 
                    "75" == g.data.bubbleArr[m].butype && (v = !0));
                    if ("" != d && d) {
                        if (g.setData({
                            bubbleArr: h
                        }), !v && "75" == t.currentTarget.dataset.butype) return void l.getRDT(a, g, i.INDEX, "", !0);
                        h.length <= 0 && (g.data.slice++, p.INIT(g));
                    }
                } else {
                    if (this.data.showVideoPopup) return void (this.data.showVideoPopup = !1);
                    this.deleateArrBall(b.text), this.data.showVideoPopup = !0, this.videoShow();
                    var f = {
                        event: u.EVENT_LOG_HOMEADBUBBLE,
                        activity_name: "观看视频"
                    };
                    u.EVENT_LOG(f);
                    var w = {
                        event: u.EVENT_BSB_ADVERT_EVENTS,
                        advert_click: "观看视频",
                        advert_events: "首页-首屏-幸运气泡-气泡点击(视频)"
                    };
                    u.EVENT_THINKDATATRACK(w);
                }
            }
        }
    },
    getSinInfo: function() {
        var e = this;
        i.INDEX_GETSIGIN(function(t) {
            e.setData({
                siginResult: t.data.result,
                isOk: 1
            });
        });
    },
    changeto: function(e) {
        var t = this, a = t.data.exchangeRat || 6e-4, i = (e.currentTarget.dataset.stepnum * a).toFixed(4);
        this.setData({
            rate: i
        }), 0 == e.currentTarget.dataset.stepnum ? wx.showModal({
            content: "步数为 0 无法兑换燃力，多走一点步数再来兑换吧！",
            showCancel: !1
        }) : t.setData({
            showChangeNum: !0
        });
    },
    changeNum: function() {
        var e = this;
        e.voice("/audios/1.mp3"), i.EXCHANGE(e.data.stepNum, function(t) {
            var a = parseFloat(t.result.balance);
            e.setData({
                growthSteps: e.data.stepNum,
                stepNum: t.result.stepNum,
                balanceNum: a.toFixed(2),
                exchangeId: t.result.exchangeId,
                changeShareLinkUrl: t.result.linkUrl,
                showChangeNum: !1,
                activeFlage: !0
            }), e.getPopExchangeStepNumInfo(), t.result.unLockResp && t.result.unLockResp.unLock && e.setData({
                lvPopupList: t.result.unLockResp.upGradeRespList,
                popupIndex: 0
            });
            var i = {
                event: u.EVENT_LOG_HOMEMONEY
            };
            u.EVENT_LOG(i);
        });
    },
    hideChangeNumFn: function() {
        this.setData({
            showChangeNum: !1
        });
    },
    getPopExchangeStepNumInfo: function() {
        var e = this;
        o.POST({
            url: c.HTTP_URL + "api/share/frame",
            params: {},
            success: function(t) {
                "OK" == t.code && (e.getPopExchangeStepNumShareInfo(), e.setData({
                    popExchangeStepNumInfo: t.data.result,
                    popExchangeStepNum_visible: !0
                }));
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    closePopExchangeStepNum: function(e) {
        this.setData({
            popExchangeStepNum_visible: !1
        });
        var t = {
            event: "homePage_coin_button_click_share",
            share_card_id: x.id + ""
        };
        3 == e.target.dataset.type ? t.activity_type = "0" : t.activity_type = "1", u.EVENT_LOG(t);
    },
    getPopExchangeStepNumShareInfo: function() {
        h.SHARECARD("EXCHANGE", function(e) {
            "OK" == e.code && (x = e.data.result);
        });
    },
    getShareVideoInfo: function(e) {
        var t = this, a = void 0, i = void 0, n = "文章", r = c.INDEX_IMGTEXT;
        1 == t.data.elasticFrame && (n = "视频", r = c.INDEX_VIDEO);
        var s = "homePage_steps_to_coins_forward_page";
        if (1 == this.data.hjhShareType && (s = "homePage_addition_rule_forward_page"), 
        3 == t.data.elasticFrame && (n = "视频", r = c.INDEX_VIDEO, s = "homePage_steps_to_coins_forward_page_fire"), 
        e) {
            a = e.currentTarget.dataset.type, i = t.data.changeVideoInfo.id;
            var d = {
                event: s,
                activity_name: "换一个",
                activity_id: i + "",
                activity_type: n
            };
            u.EVENT_LOG(d);
        } else a = -1, i = t.data.changeVideoId;
        o.POST({
            url: r,
            params: {
                isSwitch: a,
                id: i
            },
            success: function(e) {
                t.data.addShareNum ? t.setData({
                    showAddShare: !0
                }) : t.setData({
                    showChange: 1
                }), t.setData({
                    changeVideoInfo: e.data.result
                });
                var a = {
                    event: s,
                    activity_name: "曝光",
                    activity_id: e.data.result.id + "",
                    activity_type: n
                };
                u.EVENT_LOG(a);
            },
            fail: function(e) {}
        });
    },
    hideAddShareFn: function() {
        this.setData({
            showAddShare: !1,
            addShareNum: 0,
            activeFlage: !1
        });
    },
    hideChangeFn: function() {
        this.setData({
            showChange: 0,
            activeFlage: !1
        }), this.linkChangeShareUrl();
        var e = "文章";
        1 == this.data.elasticFrame && (e = "视频");
        var t = "homePage_steps_to_coins_forward_page";
        1 == this.data.hjhShareType && (t = "homePage_addition_rule_forward_page"), 3 == this.data.elasticFrame && (e = "视频", 
        t = "homePage_steps_to_coins_forward_page_fire");
        var a = {
            event: t,
            activity_name: "关闭",
            activity_id: this.data.changeVideoInfo.id + "",
            activity_type: e
        };
        u.EVENT_LOG(a);
    },
    videoShare: function() {
        var e = "文章";
        1 == this.data.elasticFrame && (e = "视频");
        var t = "homePage_steps_to_coins_forward_page";
        1 == this.data.hjhShareType && (t = "homePage_addition_rule_forward_page"), 3 == this.data.elasticFrame && (t = "homePage_steps_to_coins_forward_page_fire", 
        e = "视频");
        var a = {
            event: t,
            activity_name: "分享给好友",
            activity_id: this.data.changeVideoInfo.id + "",
            activity_type: e
        };
        u.EVENT_LOG(a);
    },
    showInterstitialAd: function() {
        var e = this;
        if (!(s.CREATEBETWEENTIME() < 7)) {
            var t = new Date().toLocaleDateString(), a = wx.getStorageSync("interstitialAd_time");
            t != a ? F && F.show().then(function(a) {
                wx.setStorageSync("interstitialAd_time", t), e.data.showinterstitialAdFlag = !0;
            }).catch(function(e) {
                console.error(e);
            }) : (wx.clearStorageSync("interstitialAd_time"), this.data.showinterstitialAdFlag = !0);
        }
    },
    onShareAppMessage: function(e) {
        var t = this;
        t.data.activeFlage && (t.data.timeFlg = !0, t.data.lasttimes = new Date().getTime());
        var a = s.USERINFO().userId + "" + Date.parse(new Date()) / 1e3, i = {};
        if (i.event = u.EVENT_BSB_SHARE_EVENTS, i.share_card_id = a, e.target) {
            var n = "", o = this.data.shareImageurl, r = this.data.shareContent;
            1 == e.target.dataset.type ? (t.loadInterstitialAd(), n = u.EVENT_LOG_HOMESHARE, 
            i.share_events = "首页邀请") : 6 == e.target.dataset.type ? (t.setData({
                showRecallPopup: !1
            }), r = f.content.replace("%userName%", t.data.nickName), o = f.imgUrl, n = "indexRecallShare", 
            i.share_events = "首页-召回好友气泡分享弹窗分享") : 20 == e.target.dataset.type ? (n = "index_ClickTask_share", 
            t.hideStepCollectShare(), i.share_events = "首页-任务奖励气泡分享弹窗分享") : 21 == e.target.dataset.type ? (n = "index_ClickFriend_share", 
            t.hideStepCollectShare(), i.share_events = "首页-好友兑换气泡分享弹窗分享") : 22 == e.target.dataset.type ? (n = "index_ClickInvite_share", 
            t.hideStepCollectShare(), i.share_events = "首页-邀请气泡奖励分享弹窗分享") : 23 == e.target.dataset.type ? (n = "index_ClickQuestion_share", 
            t.hideStepCollectShare(), i.share_events = "首页-问答奖励分享弹窗分享") : "addFriend" == e.target.dataset.type ? (n = "homePage_add_friends", 
            i.share_events = "首页-B版加好友按钮分享") : n = "homePage_shareExchangeStep";
            var c = {
                event: n,
                share_source: "none",
                share_card_id: a
            };
            u.EVENT_LOG(c);
            var l = {
                share_loc: i.share_loc || "",
                share_events: i.share_events,
                flag: a
            };
            if (3 == e.target.dataset.type && (x && (r = x.content, o = x.imgUrl), i.share_events = "兑换成功分享", 
            i.share_card_id = x.id, l.flag = x.id), "video" == e.target.dataset.type) {
                if (t.data.changeVideoId = t.data.changeVideoInfo.id, i.share_events = "首页-步数兑换成功弹窗-视频分享", 
                l.basisPath = "/pages/community/videoInfo/videoInfo?videoId=" + t.data.changeVideoId, 
                l.source = 8, o = t.data.changeVideoInfo.imgUrl + "?x-oss-process=image/resize,m_fill,w_500,h_400/watermark,type_d3F5LXplbmhlaQ,size_30,image_ODE1NTg1MjAzMTRfLnBpY19oZC5qcGc,g_center", 
                2 == t.data.elasticFrame && (i.share_events = "首页-步数兑换成功弹窗-文章分享", l.basisPath = "/pages/index/productValue/productValue?pageType=15&article=" + t.data.changeVideoId + "&shareType=" + t.data.hjhShareType, 
                o = t.data.changeVideoInfo.imgUrl + "?x-oss-process=image/resize,m_fill,w_500,h_400", 
                l.source = 11), 3 == t.data.elasticFrame) {
                    i.share_events = "首页-步数兑换成功弹窗-视频分享-火力";
                    var g = new Date().getTime();
                    l.basisPath = "/pages/community/videoInfo/videoInfo?source=exchangeVideo&videoId=" + t.data.changeVideoId + "&fromUserId=" + s.USERINFO().userId + "&shareDate=" + g;
                }
                l.share_loc = i.share_events, l.share_events = "首页-步数兑换成功弹窗(新)", i.page_content_id = t.data.changeVideoId + "", 
                r = t.data.changeVideoInfo.title, l.videoId = t.data.changeVideoId;
            }
            return u.EVENT_THINKDATATRACK(i), {
                title: r,
                path: d.BASISSHAREPATH(l),
                imageUrl: o,
                success: function(e) {},
                fail: function(e) {}
            };
        }
        var p = {
            event: "index_share_rightBtn",
            share_card_id: a
        };
        i.share_loc = "右上角三个点", i.share_events = "首页右上角（三个点)", u.EVENT_LOG(p), u.EVENT_THINKDATATRACK(i);
        var h = {
            share_loc: i.share_loc || "",
            share_events: i.share_events,
            flag: a
        }, _ = d.BASISSHAREPATH(h);
        return {
            title: this.data.shareContent,
            path: _,
            imageUrl: this.data.shareImageurl,
            success: function(e) {}
        };
    },
    voice: function(e) {
        if (!wx.getStorageSync("openSysVoice")) {
            var t = wx.createInnerAudioContext();
            t.autoplay = !0, t.seek(0), t.src = e;
        }
    },
    toroles: function(e) {
        wx.navigateTo({
            url: "/pages/index/detailList/detailList?pagetype=" + e.currentTarget.dataset.pagetype
        });
        var t = {
            event: "homePage_fire_coin_detail"
        };
        u.EVENT_LOG(t);
    },
    toGrowth: function() {
        wx.navigateTo({
            url: "/pages/growth/growth"
        });
        var e = {
            event: "homePage_new_button_click",
            activity_type: "用户等级"
        };
        u.EVENT_LOG(e);
    },
    onHide: function() {
        this.data.leavePage = !0, wx.stopPullDownRefresh();
    },
    onUnload: function() {
        this.data.leavePage = !0;
    },
    onPullDownRefresh: function() {
        a.globalData.isRefreshList = !0, this.setData({
            canShowCoupon: !1
        }), this.userLogin(!0);
    },
    onReachBottom: function() {},
    activeRewardBtn: function() {
        this.setData({
            showRewardRedTip: !1
        }), wx.navigateTo({
            url: "/pages/index/activeReward/activeRewardB"
        });
        var e = {
            event: u.EVENT_LOG_HOMEPAGE_CLICKREWARDBUTTON,
            activity_type: "activeRewardB"
        };
        u.EVENT_LOG(e);
    },
    preventTouchMove: function() {},
    hideModal: function() {
        this.data.pageName = null, this.setData({
            showModal: !0
        }), l.getRDT(a, this, i.INDEX, "", !0);
    },
    onCancel: function() {
        this.setData({
            showModal: !0,
            showAuthorize: !0
        });
    },
    hideAuthorizeTip: function() {
        this.setData({
            showAuthorize: !1
        }), this.hideModal();
    },
    hideBuyTip: function() {
        this.setData({
            showBuyTip: !1
        });
    },
    hidePushMessageTip: function(e) {
        var t = e.currentTarget.dataset.type;
        "message" == t ? this.setData({
            indexPushResultShow: !1,
            indexPushResult: {}
        }) : "apple" == t && this.setData({
            randomBubble: !1
        });
        var a = {
            event: u.EVENT_INDEX_CLICK_PUSHMESSAGE,
            activity_type: "首页-弹窗-广告点击",
            commodity_id: e.currentTarget.dataset.appid,
            activity_name: "广告关闭（点叉）"
        };
        u.EVENT_LOG(a);
        var i = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_events: "首页-弹窗-广告点击",
            advert_loc_name: "首页-弹窗-广告点击",
            advert_click: "广告关闭（点叉）",
            page_content_id: e.currentTarget.dataset.appid
        };
        u.EVENT_THINKDATATRACK(i);
    },
    messageJumpPath: function(e) {
        var t = e.currentTarget.dataset.path;
        if (1 == t.jumpType) {
            var a = e.currentTarget.dataset.path.jumpLink;
            wx.navigateTo({
                url: a,
                fail: function() {
                    wx.showToast({
                        title: "该功能暂未开放",
                        icon: "none"
                    });
                }
            });
        } else if (3 == t.jumpType) {
            var i = t.jumpLink;
            wx.navigateTo({
                url: "/pages/webView/webView?webUrl=" + encodeURIComponent(i),
                fail: function() {
                    wx.showToast({
                        title: "该功能暂未开放",
                        icon: "none"
                    });
                }
            });
        }
        this.setData({
            indexPushResultShow: !1,
            indexPushResult: {}
        });
        var n = {
            event: u.EVENT_INDEX_CLICK_PUSHMESSAGE,
            activity_type: "首页-弹窗-站内消息—广告点击",
            advertId: t.jumpLink
        };
        u.EVENT_LOG(n);
        var o = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_events: "首页-弹窗-站内消息—广告点击",
            advert_loc_name: "首页-弹窗-广告点击",
            advert_click: "",
            page_content_id: t.jumpLink
        };
        u.EVENT_THINKDATATRACK(o);
    },
    goChange: function() {
        this.setData({
            showBuyTip: !1
        });
        var e = wx.createSelectorQuery();
        e.select("#NOVICE").boundingClientRect(), e.selectViewport().scrollOffset(), e.exec(function(e) {
            wx.pageScrollTo({
                scrollTop: e[0].top + e[1].scrollTop
            });
        });
    },
    gotoTop: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), a.globalData.gotoTop = !1;
    },
    onConfirm: function() {
        this.hideModal();
    },
    linkMore: function(e) {
        if (this.data.eventLinkMore = "", e.currentTarget.dataset.more && 1 == e.currentTarget.dataset.more) {
            var t = "顶部“更多”按钮";
            if ("2" == e.currentTarget.dataset.location && (t = "底部“查看更多”按钮"), "ORDINARY" == e.currentTarget.dataset.type || "TIME_PURCHASE" == e.currentTarget.dataset.type) this.setData({
                showCoupon: !1
            }), wx.navigateTo({
                url: "/pages/classify/classify?type=" + e.currentTarget.dataset.type + "&title=" + e.currentTarget.dataset.title
            }); else if ("HELP" == e.currentTarget.dataset.type) wx.navigateTo({
                url: "/pages/index/assistingarea/assistingarea?title=" + e.currentTarget.dataset.title + "&type=" + e.currentTarget.dataset.type
            }); else {
                if ("VIRTUAL" == e.currentTarget.dataset.type) return void wx.navigateTo({
                    url: "/pages/index/goodMoreList/goodMoreList?title=" + e.currentTarget.dataset.title + "&type=" + e.currentTarget.dataset.type
                });
                wx.navigateTo({
                    url: "/pages/classify/newClassify/newClassify?type=" + e.currentTarget.dataset.type + "&title=" + e.currentTarget.dataset.title
                });
            }
            var a = d.COMMODITYAREA(), i = {
                event: u.EVENT_LOG_CLICK_MORELINK,
                commodity_showcase_type: a[e.currentTarget.dataset.type],
                activity_type: t
            };
            u.EVENT_LOG(i);
        }
    },
    powerDrawer: function(e) {
        l.getRDT(a, this, i.INDEX, "", !0);
    },
    getMoreGoodsList: function() {
        var e = this;
        i.GETGOODSMORELIST({
            currentPage: e.data.pageNum,
            goodsType: "ORDINARY",
            pageSize: e.data.pageSize
        }, function(t) {
            if ("OK" == t.code) {
                e.data.pageNum * e.data.pageSize >= t.data.result.count ? e.setData({
                    isLast: !0
                }) : e.setData({
                    isLast: !1
                });
                var a = e.data.moreGoodsList.concat(t.data.result.data);
                e.setData({
                    moreGoodsList: a,
                    pageNum: e.data.pageNum + 1
                });
            } else wx.showToast({
                icon: "none",
                title: "加载数据失败"
            });
        });
        var t = {
            event: "index_click_findmore_release"
        };
        u.EVENT_LOG(t);
    },
    hideMoreGoodsList: function() {
        this.setData({
            pageNum: 1,
            moreGoodsList: [],
            isLast: !1
        });
        var e = {
            event: u.EVENT_LOG_CLICK_FINDMORE
        };
        u.EVENT_LOG(e);
    },
    config: function() {
        this.getConfig(), h.SHARECARD("STEP", function(e) {
            "OK" == e.code && (x = e.data.result);
        });
    },
    getConfig: function() {
        var e = this;
        i.INDEX_CONFIG(function(t) {
            "OK" == t.code && (t.data.result.SYSTEM_MAINTENANCE && wx.reLaunch({
                url: "/pages/index/maintain/maintain"
            }), t.data.result.CONGIG_INDEX_BACKGROUND && e.setData({
                exchangeBgImg: t.data.result.CONGIG_INDEX_BACKGROUND
            }), t.data.result.QUESTION_SWITCH && "on" == JSON.parse(t.data.result.QUESTION_SWITCH).onOff && e.setData({
                showAnsewrBtn: !0
            }), t.data.result.ADDITION_BUBBLE_NUM && (B = parseInt(t.data.result.ADDITION_BUBBLE_NUM)), 
            t.data.result.PRODUCT_VALUE && (a.globalData.productValueImg = t.data.result.PRODUCT_VALUE), 
            t.data.result.ADD_RULE && (a.globalData.addRuleImg = t.data.result.ADD_RULE), E = JSON.parse(t.data.result.BUBBLE_SWITCH), 
            f = JSON.parse(t.data.result.RECALL_BUBBLE), t.data.result.LUCKY_BUBBLE && e.setData({
                randomParms: JSON.parse(t.data.result.LUCKY_BUBBLE)
            }), t.data.result.LUCKY_VIDEO_BUBBLE && e.setData({
                randomVideoParms: JSON.parse(t.data.result.LUCKY_VIDEO_BUBBLE)
            }));
        });
    },
    getIndexActivityList: function() {
        var e = this;
        i.GETINDEXACTIVITYLIST(function(t) {
            if ("OK" === t.code) {
                var a = t.data.result, i = a.length > 4 ? a.slice(0, 4) : a;
                e.setData({
                    activityList: i
                });
            }
        });
    },
    clickGame: function(e) {
        var t = e.currentTarget.dataset.appid, a = {
            event: u.EVENT_LOG_INDEX_ACTIVITY_CLCIK,
            activity_type: e.currentTarget.dataset.name,
            commodity_id: t,
            activity_name: "广告内容点击（允许）"
        };
        u.EVENT_LOG(a);
        var i = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_events: e.currentTarget.dataset.name,
            advert_loc_name: e.currentTarget.dataset.name,
            advert_click: "广告内容点击（允许）",
            page_content_id: e.currentTarget.dataset.appid
        };
        u.EVENT_THINKDATATRACK(i);
    },
    thirdLog: function(e) {
        a.globalData.isnewuser;
        var t = this;
        String(s.USERINFO().userId);
        if (1 == e.currentTarget.dataset.isdisappear && t.getIndexActivityList(), 1 == e.currentTarget.dataset.type) {
            var i = e.currentTarget.dataset.url;
            -1 != i.search("pages/communityHomepage/community") ? 1 == e.currentTarget.dataset.unlockstatus || "undefined" == e.currentTarget.dataset.unlockstatus || void 0 == e.currentTarget.dataset.unlockstatus ? wx.switchTab({
                url: i,
                fail: function() {
                    wx.showToast({
                        title: "该功能已关闭",
                        icon: "none"
                    });
                }
            }) : wx.showToast({
                title: "提升至S1两星即可解锁",
                icon: "none"
            }) : -1 != i.search("pages/activityTab/activitytab") ? wx.switchTab({
                url: i,
                fail: function() {
                    wx.showToast({
                        title: "该功能已关闭",
                        icon: "none"
                    });
                }
            }) : wx.navigateTo({
                url: e.currentTarget.dataset.url,
                success: function() {
                    var t = e.currentTarget.dataset.activityid;
                    Object.is(t, 104) && wx.reportAnalytics("click_get_into_game_page", {
                        userid: String(s.USERINFO().userId)
                    });
                },
                fail: function() {
                    wx.showToast({
                        title: "该功能暂未开放",
                        icon: "none"
                    });
                }
            });
        } else if (3 == e.currentTarget.dataset.type) {
            e.currentTarget.dataset.url;
            wx.navigateTo({
                url: "/pages/webView/webView?webUrl=" + encodeURIComponent(e.currentTarget.dataset.url),
                fail: function() {
                    wx.showToast({
                        title: "该功能暂未开放",
                        icon: "none"
                    });
                }
            });
        } else if (2 == e.currentTarget.dataset.type) {
            var n = e.currentTarget.dataset, o = n.activityid, r = n.appid;
            Object.is(o, 104) && wx.reportAnalytics("click_indexactivegamesucc_num", {
                appid: String(r)
            });
        }
        e.currentTarget.dataset.appid;
        if ("101" == e.currentTarget.dataset.activityid) {
            var d = {
                event: u.EVENT_LOG_ENTER_INDEX_COMMUNITY,
                enter_source: "首页五个模块化入口中的步友圈"
            };
            u.EVENT_LOG(d);
        } else {
            var c = e.currentTarget.dataset.appid, l = {
                event: u.EVENT_LOG_INDEX_ACTIVITY_CLCIK,
                activity_type: e.currentTarget.dataset.name,
                commodity_id: c,
                activity_name: "广告点击"
            };
            u.EVENT_LOG(l);
            var g = {
                event: u.EVENT_BSB_ADVERT_EVENTS,
                advert_events: e.currentTarget.dataset.name,
                advert_loc_name: e.currentTarget.dataset.name,
                advert_click: "广告点击",
                page_content_id: e.currentTarget.dataset.appid
            };
            u.EVENT_THINKDATATRACK(g);
        }
    },
    clickAdSuccess: function(e) {
        var t = e.currentTarget.dataset, a = (t.activityid, t.appid), i = {
            event: u.EVENT_LOG_INDEX_ACTIVITY_CLCIK,
            activity_type: e.currentTarget.dataset.name,
            commodity_id: a,
            activity_name: "广告内容点击（允许）"
        };
        u.EVENT_LOG(i);
        var n = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_events: e.currentTarget.dataset.name,
            advert_loc_name: e.currentTarget.dataset.name,
            advert_click: "广告内容点击（允许）",
            page_content_id: e.currentTarget.dataset.appid
        };
        u.EVENT_THINKDATATRACK(n);
    },
    clickFail: function(e) {
        var t = e.currentTarget.dataset.appid, a = {
            event: u.EVENT_LOG_INDEX_ACTIVITY_CLCIK,
            activity_type: e.currentTarget.dataset.name,
            commodity_id: t,
            activity_name: "广告内容关闭（取消)"
        };
        u.EVENT_LOG(a);
        var i = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_events: e.currentTarget.dataset.name,
            advert_loc_name: e.currentTarget.dataset.name,
            advert_click: "广告内容关闭（取消)",
            page_content_id: e.currentTarget.dataset.appid
        };
        u.EVENT_THINKDATATRACK(i);
    },
    loadBottomAdError: function() {
        this.setData({
            noBottomAd: !0
        });
    },
    loadTimeAdError: function() {
        this.setData({
            noTimeAd: !0
        });
    },
    loadHelpAdError: function() {
        this.setData({
            noHelpAd: !0
        });
    },
    loadInviteAdError: function() {
        this.setData({
            noInviteAd: !0
        });
    },
    loadVirtualAdError: function() {
        this.setData({
            noVirtualAd: !0
        });
    },
    loadBottomAd: function() {
        this.setData({
            noBottomAd: !1
        });
    },
    loadTimeAd: function() {
        this.setData({
            noTimeAd: !1
        });
    },
    loadHelpAd: function() {
        this.setData({
            noHelpAd: !1
        });
    },
    loadInviteAd: function() {
        this.setData({
            noInviteAd: !1
        });
    },
    loadVirtualAd: function() {
        this.setData({
            noVirtualAd: !1
        });
    },
    closeNewShow: function() {
        this.setData({
            newusershow: !1
        });
    },
    clickAdFail: function(e) {
        var t = {
            event: u.EVENT_HOMEPAGEADBUTTON,
            activity_type: m[e.currentTarget.dataset.areatype],
            activity_name: "广告内容关闭（取消）",
            commodity_id: e.currentTarget.dataset.appid
        };
        u.EVENT_LOG(t);
        var a = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_events: m[e.currentTarget.dataset.areatype],
            advert_loc_name: m[e.currentTarget.dataset.areatype],
            advert_click: "广告内容关闭（取消）",
            page_content_id: e.currentTarget.dataset.appid
        };
        u.EVENT_THINKDATATRACK(a);
    },
    clickAdSucess: function(e) {
        var t = {
            event: u.EVENT_HOMEPAGEADBUTTON,
            activity_type: m[e.currentTarget.dataset.areatype],
            activity_name: "广告内容点击（允许）",
            commodity_id: e.currentTarget.dataset.appid
        };
        u.EVENT_LOG(t);
        var a = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_events: m[e.currentTarget.dataset.areatype],
            advert_loc_name: m[e.currentTarget.dataset.areatype],
            advert_click: "广告内容点击（允许）",
            page_content_id: e.currentTarget.dataset.appid
        };
        u.EVENT_THINKDATATRACK(a), d.insertUserAdvert(e.currentTarget.dataset.appid, 9);
    },
    clickAd: function(e) {
        var t = {
            event: u.EVENT_HOMEPAGEADBUTTON,
            activity_type: m[e.currentTarget.dataset.areatype],
            activity_name: "广告点击",
            commodity_id: e.currentTarget.dataset.appid
        };
        u.EVENT_LOG(t);
        var a = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_events: m[e.currentTarget.dataset.areatype],
            advert_loc_name: m[e.currentTarget.dataset.areatype],
            advert_click: "广告点击",
            page_content_id: e.currentTarget.dataset.appid
        };
        u.EVENT_THINKDATATRACK(a);
    },
    linkUrl: function(e) {
        if (1 == e.currentTarget.dataset.type) {
            var t = e.currentTarget.dataset.url;
            wx.navigateTo({
                url: t,
                fail: function() {
                    wx.showToast({
                        title: "该功能暂未开放",
                        icon: "none"
                    });
                }
            });
        }
        if (3 == e.currentTarget.dataset.type) {
            var a = e.currentTarget.dataset.url;
            wx.navigateTo({
                url: "/pages/webView/webView?webUrl=" + encodeURIComponent(a),
                fail: function() {
                    wx.showToast({
                        title: "该功能暂未开放",
                        icon: "none"
                    });
                }
            });
        }
        var i = {
            event: u.EVENT_HOMEPAGEADBUTTON,
            activity_type: m[e.currentTarget.dataset.areatype],
            activity_name: e.currentTarget.dataset.url
        };
        u.EVENT_LOG(i);
    },
    maskAuthorized: function(e) {
        var t = this;
        if (e.detail.userInfo) {
            e.currentTarget.dataset.buttontype && "accreditsuccess" == e.currentTarget.dataset.buttontype && t.setData({
                showModal: !0,
                showAuthorize: !1
            }), a.globalData.userLogindetail = e.detail, 1 != a.globalData.getWRD && s.SYNCUSERINFO(e.detail, function(e) {
                a.globalData.getWRD = !0;
            }), l.getRDT(a, t, i.INDEX, "", !0), a.globalData.showAuthorizedMask = !1, t.setData({
                showAuthorizedMask: !1
            });
            var n = {
                event: u.EVENT_LOG_PERSONINFO,
                activity_name: "首页"
            };
            u.EVENT_LOG(n);
        } else {
            t.setData({
                showAuthorize: !0
            });
            var o = {
                event: u.EVENT_LOG_PERSONINFO,
                activity_name: "首页-二次授权失败"
            };
            u.EVENT_LOG(o);
        }
    },
    authorizedbtn: function() {
        var e = {
            event: u.EVENT_LOG_PERSONINFO,
            activity_name: "点击授权按钮"
        };
        u.EVENT_LOG(e);
    },
    newMsgReminder: function() {
        var e = this;
        h.GETREWARDINFO(function(t) {
            if (a.globalData.hide = !1, "OK" == t.code) {
                if (null != t.data.hintImageUrl && "" != t.data.hintImageUrl ? e.setData({
                    hintImageUrlFlage: !0,
                    v5Image: t.data.hintImageUrl
                }) : e.setData({
                    hintImageUrlFlage: !1
                }), e.getIndexActivityList(), t.data.result.diamondValue) {
                    e.setData({
                        diamondValue: t.data.result.diamondValue,
                        firePower: t.data.result.firePower,
                        diamondMask: !0
                    });
                    var i = {
                        event: "diamond_to_firepower_page_click",
                        activity_name: "曝光"
                    };
                    u.EVENT_LOG(i);
                } else e.setData({
                    diamondMask: !1
                });
                1 == t.data.index.hasRemind ? (wx.setStorageSync("unreadmsgactive", "2323232"), 
                e.setData({
                    activityNews: !0
                })) : e.setData({
                    activityNews: !1
                }), t.data.index.myRemind && wx.showTabBarRedDot({
                    index: 3
                }), t.data.index.myRemind ? e.setData({
                    newsIndexMsg: !0
                }) : e.setData({
                    newsIndexMsg: !1
                });
                var n = parseFloat(t.data.index.balance);
                e.setData({
                    balanceNum: n.toFixed(2),
                    entranceNum: t.data.result.entranceNum
                });
                var o = [ "答题大作战", "视频", "摇钱树", "抽奖" ], r = t.data.result.entranceNum - 1, s = {
                    event: "indexAnswerBtnClick_new",
                    activity_name: r >= 0 ? o[r] : o[0],
                    activity_type: "曝光"
                };
                u.EVENT_LOG(s), t.data.result.onShow ? e.setData({
                    showRewardBtn: !0,
                    showRewardRedTip: t.data.result.hasRemind
                }) : e.setData({
                    showRewardBtn: !1,
                    showRewardRedTip: t.data.result.hasRemind
                }), e.setData({
                    mallAdvert: t.data.mallAdvert
                });
            }
        });
    },
    answerShowBtnClick: function() {
        var e = this;
        if (1 == this.data.entranceNum) wx.navigateTo({
            url: "/pages/answer/pages/answer"
        }); else if (2 == this.data.entranceNum) wx.navigateTo({
            url: "/pages/community/videoTask/videoTask"
        }); else if (3 == this.data.entranceNum) wx.navigateTo({
            url: "/pages/activity/moneytree/moneytree"
        }); else {
            if (4 != this.data.entranceNum) return;
            wx.navigateTo({
                url: "/pages/activity/luckdraw/luckdraw"
            });
        }
        var t = {
            event: "indexAnswerBtnClick_new",
            activity_name: [ "答题大作战", "视频", "摇钱树", "抽奖" ][e.data.entranceNum - 1],
            activity_type: "点击"
        };
        u.EVENT_LOG(t);
    },
    hideRecallPopup: function() {
        this.setData({
            showRecallPopup: !1
        });
    },
    hideStepCollectShare: function() {
        this.setData({
            stepShareType: "",
            stepCollectShare: !1,
            stepCount: 0
        });
    },
    gotoPushMessageScuess: function(e) {
        var t = {
            event: u.EVENT_INDEX_CLICK_PUSHMESSAGE,
            activity_type: "首页-弹窗-广告点击",
            commodity_id: e.currentTarget.dataset.appid,
            activity_name: "广告内容进入（允许）"
        };
        u.EVENT_LOG(t);
        var a = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_events: "首页-弹窗-广告点击",
            advert_loc_name: "首页-弹窗-广告点击",
            advert_click: "广告内容进入（允许）",
            page_content_id: e.currentTarget.dataset.appid
        };
        u.EVENT_THINKDATATRACK(a);
    },
    clickPush: function(e) {
        var t = {
            event: u.EVENT_INDEX_CLICK_PUSHMESSAGE,
            activity_type: "首页-弹窗-广告点击",
            commodity_id: e.currentTarget.dataset.appid,
            activity_name: "广告点击"
        };
        u.EVENT_LOG(t);
        var a = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_events: "首页-弹窗-广告点击",
            advert_loc_name: "首页-弹窗-广告点击",
            advert_click: "广告点击",
            page_content_id: e.currentTarget.dataset.appid
        };
        u.EVENT_THINKDATATRACK(a);
    },
    clickPushFail: function(e) {
        var t = {
            event: u.EVENT_INDEX_CLICK_PUSHMESSAGE,
            activity_type: "首页-弹窗-广告点击",
            commodity_id: e.currentTarget.dataset.appid,
            activity_name: "广告内容关闭（取消）"
        };
        u.EVENT_LOG(t);
        var a = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_events: "首页-弹窗-广告点击",
            advert_loc_name: "首页-弹窗-广告点击",
            advert_click: "广告内容关闭（取消）",
            page_content_id: e.currentTarget.dataset.appid
        };
        u.EVENT_THINKDATATRACK(a);
    },
    gotoApplicationScuess: function() {
        for (var e = [], t = 0; t < this.data.bubbleArr.length; t++) {
            var a = this.data.bubbleArr[t];
            24 != a.butype && e.push(a);
        }
        this.setData({
            bubbleArr: e
        }), this.storeLoginCount();
        var i = Date.parse(new Date()), n = {};
        n.timestamp = i, n.second = this.data.randomParms.second, this.setData({
            randomBubble: !1
        }), wx.setStorage({
            key: "random_active_time",
            data: n
        });
        var o = {
            event: u.EVENT_INDEX_CLICK_PUSHMESSAGE,
            activity_type: "幸运气泡-小程序",
            commodity_id: this.data.randomParms.appId
        };
        u.EVENT_LOG(o);
    },
    getAPPlicationReward: function() {
        var e = "random_active_time", t = wx.getStorageSync(e);
        if ("{}" != JSON.stringify(t) && null != t && t) {
            var a = Date.parse(new Date()) - t.timestamp, i = t.second;
            if (0 != i && void 0 != i && "undefined" != i || (i = 20), t) if (a / 1e3 < i) {
                for (var n = [], o = 0; o < this.data.bubbleArr.length; o++) {
                    var r = this.data.bubbleArr[o];
                    24 != r.butype && n.push(r);
                }
                this.setData({
                    bubbleArr: n
                }), wx.removeStorageSync(e);
            } else {
                var s = this;
                d.GETDATAWITHUSERID(c.INDEX_STEP_INDEX_LUCK, function(e) {
                    s.hideball();
                }), wx.removeStorageSync(e);
            }
        }
    },
    storeLoginCount: function() {
        var e = new Date().toLocaleDateString(), t = {};
        t.timeDate = e, t.count = 1, wx.setStorageSync("hjhLoginCountLucks", t);
    },
    getUserInfor: function() {
        var e = this;
        s.USERINFO().userId ? o.POST({
            url: c.INDEX_GETUSERINFO,
            params: {},
            success: function(t) {
                "OK" == t.code ? ("levelLimit" == t.data.testType && (a.globalData.levelLimitsTest = !0, 
                e.setData({
                    levelLimitsTest: !0
                })), "{}" != JSON.stringify(t.data.userInfo) && null != t.data.userInfo ? (a.globalData.userLogindetail = t.data, 
                a.globalData.showAuthorizedMask = !1, a.globalData.createTime = t.data.userInfo.createTime, 
                a.globalData.isShowModel = !0, e.setData({
                    showAuthorizedMask: !1
                }), e.userLogin()) : e.getUserNickName()) : e.getUserNickName();
            },
            fail: function(t) {
                console.log(c.INDEX_GETUSERINFO, t), e.getUserNickName();
            }
        }) : this.getUserNickName();
    },
    getUserNickName: function() {
        var e = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.werun"] && e.setData({
                    canShowCoupon: !0
                }), t.authSetting["scope.userInfo"] ? (a.globalData.showAuthorizedMask = !1, a.globalData.isShowModel = !0, 
                e.setData({
                    showModal: !0,
                    showAuthorizedMask: !1
                }), console.log("%%%sadsada"), e.userLogin(), wx.getUserInfo({
                    success: function(e) {
                        a.globalData.userLogindetail = e;
                    }
                })) : (a.globalData.showAuthorizedMask = !0, e.setData({
                    showAuthorizedMask: !0
                }), a.globalData.isShowModel || (a.globalData.isShowModel = !0, e.setData({
                    showModal: !1
                })), e.userLogin());
            },
            fail: function(t) {
                console.log(t, "授权失败"), e.userLogin();
            }
        });
    }
}, e(t, "powerDrawer", function() {
    this.setData({
        isOk: 2
    });
}), e(t, "pushFormSubmit", function(e) {
    i.CHECKFID(e.detail.formId, 3, function(e) {});
}), e(t, "initAdVedio", function() {
    var e = this;
    this.data.pageName && null != this.data.pageName || D && null != D || wx.getSystemInfo({
        success: function(t) {
            var a = t.SDKVersion.replace(/\./g, "");
            parseInt(a) > 250 && (D = wx.createRewardedVideoAd({
                adUnitId: "adunit-913957d577078d57",
                multiton: !0
            }), H = wx.createRewardedVideoAd({
                adUnitId: "adunit-e486b5ae126a32c8",
                multiton: !0
            }), e.loadAdvedio(), e.loadAdvedioDou());
        }
    });
}), e(t, "throttleFn", T.throttle(function(t) {
    var a = this;
    if (console.log(a.data.goodFriendStepNum), a.data.isAdditionVideo) return o.POST({
        url: c.HTTP_URL + "api/bubble/addVideoBubble",
        params: {
            stepNum: a.data.goodFriendStepNum
        },
        success: function(e) {
            a.setData({
                stepNum: e.data.result.stepTotalNum,
                isAdditionVideo: !1
            });
        }
    }), void a.initAdVedio();
    var i = {};
    i.bubbleType = "26", o.POST({
        url: c.api_saveLuckyBubble,
        params: i,
        success: function(t) {
            a.setData(e({
                stepNum: t.data.result.stepTotalNum
            }, "indexd.firePowerValue", t.data.result.diamondTotalNum));
            var i = {
                event: u.EVENT_BSB_ADVERT_EVENTS,
                advert_click: "领取奖励",
                advert_events: "首页-首屏-幸运气泡-领取奖励"
            };
            u.EVENT_THINKDATATRACK(i);
        },
        fail: function(e) {}
    });
    var n = [];
    if (a.data.bubbleArr) for (var r = 0; r < a.data.bubbleArr.length; r++) 26 != a.data.bubbleArr[r].butype && n.push(a.data.bubbleArr[r]);
    a.setData({
        bubbleArr: n
    }), n.length <= 0 && (a.data.slice++, p.INIT(a));
    var s = {
        event: u.EVENT_BSB_ADVERT_EVENTS,
        advert_click: "观看结束关闭广告",
        advert_events: "首页-首屏-幸运气泡-结束关闭广告"
    };
    u.EVENT_THINKDATATRACK(s);
}, 5e3)), e(t, "loadAdvedio", function() {
    var e = this;
    D.onLoad(function(t) {
        e.setData({
            adVedioLoad: !0
        });
        var a = {
            event: u.EVENT_LOG_HOMEADBUBBLE,
            activity_name: "视频加载成功"
        };
        u.EVENT_LOG(a);
        var i = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_click: "视频加载成功",
            advert_events: "首页-首屏-幸运气泡-加载成功(视频)"
        };
        u.EVENT_THINKDATATRACK(i);
    }), D.onError(function(t) {
        e.setData({
            adVedioLoad: !1
        });
    }), D.onClose(function(t) {
        if (e.setData({
            adVedioLoad: !1,
            showVideoPopup: !1
        }), t.isEnded) e.throttleFn(); else {
            var a = {
                event: u.EVENT_BSB_ADVERT_EVENTS,
                advert_click: "中途结束关闭广告",
                advert_events: "首页-首屏-幸运气泡-中途关闭广告"
            };
            u.EVENT_THINKDATATRACK(a);
        }
    });
}), e(t, "loadAdvedioDou", function() {
    var e = this;
    H.onLoad(function(t) {
        e.setData({
            adVedioLoad: !0
        });
        var a = {
            event: u.EVENT_LOG_HOMEADBUBBLE,
            activity_name: "视频加载成功"
        };
        u.EVENT_LOG(a, function(e) {});
        var i = {
            event: u.EVENT_BSB_ADVERT_EVENTS,
            advert_click: "视频加载成功",
            advert_events: "首页-首屏-幸运气泡-加载成功(视频)"
        };
        u.EVENT_THINKDATATRACK(i);
    }), H.onError(function(t) {
        e.setData({
            adVedioLoad: !1
        });
    }), H.onClose(function(t) {
        if (e.setData({
            adVedioLoad: !1,
            showVideoPopup: !1
        }), !t.isEnded) {
            var a = {
                event: "homePage_advert_ExchangeStep",
                activity_name: "好友加成双倍奖励观看中途关闭广告"
            };
            return u.EVENT_LOG(a, function(e) {}), void e.setData({
                isAdditionVideo: !1
            });
        }
        e.throttleFn();
    });
}), e(t, "videoShow", function(e) {
    var t = this;
    if (t.data.isAutoLoginFlag) {
        var a = T.formateDateOther(new Date());
        wx.setStorageSync("checkBox", a);
    }
    if (e) if ("doubleReward" == e.currentTarget.dataset.type) {
        t.setData({
            isAdditionVideo: !0,
            doubleReward: !1
        });
        var i = {
            event: "homePage_friendsBall_button_click_receive",
            activity_type: "2"
        };
        u.EVENT_THINKDATATRACK(i), console.log("########################看视频"), H.show().catch(function(e) {
            console.log("##################看视频错误", e), t.setData({
                adVedioLoad: !1
            });
        });
    } else console.log("******************************看视频"), D.show().catch(function(e) {
        console.log("******************************看视频错误", e), t.setData({
            adVedioLoad: !1
        });
    }); else t.setData({
        isAdditionVideo: !1
    }), console.log("******************************看视频"), D.show().catch(function(e) {
        console.log("******************************看视频错误", e), t.setData({
            adVedioLoad: !1
        });
    });
}), e(t, "newmsg", function() {
    wx.navigateTo({
        url: "/pages/subpackage/message/message"
    });
    var e = {
        event: u.EVENT_HOMEPAGE_CLICK_MESSAGE_BTN
    };
    u.EVENT_LOG(e);
}), e(t, "hideTip", function(e) {
    this.setData({
        showAddDesktop: !1
    });
}), e(t, "finishGuide", function(e) {
    this.setData({
        randomGoodsBool: !1
    }), l.getRDT(a, this, i.INDEX, "", !0);
    var t = {
        event: "homepage_test001_new_user_forward_page",
        activity_name: e.currentTarget.dataset.type
    };
    u.EVENT_LOG(t);
}), e(t, "invalidFn", function() {}), e(t, "getCouponList", function() {
    var e = this;
    o.POST({
        url: c.API_COUPONLIST,
        params: {},
        success: function(t) {
            "OK" == t.code && t.data.list.length > 0 && (s.CREATEBETWEENTIME() > 15 && e.setData({
                couponList: t.data.list,
                showCoupon: !0
            }), wx.showTabBarRedDot({
                index: 3
            }));
        },
        fail: function(e) {}
    });
}), e(t, "hideCouponPopup", function() {
    this.setData({
        showCoupon: !1
    });
}), e(t, "hidePopupFn", function() {
    var e = this;
    e.data.popupIndex == e.data.lvPopupList.length ? e.setData({
        popupIndex: -1,
        lvPopupList: []
    }) : e.setData({
        popupIndex: e.data.popupIndex + 1
    }), l.getRDT(a, e, i.INDEX, "", !0);
}), e(t, "loadWxAd", function() {
    s.CREATEBETWEENTIME() < 7 || new Date().toLocaleDateString() != wx.getStorageSync("interstitialAd_time") && (F && null != F && this.data.showinterstitialAdFlag || wx.createInterstitialAd && ((F = wx.createInterstitialAd({
        adUnitId: "adunit-660d5c6c74884884"
    })).onLoad(function() {
        console.log("插屏成功");
    }), F.onError(function(e) {
        console.log("插屏失败");
    }), F.onClose(function() {})));
}), e(t, "toActive", function() {
    wx.navigateTo({
        url: "/pages/index/activeReward/activeRewardB"
    }), this.setData({
        numsMask: !1
    });
    var e = Date.parse(new Date());
    wx.getStorage({
        key: "uppie",
        success: function(t) {
            t.data.timestamp = e, t.data.mask = !1, wx.setStorage({
                key: "uppie",
                data: t.data
            });
        }
    });
    var t = {
        event: "synchronous_ceiling_forward_page_click",
        activity_name: "提升等级"
    };
    u.EVENT_LOG(t);
}), e(t, "upperClose", function() {
    this.setData({
        numsMask: !1
    });
    var e = Date.parse(new Date());
    this.data.value.timestamp = e, this.data.value.mask = !1, wx.setStorage({
        key: "uppie",
        data: this.data.value
    });
    var t = {
        event: "synchronous_ceiling_forward_page_click",
        activity_name: "关闭（取消）"
    };
    u.EVENT_LOG(t);
}), e(t, "gotoFireDetail", function() {
    wx.navigateTo({
        url: "/pages/index/fireDetail/fireDetail"
    });
    var e = {
        event: "homePage_firepower_zone_button_click",
        activity_name: "当前火力值"
    };
    u.EVENT_LOG(e);
}), e(t, "gotoFireRule", function() {
    wx.navigateTo({
        url: "/pages/index/productValue/productValue?type=1&titleName=火力值介绍"
    }), wx.setStorageSync("lookFireRule", "looked");
    var e = {
        event: "homePage_firepower_zone_button_click",
        activity_name: "什么是火力值"
    };
    u.EVENT_LOG(e);
}), e(t, "showAddShareFn", function(e, t) {
    var a = this, i = new Date(), n = "" + i.getFullYear() + i.getMonth() + i.getDate(), o = wx.getStorageSync("hjh_addition_time"), r = {}, s = !1;
    o ? n != o.firTime ? (s = !0, r.shareTime = 1, r.firTime = n) : parseInt(B) > parseInt(o.share_num) && (s = !0, 
    r.share_num = 1 + parseInt(o.share_num), r.firTime = n) : (s = !0, r.share_num = 1, 
    r.firTime = n), s && (wx.setStorageSync("hjh_addition_time", r), a.setData({
        activeFlage: !0,
        elasticFrame: 2,
        addShareNum: e,
        stepIncreaseId: t,
        hjhShareType: 1
    }), a.getShareVideoInfo());
}), e(t, "userRecallRepost", function() {
    if ("" != S && S != s.USERINFO().userId) {
        var e = {};
        e.recallId = S, o.POST({
            url: c.API_USERRECALL,
            params: e,
            success: function(e) {
                console.log("召回奖励**********8", e), S = "";
            },
            fail: function(e) {
                S = "";
            }
        });
    }
}), e(t, "linkChangeShareUrl", function() {
    var e = this, t = new Date(), a = "" + t.getFullYear() + t.getMonth() + t.getDate();
    a != wx.getStorageSync("changeShareLink_time") && (e.data.changeShareLinkUrl && (-1 != e.data.changeShareLinkUrl.indexOf("activityTab/activitytab") || -1 != e.data.changeShareLinkUrl.indexOf("communityHomepage/community") ? wx.switchTab({
        url: e.data.changeShareLinkUrl
    }) : wx.navigateTo({
        url: e.data.changeShareLinkUrl
    })), wx.setStorageSync("changeShareLink_time", a));
}), e(t, "goToFeedback", function() {
    wx.navigateTo({
        url: "/pages/subpackage/Feedback/Feedback"
    });
    var e = {
        event: "homepage_advice_feedback_button"
    };
    u.EVENT_LOG(e);
}), e(t, "loadInterstitialAd", function() {
    if (!(s.CREATEBETWEENTIME() < 7)) {
        var e = T.getLoginCounts("indexShareCount");
        T.setStorageCount("indexShareCount"), e > 1 || (wx.createInterstitialAd && ((U = wx.createInterstitialAd({
            adUnitId: "adunit-822da9f32c0239c6"
        })).onLoad(function() {}), U.onError(function(e) {}), U.onClose(function() {})), 
        U && U.show().catch(function(e) {
            console.error(e);
        }));
    }
}), e(t, "showIntroductionFn", function() {
    this.setData({
        showIntroduction: !0
    });
    var e = {
        event: "homepage_test004_click",
        activity_type: "玩法介绍"
    };
    u.EVENT_LOG(e);
    var t = {
        event: "homepage_test004_click",
        activity_type: "玩法介绍弹窗-曝光"
    };
    u.EVENT_LOG(t);
}), e(t, "hideIntroductionFn", function(e) {
    this.setData({
        showIntroduction: !1
    });
    var t = {
        event: "homepage_test004_click",
        activity_type: e.currentTarget.dataset.type
    };
    u.EVENT_LOG(t);
}), e(t, "hideFirstChangeFn", function() {
    this.setData({
        showFirstChange: !1
    }), l.getRDT(a, this, i.INDEX, "");
    var e = {
        event: "homepage_test004_click",
        activity_type: "燃力兑换成功-关闭"
    };
    u.EVENT_LOG(e);
}), e(t, "freeChangeFn", function() {
    this.setData({
        showFirstChange: !1
    }), wx.navigateTo({
        url: "/pages/index/goodlist/goodlist?goodid=4029"
    });
    var e = {
        event: "homepage_test004_click",
        activity_type: "燃力兑换成功-看看我能免费兑换什么"
    };
    u.EVENT_LOG(e);
}), e(t, "touchmoveNoScroll", function() {}), e(t, "closeDouble", function(e) {
    var t = this;
    if (t.setData({
        doubleReward: !1
    }), t.data.isAutoLoginFlag) {
        var a = T.formateDateOther(new Date());
        wx.setStorageSync("checkBox", a);
    }
    if ("1" == e.currentTarget.dataset.type) {
        var i = {
            event: "homePage_friendsBall_button_click_receive",
            activity_type: "1"
        };
        u.EVENT_THINKDATATRACK(i);
    } else {
        var n = {
            event: "homePage_friendsBall_button_click_receive",
            activity_type: "0"
        };
        u.EVENT_THINKDATATRACK(n);
    }
}), e(t, "openFirstRedBag", function() {
    this.setData({
        money: .3,
        showBagClose: !1
    });
    var e = {
        event: "community_vedio_detail_page",
        activity_id: this.data.videoId + "",
        activity_type: "红包弹窗页面_开"
    };
    u.EVENT_LOG(e, function(e) {});
}), e(t, "linkIndex", function(e) {
    wx.navigateTo({
        url: "/pages/activity/signView/signViewB/signViewB?isVideopage=true"
    }), this.setData({
        newFirst: !1
    });
    wx.setStorage({
        key: "newFirst",
        data: !1
    });
    var t = {
        event: "community_vedio_detail_page",
        activity_id: this.data.videoId + "",
        activity_type: "开出红包弹窗_点我领红包"
    };
    u.EVENT_LOG(t, function(e) {});
}), e(t, "hideRedBagFn", function() {
    this.setData({
        newFirst: !1
    });
    wx.setStorage({
        key: "newFirst",
        data: !1
    });
}), e(t, "autoLoginClick", function(e) {
    var t = this;
    t.setData({
        isAutoLoginFlag: !t.data.isAutoLoginFlag
    });
}), e(t, "getRollExchangeRecord", function() {
    var e = this;
    o.POST({
        url: c.HTTP_URL + "api/exchange/rollExchangeRecord",
        params: {},
        success: function(t) {
            if ("OK" == t.code) {
                var a = t.data.result;
                e.setData({
                    rollExchangeRecordList: a
                });
            }
        }
    });
}), e(t, "gotoMallActivity", function() {
    var e = this;
    wx.navigateTo({
        url: e.data.mallAdvert.url
    });
    var t = {
        event: "homePage_click",
        activity_type: "2"
    };
    u.EVENT_THINKDATATRACK(t);
}), e(t, "showPopTask", function() {
    var e = this;
    e.setData({
        popTaskHidden: !1
    });
    var t = wx.createAnimation({
        duration: 400,
        timingFunction: "ease"
    });
    e.animation = t, setTimeout(function() {
        e.popTaskFadeIn();
    }, 200);
}), e(t, "hidePopTask", function() {
    var e = this, t = wx.createAnimation({
        duration: 400,
        timingFunction: "ease"
    });
    e.animation = t, e.popTasknFadeDown(), setTimeout(function() {
        e.setData({
            popTaskHidden: !0
        });
    }, 500);
}), e(t, "popTaskFadeIn", function() {
    this.animation.translateY(0).step(), this.setData({
        popTaskAnimation: this.animation.export()
    });
}), e(t, "popTasknFadeDown", function() {
    this.animation.translateY("100%").step(), this.setData({
        popTaskAnimation: this.animation.export()
    });
}), e(t, "getPlayList", function() {
    var e = this, t = {};
    o.POST({
        url: c.HTTP_URL + "api/play/list",
        params: t,
        success: function(t) {
            if ("OK" == t.code) {
                e.setData({
                    playList: t.data.result,
                    playFlage: !0,
                    tochMoveFlage: !0
                });
                var a = {
                    event: "play_game_detail",
                    activity_type: "1"
                };
                u.EVENT_THINKDATATRACK(a);
            }
        }
    });
}), e(t, "getPlayPrize", function(e, t, a) {
    var i = this, n = {};
    n.advertId = e, n.viewSecond = t, o.POST({
        url: c.HTTP_URL + "api/play/getAward",
        params: n,
        success: function(e) {
            if ("OK" == e.code) {
                wx.showToast({
                    title: "领取成功",
                    icon: "none",
                    duration: 2e3
                });
                var t = {
                    event: "play_game_detail",
                    activity_type: "3",
                    adv_id: a
                };
                u.EVENT_THINKDATATRACK(t), wx.removeStorage({
                    key: "playcont",
                    success: function(e) {
                        console.log(e);
                    }
                }), i.getPlayList();
            }
        }
    });
}), e(t, "toOthreSucess", function(e) {
    console.log(e);
    var t = Date.parse(new Date()), a = {};
    a.timestamp = t, a.id = e.currentTarget.dataset.id, a.viewSecond = e.currentTarget.dataset.viewsecond, 
    a.awardStatus = e.currentTarget.dataset.awardstatus, a.rewardStep = e.currentTarget.dataset.rewardstep, 
    a.appid = e.currentTarget.dataset.appid, wx.setStorage({
        key: "playcont",
        data: a
    });
    var i = {
        event: "play_game_detail",
        activity_type: "4",
        adv_id: e.currentTarget.dataset.appid
    };
    u.EVENT_THINKDATATRACK(i);
}), e(t, "toOther", function(e) {
    console.log(e.currentTarget.dataset.appid);
    var t = {
        event: "play_game_detail",
        activity_type: "2",
        adv_id: e.currentTarget.dataset.appid
    };
    u.EVENT_THINKDATATRACK(t);
}), e(t, "playMaskClose", function() {
    this.setData({
        playFlage: !1,
        tochMoveFlage: !1
    });
}), e(t, "toSelectedZone", function() {
    wx.navigateTo({
        url: "/pages/selectedZone/selectedZone"
    });
    var e = {
        event: "homePage_zone_click",
        activity_name: "精选专区"
    };
    u.EVENT_THINKDATATRACK(e);
}), e(t, "toWishZone", function() {
    wx.navigateTo({
        url: "/pages/subpackage/wish/wishZone/wishZone"
    });
    var e = {
        event: "homePage_zone_click",
        activity_name: "心愿专区"
    };
    u.EVENT_THINKDATATRACK(e);
}), e(t, "linkAd", function(e) {
    var t = e.currentTarget.dataset.adurl, a = e.currentTarget.dataset.adindex;
    wx.navigateTo({
        url: t
    });
    var i = {
        event: "homePage_adver_click",
        activity_type: 2,
        activity_id: 2 == a ? 1 : 2
    };
    u.EVENT_LOG(i);
}), e(t, "vMaskClose", function() {
    this.setData({
        hintImageUrlFlage: !1
    });
}), e(t, "gotoMalls", function() {
    wx.switchTab({
        url: "/pages/mallsHome/mallsHome"
    }), this.setData({
        popActivityRem_show: !1
    });
    var e = {
        event: "homePage_click",
        activity_type: "4"
    };
    u.EVENT_THINKDATATRACK(e);
}), e(t, "closePopActivityRem", function() {
    this.setData({
        popActivityRem_show: !1
    });
}), t));