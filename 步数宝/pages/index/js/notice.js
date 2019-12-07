module.exports = {
    NTC: function(t, e) {
        var a = t;
        e(function(t) {
            if (clearTimeout(), "OK" == t.code) {
                if (!t.data.result) return;
                var e = new Date(), n = "" + e.getFullYear() + e.getMonth() + e.getDate();
                if (n == wx.getStorageSync("lxr_time")) return;
                wx.setStorageSync("lxr_time", n), t.data.result.content ? (a.setData({
                    text: t.data.result.content,
                    isShow: !1
                }), setTimeout(function() {
                    var e = 28 * t.data.result.content.length, n = wx.createAnimation({
                        duration: e / 60 * 1e3 + 500,
                        delay: 1e3
                    });
                    n.translateX("-100%").step(), a.setData({
                        animationData: n.export()
                    }), setTimeout(function() {
                        a.setData({
                            animationData: {},
                            isShow: !0
                        });
                    }, e / 60 * 1e3 + 1500);
                }, 1e3)) : a.setData({
                    isShow: !0
                });
            } else a.setData({
                isShow: !0
            });
        });
    }
};