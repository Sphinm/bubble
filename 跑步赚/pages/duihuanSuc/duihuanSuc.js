Page({
    onLoad: function() {
        app.shareInfo(1);
    },
    onShareAppMessage: function(e) {
        var a = app.globalData.shareInfo;
        return a.path = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        a;
    }
});