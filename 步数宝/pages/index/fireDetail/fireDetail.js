require("../../../utils/room.js");

var t = require("../../../utils/urls.js"), e = require("../../../utils/request.js");

require("../../../utils/toast.js"), require("../../../utils/wglogin.js");

Page({
    data: {
        fireList: [],
        pageCurrent: 1,
        pageSize: 15,
        isLast: !1
    },
    onLoad: function(t) {
        this.getFireList(1);
    },
    onPullDownRefresh: function() {
        this.getFireList(1, !0);
    },
    onReachBottom: function() {
        this.data.isLast || this.getFireList(this.data.pageCurrent + 1);
    },
    getFireList: function(s, i) {
        var a = this;
        i || wx.showLoading(), e.POST({
            url: t.API_FIRE_DETAIL,
            params: {
                pageSize: a.data.pageSize,
                pageNum: s
            },
            success: function(t) {
                i ? wx.stopPullDownRefresh() : wx.hideLoading(), "OK" == t.code && (1 == s && (a.data.fireList = []), 
                a.setData({
                    fireList: a.data.fireList.concat(t.data.result.detailsResps),
                    fireInfo: t.data.result,
                    pageCurrent: s
                }), t.data.result.detailsResps.length < a.data.pageSize ? a.setData({
                    isLast: !0
                }) : a.setData({
                    isLast: !1
                }));
            },
            fail: function(t) {
                i ? wx.stopPullDownRefresh() : wx.hideLoading();
            }
        });
    }
});