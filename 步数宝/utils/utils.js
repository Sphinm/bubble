var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
    return typeof n;
} : function(n) {
    return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n;
};

module.exports = {
    isEmpty: function(n) {
        return "" == n || void 0 == n || null == n || "{}" == JSON.stringify(n);
    },
    urlEncode: function r(t, o, e) {
        if (null == t) return "";
        var u = "", i = void 0 === t ? "undefined" : n(t);
        if ("string" == i || "number" == i || "boolean" == i) u += "&" + o + "=" + (null == e || e ? encodeURIComponent(t) : t); else for (var l in t) {
            var f = null == o ? l : o + (t instanceof Array ? "[" + l + "]" : "." + l);
            u += r(t[l], f, e);
        }
        return u;
    },
    compareVersion: function(n, r) {
        n = n.split("."), r = r.split(".");
        for (var t = Math.max(n.length, r.length); n.length < t; ) n.push("0");
        for (;r.length < t; ) r.push("0");
        for (var o = 0; o < t; o++) {
            var e = parseInt(n[o]), u = parseInt(r[o]);
            if (e > u) return 1;
            if (e < u) return -1;
        }
        return 0;
    }
};