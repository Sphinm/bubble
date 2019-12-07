require("../../utils/util.js"), require("../../utils/globalDefine.js");

var t = require("../../network/httpRequest.js");

Page({
    data: {
        historyList: []
    },
    bindGoExchange: function() {
        wx.switchTab({
            url: "../index/index?type=exchange"
        });
    },
    btnCopy: function(t) {
        var n = t.target.dataset.express;
        wx.canIUse("setClipboardData") ? wx.setClipboardData({
            data: n,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            }
        }) : wx.showToast({
            title: "复制失败",
            icon: "none",
            duration: 5e3
        });
    },
    getExchangeHiistory: function() {
        var n = this;
        t.getExchangeHistory().then(function(t) {
            n.setData({
                historyList: t.userList || []
            });
        });
    },
    onWxLoginCallBack: function() {},
    onLoad: function() {
        this.getExchangeHiistory();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});