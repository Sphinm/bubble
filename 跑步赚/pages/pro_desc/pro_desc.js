var o = getApp();

Page({
    data: {
        scrollTop: 0,
        isshow: !0,
        pid: "",
        shop_id: "",
        p_hide: "",
        n_hide: ""
    },
    onLoad: function(o) {
        this.getshop(o.id), this.setData({
            shop_id: o.id
        });
    },
    getshop: function(t) {
        var e = this;
        wx.request({
            url: o.get_qdd("/main/getShopInfo"),
            method: "GET",
            data: {
                goods_id: t
            },
            success: function(o) {
                e.setData({
                    hide: !0
                }), 200 == o.data.code ? e.setData({
                    p_hide: !1,
                    n_hide: !0,
                    goodinfo: o.data.data.shop_info
                }) : e.setData({
                    p_hide: !0,
                    n_hide: !1
                });
            }
        });
    },
    goTop: function(o) {
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    gotopdd: function() {
        this.get_link();
    },
    get_link: function() {
        wx.request({
            url: o.getQdd("/pbz/shop/getJuan"),
            method: "GET",
            data: {
                user_id: wx.getStorageSync("userId"),
                goods_id: this.data.shop_id
            },
            success: function(o) {
                200 == o.data.code ? wx.navigateToMiniProgram({
                    appId: "wx32540bd863b27570",
                    path: o.data.data.page_path
                }) : wx.showToast({
                    title: "该商品已下架！",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    onPageScroll: function(o) {
        var t = this;
        o.scrollTop <= 10 ? t.setData({
            isshow: !0
        }) : o.scrollTop > wx.getSystemInfoSync().windowHeight && (o.scrollTop = wx.getSystemInfoSync().windowHeight), 
        (o.scrollTop > 10 || o.scrollTop == wx.getSystemInfoSync().windowHeight) && t.setData({
            isshow: !1
        }), setTimeout(function() {
            t.setData({
                scrollTop: o.scrollTop
            });
        }, 0);
    },
    onShareAppMessage: function(t) {
        var e = o.globalData.shareInfo;
        return e.path = "/pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        e;
    }
});