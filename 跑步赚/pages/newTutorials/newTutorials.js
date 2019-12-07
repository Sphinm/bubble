Page({
    data: {},
    onLoad: function(n) {
        app.shareInfo(1);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var n = app.globalData.shareInfo;
        return n.path = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        n;
    }
});