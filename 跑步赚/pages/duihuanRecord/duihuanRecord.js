var a = getApp();

Page({
    data: {
        duihuanList: null
    },
    onLoad: function(t) {
        a.shareInfo(1);
        var e = t.id, s = this;
        a.httpsGet({
            url: a.getShop("/goods/getGoodsRecord"),
            data: {
                s_id: e
            },
            success: function(a) {
                if (200 == a.data.code) {
                    var t = a.data.data;
                    s.setData({
                        duihuanList: t
                    });
                }
            }
        });
    },
    onShareAppMessage: function() {
        var t = a.globalData.shareInfo;
        return t.path = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        t;
    }
});