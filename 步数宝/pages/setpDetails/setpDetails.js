var t = require("../../utils/room.js"), e = require("../../utils/toast.js"), a = (require("../../utils/urls.js"), 
require("../../utils/event.js")), r = (require("../../utils/wglogin.js"), getApp()), n = require("../../utils/urlGL.js"), i = n.TYPEVALUE(), s = null;

Page({
    data: {
        list: [],
        currentPage: 1,
        hasmore: !0,
        show: !0,
        enter_time: 0
    },
    onLoad: function(t) {
        this.loadDetails(), this.loadAdvert(), wx.createInterstitialAd && ((s = wx.createInterstitialAd({
            adUnitId: "adunit-635041760a065c76"
        })).onLoad(function() {}), s.onError(function(t) {}), s.onClose(function() {})), 
        s && s.show().catch(function(t) {
            console.error(t);
        });
    },
    onShow: function() {
        this.setData({
            enter_time: Date.parse(new Date()) / 1e3
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            list: [],
            hasmore: !0,
            currentPage: 1
        }), this.loadDetails();
    },
    onReachBottom: function() {
        this.data.hasmore ? this.loadDetails() : wx.showToast({
            title: "没有更多消息了",
            icon: "none"
        });
    },
    onUnload: function() {
        var t = {
            event: a.EVENT_LOG_INDEX_STEPDETAILS,
            total_time: Date.parse(new Date()) / 1e3 - this.data.enter_time
        };
        a.EVENT_LOG(t, function(t) {});
    },
    loadDetails: function() {
        this.setData({
            stepNow: r.globalData.allStempNumber
        });
        var a = this;
        t.STEPDETAILS(a.data.currentPage, 15, function(t) {
            if (wx.stopPullDownRefresh(), "OK" == t.code) {
                var r = a.data.list, n = t.data.result.data;
                void 0 != n && (n.length > 0 ? n.length < 15 ? a.setData({
                    list: r.concat(n),
                    hasmore: !1,
                    show: !0
                }) : a.setData({
                    list: r.concat(n),
                    hasmore: !0,
                    currentPage: a.data.currentPage + 1,
                    show: !0
                }) : !a.data.list.length > 0 && a.setData({
                    showNotice: !1,
                    show: !1
                }));
            } else e.FAIL(t.msg), a.setData({
                showNotice: !1,
                show: !1
            });
        });
    },
    loadAdvert: function() {
        var e = this;
        t.GETADVERINFO(4, function(t) {
            "OK" == t.code && e.setData({
                listswiper: t.data.result
            });
        });
    },
    clickAdFail: function(t) {
        var e = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: i[t.currentTarget.dataset.areatype],
            activity_name: "广告内容关闭（取消）",
            commodity_id: t.currentTarget.dataset.appid
        };
        a.EVENT_LOG(e, function(t) {});
        var r = {
            event: a.EVENT_BSB_ADVERT_EVENTS,
            advert_events: i[t.currentTarget.dataset.areatype],
            advert_loc_name: i[t.currentTarget.dataset.areatype],
            advert_click: "广告内容关闭（取消）",
            page_content_id: t.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(r);
    },
    clickAdSucess: function(t) {
        var e = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: i[t.currentTarget.dataset.areatype],
            activity_name: "广告内容点击（允许）",
            commodity_id: t.currentTarget.dataset.appid
        };
        a.EVENT_LOG(e, function(t) {});
        var r = {
            event: a.EVENT_BSB_ADVERT_EVENTS,
            advert_events: i[t.currentTarget.dataset.areatype],
            advert_loc_name: i[t.currentTarget.dataset.areatype],
            advert_click: "广告内容点击（允许）",
            page_content_id: t.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(r), n.insertUserAdvert(t.currentTarget.dataset.appid, 4);
    },
    clickAd: function(t) {
        var e = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: i[t.currentTarget.dataset.areatype],
            activity_name: "广告点击",
            commodity_id: t.currentTarget.dataset.appid
        };
        a.EVENT_LOG(e, function(t) {});
        var r = {
            event: a.EVENT_BSB_ADVERT_EVENTS,
            advert_events: i[t.currentTarget.dataset.areatype],
            advert_loc_name: i[t.currentTarget.dataset.areatype],
            advert_click: "广告点击",
            page_content_id: t.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(r);
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