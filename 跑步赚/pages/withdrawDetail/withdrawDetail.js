var t = getApp(), a = null;

Page({
    data: {
        txInfo: null
    },
    txInfo: function() {
        t.httpsGet({
            url: t.getData("/txinfo"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                var n = t.data.data;
                console.log(n), a.setData({
                    txInfo: n
                });
            }
        });
    },
    onLoad: function() {
        a = this, this.txInfo();
    }
});