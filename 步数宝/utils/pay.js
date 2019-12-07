var e = require("./utils.js"), s = require("./request.js"), r = require("./urls.js"), u = require("./wglogin.js"), i = require("./toast.js");

module.exports = {
    ORDER: function(o, d) {
        wx.showLoading(), s.POST({
            url: r.API_ORDER,
            params: {
                userId: u.USERINFO().userId,
                goodsId: "111111",
                exchangeNum: "1",
                addressId: "1",
                outTradeNo: "222222"
            },
            success: function(e) {
                wx.hideLoading(), o(e);
            },
            fail: function(s) {
                wx.hideLoading(), e.isEmpty(d) ? i.FAIL(s.msg) : d(s);
            }
        });
    }
};