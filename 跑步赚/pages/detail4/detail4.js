var t = getApp();

Page({
    data: {
        exchangePop: !1,
        goodInfo: null,
        userInfo: null,
        buzuPop: !1
    },
    hidePop: function() {
        this.setData({
            buzuPop: !1
        });
    },
    onLoad: function(a) {
        var e = this;
        t.shareInfo(4);
        var o = a.id;
        this.setData({
            good_id: o
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
    getGoodInfo: function() {
        var a = this;
        t.httpsGet({
            url: t.getShop("/goods/getShopInfo"),
            data: {
                good_id: a.data.good_id,
                openid: wx.getStorageSync("openId"),
                project: 0,
                user_id: wx.getStorageSync("userId"),
                type: 2
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var e = t.data.data;
                    a.setData({
                        goodInfo: e
                    });
                }
            }
        });
    },
    hideExchange: function(t) {
        var a = t.currentTarget.dataset.status;
        this.util(a);
    },
    goSureOrder: function(t) {
        var a = this.data.userInfo, e = this.data.goodInfo;
        if (a.gold_coin < e.sports_c) this.setData({
            buzuPop: !0
        }); else {
            this.setData({
                buzuPop: !1
            });
            var o = t.currentTarget.dataset.status;
            this.util(o);
        }
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
        var e = t.globalData.shareInfo, o = this.data.goodInfo, n = (o.header_url, o.id);
        return e.path = "/pages/index/index?source=4&userId=" + wx.getStorageSync("userId") + "&id=" + n, 
        e;
    },
    goOrder: function() {
        var a = this;
        if (this.data.userInfo.attr && this.data.userInfo.real_name && this.data.userInfo.phone) {
            var e = this.data.goodInfo;
            t.httpsGet({
                url: t.getShop("/goods/postorder"),
                data: {
                    good_id: a.data.good_id,
                    pay_type: a.data.goodInfo.pay_type,
                    project: 0,
                    openid: wx.getStorageSync("openId")
                },
                success: function(t) {
                    if (200 == t.data.code) if (1 == e.pay_type) wx.navigateTo({
                        url: "/pages/duihuanSuc/duihuanSuc",
                        success: function() {
                            a.util("close");
                        }
                    }); else {
                        var o = t.data.data;
                        wx.requestPayment({
                            timeStamp: o.timeStamp,
                            nonceStr: o.nonceStr,
                            package: o.package,
                            signType: o.signType,
                            paySign: o.paySign,
                            success: function() {
                                wx.navigateTo({
                                    url: "/pages/duihuanSuc/duihuanSuc",
                                    success: function() {
                                        a.util("close");
                                    }
                                });
                            },
                            fail: function() {
                                wx.navigateTo({
                                    url: "/pages/continuePay/continuePay?id=" + e.id,
                                    success: function() {
                                        a.util("close");
                                    }
                                });
                            }
                        });
                    } else wx.showToast({
                        title: t.data.message,
                        icon: "none"
                    });
                }
            });
        } else wx.showToast({
            title: "请填写收货地址",
            icon: "none"
        });
    }
});