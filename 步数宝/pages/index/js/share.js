var e = require("../../../utils/wglogin.js"), s = require("../../../utils/event.js"), u = require("../../../utils/request.js"), r = require("../../../utils/urls.js");

module.exports = {
    OSM: function(u, r) {
        return {
            title: "我正在用步数换商品，快来跟我一起抢！",
            path: "/pages/index/index?source=1&userId=" + e.USERINFO().userId,
            imageUrl: "/images/share1.png",
            success: function(e) {
                if (e.shareTickets) u = {
                    event: s.EVENT_LOG_HOMESHARE,
                    share_source: "group"
                }, s.EVENT_LOG(u, function(e) {}); else {
                    var u = {
                        event: s.EVENT_LOG_HOMESHARE,
                        share_source: "person"
                    };
                    s.EVENT_LOG(u, function(e) {});
                }
            }
        };
    },
    SHAREINFO: function(s, n) {
        var i = {};
        i.userId = e.USERINFO().userId, u.POST({
            url: r.API_GETSHAREINFO,
            params: i,
            success: function(e) {
                s(e);
            },
            fail: function(e) {
                n(e);
            }
        });
    },
    GETREWARDINFO: function(s) {
        var n = {};
        n.userId = e.USERINFO().userId, u.POST({
            url: r.API_ADVERTDoRemind,
            params: n,
            success: function(e) {
                s(e);
            },
            fail: function(e) {}
        });
    },
    SHARECARD: function(e, s) {
        var n = {};
        n.type = e, u.POST({
            url: r.SHARECARD,
            params: n,
            success: function(e) {
                s(e);
            },
            fail: function(e) {}
        });
    }
};