var s = require("./utils.js"), i = require("./request.js"), e = require("./urls.js"), u = require("./wglogin.js"), r = require("./toast.js");

module.exports = {
    COUPONLIST: function(n, o, d) {
        wx.showLoading(), i.POST({
            url: e.COUPONLIST,
            params: {
                status: n,
                userId: u.USERINFO().userId
            },
            success: function(s) {
                wx.hideLoading(), o(s);
            },
            fail: function(i) {
                wx.hideLoading(), s.isEmpty(d) ? (wx.hideLoading(), r.FAIL(i.msg)) : d(i);
            }
        });
    },
    GETHASCOUPON: function(n, o, d, a, t) {
        wx.showLoading(), i.POST({
            url: e.GETHASCOUPON,
            params: {
                goodsId: n,
                exchangeNum: o,
                buyType: d,
                userId: u.USERINFO().userId
            },
            success: function(s) {
                wx.hideLoading(), a(s);
            },
            fail: function(i) {
                wx.hideLoading(), s.isEmpty(t) ? (wx.hideLoading(), r.FAIL(i.msg)) : t(i);
            }
        });
    }
};