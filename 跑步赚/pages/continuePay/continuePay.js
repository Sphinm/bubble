var t = getApp();

Page({
    data: {
        userInfo: null,
        orderInfo: null
    },
    changeAddress: function() {
        var a = this;
        t.changeAddress(function() {
            a.setData({
                userInfo: t.globalData.userInfo
            });
        });
    },
    timeDown: function(t) {
        var a = this;
        this.Interval = setInterval(function() {
            var e = t.split(":"), o = parseInt(e[0]), n = parseInt(e[1]), s = parseInt(e[2]);
            --s < 0 && (s = 59, --n < 0 && (n = 59, --o < 0 && (o = 0, n = 0, s = 0, clearInterval(a.Interval), 
            a.getGoodInfo()))), t = (o = o < 10 ? "0" + o : o) + ":" + (n = n < 10 ? "0" + n : n) + ":" + (s = s < 10 ? "0" + s : s), 
            a.setData({
                hhh: o,
                mmm: n,
                sss: s
            });
        }, 1e3);
    },
    goPay: function() {
        this.data.userInfo.attr && this.data.userInfo.real_name && this.data.userInfo.phone ? t.httpsGet({
            url: t.getShop("/goods/postorder"),
            data: {
                good_id: this.data.goodId,
                pay_type: this.data.goodInfo.pay_type,
                project: 0,
                openid: wx.getStorageSync("openId")
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var a = t.data.data;
                    wx.requestPayment({
                        timeStamp: a.timeStamp,
                        nonceStr: a.nonceStr,
                        package: a.package,
                        signType: a.signType,
                        paySign: a.paySign,
                        success: function() {
                            wx.navigateTo({
                                url: " pages/duihuanSuc/duihuanSuc"
                            });
                        },
                        fail: function() {}
                    });
                } else wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            }
        }) : wx.showToast({
            title: "请填写完整信息再进行兑换",
            icon: "none"
        });
    },
    onLoad: function(a) {
        var e = this, o = this, n = a.id;
        this.setData({
            goodId: n
        }), t.getInfo(function(t) {
            e.setData({
                userInfo: t
            });
        }), t.httpsGet({
            url: t.getShop("/goods/now_good_order"),
            data: {
                openid: wx.getStorageSync("openId"),
                s_id: n,
                project: 0
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var a = t.data.data;
                    o.setData({
                        orderInfo: a,
                        goodInfo: a.shopinfo
                    }), o.timeDown(a.time);
                }
            }
        });
    },
    canelOrder: function() {
        t.httpsGet({
            url: t.getShop("/goods/cancel_order"),
            data: {
                order_id: this.data.orderInfo.id,
                openid: wx.getStorageSync("openId"),
                shop_id: this.data.orderInfo.s_id
            },
            success: function(t) {
                200 == t.data.code && wx.navigateBack({
                    delta: 1
                });
            }
        });
    }
});