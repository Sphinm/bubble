var t = getApp(), e = null;

Page({
    data: {
        hidden: !1,
        height: "60rpx",
        curTab: 0,
        pid: "",
        tabList: [ {
            tabName: "综合",
            tabStatus: 1
        }, {
            tabName: "价格",
            tabStatus: 0
        }, {
            tabName: "优惠券",
            tabStatus: 0
        }, {
            tabName: "销量",
            tabStatus: 0
        } ],
        shop_list: [],
        isshow: !0,
        sort: 0,
        pageNum: 1,
        type: "",
        hide: !0,
        browse: !0,
        can_get: "",
        text_show: 1
    },
    onLoad: function(t) {
        e = this, 1 == t.type ? (e.setData({
            hidden: !0,
            height: "12rpx",
            type: 1
        }), e.get_nine()) : 2 == t.type ? (e.setData({
            hidden: !0,
            height: "12rpx",
            type: 2
        }), e.get_top()) : 3 == t.type && (e.setData({
            hidden: !0,
            height: "12rpx",
            type: 3
        }), e.get_onenine()), t.id && (e.setData({
            pid: t.id,
            height: "100rpx"
        }), e.get_shop()), wx.setNavigationBarTitle({
            title: t.twoName
        });
    },
    get_nine: function() {
        var a = this;
        wx.request({
            url: t.getQdd("/main/get9BShop"),
            method: "GET",
            data: {
                page: a.data.pageNum
            },
            success: function(t) {
                var o = a.data.shop_list, s = t.data.data;
                for (var i in s) {
                    var n = Math.floor(35 * s[i].price);
                    n > 1e3 && (n = 1e3), s[i].stepReward = n;
                }
                o = o.concat(s), e.setData({
                    shop_list: o,
                    hide: !0
                });
            }
        });
    },
    goTop: function(t) {
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    onPageScroll: function(t) {
        var e = this;
        t.scrollTop <= 10 ? e.setData({
            isshow: !0
        }) : t.scrollTop > wx.getSystemInfoSync().windowHeight && (t.scrollTop = wx.getSystemInfoSync().windowHeight), 
        (t.scrollTop > 10 || t.scrollTop == wx.getSystemInfoSync().windowHeight) && e.setData({
            isshow: !1
        }), setTimeout(function() {
            e.setData({
                scrollTop: t.scrollTop
            });
        }, 0);
    },
    onReachBottom: function() {
        var t = this.data.pageNum + 1;
        this.setData({
            pageNum: t,
            hide: !1
        }), this.data.pid ? this.get_shop() : 1 == this.data.type ? this.get_nine() : 2 == this.data.type ? this.get_top() : 3 == this.data.type && this.get_onenine();
    },
    onShareAppMessage: function(t) {}
});