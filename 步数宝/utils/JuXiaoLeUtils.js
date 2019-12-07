function e(e, t) {
    if (e) {
        var o = e[t];
        if (o) return o;
    }
    return "";
}

function t(e) {
    var n = "";
    if (null != e) if ("object" == (void 0 === e ? "undefined" : o(e))) if (e.length) for (f = 0; f < e.length; f++) n += t(e[f]); else for (var r = Object.keys(e).sort(), f = 0; f < r.length; f++) n += t(e[r[f]]); else n += e;
    return n;
}

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = "25fe272a942c4f7583aec6ad9d624fbd", r = require("./md5");

module.exports = {
    crypto: function(o) {
        var f = "";
        return f += e(o, "api"), f += e(o, "v"), f += e(o, "app"), f += e(o, "channel"), 
        f += e(o, "t"), f += t(o.data), f = encodeURIComponent(f), r.hex_hmac_md5(n, f);
    }
};