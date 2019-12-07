function r(r) {
    return (r = r.toString())[1] ? r : "0" + r;
}

function t(r, t) {
    for (var e = r.length, n = 4294967295 & r[e - 1], o = 0; o < e; o++) r[o] = String.fromCharCode(255 & r[o], r[o] >>> 8 & 255, r[o] >>> 16 & 255, r[o] >>> 24 & 255);
    return t ? r.join("").substring(0, n) : r.join("");
}

function e(r, t) {
    for (var e = r.length, n = [], o = 0; o < e; o += 4) n[o >> 2] = r.charCodeAt(o) | r.charCodeAt(o + 1) << 8 | r.charCodeAt(o + 2) << 16 | r.charCodeAt(o + 3) << 24;
    return t && (n[n.length] = e), n;
}

function n(r) {
    var t = "", e = "", n = 0;
    do {
        1 == (e = r.charCodeAt(n++).toString(16)).length && (e = "0" + e), t += e;
    } while (n < r.length);
    return t;
}

function o(r) {
    for (var t = "", e = 0; e < r.length; ) {
        var n = parseInt(r.substr(e, 1), 16) << 4 | parseInt(r.substr(++e, 1), 16);
        n &= 255, t += String.fromCharCode(n), ++e;
    }
    return t;
}

function a(r) {
    for (var t = "", e = 0, n = 0, o = 0, a = 0; e < r.length; ) (n = r.charCodeAt(e)) < 128 ? (t += String.fromCharCode(n), 
    e++) : n > 191 && n < 224 ? (o = r.charCodeAt(e + 1), t += String.fromCharCode((31 & n) << 6 | 63 & o), 
    e += 2) : (o = r.charCodeAt(e + 1), a = r.charCodeAt(e + 2), t += String.fromCharCode((15 & n) << 12 | (63 & o) << 6 | 63 & a), 
    e += 3);
    return t;
}

function h(r) {
    var t, e, n, o;
    for (t = "", n = r.length, e = 0; e < n; e++) (o = r.charCodeAt(e)) >= 1 && o <= 127 ? t += r.charAt(e) : o > 2047 ? (t += String.fromCharCode(224 | o >> 12 & 15), 
    t += String.fromCharCode(128 | o >> 6 & 63), t += String.fromCharCode(128 | o >> 0 & 63)) : (t += String.fromCharCode(192 | o >> 6 & 31), 
    t += String.fromCharCode(128 | o >> 0 & 63));
    return t;
}

function i(r) {
    var t = r.replace(/:/g, "-"), e = (t = t.replace(/ /g, "-")).split("-");
    return i = new Date(Date.UTC(e[0], e[1] - 1, e[2], e[3] - 8, e[4], e[5])).getTime() / 1e3;
}

module.exports = {
    formatTime: function(t) {
        var e = t.getFullYear(), n = t.getMonth() + 1, o = t.getDate(), a = t.getHours(), h = t.getMinutes(), i = t.getSeconds();
        return [ e, n, o ].map(r).join("/") + " " + [ a, h, i ].map(r).join(":");
    },
    xxtea_encrypt: function(r, o) {
        if ("" == r) return "";
        for (var a, h, i = e(r, !0), u = e(o, !1), c = i.length - 1, g = i[c], f = i[0], d = Math.floor(6 + 52 / (c + 1)), C = 0; d-- > 0; ) {
            h = (C = C + 2654435769 & 4294967295) >>> 2 & 3;
            for (var s = 0; s < c; s++) a = (g >>> 5 ^ (f = i[s + 1]) << 2) + (f >>> 3 ^ g << 4) ^ (C ^ f) + (u[3 & s ^ h] ^ g), 
            g = i[s] = i[s] + a & 4294967295;
            a = (g >>> 5 ^ (f = i[0]) << 2) + (f >>> 3 ^ g << 4) ^ (C ^ f) + (u[3 & s ^ h] ^ g), 
            g = i[c] = i[c] + a & 4294967295;
        }
        return n(t(i, !1));
    },
    xxtea_decrypt: function(r, n) {
        if ("" == r) return "";
        for (var a, h, i = e(r = o(r), !1), u = e(n, !1), c = i.length - 1, g = i[c - 1], f = i[0], d = 2654435769 * Math.floor(6 + 52 / (c + 1)) & 4294967295; 0 != d; ) {
            h = d >>> 2 & 3;
            for (var C = c; C > 0; C--) a = ((g = i[C - 1]) >>> 5 ^ f << 2) + (f >>> 3 ^ g << 4) ^ (d ^ f) + (u[3 & C ^ h] ^ g), 
            f = i[C] = i[C] - a & 4294967295;
            a = ((g = i[c]) >>> 5 ^ f << 2) + (f >>> 3 ^ g << 4) ^ (d ^ f) + (u[3 & C ^ h] ^ g), 
            f = i[0] = i[0] - a & 4294967295, d = d - 2654435769 & 4294967295;
        }
        return t(i, !0);
    },
    formatTimeTwo: function(t, e) {
        var n = [ "Y", "M", "D", "h", "m", "s" ], o = [], a = new Date(1e3 * t);
        o.push(a.getFullYear()), o.push(r(a.getMonth() + 1)), o.push(r(a.getDate())), o.push(r(a.getHours())), 
        o.push(r(a.getMinutes())), o.push(r(a.getSeconds()));
        for (var h in o) e = e.replace(n[h], o[h]);
        return e;
    },
    base64_encode: function(r) {
        for (var t, e, n, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", a = 0, i = (r = h(r)).length, u = ""; a < i; ) {
            if (t = 255 & r.charCodeAt(a++), a == i) {
                u += o.charAt(t >> 2), u += o.charAt((3 & t) << 4), u += "==";
                break;
            }
            if (e = r.charCodeAt(a++), a == i) {
                u += o.charAt(t >> 2), u += o.charAt((3 & t) << 4 | (240 & e) >> 4), u += o.charAt((15 & e) << 2), 
                u += "=";
                break;
            }
            n = r.charCodeAt(a++), u += o.charAt(t >> 2), u += o.charAt((3 & t) << 4 | (240 & e) >> 4), 
            u += o.charAt((15 & e) << 2 | (192 & n) >> 6), u += o.charAt(63 & n);
        }
        return u;
    },
    base64_decode: function(r) {
        var t, e, n, o, h, i, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = "", g = 0;
        for (r = r.replace(/[^A-Za-z0-9\+\/\=]/g, ""); g < r.length; ) t = u.indexOf(r.charAt(g++)) << 2 | (o = u.indexOf(r.charAt(g++))) >> 4, 
        e = (15 & o) << 4 | (h = u.indexOf(r.charAt(g++))) >> 2, n = (3 & h) << 6 | (i = u.indexOf(r.charAt(g++))), 
        c += String.fromCharCode(t), 64 != h && (c += String.fromCharCode(e)), 64 != i && (c += String.fromCharCode(n));
        return a(c);
    },
    encodeUtf8: function(r) {
        var t = escape(r).split("%"), e = "";
        "" != t[0] && (e = t[0]);
        for (var n = 1; n < t.length; n++) "u" == t[n].substring(0, 1) ? e += Hex2Utf8(Str2Hex(t[n].substring(1, 5))) : e += "%" + t[n];
        return e;
    },
    strtotime: i,
    userDate: function(r) {
        var t = new Date(1e3 * r);
        return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    },
    timestampToTime: function(r) {
        var t = new Date(1e3 * r);
        return t.getFullYear() + "-" + (t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
    }
};