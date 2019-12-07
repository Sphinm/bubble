function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

getApp();

var t = require("../../../utils/request.js"), a = require("../../../utils/urlGL.js"), s = require("../../../utils/event.js"), i = require("../../../utils/urls.js"), n = wx.getSystemInfoSync().windowWidth / 750 * 132, d = a.COMMODITYAREA(), o = void 0;

Page({
    data: {
        windowHeight: "",
        autoplay: !1,
        duration: 0,
        curIndex: 0,
        tabIndex: 0,
        pageSize: 10,
        swiperHeight: 240,
        showNewcomer: !1,
        selectIndex: 0,
        menu_list: [],
        selectArea: [ {
            name: "全部",
            select: !1
        }, {
            name: "S1",
            select: !1,
            selectInt: 11
        }, {
            name: "S2",
            select: !1,
            selectInt: 21
        }, {
            name: "S3",
            select: !1,
            selectInt: 31
        }, {
            name: "S4",
            select: !1,
            selectInt: 41
        }, {
            name: "S5",
            select: !1,
            selectInt: 51
        } ],
        firstLoaded: !1,
        enter_time: 0,
        goodsType: "",
        isFix: !1,
        curGoodsArea: "",
        BYZX_claFirstId: ""
    },
    onLoad: function(e) {
        o = 750 * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth, 
        wx.showLoading(), this.getAreaTitleList(e.type), this.getBYZXGoodsClaFirst();
    },
    onShow: function(e) {
        this.data.enter_time = Date.parse(new Date()) / 1e3;
    },
    onUnload: function() {
        this._observer && this._observer.disconnect();
        var e = {
            event: s.EVENT_LOG_ENTER_INDEX_CLASSIFY,
            total_time: Date.parse(new Date()) / 1e3 - this.data.enter_time,
            commodity_id: this.data.menu_list[this.data.curIndex].areaInt + "",
            activity_type: d[this.data.goodsType]
        };
        s.EVENT_LOG(e, function(e) {});
    },
    getAreaTitleList: function(e) {
        var a = this, s = 0;
        t.POST({
            url: i.getAreaTitleList,
            params: {},
            success: function(t) {
                if ("OK" == t.code) {
                    var i = t.data.result;
                    if (e && void 0 != e) for (var n = 0; n < i.length; n++) if (i[n].area == e) {
                        s = n;
                        break;
                    }
                    a.setData({
                        goodsType: e,
                        windowHeight: o,
                        menu_list: i
                    }), 0 === parseInt(s) ? a.getClassifyList(1, !0) : a.setData({
                        tabIndex: s,
                        curIndex: s
                    });
                } else wx.hideLoading();
            },
            fail: function(e) {
                wx.hideLoading();
            }
        });
    },
    selectLevel: function(e) {
        var t = this.data.selectArea[e.currentTarget.dataset.index];
        if (this.data.selectIndex == e.currentTarget.dataset.index) return !1;
        this.setData({
            selectIndex: e.currentTarget.dataset.index
        });
        var a = {
            event: "goods_show_page_second_click_level",
            activity_type: "" + t.name,
            activity_name: d[this.data.goodsType]
        };
        s.EVENT_LOG(a, function(e) {}), this.getClassifyList(1, !0);
    },
    switchTab: function(e) {
        this.setData({
            curIndex: e.target.dataset.index,
            tabIndex: e.target.dataset.index,
            curGoodsArea: e.target.dataset.area
        });
    },
    swiperChange: function(e) {
        var t = this, a = void 0;
        a = e.detail ? e.detail.current : e, "touch" === e.detail.source && t.setData({
            tabIndex: a
        }), wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), a > 1 ? t.setData({
            scrollLeft: (a - 2) * n
        }) : t.setData({
            scrollLeft: 0
        }), t.setData({
            curIndex: t.data.tabIndex,
            selectIndex: 0,
            curGoodsArea: t.data.menu_list[a].area
        }), t.getClassifyList(1, !0);
    },
    swiperChangeEnd: function() {},
    onPullDownRefresh: function() {
        this.getClassifyList(1, !0);
    },
    onReachBottom: function() {
        var e = this;
        e.data.menu_list[e.data.curIndex].isLast || e.getClassifyList(e.data.menu_list[e.data.curIndex].pageNum + 1, !0);
    },
    onPageScroll: function(e) {
        var t = this;
        e.scrollTop > 10 ? t.data.isFix || t.setData({
            isFix: !0
        }) : t.data.isFix && t.setData({
            isFix: !1
        });
    },
    getClassifyList: function(a, s) {
        var n = this, d = n.data.menu_list, r = void 0;
        r = 1 == a ? [] : d[n.data.curIndex].goodsList, s && wx.showLoading({
            title: "正在加载"
        });
        var c = i.getNewGoodsList, l = {};
        l.pageSize = n.data.pageSize, l.currentPage = a, "TIME_PURCHASE" == n.data.curGoodsArea ? (c = i.API_CLASSIFY_GOODSLISTBYTYPE, 
        l.goodsCatType = "TIME_PURCHASE", l.id = n.data.BYZX_claFirstId) : (l.goodsCategoryNew = d[n.data.tabIndex].areaInt, 
        l.segments = n.data.selectIndex ? [ n.data.selectArea[n.data.selectIndex].selectInt ] : []), 
        t.POST({
            url: c,
            params: l,
            success: function(t) {
                if ("OK" == t.code) {
                    var i;
                    n.data.showNewcomer || n.setData({
                        showNewcomer: !!t.data.result.showNewcomer && t.data.result.showNewcomer
                    });
                    var c = [], l = 0;
                    "TIME_PURCHASE" == n.data.curGoodsArea ? (c = r.concat(t.data.result.data), l = t.data.result.data.length) : (c = r.concat(t.data.result.goodsResps), 
                    l = t.data.result.goodsResps.length);
                    var u = Math.ceil(c.length / 2), g = void 0;
                    g = 3 == d[n.data.tabIndex].areaInt ? 582 * u > o - 171 ? 582 * u : o - 171 : 562 * u > o - 171 ? 562 * u : o - 171, 
                    n.setData((i = {
                        swiperHeight: g
                    }, e(i, "menu_list[" + n.data.curIndex + "].goodsList", c), e(i, "menu_list[" + n.data.curIndex + "].pageNum", a), 
                    i)), n.data.pageSize > l ? n.setData(e({}, "menu_list[" + n.data.curIndex + "].isLast", !0)) : n.setData(e({}, "menu_list[" + n.data.curIndex + "].isLast", !1)), 
                    s && wx.hideLoading();
                } else s && wx.hideLoading();
                wx.stopPullDownRefresh();
            },
            fail: function(e) {
                wx.stopPullDownRefresh(), s && wx.hideLoading();
            }
        });
    },
    onGotUserInfo: function(e) {
        if (1 == e.currentTarget.dataset.prize) wx.navigateTo({
            url: "/pages/activity/luckyWheel/luckyWheel"
        }); else {
            wx.navigateTo({
                url: "/pages/index/goodlist/goodlist?goodid=" + e.currentTarget.dataset.id
            });
            a.COMMODITYAREA();
            var t = {
                commodity_id: e.currentTarget.dataset.id + "",
                event: s.EVENT_LOG_HOMEPRODUCT_SECOND,
                activity_type: d[this.data.goodsType],
                segment: e.currentTarget.dataset.segment + "",
                activity_name: e.currentTarget.dataset.name
            };
            s.EVENT_LOG(t, function(e) {});
        }
    },
    getBYZXGoodsClaFirst: function() {
        var e = this;
        t.POST({
            url: i.API_CLASSIFY_MENUSLISTBYTYPE,
            params: {
                goodsCatType: "TIME_PURCHASE"
            },
            success: function(t) {
                "OK" == t.code ? e.data.BYZX_claFirstId = t.data.result[0].id : wx.hideLoading();
            },
            fail: function(e) {
                wx.hideLoading();
            }
        });
    }
});