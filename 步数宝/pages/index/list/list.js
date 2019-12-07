var t = require("../../../utils/room.js"), e = require("../../../utils/event.js");

Page({
    data: {
        friends: [],
        pageSize: 50,
        currentPage: 1,
        enter_time: 0
    },
    onLoad: function(t) {
        this.getMusicInfo();
    },
    getMusicInfo: function(e) {
        var a = this;
        t.FRIENDS(this.data.pageSize, this.data.currentPage, function(t) {
            var e = a.data.friends;
            if (console.log(e), "OK" == t.code) {
                1 == a.data.page && (e = []);
                var n = t.data.friends;
                n.length < a.data.pageSize ? a.setData({
                    friends: e.concat(n),
                    hasMoreData: !1
                }) : a.setData({
                    friends: e.concat(n),
                    hasMoreData: !0,
                    currentPage: a.data.currentPage + 1
                });
            }
        }, function(t) {
            wx.showToast({
                icon: "none",
                title: "加载数据失败"
            });
        });
    },
    onReachBottom: function() {
        this.data.hasMoreData && this.getMusicInfo("加载更多数据");
    },
    onShow: function() {
        this.setData({
            enter_time: Date.parse(new Date()) / 1e3
        });
    },
    onUnload: function() {
        var t = {
            event: e.EVENT_LOG_INDEX_MORE_LIST,
            total_time: Date.parse(new Date()) / 1e3 - this.data.enter_time
        };
        e.EVENT_LOG(t, function(t) {});
    }
});