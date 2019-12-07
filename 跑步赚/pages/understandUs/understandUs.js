var e = getApp();

Page({
    onLoad: function() {
        e.shareInfo(1);
    },
    onShareAppMessage: function(a) {
        var n = e.globalData.shareInfo;
        return n.path = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        n;
    }
});