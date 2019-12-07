var t = getApp(), o = null;

Page({
    data: {
        showModalStatus: !1,
        goodInfo: null,
        userInfo: null,
        good_id: "",
        goodStatus: 0
    },
    changeAddress: function() {
        var o = this;
        t.changeAddress(function() {
            o.setData({
                userInfo: t.globalData.userInfo
            });
        });
    },
    maexchange: function() {
        var a = this.data.goodInfo;
        1 != a.good_type && 2 != a.good_type || this.data.userInfo.attr && this.data.userInfo.real_name && this.data.userInfo.phone ? t.httpsPost({
            url: t.getShop("/goods/post"),
            data: {
                openid: wx.getStorageSync("openId"),
                good_id: this.data.good_id,
                project: 0,
                address: this.data.userInfo.attr,
                real_name: this.data.userInfo.real_name,
                tel: this.data.userInfo.phone
            },
            success: function(t) {
                o.util("close"), 200 == t.data.code ? (o.getGoodInfo(), 3 == o.data.goodInfo.good_type || 4 == o.data.goodInfo.good_type ? wx.showModal({
                    title: "兑换成功",
                    content: "红包已加入到我的余额中，去我的余额提现",
                    confirmColor: "#ff4c44",
                    confirmText: "去提现",
                    success: function(t) {
                        t.confirm ? wx.redirectTo({
                            url: "/pages/myMoney/myMoney"
                        }) : t.cancel;
                    }
                }) : wx.showModal({
                    title: "兑换成功",
                    content: "商品会在管理员审核后发货，可以前往我的订单查看",
                    confirmColor: "#ff4c44",
                    confirmText: "查看订单",
                    success: function(t) {
                        t.confirm ? wx.redirectTo({
                            url: "/pages/order/order"
                        }) : t.cancel;
                    }
                })) : wx.showToast({
                    title: t.data.message,
                    duration: 3e3,
                    icon: "none"
                });
            }
        }) : wx.showToast({
            title: "请填写收货地址",
            icon: "none"
        });
    },
    exchange: function(t) {
        var o = t.currentTarget.dataset.statu;
        this.util(o);
    },
    powerDrawer: function(t) {
        var o = t.currentTarget.dataset.statu;
        this.util(o);
    },
    util: function(t) {
        this.setData({
            showModalStatus: !0
        });
        var o = wx.createAnimation({
            duration: 300,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = o, "close" == t ? (o.translateY(300).step(), setTimeout(function() {
            this.setData({
                showModalStatus: !this.data.showModalStatus
            });
        }.bind(this), 300)) : o.translateY(0).step(), this.setData({
            animationData: o.export()
        });
    },
    startTimeDown: function() {
        o.data.goodInfo.is_start || t.httpsPost({
            url: t.getShop("/goods/set_share"),
            data: {
                openid: wx.getStorageSync("openId"),
                good_id: o.data.good_id,
                project: 0
            },
            success: function() {
                o.getGoodInfo();
            }
        });
    },
    timeDown: function(t) {
        this.Interval = setInterval(function() {
            var a = t.time.split(":"), e = parseInt(a[0]), n = parseInt(a[1]), s = parseInt(a[2]);
            --s < 0 && (s = 59, --n < 0 && (n = 59, --e < 0 && (e = 0, n = 0, s = 0, clearInterval(o.Interval), 
            o.getGoodInfo()))), e = e < 10 ? "0" + e : e, n = n < 10 ? "0" + n : n, s = s < 10 ? "0" + s : s, 
            t.time = e + ":" + n + ":" + s, o.setData({
                goodInfo: t
            });
        }, 1e3);
    },
    getGoodInfo: function() {
        t.httpsGet({
            url: t.getShop("/goods/info"),
            data: {
                project: 0,
                openid: wx.getStorageSync("openId"),
                good_id: o.data.good_id
            },
            success: function(a) {
                var e = a.data.data;
                t.getInfo(function(t) {
                    var a = 0;
                    2 == e.good_type || 4 == e.good_type ? a = parseInt(t.gold_coin) <= e.motion_coin ? 0 : 1 : (a = parseInt(t.gold_coin) <= e.motion_coin ? 0 : 1 == e.is_share ? 2 : 1, 
                    e.is_start ? o.timeDown(e) : o.Interval && clearInterval(o.Interval)), o.setData({
                        userInfo: t,
                        goodInfo: e,
                        goodStatus: a
                    });
                });
            }
        });
    },
    onLoad: function(a) {
        o = this, t.shareInfo(2);
        var e = a.id;
        this.setData({
            good_id: e
        }), this.getGoodInfo();
    },
    onShareAppMessage: function(o) {
        var a, e = this.data.goodInfo, n = (e.header_url, e.id);
        2 == e.good_type || 4 == e.good_type ? a = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId") : (2, 
        a = "/pages/index/index?source=2&userId=" + wx.getStorageSync("userId") + "&id=" + n);
        var s = t.globalData.shareInfo;
        return s.path = a, s;
    },
    onUnload: function() {
        this.Interval && clearInterval(this.Interval);
    }
});