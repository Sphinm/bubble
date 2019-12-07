var t = getApp(), a = null;

Page({
    data: {
        curIndex: 0,
        statu: 0,
        shop_list: [],
        pageNum: 1,
        isshow: !0
    },
    onLoad: function(e) {
        var s = this;
        wx.request({
            url: t.getQdd("/main/getTypeList"),
            method: "GET",
            success: function(t) {
                s.setData({
                    oneLevelList: t.data.data,
                    c_type: t.data.data[0].opt_id
                }), s.get_shop();
            }
        }), wx.createInterstitialAd && ((a = wx.createInterstitialAd({
            adUnitId: "adunit-b1e035862b749b3a"
        })).onLoad(function() {}), a.onError(function(t) {}), a.onClose(function() {}));
    },
    onPageScroll: function(t) {
        t.scrollTop <= 10 ? this.setData({
            isshow: !0
        }) : t.scrollTop > wx.getSystemInfoSync().windowHeight && (t.scrollTop = wx.getSystemInfoSync().windowHeight), 
        (t.scrollTop > 10 || t.scrollTop == wx.getSystemInfoSync().windowHeight) && this.setData({
            isshow: !1
        });
    },
    get_shop: function() {
        var a = this;
        wx.request({
            url: t.getQdd("/main/getShopList"),
            method: "GET",
            data: {
                type: a.data.c_type,
                page: a.data.pageNum
            },
            success: function(t) {
                var e = a.data.shop_list, s = t.data.data.shop_list;
                for (var o in s) {
                    var i = Math.floor(35 * s[o].price);
                    i > 1e3 && (i = 1e3), s[o].stepReward = i;
                }
                e = e.concat(s), a.setData({
                    twolist: t.data.data.types,
                    shop_list: e,
                    hide: !0
                });
            }
        });
    },
    changeOneLevel: function(t) {
        this.setData({
            c_type: t.currentTarget.dataset.id,
            pageNum: 1,
            shop_list: []
        }), this.get_shop();
        var a = t.currentTarget.dataset.index;
        this.setData({
            statu: a
        });
        var e = this.data.oneLevelList;
        for (var s in e) e[s].active = s == a;
        a > 3 ? a -= 3 : a = 0, this.setData({
            curIndex: a,
            oneLevelList: e
        });
    },
    goTop: function(t) {
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    onReachBottom: function() {
        var t = this.data.pageNum + 1;
        this.setData({
            pageNum: t,
            hide: !1
        }), this.get_shop(this.data.c_type, this.data.pageNum);
    },
    onShareAppMessage: function(a) {
        return t.globalData.shareInfo;
    }
});