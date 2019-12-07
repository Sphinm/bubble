var t = require("../../utils/activity.js"), e = (require("../../utils/wglogin.js"), 
require("../../utils/room.js")), a = require("../../utils/event.js"), i = (getApp(), 
require("../../utils/urlGL.js")), n = i.TYPEVALUE();

Page({
    data: {
        list: [],
        isDisabled: !1,
        enter_time: 0,
        noAd: !1,
        showAuthorize: !1,
        clickTab: !1
    },
    onTabItemTap: function(t) {
        if (!this.data.clickTab) {
            this.data.clickTab = !0;
            var e = {
                event: "homePage_tab_button_click",
                activity_name: t.text,
                activity_type: t.index + ""
            };
            a.EVENT_LOG(e, function(t) {});
        }
    },
    clickCell: function(t) {
        var e = t.currentTarget.dataset.type, i = e.type, n = e.id;
        if (this.browseActivity(n), 1 == i) wx.navigateTo({
            url: e.path
        }); else if (2 == i) {
            wx.navigateTo({
                url: e.path
            });
            var r = {
                event: a.ENENT_LOG_APP_CLICK_CHALLENGE
            };
            a.EVENT_LOG(r, function(t) {});
        } else if (3 == i) {
            wx.navigateTo({
                url: e.path
            });
            var c = {
                event: a.ENENT_LOG_APP_CLICK_FRIENDCALL
            };
            a.EVENT_LOG(c, function(t) {});
        } else if (4 == i) {
            wx.navigateToMiniProgram({
                appId: e.appId,
                path: e.path,
                success: function(t) {
                    var i = {
                        event: a.EVENT_APP_CLICKGAMEBOX,
                        commodity_id: e.appId,
                        activity_name: "点击（允许）"
                    };
                    a.EVENT_LOG(i, function(t) {});
                    var n = {
                        event: a.EVENT_BSB_ADVERT_EVENTS,
                        advert_events: "活动页-小程序",
                        advert_loc_name: "活动页-小程序",
                        advert_click: " 点击（允许）",
                        page_content_id: e.appId
                    };
                    a.EVENT_THINKDATATRACK(n);
                },
                fail: function(t) {
                    var i = {
                        event: a.EVENT_APP_CLICKGAMEBOX,
                        commodity_id: e.appId,
                        activity_name: "关闭（取消）"
                    };
                    a.EVENT_LOG(i, function(t) {});
                    var n = {
                        event: a.EVENT_BSB_ADVERT_EVENTS,
                        advert_events: "活动页-小程序",
                        advert_loc_name: "活动页-小程序",
                        advert_click: " 关闭（取消）",
                        page_content_id: e.appId
                    };
                    a.EVENT_THINKDATATRACK(n);
                }
            });
            var _ = {
                event: a.EVENT_APP_CLICKGAMEBOX,
                commodity_id: e.appId,
                activity_name: "点击"
            };
            a.EVENT_LOG(_, function(t) {});
            var T = {
                event: a.EVENT_BSB_ADVERT_EVENTS,
                advert_events: "活动页-小程序",
                advert_loc_name: "活动页-小程序",
                advert_click: " 点击",
                page_content_id: e.appId
            };
            a.EVENT_THINKDATATRACK(T);
        } else if (7 == i) {
            var E = {
                event: a.EVENT_ACTIVEWELFARECLICK
            };
            a.EVENT_LOG(E, function(t) {}), wx.navigateTo({
                url: e.path
            });
        } else if (8 == i) {
            var v = {
                event: a.EVENT_ACTIVEHOTHELCLICK
            };
            a.EVENT_LOG(v, function(t) {}), wx.navigateTo({
                url: e.path
            });
        } else if (22 == i) {
            var o = {
                event: "active_show_click",
                activity_type: "点击",
                active_name: "赏金挑战赛"
            };
            a.EVENT_LOG(o, function(t) {}), wx.navigateTo({
                url: e.path
            });
        } else {
            var u = {
                event: a.EVENT_ACTIVEBTNCLICKOTHERTYPE,
                activity_type: i + "",
                active_name: e.activityName
            };
            a.EVENT_LOG(u, function(t) {}), wx.navigateTo({
                url: e.path
            });
        }
    },
    onShow: function() {
        var e = this;
        this.data.clickTab = !1, e.onTabItemTapRemind(), t.GETTABACTIVELIST(function(t) {
            e.setData({
                list: t.data.result
            });
            for (var i = 0; i < t.data.result.length; i++) {
                if (22 == t.data.result[i].id) {
                    var n = {
                        event: "active_show_click",
                        activity_type: "展示",
                        active_name: "赏金挑战赛"
                    };
                    a.EVENT_LOG(n, function(t) {});
                    break;
                }
                switch (t.data.result[i].type) {
                  case 9:
                    if (!t.data.result[i].unLockStatus) {
                        var r = {
                            event: "activity_page_unused_functions",
                            activity_type: "曝光",
                            activity_name: "摇钱树"
                        };
                        a.EVENT_LOG(r, function(t) {});
                    }
                    break;

                  case 5:
                    if (!t.data.result[i].unLockStatus) {
                        var c = {
                            event: "activity_page_unused_functions",
                            activity_type: "曝光",
                            activity_name: "抽奖"
                        };
                        a.EVENT_LOG(c, function(t) {});
                    }
                    break;

                  case 3:
                    if (!t.data.result[i].unLockStatus) {
                        var _ = {
                            event: "activity_page_unused_functions",
                            activity_type: "曝光",
                            activity_name: "好友召回"
                        };
                        a.EVENT_LOG(_, function(t) {});
                    }
                }
            }
        }), this.data.enter_time = Date.parse(new Date()) / 1e3;
    },
    onTabItemTapRemind: function() {
        wx.getStorageInfoSync("unreadmsgactive") && e.BROWSE(function(t) {
            "OK" == t.code && wx.removeStorageSync("unreadmsgactive");
        });
    },
    onGotUserInfo: function(t) {
        var e = t.currentTarget.dataset.type.id;
        this.browseActivity(e), wx.navigateTo({
            url: "/pages/activity/luckdraw/luckdraw"
        });
        var i = {
            event: "app_click_luckdraw"
        };
        a.EVENT_LOG(i, function(t) {});
    },
    browseActivity: function(e) {
        t.BROWSEACTIVITY(e, function(t) {});
    },
    onHide: function() {
        var t = {
            event: a.EVENT_LOG_INDEX_ENTER_ACTIVITY,
            total_time: Date.parse(new Date()) / 1e3 - this.data.enter_time
        };
        a.EVENT_LOG(t, function(t) {});
    },
    loadAdError: function() {
        this.setData({
            noAd: !0
        }), this.loadAdvert();
    },
    loadAd: function() {
        this.setData({
            noAd: !1
        });
    },
    loadAdvert: function() {
        var t = this;
        e.GETADVERINFO(11, function(e) {
            "OK" == e.code && t.setData({
                listswiper: e.data.result
            });
        });
    },
    clickAdFail: function(t) {
        var e = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: n[t.currentTarget.dataset.areatype],
            activity_name: "广告内容关闭（取消）",
            commodity_id: t.currentTarget.dataset.appid
        };
        a.EVENT_LOG(e, function(t) {});
        var i = {
            event: a.EVENT_BSB_ADVERT_EVENTS,
            advert_events: n[t.currentTarget.dataset.areatype],
            advert_loc_name: n[t.currentTarget.dataset.areatype],
            advert_click: "广告内容关闭（取消）",
            page_content_id: t.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(i);
    },
    clickAdSucess: function(t) {
        var e = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: n[t.currentTarget.dataset.areatype],
            activity_name: "广告内容点击（允许）",
            commodity_id: t.currentTarget.dataset.appid
        };
        a.EVENT_LOG(e, function(t) {});
        var r = {
            event: a.EVENT_BSB_ADVERT_EVENTS,
            advert_events: n[t.currentTarget.dataset.areatype],
            advert_loc_name: n[t.currentTarget.dataset.areatype],
            advert_click: "广告内容点击（允许）",
            page_content_id: t.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(r), i.insertUserAdvert(t.currentTarget.dataset.appid, 11);
    },
    clickAd: function(t) {
        var e = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: n[t.currentTarget.dataset.areatype],
            activity_name: "广告点击",
            commodity_id: t.currentTarget.dataset.appid
        };
        a.EVENT_LOG(e, function(t) {});
        var i = {
            event: a.EVENT_BSB_ADVERT_EVENTS,
            advert_events: n[t.currentTarget.dataset.areatype],
            advert_loc_name: n[t.currentTarget.dataset.areatype],
            advert_click: "广告点击",
            page_content_id: t.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(i);
    },
    linkUrl: function(t) {
        if (1 == t.currentTarget.dataset.type) {
            t.currentTarget.dataset.url;
            wx.navigateTo({
                url: t.currentTarget.dataset.url,
                fail: function() {
                    wx.showToast({
                        title: "该功能暂未开放",
                        icon: "none"
                    });
                }
            });
        }
        if (3 == t.currentTarget.dataset.type) {
            t.currentTarget.dataset.url;
            wx.navigateTo({
                url: "/pages/webView/webView?webUrl=" + encodeURIComponent(t.currentTarget.dataset.url),
                fail: function() {
                    wx.showToast({
                        title: "该功能暂未开放",
                        icon: "none"
                    });
                }
            });
        }
        var e = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: t.currentTarget.dataset.areatype,
            activity_name: t.currentTarget.dataset.url
        };
        a.EVENT_LOG(e, function(t) {});
    }
});