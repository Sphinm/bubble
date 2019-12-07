function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

getApp();

var e = require("../../utils/request.js"), a = require("../index/js/onGotUserInfo.js"), i = require("../../utils/room.js"), r = require("../../utils/urlGL.js"), n = require("../../utils/event.js"), s = require("../../utils/urls.js"), o = wx.getSystemInfoSync().windowWidth / 750 * 132, d = r.COMMODITYAREA(), c = {}, u = [], l = void 0;

Page({
    data: {
        shopCarNum: 0,
        windowHeight: "",
        autoplay: !1,
        duration: 0,
        curIndex: 0,
        tabIndex: 0,
        pageSize: 10,
        swiperHeight: 240,
        menu_list: [],
        firstLoaded: !1,
        enter_time: 0,
        goodsType: "",
        isFix: !1,
        title: ""
    },
    onLoad: function(t) {
        l = 750 * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth, 
        wx.setNavigationBarTitle({
            title: t.title
        }), this.data.title = t.title;
        var e = this;
        e.setData({
            goodsType: t.type,
            windowHeight: l
        }), console.log(t.type), i.GETCLASSIFYMENUSLISTBYTYPE(e.data.goodsType, function(t) {
            if ("OK" == t.code) {
                for (var a = 0; a < t.data.result.length; a++) t.data.result[a].pageNum = 1;
                e.setData({
                    menu_list: t.data.result
                }), e.getClassifyList(1, !0);
            }
        }), e.loadAdvert();
    },
    onShow: function(t) {
        this.data.enter_time = Date.parse(new Date()) / 1e3, this.getShopCarNum();
    },
    getShopCarNum: function() {
        var t = this;
        e.POST({
            url: s.SHOPCARTGOODSNUM,
            params: {},
            success: function(e) {
                t.setData({
                    shopCarNum: e.data.result.goodsNums
                });
            },
            fail: function(t) {}
        });
    },
    toShopCar: function() {
        wx.navigateTo({
            url: "/pages/coupon/shopCar/shopCar"
        });
        var t = {
            event: n.EVENT_LOG_ENTER_INDEX_CLASSIFY,
            activity_type: d[this.data.goodsType],
            activity_name: "购物车图标按钮"
        };
        n.EVENT_LOG(t, function(t) {});
    },
    onUnload: function() {
        this._observer && this._observer.disconnect();
        var t = {
            event: n.EVENT_LOG_ENTER_INDEX_CLASSIFY,
            total_time: Date.parse(new Date()) / 1e3 - this.data.enter_time,
            commodity_id: this.data.menu_list[this.data.curIndex].id + "",
            activity_type: d[this.data.goodsType]
        };
        n.EVENT_LOG(t, function(t) {});
    },
    switchTab: function(t) {
        this.setData({
            curIndex: t.target.dataset.index,
            tabIndex: t.target.dataset.index
        });
    },
    swiperChange: function(t) {
        var e = this;
        if (t.detail) a = t.detail.current; else var a = t;
        "touch" === t.detail.source && this.setData({
            tabIndex: a
        }), wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), a > 1 ? this.setData({
            scrollLeft: a * o
        }) : e.setData({
            scrollLeft: 0
        }), e.setData({
            curIndex: e.data.tabIndex
        }), e.getClassifyList(1, !0);
    },
    onPullDownRefresh: function() {
        this.getClassifyList(1);
    },
    onReachBottom: function() {
        console.log("到底了");
        var t = this;
        t.data.menu_list[t.data.curIndex].isLast || t.getClassifyList(t.data.menu_list[t.data.curIndex].pageNum + 1, !0);
    },
    onPageScroll: function(t) {
        var e = this;
        t.scrollTop > 10 ? e.data.isFix || e.setData({
            isFix: !0
        }) : e.data.isFix && e.setData({
            isFix: !1
        });
    },
    getClassifyList: function(e, a) {
        var r = this, n = void 0;
        n = 1 == e ? [] : r.data.menu_list[r.data.curIndex].goodsList, a && wx.showLoading({
            title: "正在加载"
        }), i.GETCLASSIFYGOODSLISTBYTYPE({
            goodsCatType: r.data.goodsType,
            id: r.data.menu_list[r.data.curIndex].id,
            currentPage: e,
            pageSize: r.data.pageSize
        }, function(i) {
            if ("OK" == i.code) {
                var s, o = n.concat(i.data.result.data), d = Math.ceil(o.length / 2);
                r.setData((s = {
                    swiperHeight: 562 * d + 240 > l - 70 ? 562 * d + 240 : l - 70
                }, t(s, "menu_list[" + r.data.curIndex + "].goodsList", o), t(s, "menu_list[" + r.data.curIndex + "].pageNum", e), 
                s)), r.data.menu_list[r.data.curIndex].pageNum * r.data.pageSize >= i.data.result.count ? r.setData(t({}, "menu_list[" + r.data.curIndex + "].isLast", !0)) : r.setData(t({}, "menu_list[" + r.data.curIndex + "].isLast", !1)), 
                a && wx.hideLoading();
            } else a && wx.hideLoading();
            wx.stopPullDownRefresh();
        }, function(t) {
            wx.stopPullDownRefresh(), a && wx.hideLoading();
        });
    },
    onGotUserInfo: function(t) {
        a.OGTUI(t);
        var e = {
            commodity_id: t.currentTarget.dataset.id,
            event: n.EVENT_LOG_HOMEPRODUCT_SECOND,
            enter_source: t.currentTarget.dataset.index,
            activity_type: this.data.goodsType,
            activity_name: t.currentTarget.dataset.name,
            share_card_id: this.data.menu_list[this.data.curIndex].catName
        };
        n.EVENT_LOG(e, function(t) {});
    },
    loadAdvert: function() {
        var t, e = this;
        "ORDINARY" == e.data.goodsType && (t = 16), "TIME_PURCHASE" == e.data.goodsType && (t = 15), 
        i.GETADVERINFO(t, function(t) {
            "OK" == t.code && e.setData({
                listswiper: t.data.result
            });
        });
    },
    clickAdFail: function(t) {
        var e = {
            event: n.EVENT_HOMEPAGEADBUTTON,
            activity_type: t.currentTarget.dataset.areatype,
            activity_name: "close",
            commodity_id: t.currentTarget.dataset.appid
        };
        n.EVENT_LOG(e, function(t) {});
        var a = {
            event: n.EVENT_BSB_ADVERT_EVENTS,
            advert_events: t.currentTarget.dataset.areatype,
            advert_loc_name: t.currentTarget.dataset.areatype,
            advert_click: "广告内容关闭（取消）",
            page_content_id: t.currentTarget.dataset.appid
        };
        n.EVENT_THINKDATATRACK(a);
    },
    clickAdSucess: function(t) {
        var e = {
            event: n.EVENT_HOMEPAGEADBUTTON,
            activity_type: t.currentTarget.dataset.areatype,
            activity_name: "done",
            commodity_id: t.currentTarget.dataset.appid
        };
        n.EVENT_LOG(e, function(t) {});
        var a = {
            event: n.EVENT_BSB_ADVERT_EVENTS,
            advert_events: t.currentTarget.dataset.areatype,
            advert_loc_name: t.currentTarget.dataset.areatype,
            advert_click: "广告内容关闭（允许）",
            page_content_id: t.currentTarget.dataset.appid
        };
        n.EVENT_THINKDATATRACK(a);
        var i, s = this;
        "ORDINARY" == s.data.goodsType && (i = 16), "TIME_PURCHASE" == s.data.goodsType && (i = 15), 
        r.insertUserAdvert(t.currentTarget.dataset.appid, i);
    },
    clickAd: function(t) {
        var e = {
            event: n.EVENT_HOMEPAGEADBUTTON,
            activity_type: t.currentTarget.dataset.areatype,
            activity_name: "click",
            commodity_id: t.currentTarget.dataset.appid
        };
        n.EVENT_LOG(e, function(t) {});
        var a = {
            event: n.EVENT_BSB_ADVERT_EVENTS,
            advert_events: t.currentTarget.dataset.areatype,
            advert_loc_name: t.currentTarget.dataset.areatype,
            advert_click: "广告点击",
            page_content_id: t.currentTarget.dataset.appid
        };
        n.EVENT_THINKDATATRACK(a);
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
            event: n.EVENT_HOMEPAGEADBUTTON,
            activity_type: t.currentTarget.dataset.areatype,
            activity_name: t.currentTarget.dataset.url
        };
        n.EVENT_LOG(e, function(t) {});
    },
    uploadTopicShow: function(t, e, a) {
        var i = t + "";
        if (!c.hasOwnProperty(i)) {
            var r = {
                event: "enter_index_goods_show",
                enter_source: this.data.title,
                commodity_id: i,
                activity_name: e,
                commodity_showcase_type: "步友专享"
            };
            n.EVENT_LOG(r, function(t) {}), c[i] = t;
        }
    },
    registerNotify: function() {
        this._observer && this._observer.disconnect(), this._observer = this.createIntersectionObserver({
            thresholds: [ 1 ],
            observeAll: !0
        });
        var t = this;
        this._observer.relativeToViewport({
            bottom: 0
        }).observe(".goodsList", function(e) {
            for (var a = !1, i = 0; i < u.length; i++) if (u[i].id == e.dataset.id) {
                a = !0;
                break;
            }
            if (!a) {
                var r = {};
                r.id = e.dataset.id, u.push(r), t.uploadTopicShow(e.dataset.id, e.dataset.name, "");
            }
        });
    }
});