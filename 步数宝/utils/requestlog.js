function a(a, e) {
    var t = e.params, o = {};
    o.data = t, o.api = e.url, o.channel = "20180001", o.v = "1.7.2", o.app = "20180730", 
    o.sig = r.crypto(o);
    r.crypto(o);
    wx.request({
        url: e.url,
        data: o,
        method: a,
        success: function(a) {
            if ("SESSION_KEY_INVALID" == a.data.code && (getApp().globalData.userInfo = {}, 
            wx.setStorageSync("userInfo", {})), "ERR_USER_INVALID" == a.data.code) {
                var r = getApp();
                r.globalData.flag || (r.globalData.flag = !0, wx.showModal({
                    content: a.data.msg,
                    showCancel: !1,
                    success: function(a) {
                        wx.reLaunch({
                            url: "/pages/mine_new/about/about?unload=true"
                        });
                    }
                }));
            } else e.success(a.data);
        },
        fail: function(a) {
            console.error("error_log_url:" + e.url + " msg:" + a.errMsg);
        },
        complete: function() {}
    });
}

var e = require("./urls.js"), r = (require("./util.js"), e.HTTP_URL, require("./toast.js"), 
require("./JuXiaoLeUtils.js"));

module.exports = {
    GET: function(e) {
        a("GET", e);
    },
    POST: function(e) {
        a("POST", e);
    }
};