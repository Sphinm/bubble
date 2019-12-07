function t(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

module.exports = {
    throttle: function(t, e) {
        null != e && void 0 != e || (e = 1500);
        var n = null;
        return function() {
            var a = +new Date();
            (a - n > e || !n) && (t.apply(this, arguments), n = a);
        };
    },
    formatTime: function(e) {
        var n = e.getFullYear(), a = e.getMonth() + 1, o = e.getDate();
        e.getHours(), e.getMinutes(), e.getSeconds();
        return [ n, a, o ].map(t).join("-");
    },
    formatNumber: t,
    formateDate: function() {
        var t = Date.parse(new Date()), e = 1e3 * (t /= 1e3), n = new Date(e);
        return n.getFullYear() + "年" + (n.getMonth() + 1 < 10 ? "0" + (n.getMonth() + 1) : n.getMonth() + 1) + "月" + (n.getDate() < 10 ? "0" + n.getDate() : n.getDate()) + "日";
    },
    formateDateOther: function() {
        var t = Date.parse(new Date()), e = 1e3 * (t /= 1e3), n = new Date(e);
        return n.getFullYear() + "/" + (n.getMonth() + 1 < 10 ? "0" + (n.getMonth() + 1) : n.getMonth() + 1) + "/" + (n.getDate() < 10 ? "0" + n.getDate() : n.getDate());
    },
    showToast: function(t, e, n, a, o, r) {
        wx.showToast({
            title: t,
            image: e,
            icon: n,
            duration: a || 2e3,
            mask: o || !1,
            success: function(t) {
                r && r(t);
            },
            fail: function(t) {
                r && r(t);
            },
            complete: function(t) {
                r && r(t);
            }
        });
    },
    getTimeLeft: function(t) {
        var e = new Date(t).getTime() - new Date().getTime();
        return parseInt(e / 864e5) + "天" + parseInt(e % 864e5 / 36e5) + "时" + parseInt(e % 36e5 / 6e4) + "分" + parseInt(e % 6e4 / 1e3) + "秒";
    },
    getLoginCounts: function(t) {
        t || (t = "hjhLoginCount");
        var e = wx.getStorageSync(t);
        return e && void 0 != e && "undefined" != e && "{}" != JSON.stringify(e) && "NaN" != e ? parseInt(e.count) : 1;
    },
    setStorageCount: function(t) {
        var e = new Date().toLocaleDateString(), n = wx.getStorageSync(t);
        n && void 0 != n && "undefined" != n && "{}" != JSON.stringify(n) && "NaN" != n && null != n ? e == n.timeDate ? n.count = n.count + 1 : (n.count = 1, 
        n.timeDate = e) : ((n = {}).count = 2, n.timeDate = e), wx.setStorageSync(t, n);
    }
};