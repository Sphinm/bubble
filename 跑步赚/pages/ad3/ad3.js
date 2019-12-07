Page({
    data: {
        ad: null
    },
    onLoad: function(n) {
        var o = this;
        wx.request({
            url: "https://online.litemob.com/advert/api/v1/advert/otherAdvert?program=2",
            success: function(n) {
                for (var t = n.data.data, a = null, e = 0; e < t.length; e++) 3 == t[e].type && (a = t[e]);
                o.setData({
                    ad: a
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});