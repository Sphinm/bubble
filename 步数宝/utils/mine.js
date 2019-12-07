var s = require("./utils.js"), u = require("./request.js"), i = require("./urls.js"), r = require("./wglogin.js"), e = require("./toast.js");

module.exports = {
    GETGOODSBYUSERIDLIST: function(n, t, I) {
        var c = n;
        c.userId = r.USERINFO().userId, u.POST({
            url: i.GOODSBYUSERIDLIST,
            params: c,
            success: function(s) {
                t(s);
            },
            fail: function(u) {
                s.isEmpty(I) ? e.FAIL(u.msg) : I(u);
            }
        });
    },
    GETPROGRAMLIST: function(r, n) {
        u.POST({
            url: i.PROGRAMLIST,
            success: function(s) {
                r(s);
            },
            fail: function(u) {
                s.isEmpty(n) ? e.FAIL(u.msg) : n(u);
            }
        });
    },
    ACTIVE: function(r, n, t, I) {
        u.POST({
            url: i.API_STUPNUM,
            params: {
                userId: r,
                exchangeId: n
            },
            success: function(s) {
                t(s.data);
            },
            fail: function(u) {
                s.isEmpty(I) ? e.FAIL(u.msg) : I(u);
            }
        });
    },
    MINE_NEW_CKECKTHIRDPARTY: function(n, t, I, c) {
        u.POST({
            url: i.MINE_NEW_CKECKTHIRDPARTY,
            params: {
                id: n,
                hitNumLimit: t,
                userId: r.USERINFO().userId
            },
            success: function(s) {
                I(s);
            },
            fail: function(u) {
                s.isEmpty(c) ? e.FAIL(u.msg) : c(u);
            }
        });
    }
};