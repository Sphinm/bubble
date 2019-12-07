var e = getApp();

Page({
    data: {
        userInfo: "",
        sportBiList: null
    },
    onShow: function() {
        var a = this;
        e.shareInfo(1), a.setData({
            userInfo: e.globalData.userInfo
        }), wx.request({
            url: e.getUrl("/Order/CurrencyExchange"),
            method: "POST",
            header: {},
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(e) {
                a.setData({
                    sportBiList: e.data.data
                });
            }
        });
    },
    onShareAppMessage: function(a) {
        var t = e.globalData.shareInfo;
        return t.path = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        t;
    }
});