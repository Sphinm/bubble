var t = getApp();

Page({
    data: {
        curIndex: 0,
        orderList: null
    },
    toggleTab: function(t) {
        var a = t.currentTarget.dataset.index;
        this.setData({
            curIndex: a
        }), 3 == a ? (this.setData({
            goodFrom: "qdd"
        }), this.qddOrder()) : (this.setData({
            goodFrom: "self"
        }), this.orderList(a));
    },
    goSureOrder: function(t) {
        var a = t.currentTarget.dataset.type, e = t.currentTarget.dataset.id;
        1 != a && 0 == this.data.curIndex && wx.navigateTo({
            url: "/pages/continuePay/continuePay?id=" + e
        });
    },
    toggleUpDown: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.orderList;
        e[a].infoShow = !e[a].infoShow, this.setData({
            orderList: e
        });
    },
    onShareAppMessage: function(a) {
        var e = t.globalData.shareInfo;
        return e.path = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        e;
    },
    orderList: function(a) {
        var e = this;
        wx.showLoading({
            title: "加载中..."
        });
        var r = 0 == a ? 0 : 1, d = 0;
        switch (a) {
          case "1":
            d = 1;
            break;

          case "2":
            d = 2;
        }
        t.httpsGet({
            url: t.getShop("/goods/order"),
            data: {
                openid: wx.getStorageSync("openId"),
                project: 0,
                type: r,
                status: d
            },
            success: function(t) {
                if (wx.hideLoading(), 200 == t.data.code) {
                    var a = t.data.data ? t.data.data : null;
                    a = 0 != a.length ? a : null, e.setData({
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
    qddOrder: function() {
        var t = this;
        wx.showLoading({
            title: "加载中..."
        }), wx.request({
            url: "https://online.litemob.com/run/api/getQddOrder",
            method: "GET",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(a) {
                console.log(a.data.data), wx.hideLoading();
                var e = a.data.data ? a.data.data : null;
                e = 0 != e.length ? e : null, t.setData({
                    orderList: e
                });
            }
        });
    },
    onShow: function() {
        var t = this.data.curIndex ? this.data.curIndex : 0;
        this.orderList(t);
    },
    onLoad: function(a) {
        this, t.shareInfo(1);
        var e = a.status ? a.status : 0;
        this.setData({
            curIndex: e
        });
    }
});