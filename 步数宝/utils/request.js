function e(e, r) {
    var u = r.params;
    if ("{}" != JSON.stringify(u) && u || (u = {}), !u.userId || null == u.userId || void 0 == u.userId || "undefined" == u.userId) if ("" != o) u.userId = o; else {
        var c = wx.getStorageSync("userInfo");
        a.isEmpty(c) && (c = wx.getStorageSync("hjh_userInfo")), c.userId && (u.userId = c.userId, 
        o = c.userId);
    }
    var d = {};
    if (d.api = r.url, d.channel = "20180001", d.v = s.APP_VERSION, d.app = "20180730", 
    "-1" == n) {
        var i = wx.getStorageSync("userInfo");
        i.hasOwnProperty("token") && (n = i.token, d.token = n);
    } else d.token = n;
    d.t = new Date().getTime(), d.data = u, d.sig = t.crypto(d), wx.request({
        url: r.url,
        data: d,
        method: e,
        success: function(e) {
            var s = getApp();
            if ("SESSION_KEY_INVALID" != e.data.code && "ERR_USER_NOT_FOUND" != e.data.code && "USER_NOT_EXIST" != e.data.code && "ERR_NEED_LOGIN" != e.data.code || (s.globalData.userInfo = {}, 
            wx.setStorageSync("userInfo", {}), n = "-1", o = ""), "ERR_USER_INVALID" == e.data.code) wx.showModal({
                content: e.data.msg,
                showCancel: !1,
                success: function(e) {
                    wx.reLaunch({
                        url: "/pages/mine_new/about/about?unload=true"
                    });
                }
            }); else if ("ERR_USER_CHEAT_WARN" == e.data.code) wx.showModal({
                content: e.data.msg,
                showCancel: !1,
                success: function(e) {}
            }), r.success(e.data); else if ("USER_CLEAN_COIN" == e.data.code) {
                var t = getCurrentPages();
                t[t.length - 1].setData({
                    valueClean: !0,
                    valueCleanMsg: e.data.msg
                }), r.success(e.data);
            } else "NEW_VERSION_UPDATE" == e.data.code ? (wx.showModal({
                content: e.data.msg,
                showCancel: !1,
                success: function(e) {}
            }), r.success(e.data)) : r.success(e.data);
        },
        fail: function(e) {
            r.fail(e), console.error("error_url:" + r.url + " msg:" + e.msg), -1 != e.msg.indexOf("timeout") && wx.showToast({
                title: "请求超时，请稍后重试",
                icon: "none"
            });
        },
        complete: function() {}
    });
}

"function" == typeof Symbol && Symbol.iterator;

var s = require("./urls.js"), t = (require("./util.js"), require("./toast.js"), 
require("./JuXiaoLeUtils.js")), a = require("./utils.js"), o = "", n = "-1";

module.exports = {
    GET: function(s) {
        e("GET", s);
    },
    POST: function(s) {
        e("POST", s);
    }
};