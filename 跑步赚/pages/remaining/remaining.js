var a = getApp(), t = null;

Page({
    data: {
        curIndex: 0,
        balanceList: null,
        balanceJinbi: null,
        balanceXianjin: null,
        userinfo: null,
        myGold: null,
        scrollTop: 0
    },
    getprice: function() {
        a.httpsPost({
            url: a.getData("/getgoldinfo"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(a) {
                if (200 == a.data.code) {
                    var e = a.data.data;
                    t.setData({
                        myGold: e
                    });
                }
            }
        });
    },
    getrecord: function(e) {
        a.httpsPost({
            url: a.getData("/getrecord"),
            data: {
                user_id: wx.getStorageSync("userId"),
                capital_type: e
            },
            success: function(a) {
                1 == e ? t.setData({
                    balanceJinbi: a.data.data,
                    balanceList: a.data.data
                }) : t.setData({
                    balanceXianjin: a.data.data
                });
            }
        });
    },
    toggleTab: function(a) {
        this.setData({
            scrollTop: 0
        });
        var t = a.currentTarget.dataset.index;
        if (this.data.curIndex != t) {
            var e = null;
            e = 0 == t ? this.data.balanceJinbi : this.data.balanceXianjin, this.setData({
                curIndex: t,
                balanceList: e
            });
        }
    },
    onLoad: function() {
        t = this, a.shareInfo(1), this.getprice(), this.getrecord(1), this.getrecord(2);
    },
    onShareAppMessage: function(t) {
        var e = a.globalData.shareInfo;
        return e.path = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        e;
    }
});