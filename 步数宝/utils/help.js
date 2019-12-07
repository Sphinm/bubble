require("./utils.js");

var e = require("./request.js");

require("./wglogin.js"), require("./toast.js");

module.exports = {
    GOODHELPREQUEST: function(s, i, r, o) {
        e.POST({
            url: s,
            params: i,
            success: function(e) {
                wx.hideLoading(), "OK" == e.code ? r(e) : wx.showToast({
                    title: e.msg,
                    icon: "none",
                    mask: !0
                });
            },
            fail: function(e) {}
        });
    }
};