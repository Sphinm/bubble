var t = require("../../../utils/urls.js"), e = require("../../../utils/help.js"), a = require("../../../utils/wglogin.js"), i = require("../../../utils/event.js");

Page({
    data: {
        pageSize: 10,
        currentPage: 1,
        zhuanqu: "HELP"
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: t.title
        }), this.list(), t.type && this.setData({
            zhuanqu: t.type + ""
        });
    },
    list: function(i) {
        var r = this;
        i ? r.data.currentPage = i : r.data.currentPage, e.GOODHELPREQUEST(t.HELPLIST, {
            userId: a.USERINFO().userId,
            pageSize: r.data.pageSize,
            currentPage: r.data.currentPage,
            goodsType: "HELP"
        }, function(t) {
            if (wx.stopPullDownRefresh(), console.log(t), "OK" == t.code) {
                var e = r.data.list;
                1 == r.data.currentPage && (e = []);
                var a = t.data.result.data;
                a.length < r.data.pageSize ? r.setData({
                    list: e.concat(a),
                    hasMoreData: !1
                }) : (r.data.currentPage = r.data.currentPage + 1, r.setData({
                    list: e.concat(a),
                    hasMoreData: !0
                }));
            } else wx.showToast({
                title: t.msg,
                icon: "none"
            });
        });
    },
    helpifo: function(t) {
        var e = {
            commodity_id: t.currentTarget.dataset.type,
            event: i.EVENT_LOG_HOMEPRODUCT_SECOND,
            enter_source: t.currentTarget.dataset.index,
            activity_type: this.data.zhuanqu,
            activity_name: t.currentTarget.dataset.name
        };
        i.EVENT_LOG(e, function(t) {}), wx.navigateTo({
            url: "/pages/index/goodDetail/goodDetail?goodid=" + t.currentTarget.dataset.type
        });
    },
    onPullDownRefresh: function() {
        this.list(1);
    },
    onReachBottom: function() {
        this.data.hasMoreData ? this.list() : wx.showToast({
            title: "没有更多了",
            icon: "none"
        });
    }
});