var n = require("../../../utils/room.js");

Page({
    data: {},
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {
        this.config();
    },
    config: function() {
        n.INDEX_CONFIG(function(n) {
            "OK" == n.code && (n.data.result.SYSTEM_MAINTENANCE || wx.switchTab({
                url: "/pages/index/index"
            }));
        });
    }
});