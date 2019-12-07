var n = require("../../../../utils/activity.js");

Page({
    data: {
        gifUrl: ""
    },
    onLoad: function(o) {
        var t = this;
        n.GETGIF(function(n) {
            "OK" == n.code && t.setData({
                gifUrl: n.data.result
            });
        }, function(n) {});
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});