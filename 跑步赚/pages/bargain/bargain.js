var t = getApp();

Page({
    data: {
        bargainRules: !1,
        bargainSuc: !1,
        bargainFail: !1,
        luckyMoney: !1,
        exchangePop: !1,
        goodInfo: null,
        userInfo: null
    },
    showRules: function() {
        this.setData({
            bargainRules: !0
        });
    },
    hidePop: function() {
        var a = this, e = 600;
        t.globalData.ok || (e = 0), setTimeout(function() {
            a.setData({
                bargainRules: !1,
                bargainSuc: !1,
                bargainFail: !1,
                luckyMoney: !1
            });
        }, e);
    },
    onLoad: function(a) {
        var e = this;
        t.shareInfo(4);
        var n = a.id;
        this.setData({
            good_id: n
        }), this.getGoodInfo(), t.getInfo(function(t) {
            e.setData({
                userInfo: t
            });
        });
    },
    changeAddress: function() {
        var a = this;
        t.changeAddress(function() {
            a.setData({
                userInfo: t.globalData.userInfo
            });
        });
    },
    returnShop: function() {
        var t = this;
        this.setData({
            bargainFail: !1
        }), wx.setStorageSync("goodTab", 1), wx.navigateTo({
            url: "/pages/shop/shop",
            success: function() {
                t.goodSucOrFail(2);
            }
        });
    },
    againBuy: function() {
        var t = this;
        this.setData({
            bargainFail: !1
        }), this.goodSucOrFail(2, function() {
            t.getGoodInfo();
        });
    },
    getGoodInfo: function() {
        var a = this;
        t.httpsGet({
            url: t.getShop("/goods/info"),
            data: {
                good_id: a.data.good_id,
                openid: wx.getStorageSync("openId"),
                project: 0,
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var e = t.data.data;
                    e.knock_gold_status && setTimeout(function() {
                        a.setData({
                            luckyMoney: !0
                        });
                    }, 500), e.success && a.setData({
                        bargainSuc: !0
                    }), e.timeout && a.setData({
                        bargainFail: !0
                    }), e.is_start ? a.timeDown(e) : a.Interval && clearInterval(a.Interval), a.setData({
                        goodInfo: e
                    });
                }
            }
        });
    },
    timeDown: function(t) {
        var a = this;
        this.Interval = setInterval(function() {
            var e = t.time.split(":"), n = parseInt(e[0]), o = parseInt(e[1]), i = parseInt(e[2]);
            --i < 0 && (i = 59, --o < 0 && (o = 59, --n < 0 && (n = 0, o = 0, i = 0, clearInterval(a.Interval), 
            a.getGoodInfo()))), n = n < 10 ? "0" + n : n, o = o < 10 ? "0" + o : o, i = i < 10 ? "0" + i : i, 
            t.time = n + ":" + o + ":" + i, a.setData({
                goodInfo: t
            });
        }, 1e3);
    },
    goodSucOrFail: function(a, e) {
        t.httpsGet({
            url: t.getShop("/goods/finish"),
            data: {
                good_id: this.data.good_id,
                openid: wx.getStorageSync("openId"),
                project: 0,
                user_id: wx.getStorageSync("userId"),
                status: a
            },
            success: function(t) {
                200 == t.data.code ? e && e() : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            }
        });
    },
    hideExchange: function(t) {
        var a = t.currentTarget.dataset.status;
        this.util(a);
    },
    goSureOrder: function(t) {
        var a = t.currentTarget.dataset.status;
        this.setData({
            bargainSuc: !1
        }), this.util(a);
    },
    goOrder: function() {
        var t = this;
        this.data.userInfo.attr && this.data.userInfo.real_name && this.data.userInfo.phone ? this.goodSucOrFail(1, function() {
            wx.navigateTo({
                url: "/pages/bargainSuc/bargainSuc",
                success: function() {
                    t.util("close");
                }
            });
        }) : wx.showToast({
            title: "请填写收货地址",
            icon: "none"
        });
    },
    util: function(t) {
        this.setData({
            exchangePop: !0
        });
        var a = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = a, "close" == t ? (a.translateY(500).step(), setTimeout(function() {
            this.setData({
                exchangePop: !this.data.exchangePop
            });
        }.bind(this), 300)) : a.translateY(0).step(), this.setData({
            animationData: a.export()
        });
    },
    onShareAppMessage: function(a) {
        var e = t.globalData.shareInfo, n = this.data.goodInfo, o = (n.header_url, n.id);
        return e.path = "/pages/index/index?source=4&userId=" + wx.getStorageSync("userId") + "&id=" + o, 
        e;
    }
});