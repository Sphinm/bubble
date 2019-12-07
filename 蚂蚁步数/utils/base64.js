module.exports = {
    Base64: function() {
        var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        this.encode = function(o) {
            var e, a, n, h, C, d, c, i = "", f = 0;
            for (o = t(o); f < o.length; ) h = (e = o.charCodeAt(f++)) >> 2, C = (3 & e) << 4 | (a = o.charCodeAt(f++)) >> 4, 
            d = (15 & a) << 2 | (n = o.charCodeAt(f++)) >> 6, c = 63 & n, isNaN(a) ? d = c = 64 : isNaN(n) && (c = 64), 
            i = i + r.charAt(h) + r.charAt(C) + r.charAt(d) + r.charAt(c);
            return i;
        }, this.decode = function(t) {
            var e, a, n, h, C, d, c = "", i = 0;
            for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); i < t.length; ) e = r.indexOf(t.charAt(i++)) << 2 | (h = r.indexOf(t.charAt(i++))) >> 4, 
            a = (15 & h) << 4 | (C = r.indexOf(t.charAt(i++))) >> 2, n = (3 & C) << 6 | (d = r.indexOf(t.charAt(i++))), 
            c += String.fromCharCode(e), 64 != C && (c += String.fromCharCode(a)), 64 != d && (c += String.fromCharCode(n));
            return c = o(c);
        };
        var t = function(r) {
            r = r.replace(/\r\n/g, "\n");
            for (var t = "", o = 0; o < r.length; o++) {
                var e = r.charCodeAt(o);
                e < 128 ? t += String.fromCharCode(e) : e > 127 && e < 2048 ? (t += String.fromCharCode(e >> 6 | 192), 
                t += String.fromCharCode(63 & e | 128)) : (t += String.fromCharCode(e >> 12 | 224), 
                t += String.fromCharCode(e >> 6 & 63 | 128), t += String.fromCharCode(63 & e | 128));
            }
            return t;
        }, o = function(r) {
            for (var t = "", o = 0, e = 0, a = 0, n = 0; o < r.length; ) (e = r.charCodeAt(o)) < 128 ? (t += String.fromCharCode(e), 
            o++) : e > 191 && e < 224 ? (a = r.charCodeAt(o + 1), t += String.fromCharCode((31 & e) << 6 | 63 & a), 
            o += 2) : (a = r.charCodeAt(o + 1), n = r.charCodeAt(o + 2), t += String.fromCharCode((15 & e) << 12 | (63 & a) << 6 | 63 & n), 
            o += 3);
            return t;
        };
    }
};