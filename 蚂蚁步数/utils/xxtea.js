function r(r, t) {
    for (var e = r.length, o = 4294967295 & r[e - 1], n = 0; n < e; n++) r[n] = String.fromCharCode(255 & r[n], r[n] >>> 8 & 255, r[n] >>> 16 & 255, r[n] >>> 24 & 255);
    return t ? r.join("").substring(0, o) : r.join("");
}

function t(r, t) {
    for (var e = r.length, o = [], n = 0; n < e; n += 4) o[n >> 2] = r.charCodeAt(n) | r.charCodeAt(n + 1) << 8 | r.charCodeAt(n + 2) << 16 | r.charCodeAt(n + 3) << 24;
    return t && (o[o.length] = e), o;
}

function e(r) {
    var t = "", e = "", o = 0;
    do {
        1 == (e = r.charCodeAt(o++).toString(16)).length && (e = "0" + e), t += e;
    } while (o < r.length);
    return t;
}

function o(r) {
    for (var t = "", e = 0; e < r.length; ) {
        var o = parseInt(r.substr(e, 1), 16) << 4 | parseInt(r.substr(++e, 1), 16);
        o &= 255, t += String.fromCharCode(o), ++e;
    }
    return t;
}

module.exports = {
    xxtea_encrypt: function(o, n) {
        if ("" == o) return "";
        for (var a, c, h = t(o, !0), f = t(n, !1), C = h.length - 1, i = h[C], u = h[0], s = Math.floor(6 + 52 / (C + 1)), d = 0; s-- > 0; ) {
            c = (d = d + 2654435769 & 4294967295) >>> 2 & 3;
            for (var g = 0; g < C; g++) a = (i >>> 5 ^ (u = h[g + 1]) << 2) + (u >>> 3 ^ i << 4) ^ (d ^ u) + (f[3 & g ^ c] ^ i), 
            i = h[g] = h[g] + a & 4294967295;
            a = (i >>> 5 ^ (u = h[0]) << 2) + (u >>> 3 ^ i << 4) ^ (d ^ u) + (f[3 & g ^ c] ^ i), 
            i = h[C] = h[C] + a & 4294967295;
        }
        return e(r(h, !1));
    },
    xxtea_decrypt: function(e, n) {
        if ("" == e) return "";
        for (var a, c, h = t(e = o(e), !1), f = t(n, !1), C = h.length - 1, i = h[C - 1], u = h[0], s = 2654435769 * Math.floor(6 + 52 / (C + 1)) & 4294967295; 0 != s; ) {
            c = s >>> 2 & 3;
            for (var d = C; d > 0; d--) a = ((i = h[d - 1]) >>> 5 ^ u << 2) + (u >>> 3 ^ i << 4) ^ (s ^ u) + (f[3 & d ^ c] ^ i), 
            u = h[d] = h[d] - a & 4294967295;
            a = ((i = h[C]) >>> 5 ^ u << 2) + (u >>> 3 ^ i << 4) ^ (s ^ u) + (f[3 & d ^ c] ^ i), 
            u = h[0] = h[0] - a & 4294967295, s = s - 2654435769 & 4294967295;
        }
        return r(h, !0);
    },
    utf16to8: function(r) {
        var t, e, o, n;
        for (t = "", o = r.length, e = 0; e < o; e++) (n = r.charCodeAt(e)) >= 1 && n <= 127 ? t += r.charAt(e) : n > 2047 ? (t += String.fromCharCode(224 | n >> 12 & 15), 
        t += String.fromCharCode(128 | n >> 6 & 63), t += String.fromCharCode(128 | n >> 0 & 63)) : (t += String.fromCharCode(192 | n >> 6 & 31), 
        t += String.fromCharCode(128 | n >> 0 & 63));
        return t;
    },
    utf8to16: function(r) {
        var t, e, o, n, a, c;
        for (t = "", o = r.length, e = 0; e < o; ) switch ((n = r.charCodeAt(e++)) >> 4) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            t += r.charAt(e - 1);
            break;

          case 12:
          case 13:
            a = r.charCodeAt(e++), t += String.fromCharCode((31 & n) << 6 | 63 & a);
            break;

          case 14:
            a = r.charCodeAt(e++), c = r.charCodeAt(e++), t += String.fromCharCode((15 & n) << 12 | (63 & a) << 6 | (63 & c) << 0);
        }
        return t;
    }
};