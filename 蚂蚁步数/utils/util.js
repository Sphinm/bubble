function t() {
    wx.showLoading({
        title: "加载中"
    });
}

function n() {
    wx.hideLoading(), wx.stopPullDownRefresh();
}

var r = !1, e = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(t) {
        var n = t.getFullYear(), r = t.getMonth() + 1, o = t.getDate(), i = t.getHours(), a = t.getMinutes(), u = t.getSeconds();
        return [ n, r, o ].map(e).join("/") + " " + [ i, a, u ].map(e).join(":");
    },
    formatNumber: e,
    formatMill: function(t) {
        return t = t.toString(), (t = t.substring(0, 2))[1] ? t : "0" + t;
    },
    log: function(t) {
        r && console.log(t);
    },
    error: function(t) {
        r && console.error(t);
    },
    wxPromisify: function(r, e) {
        console.log("wxPromisify 111");
        var e = e || 1;
        return function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return new Promise(function(i, a) {
                o.success = function(t) {
                    n(), i(t);
                }, o.fail = function(t) {
                    n(), a(t);
                }, 1 === e && t(), r(o);
            });
        };
    },
    getSecondsByTimestamp: function(t, n) {
        var r = parseInt(t / 1e3).toString(), e = parseInt(t % 1e3).toString();
        if (e.length < 3) for (var o = 3 - e.length, i = 0; i < o; ++i) e = "0" + e;
        if (n <= 3) e = e.substr(0, n); else for (var o = n - e.length, i = 0; i < o; ++i) e += Math.floor(10 * Math.random());
        return r + "." + e;
    },
    timeDelay: function(t) {
        var n = t || [], r = 0, e = 0;
        t.length > 0 && (r = Math.floor(Math.random() * (t[0].perc - t[t.length - 1].perc) + t[t.length - 1].perc));
        for (var o = 0; o < n.length; o++) if (r <= n[o].perc) {
            e = parseInt(n[o].timeDelay / n[o].perc * r);
            break;
        }
        return e;
    }
};