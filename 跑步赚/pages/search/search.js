var e = getApp();

Page({
    data: {
        userName: "",
        ind: 1,
        hide: !1
    },
    onLoad: function() {
        var a = this;
        wx.request({
            url: e.get_qdd("/main/hotSearch"),
            method: "GET",
            success: function(e) {
                a.setData({
                    type: e.data.data
                });
            }
        });
    },
    check: function(e) {
        this.setData({
            userName: e.currentTarget.dataset.type
        });
    },
    win: function(e) {
        console.log(e), this.setData({
            userName: e.detail.value
        });
    },
    search: function() {
        var e = encodeURI(this.data.userName);
        "" != this.data.userName && wx.navigateTo({
            url: "/pages/searchpro/searchpro?search=" + e
        });
    },
    onShareAppMessage: function(a) {
        var t = e.globalData.shareInfo;
        return t.path = "/pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        t;
    }
});