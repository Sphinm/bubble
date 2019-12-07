var i = require("./request.js"), s = require("./urls.js"), r = require("./utils.js"), e = (require("./toast.js"), 
require("./wglogin.js"));

module.exports = {
    CONVERT: function(u, n, o, d, a, t, I) {
        wx.showLoading(), i.POST({
            url: s.API_CONVERT,
            params: {
                userId: e.USERINFO().userId,
                orderId: orderId
            },
            success: function(i) {},
            fail: function(i) {
                wx.hideLoading(), r.isEmpty(I) || I(i);
            }
        });
    },
    ORDERDETAILS: function(u, n, o) {
        u.userId = e.USERINFO().userId, wx.showLoading(), i.POST({
            url: s.API_ORDERDETAILS,
            params: u,
            success: function(i) {
                wx.hideLoading(), n(i);
            },
            fail: function(i) {
                wx.hideLoading(), r.isEmpty(o) || o(i);
            }
        });
    },
    CONFIRMORDE: function(u, n, o) {
        wx.showLoading(), i.POST({
            url: s.API_CONFIRORDE,
            params: {
                userId: e.USERINFO().userId,
                orderId: u
            },
            success: function(i) {
                wx.hideLoading(), n(i);
            },
            fail: function(i) {
                wx.hideLoading(), r.isEmpty(o) || o(i);
            }
        });
    }
};