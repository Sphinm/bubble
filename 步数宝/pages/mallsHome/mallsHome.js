getApp();

var t = require("../../utils/request.js"), e = require("../../utils/room.js"), a = require("../../utils/event.js"), i = require("../../utils/urls.js"), s = wx.getSystemInfoSync().windowWidth / 750 * 180, o = null;

Page({
    data: {
        enter_time: 0,
        scrollAni: !0,
        bannerList: [],
        tabCurIndex: 0,
        classifyTabFix: !1,
        scrollTop: 0,
        showToTop: !1,
        swiperCurIndex: 0,
        swiperHeight: 3010,
        scrollLeft: 0,
        pageNum: 1,
        classifyList: [],
        goodsList: [],
        flashSaleInfo: {},
        pageSize: 10,
        currentPage: 1,
        noMore: !1,
        hr: "00",
        min: "00",
        sec: "00"
    },
    onLoad: function(t) {
        this.getClassifyList();
    },
    getBannerList: function() {
        var e = this;
        t.POST({
            url: i.HTTP_URL + "api/page/advert2/list",
            params: {
                code: 31
            },
            success: function(t) {
                "OK" == t.code && e.setData({
                    bannerList: t.data.result
                });
            },
            fail: function(t) {
                console.log("api/page/advert2/list", t);
            }
        });
    },
    clickMiniProAd: function(t) {
        console.log(t);
        var e = {
            event: "shopping_homePage_click",
            activity_type: 2,
            activity_name: t.currentTarget.dataset.url
        };
        a.EVENT_LOG(e);
    },
    linkBannerUrl: function(t) {
        if (1 == t.currentTarget.dataset.type) {
            var e = t.currentTarget.dataset.url;
            wx.navigateTo({
                url: e,
                fail: function() {
                    wx.showToast({
                        title: "该功能暂未开放",
                        icon: "none"
                    });
                }
            });
        }
        if (3 == t.currentTarget.dataset.type) {
            var i = t.currentTarget.dataset.url;
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
        var s = {
            event: "shopping_homePage_click",
            activity_type: 2,
            activity_name: t.currentTarget.dataset.url
        };
        a.EVENT_LOG(s);
    },
    getFlashSaleInfo: function() {
        var e = this;
        t.POST({
            url: i.HTTP_URL + "api/spike/v1/index",
            params: {},
            success: function(t) {
                if ("OK" == t.code) {
                    e.setData({
                        flashSaleInfo: t.data.result ? t.data.result : null
                    });
                    var a = t.data.result ? t.data.result.time : "";
                    e.countDown(a);
                } else e.setData({
                    flashSaleInfo: null
                });
            },
            fail: function(t) {
                console.log("api/spike/v1/index", t);
            }
        });
    },
    getClassifyList: function() {
        var t = this;
        e.GETCLASSIFYMENUSLISTBYTYPE("TIME_PURCHASE", function(e) {
            if ("OK" == e.code) {
                t.setData({
                    classifyList: e.data.result
                });
                var a = t.data.classifyList[0].id;
                t.getGoodsList(a, 1);
            }
        }, function(t) {
            console.log("getClassifyList", t);
        });
    },
    getGoodsList: function(t, a) {
        var i = this;
        wx.showLoading({
            title: "正在加载"
        });
        var s = [];
        a > 1 && (s = i.data.goodsList), e.GETCLASSIFYGOODSLISTBYTYPE({
            goodsCatType: "TIME_PURCHASE",
            id: t,
            currentPage: a,
            pageSize: i.data.pageSize
        }, function(t) {
            if ("OK" == t.code) {
                var e = s.concat(t.data.result.data), o = Math.ceil(e.length / 2);
                i.setData({
                    swiperHeight: 602 * o,
                    goodsList: e
                });
                var n = Math.ceil(t.data.result.count / 10);
                a >= n ? i.setData({
                    noMore: !0
                }) : i.setData({
                    noMore: !1,
                    pageNum: a
                });
            }
            wx.hideLoading(), wx.stopPullDownRefresh();
        }, function(t) {
            console.log("getGoodsList", t), wx.stopPullDownRefresh(), wx.hideLoading();
        });
    },
    gotoFlashSale: function() {
        wx.navigateTo({
            url: "/pages/malls/mallLimited/mallLimited"
        });
        var t = {
            event: "shopping_homePage_click",
            activity_type: "4"
        };
        a.EVENT_LOG(t);
    },
    gotoGoodsDet: function(t) {
        var e = t.currentTarget.dataset.goodsid;
        wx.navigateTo({
            url: "/pages/malls/goodsDetails/goodsDetails?goodsId=" + e
        });
        var i = {
            event: "shopping_homePage_click",
            activity_type: "6",
            commodity_id: e
        };
        a.EVENT_LOG(i);
    },
    switchClassifyTab: function(t) {
        var e = this, i = t.target.dataset.index;
        e.setData({
            tabCurIndex: i,
            swiperCurIndex: i
        }), i > 1 ? e.setData({
            scrollLeft: (i - 2) * s
        }) : e.setData({
            scrollLeft: 0
        });
        var o = {
            event: "shopping_homePage_click",
            activity_type: "5",
            activity_name: e.data.classifyList[i].catName
        };
        a.EVENT_LOG(o);
    },
    swiperChange: function(t) {
        var e = this, a = t.detail.current;
        e.setData({
            swiperCurIndex: a,
            tabCurIndex: a,
            noMore: !1,
            pageNum: 1
        }), a > 1 ? e.setData({
            scrollLeft: (a - 2) * s
        }) : e.setData({
            scrollLeft: 0
        }), e.getGoodsList(e.data.classifyList[a].id, 1), e.data.showToTop && e.setScrollTop();
    },
    countDown: function(t) {
        var e = this;
        if (t) {
            if (t <= 0) return;
            t -= 1, o = setTimeout(function() {
                e.countDown(t), e.dateformat(t);
            }, 1e3);
        }
    },
    dateformat: function(t) {
        var e = Math.floor(t / 3600), a = Math.floor((t - 3600 * e) / 60), i = t - 3600 * e - 60 * a;
        0 != e || 0 != a || 0 != i ? (a < 10 && (a = "0" + a), e < 10 && (e = "0" + e), 
        i < 10 && (i = "0" + i), this.setData({
            hr: e,
            min: a,
            sec: i
        })) : this.getFlashSaleInfo();
    },
    onPageScroll: function(t) {
        var e = this;
        this.setData({
            scrollTop: t.scrollTop
        }), wx.createSelectorQuery().select("#dom_classifyTab").boundingClientRect(function(t) {
            t.top <= 1 ? e.setData({
                classifyTabFix: !0,
                showToTop: !0
            }) : e.setData({
                classifyTabFix: !1,
                showToTop: !1
            });
        }).exec();
    },
    setScrollTop: function() {
        var t = this.data.scrollTop;
        wx.createSelectorQuery().select("#dom_classifyTab").boundingClientRect(function(e) {
            var a = e.top;
            wx.pageScrollTo({
                scrollTop: t + a,
                duration: 0
            });
        }).exec();
    },
    onShow: function() {
        this.getBannerList(), this.getFlashSaleInfo(), this.data.enter_time = Date.parse(new Date()) / 1e3;
    },
    onHide: function() {
        clearTimeout(o), this.setData({
            hr: "00",
            min: "00",
            sec: "00"
        });
        var t = {
            event: "shopping_homePage_click",
            total_time: Date.parse(new Date()) / 1e3 - this.data.enter_time
        };
        a.EVENT_LOG(t);
    },
    onUnload: function() {
        clearTimeout(o);
    },
    onPullDownRefresh: function() {
        this.getBannerList(), this.getFlashSaleInfo(), this.getClassifyList(), this.setData({
            tabCurIndex: 0,
            swiperCurIndex: 0,
            noMore: !1,
            pageNum: 1
        });
    },
    onReachBottom: function() {
        var t = this;
        t.data.noMore || t.getGoodsList(t.data.classifyList[t.data.tabCurIndex].id, t.data.pageNum + 1);
    }
});