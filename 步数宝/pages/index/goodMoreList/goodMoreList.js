getApp();

var t = require("../../index/js/onGotUserInfo.js"), o = require("../../../utils/room.js"), a = require("../../../utils/event.js"), e = require("../../../utils/urls.js"), t = require("../../index/js/onGotUserInfo.js"), s = require("../../../utils/request.js");

Page({
    data: {
        pageSize: 10,
        pageNum: 1,
        isLast: !1,
        goodsList: [],
        noAd: !1,
        amount: "",
        goodsType: "",
        couponId: "",
        couponNum: "",
        couponStatus: !1
    },
    onLoad: function(t) {
        console.log(t);
        var o = this;
        wx.setNavigationBarTitle({
            title: t.title
        }), o.setData({
            goodsType: t.type
        }), "SHOP" == t.type && o.setData({
            amount: 100 * t.amount,
            toSatisfiedAmount: t.amount,
            couponId: t.couponId,
            couponNum: t.couponNum
        }), t.amount > 0 ? o.setData({
            couponStatus: !1
        }) : o.setData({
            couponStatus: !0
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        console.log(t.data.goodsType), 0 == t.data.goodsList.length && ("SHOP" == t.data.goodsType ? t.getShopList(1) : t.getGoodsMoreList(1));
    },
    getGoodsMoreList: function(t, a) {
        a || wx.showLoading({
            title: "正在加载..."
        });
        var e = this;
        o.GETGOODSMORELIST({
            currentPage: t,
            goodsType: e.data.goodsType,
            pageSize: e.data.pageSize
        }, function(o) {
            if ("OK" == o.code) {
                if (1 === t) e.setData({
                    goodsList: o.data.result.data,
                    pageNum: 1
                }); else {
                    var a = e.data.goodsList.concat(o.data.result.data);
                    e.setData({
                        goodsList: a,
                        pageNum: t
                    });
                }
                e.data.pageNum * e.data.pageSize >= o.data.result.count ? e.setData({
                    isLast: !0
                }) : e.setData({
                    isLast: !1
                }), wx.hideLoading(), wx.stopPullDownRefresh();
            } else wx.hideLoading(), wx.stopPullDownRefresh();
        }, function(t) {
            wx.hideLoading(), wx.stopPullDownRefresh();
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        "SHOP" == t.data.goodsType ? t.getShopList(1, !0) : t.getGoodsMoreList(1, !0);
    },
    onReachBottom: function() {
        var t = this;
        t.data.isLast || ("SHOP" == t.data.goodsType ? t.getShopList(t.data.pageNum + 1) : t.getGoodsMoreList(t.data.pageNum + 1));
    },
    onGotUserInfo: function(o) {
        t.OGTUI(o);
        var e = {
            commodity_id: o.currentTarget.dataset.id,
            event: a.EVENT_LOG_HOMEPRODUCT_SECOND,
            enter_source: o.currentTarget.dataset.index,
            activity_type: this.data.goodsType,
            activity_name: o.currentTarget.dataset.name
        };
        a.EVENT_LOG(e, function(t) {});
    },
    getShopList: function(t, o) {
        o || wx.showLoading({
            title: "正在加载..."
        });
        var a = this;
        s.POST({
            url: e.PROMOTIONLIST,
            params: {
                pageSize: 10,
                currentPage: t,
                amount: a.data.amount
            },
            success: function(o) {
                if (wx.hideLoading(), "OK" == o.code) {
                    if (1 === t) a.setData({
                        goodsList: o.data.result,
                        pageNum: 1
                    }); else {
                        var e = a.data.goodsList.concat(o.data.result);
                        a.setData({
                            goodsList: e,
                            pageNum: t
                        });
                    }
                    a.data.pageNum * a.data.pageSize >= o.data.desc ? a.setData({
                        isLast: !0
                    }) : a.setData({
                        isLast: !1
                    }), wx.hideLoading(), wx.stopPullDownRefresh();
                } else wx.hideLoading(), wx.stopPullDownRefresh();
            },
            fail: function(t) {
                wx.hideLoading(), console.log(t);
            }
        });
    },
    addShopCare: function(t) {
        wx.showLoading({
            title: "正在加载..."
        });
        var o = this;
        s.POST({
            url: e.ADD_SHOP,
            params: {
                goodsId: t.currentTarget.dataset.id,
                goodsNum: 1,
                selectStatus: 1
            },
            success: function(a) {
                wx.hideLoading(), "OK" == a.code ? (o.gitPromoteCoupon(t), wx.showToast({
                    title: "已添加到购物车",
                    icon: "none",
                    duration: 2e3
                }), wx.stopPullDownRefresh()) : (wx.showToast({
                    title: a.msg,
                    icon: "none",
                    duration: 2e3
                }), wx.hideLoading(), wx.stopPullDownRefresh());
            },
            fail: function(t) {
                wx.hideLoading(), console.log(t);
            }
        });
    },
    gitPromoteCoupon: function(t) {
        var o = this;
        s.POST({
            url: e.ADD_SHOP_COUPON,
            params: {
                goodsId: t.currentTarget.dataset.id,
                couponReqId: o.data.couponId,
                amount: 100 * o.data.toSatisfiedAmount
            },
            success: function(t) {
                "OK" == t.code ? (o.setData({
                    toSatisfiedAmount: t.data.result.toSatisfiedAmount,
                    couponNum: t.data.result.couponAmount
                }), t.data.result.toSatisfiedAmount > 0 ? o.setData({
                    couponStatus: !1
                }) : o.setData({
                    couponStatus: !0
                }), wx.stopPullDownRefresh()) : wx.stopPullDownRefresh();
            },
            fail: function(t) {
                console.log(t);
            }
        });
    }
});