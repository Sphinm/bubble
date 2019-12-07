var t = require("../../../utils/room.js"), e = require("../../../utils/event.js"), a = (require("../../../utils/wglogin.js"), 
require("../../../utils/request.js")), n = require("../../../utils/urls.js"), i = require("../../../utils/urlGL.js"), r = getApp(), s = null;

Page({
    data: {
        list: [],
        enter_time: 0,
        leave_time: 0,
        pagetype: 1,
        tabIndex: 0,
        userVersion: !1,
        balanceA: 0,
        balanceB: 0
    },
    onLoad: function(t) {
        this.loadAdvert(), wx.createInterstitialAd && ((s = wx.createInterstitialAd({
            adUnitId: "adunit-3221307245cf1e96"
        })).onLoad(function() {}), s.onError(function(t) {}), s.onClose(function() {})), 
        s && s.show().catch(function(t) {
            console.error(t);
        }), t.pagetype && void 0 != t.pagetype && this.setData({
            pagetype: t.pagetype
        }), this.data.enter_time = Date.parse(new Date()) / 1e3;
        var e = 0;
        1 == this.data.pagetype ? (e = 1, this.getDiamondDetail()) : this.getBalanceDetaile(), 
        console.log(t.pagetype), this.setData({
            userVersion: r.globalData.userVersion,
            tabIndex: e
        });
    },
    onUnload: function() {
        var t = {
            event: e.EVENT_LOG_RAN_DETAILS,
            total_time: Date.parse(new Date()) / 1e3 - this.data.enter_time
        };
        e.EVENT_LOG(t, function(t) {});
    },
    loadAdvert: function() {
        var e = this;
        t.GETADVERINFO(3, function(t) {
            "OK" == t.code && e.setData({
                listswiper: t.data.result
            });
        });
    },
    getBalanceDetaile: function() {
        var e = this;
        t.GETBALANCEDETAILES(function(t) {
            var a = t.data.result.balance, n = "", i = "";
            if (-1 != a.indexOf(".")) {
                var r = a.toString();
                n = parseInt(r.substring(0, r.indexOf("."))), i = a.substring(a.indexOf("."));
            } else n = a, i = "";
            e.setData({
                list: t.data.result.list,
                balanceA: n,
                balanceB: i
            });
        });
    },
    getDiamondDetail: function(t) {
        var e = this;
        a.POST({
            url: n.diamondDetail,
            params: {},
            success: function(t) {
                var a = t.data.result.numValue, n = "", i = "";
                if (-1 != a.indexOf(".")) {
                    var r = a.toString();
                    n = parseInt(r.substring(0, r.indexOf("."))), i = a.substring(a.indexOf("."));
                } else n = a, i = "";
                e.setData({
                    list: t.data.result.detailsResps,
                    balanceA: n,
                    balanceB: i
                });
            },
            fail: function(t) {}
        });
    },
    clickAdFail: function(t) {
        var a = {
            event: e.EVENT_HOMEPAGEADBUTTON,
            activity_type: "index_ran",
            activity_name: "close",
            commodity_id: t.currentTarget.dataset.appid
        };
        e.EVENT_LOG(a, function(t) {});
        var n = {
            event: e.EVENT_BSB_ADVERT_EVENTS,
            advert_events: "首页-首屏-燃力明细-banner",
            advert_loc_name: "首页-首屏-燃力明细-banner",
            advert_click: "广告内容关闭（取消）",
            page_content_id: t.currentTarget.dataset.appid
        };
        e.EVENT_THINKDATATRACK(n);
    },
    clickAdSucess: function(t) {
        var a = {
            event: e.EVENT_HOMEPAGEADBUTTON,
            activity_type: "index_ran",
            activity_name: "done",
            commodity_id: t.currentTarget.dataset.appid
        };
        e.EVENT_LOG(a, function(t) {});
        var n = {
            event: e.EVENT_BSB_ADVERT_EVENTS,
            advert_events: "首页-首屏-燃力明细-banner",
            advert_loc_name: "首页-首屏-燃力明细-banner",
            advert_click: "广告内容点击（允许）",
            page_content_id: t.currentTarget.dataset.appid
        };
        e.EVENT_THINKDATATRACK(n), i.insertUserAdvert(t.currentTarget.dataset.appid, 3);
    },
    clickAd: function(t) {
        var a = {
            event: e.EVENT_HOMEPAGEADBUTTON,
            activity_type: "index_ran",
            activity_name: "click",
            commodity_id: t.currentTarget.dataset.appid
        };
        e.EVENT_LOG(a, function(t) {});
        var n = {
            event: e.EVENT_BSB_ADVERT_EVENTS,
            advert_events: "首页-首屏-燃力明细-banner",
            advert_loc_name: "首页-首屏-燃力明细-banner",
            advert_click: "广告点击",
            page_content_id: t.currentTarget.dataset.appid
        };
        e.EVENT_THINKDATATRACK(n);
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
        var a = {
            event: e.EVENT_HOMEPAGEADBUTTON,
            activity_type: "index_ran",
            activity_name: t.currentTarget.dataset.url
        };
        e.EVENT_LOG(a, function(t) {});
    },
    clickTable: function(t) {
        this.setData({
            tabIndex: t.currentTarget.dataset.index,
            pagetype: t.currentTarget.dataset.index
        });
        var a = "activity_type";
        1 == this.data.pagetype ? (this.getDiamondDetail(), a = "钻石明细") : (this.getBalanceDetaile(), 
        a = "燃力明细");
        var n = {
            event: "homePage_new_button_details_click",
            activity_type: a
        };
        e.EVENT_LOG(n, function(t) {});
    },
    toActive: function() {
        wx.navigateTo({
            url: "/pages/index/activeReward/activeRewardB"
        });
    }
});