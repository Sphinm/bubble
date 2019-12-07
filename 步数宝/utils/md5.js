function r(r, n) {
    r[n >> 5] |= 128 << n % 32, r[14 + (n + 64 >>> 9 << 4)] = n;
    for (var o = 1732584193, f = -271733879, i = -1732584194, h = 271733878, v = 0; v < r.length; v += 16) {
        var A = o, l = f, g = i, d = h;
        f = c(f = c(f = c(f = c(f = e(f = e(f = e(f = e(f = u(f = u(f = u(f = u(f = t(f = t(f = t(f = t(f, i = t(i, h = t(h, o = t(o, f, i, h, r[v + 0], 7, -680876936), f, i, r[v + 1], 12, -389564586), o, f, r[v + 2], 17, 606105819), h, o, r[v + 3], 22, -1044525330), i = t(i, h = t(h, o = t(o, f, i, h, r[v + 4], 7, -176418897), f, i, r[v + 5], 12, 1200080426), o, f, r[v + 6], 17, -1473231341), h, o, r[v + 7], 22, -45705983), i = t(i, h = t(h, o = t(o, f, i, h, r[v + 8], 7, 1770035416), f, i, r[v + 9], 12, -1958414417), o, f, r[v + 10], 17, -42063), h, o, r[v + 11], 22, -1990404162), i = t(i, h = t(h, o = t(o, f, i, h, r[v + 12], 7, 1804603682), f, i, r[v + 13], 12, -40341101), o, f, r[v + 14], 17, -1502002290), h, o, r[v + 15], 22, 1236535329), i = u(i, h = u(h, o = u(o, f, i, h, r[v + 1], 5, -165796510), f, i, r[v + 6], 9, -1069501632), o, f, r[v + 11], 14, 643717713), h, o, r[v + 0], 20, -373897302), i = u(i, h = u(h, o = u(o, f, i, h, r[v + 5], 5, -701558691), f, i, r[v + 10], 9, 38016083), o, f, r[v + 15], 14, -660478335), h, o, r[v + 4], 20, -405537848), i = u(i, h = u(h, o = u(o, f, i, h, r[v + 9], 5, 568446438), f, i, r[v + 14], 9, -1019803690), o, f, r[v + 3], 14, -187363961), h, o, r[v + 8], 20, 1163531501), i = u(i, h = u(h, o = u(o, f, i, h, r[v + 13], 5, -1444681467), f, i, r[v + 2], 9, -51403784), o, f, r[v + 7], 14, 1735328473), h, o, r[v + 12], 20, -1926607734), i = e(i, h = e(h, o = e(o, f, i, h, r[v + 5], 4, -378558), f, i, r[v + 8], 11, -2022574463), o, f, r[v + 11], 16, 1839030562), h, o, r[v + 14], 23, -35309556), i = e(i, h = e(h, o = e(o, f, i, h, r[v + 1], 4, -1530992060), f, i, r[v + 4], 11, 1272893353), o, f, r[v + 7], 16, -155497632), h, o, r[v + 10], 23, -1094730640), i = e(i, h = e(h, o = e(o, f, i, h, r[v + 13], 4, 681279174), f, i, r[v + 0], 11, -358537222), o, f, r[v + 3], 16, -722521979), h, o, r[v + 6], 23, 76029189), i = e(i, h = e(h, o = e(o, f, i, h, r[v + 9], 4, -640364487), f, i, r[v + 12], 11, -421815835), o, f, r[v + 15], 16, 530742520), h, o, r[v + 2], 23, -995338651), i = c(i, h = c(h, o = c(o, f, i, h, r[v + 0], 6, -198630844), f, i, r[v + 7], 10, 1126891415), o, f, r[v + 14], 15, -1416354905), h, o, r[v + 5], 21, -57434055), i = c(i, h = c(h, o = c(o, f, i, h, r[v + 12], 6, 1700485571), f, i, r[v + 3], 10, -1894986606), o, f, r[v + 10], 15, -1051523), h, o, r[v + 1], 21, -2054922799), i = c(i, h = c(h, o = c(o, f, i, h, r[v + 8], 6, 1873313359), f, i, r[v + 15], 10, -30611744), o, f, r[v + 6], 15, -1560198380), h, o, r[v + 13], 21, 1309151649), i = c(i, h = c(h, o = c(o, f, i, h, r[v + 4], 6, -145523070), f, i, r[v + 11], 10, -1120210379), o, f, r[v + 2], 15, 718787259), h, o, r[v + 9], 21, -343485551), 
        o = a(o, A), f = a(f, l), i = a(i, g), h = a(h, d);
    }
    return Array(o, f, i, h);
}

function n(r, n, t, u, e, c) {
    return a(f(a(a(n, r), a(u, c)), e), t);
}

function t(r, t, u, e, c, o, a) {
    return n(t & u | ~t & e, r, t, c, o, a);
}

function u(r, t, u, e, c, o, a) {
    return n(t & e | u & ~e, r, t, c, o, a);
}

function e(r, t, u, e, c, o, a) {
    return n(t ^ u ^ e, r, t, c, o, a);
}

function c(r, t, u, e, c, o, a) {
    return n(u ^ (t | ~e), r, t, c, o, a);
}

function o(n, t) {
    var u = i(n);
    u.length > 16 && (u = r(u, n.length * A));
    for (var e = Array(16), c = Array(16), o = 0; o < 16; o++) e[o] = 909522486 ^ u[o], 
    c[o] = 1549556828 ^ u[o];
    var a = r(e.concat(i(t)), 512 + t.length * A);
    return r(c.concat(a), 640);
}

function a(r, n) {
    var t = (65535 & r) + (65535 & n);
    return (r >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t;
}

function f(r, n) {
    return r << n | r >>> 32 - n;
}

function i(r) {
    for (var n = Array(), t = (1 << A) - 1, u = 0; u < r.length * A; u += A) n[u >> 5] |= (r.charCodeAt(u / A) & t) << u % 32;
    return n;
}

function h(r) {
    for (var n = v ? "0123456789ABCDEF" : "0123456789abcdef", t = "", u = 0; u < 4 * r.length; u++) t += n.charAt(r[u >> 2] >> u % 4 * 8 + 4 & 15) + n.charAt(r[u >> 2] >> u % 4 * 8 & 15);
    return t;
}

var v = 0, A = 8;

module.exports = {
    core_md5: r,
    hex_hmac_md5: function(r, n) {
        return h(o(r, n));
    }
};