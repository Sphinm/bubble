var e = getApp(), t = require("../../utils/util.js"), a = e.globalData.resurl, o = e.globalData.key, s = e.globalData.deviceProperties;

e.globalData.sharelist;

Page({
    data: {
        modal: 0
    },
    onLoad: function(e) {
        var r = this;
        r.list(0), r.setData({
            type: 0
        });
        var n = {
            deviceProperties: s
        };
        n = JSON.stringify(n), n = t.base64_encode(n), n = t.xxtea_encrypt(n, o), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=11&a=1&b=0",
            data: n,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, o), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data), 
                console.log(e), r.setData({
                    isOpen: e.isOpen,
                    isForward: e.isForward,
                    beginTime: e.beginTime,
                    endTime: e.endTime,
                    isgundong: e.isgundong,
                    delayMoney: e.delayMoney,
                    isfrward: e.isfrward
                });
            }
        });
        var i = {
            deviceProperties: s,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        i = JSON.stringify(i), i = t.base64_encode(i), i = t.xxtea_encrypt(i, o), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=10&a=1&b=0",
            data: i,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, o), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data).advertisingList;
                for (var a = [], s = 0; s < e.length; s++) 3e3 == e[s].advertisingType && 1 == e[s].isClick && a.push(e[s]);
                r.setData({
                    videoadver: a
                });
            }
        });
    },
    tab: function(e) {
        var t = this, a = e.currentTarget.dataset.tab;
        t.list(a), t.setData({
            type: a,
            pageing: 0
        });
    },
    list: function(e) {
        var t = this;
        wx.request({
            url: "https://pdd.szlzyd.com/searchGoods",
            data: {
                type: e,
                pid: "8672284_69814181"
            },
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                var a = e.data.goods_search_response.goods_list;
                console.log(a);
                for (var o = 0; o < a.length; o++) {
                    a[o].min_group_price = a[o].min_group_price - a[o].coupon_discount, a[o].min_group_price = parseFloat(a[o].min_group_price / 100).toFixed(2), 
                    a[o].coupon_discount = parseFloat(a[o].coupon_discount / 100).toFixed(2);
                    var s = o;
                    s > 11 ? (s -= 11, a[o].adver = s % 8 == 0) : a[o].adver = 0 == s || s % 6 == 0;
                }
                t.setData({
                    list: a,
                    pageing: 1
                }), t.box();
            }
        });
    },
    box: function() {
        var e = this, r = {
            deviceProperties: s,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        r = JSON.stringify(r), r = t.base64_encode(r), r = t.xxtea_encrypt(r, o), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=42&a=1&b=0",
            data: r,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                a = t.xxtea_decrypt(a.data, o), a = t.base64_decode(a);
                var s = !0;
                if (0 == (a = JSON.parse(a)).resultCode) {
                    a = JSON.parse(a.data);
                    var r = e.data.list;
                    console.log(a);
                    for (var n = 0; n < r.length; n++) {
                        r[n].box = !1;
                        for (var i = 0; i < a.boxList.length; i++) a.boxList[i] = parseInt(a.boxList[i]), 
                        n == a.boxList[i] && (r[n].box = !0);
                    }
                    e.setData({
                        boxList: a.boxList,
                        list: r
                    });
                } else s = !1, e.setData({
                    boxList: []
                });
                e.setData({
                    boxshow: s
                });
            }
        });
    },
    btn: function(e) {
        var t = this.data.list, a = e.currentTarget.dataset.index;
        wx.request({
            url: "https://pdd.szlzyd.com/generateGoodsPromotionUrl",
            data: {
                goodsId: t[a].goods_id,
                pid: "8672284_69814181"
            },
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                var t = e.data.goods_promotion_url_generate_response.goods_promotion_url_list[0].we_app_info;
                wx.navigateToMiniProgram({
                    appId: t.app_id,
                    path: t.page_path,
                    extraData: {
                        foo: "bar"
                    },
                    envVersion: "release",
                    success: function(e) {}
                });
            }
        });
    },
    onTabItemTap: function() {
        wx.setStorageSync("adloadadload", !1);
    },
    onReachBottom: function() {
        var e = this, t = e.data.pageing;
        t++;
        var a = e.data.list, o = e.data.type;
        wx.request({
            url: "https://pdd.szlzyd.com/searchGoods",
            data: {
                type: o,
                pid: "8672284_69814181",
                page: t
            },
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(o) {
                for (var s = o.data.goods_search_response.goods_list, r = 0; r < s.length; r++) {
                    s[r].min_group_price = s[r].min_group_price - s[r].coupon_discount, s[r].min_group_price = parseFloat(s[r].min_group_price / 100).toFixed(2), 
                    s[r].coupon_discount = parseFloat(s[r].coupon_discount / 100).toFixed(2);
                    var n = r + a.length - 1;
                    n >= 11 ? (n -= 11, s[r].adver = n % 8 == 0) : s[r].adver = 0 == n || n % 4 == 0;
                }
                s = a.concat(s);
                for (var i = e.data.boxList, r = 0; r < s.length; r++) {
                    s[r].box = !1;
                    for (var d = 0; d < i.length; d++) i[d] = parseInt(i[d]), r == i[d] && (console.log("1234567"), 
                    s[r].box = !0);
                }
                console.log(s), e.setData({
                    list: s,
                    pageing: t
                });
            }
        });
    },
    box_shop: function(e) {
        var r = this, n = s, i = r.data.boxList;
        n.index = e.currentTarget.dataset.index;
        var d = {
            deviceProperties: n,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, o), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=41&a=1&b=0",
            data: d,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                if (a = t.xxtea_decrypt(a.data, o), a = t.base64_decode(a), a = JSON.parse(a), console.log(a), 
                0 == a.resultCode) {
                    a = JSON.parse(a.data);
                    for (var s = [], n = 0; n < i.length; n++) i[n] !== e.currentTarget.dataset.index && s.push(i[n]);
                    var d = r.data.list;
                    i = s;
                    for (n = 0; n < d.length; n++) {
                        d[n].box = !1;
                        for (var c = 0; c < i.length; c++) i[c] = parseInt(i[c]), n == i[c] && (console.log("1234567"), 
                        d[n].box = !0);
                    }
                    r.setData({
                        modal: 1,
                        modalstep: a.step,
                        boxList: s,
                        list: d
                    }), 0 == i.length && r.setData({
                        boxshow: !1
                    });
                } else wx.showToast({
                    title: "这是一个假宝箱，请继续寻找其他宝箱",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    close: function() {
        this.setData({
            modal: 0
        });
    },
    onPageScroll: function(e) {
        var t = this;
        e.scrollTop > 1260 ? t.setData({
            top: !0
        }) : t.setData({
            top: !1
        });
    },
    top: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    }
});