getApp();

var e = require("../../../utils/wglogin.js"), t = require("../../../utils/event.js"), a = require("../../../utils/urls.js"), o = (require("../../../utils/urlGL.js"), 
require("../../../utils/request.js")), i = require("../../../utils/util.js"), d = null;

Page({
    data: {
        pageType: 0,
        vedioState: 0,
        shareGoods: null,
        userId: "",
        fromUserId: "",
        shareGoodsId: "",
        shareDetailInfo: {},
        viewNum: 1,
        videoAdTime: 0
    },
    onLoad: function(a) {
        var o = e.USERINFO().userId, i = a.fromUserId, d = a.shareGoodsId, r = a.pageType, n = wx.getStorageSync("wh_shareGoods");
        if (this.setData({
            userId: o,
            fromUserId: i,
            shareGoodsId: d,
            pageType: r,
            shareGoods: n
        }), this.getShareDetailInfo(), 1 == this.data.pageType) {
            this.onLoadVideoAd();
            var s = {
                event: "firepower_zone_goods_share_enter_page_click",
                activity_name: "曝光",
                activity_id: d + "",
                activity_type: "曝光-分享进入落地页"
            };
            t.EVENT_LOG(s, function(e) {});
        } else {
            var c = {
                event: "coinonly_zone_goods_share_enter_page_click",
                activity_name: "曝光",
                activity_id: d + "",
                activity_type: "曝光-分享进入落地页"
            };
            t.EVENT_LOG(c, function(e) {});
        }
    },
    onShow: function() {
        Date.parse(new Date());
    },
    onUnload: function() {
        var e = {};
        e.timestamp = Date.parse(new Date()), e.videoAdTime = this.data.videoAdTime, wx.setStorage({
            key: "timeData",
            data: e
        });
    },
    getShareDetailInfo: function() {
        var e = this;
        o.POST({
            url: a.api_landingPage,
            params: {
                fromUserId: e.data.fromUserId,
                goodsId: e.data.shareGoodsId,
                shareGoods: e.data.shareGoods,
                userId: e.data.userId
            },
            success: function(t) {
                "OK" == t.code ? e.setData({
                    shareDetailInfo: t.data.result
                }) : (wx.showToast({
                    title: t.msg,
                    icon: "none"
                }), e.gotoIndex());
            },
            fail: function(e) {}
        });
    },
    gotoGoodsDet: function(e) {
        var a = e.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/index/goodlist/goodlist?goodid=" + a
        });
        var o = "firepower_zone_goods_share_enter_page_click";
        2 == this.data.pageType && (o = "coinonly_zone_goods_share_enter_page_click");
        var i = {
            event: o,
            activity_name: "点击",
            activity_id: this.data.shareGoodsId + "",
            activity_type: "商品点击"
        };
        t.EVENT_LOG(i, function(e) {});
    },
    onLoadVideoAd: function() {
        var e = this;
        wx.createRewardedVideoAd && ((d = wx.createRewardedVideoAd({
            adUnitId: "adunit-4d4eb9c5f6b8fd44"
        })).onError(function(e) {
            wx.showToast({
                title: "暂无可观看视频，去APP上观看吧！",
                icon: "none"
            });
        }), d.onClose(function(a) {
            if (a && a.isEnded || void 0 === a) e.videoAdRewardFirepower(); else {
                e.setData({
                    vedioState: 2
                });
                var o = {
                    event: "firepower_zone_goods_share_enter_page_click",
                    activity_name: "点击",
                    activity_id: e.data.shareGoodsId + "",
                    activity_type: "帮看失败"
                };
                t.EVENT_LOG(o, function(e) {});
            }
        }));
    },
    openVideoAd: function(e) {
        if (this.hideChangeFn(), d) {
            d.show().catch(function(e) {
                d.load().then(function() {
                    return d.show();
                });
            });
            var a = {
                event: "firepower_zone_goods_share_enter_page_click",
                activity_name: "点击",
                activity_id: this.data.shareGoodsId + "",
                activity_type: e.currentTarget.dataset.type
            };
            t.EVENT_LOG(a, function(e) {});
        }
    },
    videoAdRewardFirepower: i.throttle(function(e) {
        var i = this;
        o.POST({
            url: a.api_videoAdRewardFirepower,
            params: {
                fromUserId: i.data.fromUserId,
                goodsId: i.data.shareGoodsId
            },
            success: function(e) {
                "OK" == e.code ? (i.getShareDetailInfo(), i.setData({
                    viewNum: i.data.viewNum + 1,
                    vedioState: 1
                })) : wx.showToast({
                    title: e.msg,
                    icon: "none"
                });
            },
            fail: function(e) {}
        });
        var d = {
            event: "firepower_zone_goods_share_enter_page_click",
            activity_name: "点击",
            activity_id: i.data.shareGoodsId + "",
            activity_type: "帮看成功"
        };
        t.EVENT_LOG(d, function(e) {});
    }, 6e3),
    hideChangeFn: function() {
        this.setData({
            vedioState: 3
        });
    },
    gotoIndex: function(e) {
        wx.navigateBack({});
        var a = "firepower_zone_goods_share_enter_page_click";
        1 != this.data.pageType && (a = "coinonly_zone_goods_share_enter_page_click");
        var o = {
            event: a,
            activity_name: "点击",
            activity_id: this.data.shareGoodsId + "",
            activity_type: e.currentTarget.dataset.type
        };
        t.EVENT_LOG(o, function(e) {});
    }
});