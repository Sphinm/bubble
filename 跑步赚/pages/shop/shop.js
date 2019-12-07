var t = getApp();

Page({
    data: {
        goodList: [],
        curIndex: 2,
        checked: 1
    },
    look: function(t) {
        this.setData({
            checked: t.currentTarget.dataset.id
        }), 1 == t.currentTarget.dataset.id ? this.goShop() : 2 == t.currentTarget.dataset.id ? this.orderList(1) : 3 == t.currentTarget.dataset.id && this.orderList(2);
    },
    tapGoShop: function(t) {
        var a = parseInt(t.currentTarget.dataset.index);
        wx.pageScrollTo({
            scrollTop: 0
        }), this.goShop(a);
    },
    goShop: function(a) {
        var e = this;
        this.setData({
            curIndex: a
        }), wx.setStorageSync("goodTab", a);
        switch (a) {
          case 1:
            1;
            break;

          case 3:
            2;
        }
        t.getGoodList(3, function(t) {
            t.forEach(function(t, a) {
                t.pay_type ? t.navUrl = "/pages/detail4/detail4" : 1 == t.good_type ? t.navUrl = "/pages/details/details" : t.navUrl = "/pages/bargain/bargain";
            }), e.setData({
                goodList: t
            });
        });
    },
    goodList: function(t) {
        switch (t) {
          case "1":
            this.setGoodList(1);
            break;

          case "3":
            this.setGoodList(2);
            break;

          default:
            this.setGoodList(3);
        }
    },
    onLoad: function() {
        wx.getStorageSync("goodTab") || wx.setStorageSync("goodTab", 3);
    },
    onShow: function() {
        t.shareInfo(1);
        wx.getStorageSync("goodTab");
        this.goShop(2);
    },
    orderList: function(a) {
        var e = this;
        wx.showLoading({
            title: "加载中..."
        }), t.httpsGet({
            url: t.getShop("/goods/order"),
            data: {
                openid: wx.getStorageSync("openId"),
                project: 0,
                type: 3,
                status: a
            },
            success: function(t) {
                if (wx.hideLoading(), 200 == t.data.code) {
                    var a = t.data.data ? t.data.data : null;
                    a = 0 != a.length ? a : null, console.log(a), e.setData({
                        orderList: a
                    });
                }
            },
            fail: function() {
                wx.showToast({
                    title: "订单请求失败",
                    icon: "none"
                });
            }
        });
    },
    onShareAppMessage: function(a) {
        var e = t.globalData.shareInfo;
        return e.path = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        e;
    }
});