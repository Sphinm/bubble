var s = require("./utils.js"), u = require("./request.js"), E = require("./urls.js"), n = require("./wglogin.js");

require("./toast.js"), require("./event.js");

module.exports = {
    GETTEAMLIST: function(e, i, r, t) {
        u.POST({
            url: E.TEAM_TEAMLIST,
            params: {
                userId: n.USERINFO().userId,
                pageSize: i,
                currentPage: e
            },
            success: function(s) {
                r(s);
            },
            fail: function(u) {
                s.isEmpty(t) || t(u);
            }
        });
    },
    KICKMEMBER: function(e, i, r, t) {
        u.POST({
            url: E.TEAM_KICKMEMBER,
            params: {
                userId: n.USERINFO().userId,
                teamId: e,
                memberId: i
            },
            success: function(s) {
                r(s);
            },
            fail: function(u) {
                s.isEmpty(t) || t(u);
            }
        });
    },
    QUITTEAM: function(e, i, r) {
        u.POST({
            url: E.TEAM_QUITTEAM,
            params: {
                userId: n.USERINFO().userId,
                teamId: e
            },
            success: function(s) {
                i(s);
            },
            fail: function(u) {
                s.isEmpty(r) || r(u);
            }
        });
    },
    JOINTEAM: function(e, i, r) {
        u.POST({
            url: E.TEAM_JOINTEAM,
            params: {
                userId: n.USERINFO().userId,
                teamId: e
            },
            success: function(s) {
                i(s);
            },
            fail: function(u) {
                s.isEmpty(r) || r(u);
            }
        });
    },
    CHANGETEAMINFO: function(e, i, r) {
        e.userId = n.USERINFO().userId, u.POST({
            url: E.TEAM_CHANGEtEAMINFO,
            params: e,
            success: function(s) {
                i(s);
            },
            fail: function(u) {
                s.isEmpty(r) || r(u);
            }
        });
    },
    MANAGEMEMBERS: function(e, i, r) {
        e.userId = n.USERINFO().userId, u.POST({
            url: E.TEAM_MANAGEMEMBERS,
            params: e,
            success: function(s) {
                i(s);
            },
            fail: function(u) {
                s.isEmpty(r) || r(u);
            }
        });
    },
    CREATETEAM: function(e, i, r) {
        e.userId = n.USERINFO().userId, u.POST({
            url: E.TEAM_CREATETEAM,
            params: e,
            success: function(s) {
                i(s);
            },
            fail: function(u) {
                s.isEmpty(r) || r(u);
            }
        });
    },
    TEAMINFO: function(e, i, r) {
        u.POST({
            url: E.TEAM_TEAMINFO,
            params: {
                userId: n.USERINFO().userId,
                teamId: e
            },
            success: function(s) {
                i(s);
            },
            fail: function(u) {
                s.isEmpty(r) || r(u);
            }
        });
    },
    TEAMBASICINFO: function(e, i, r) {
        u.POST({
            url: E.TEAM_TEAMBASICINFO,
            params: {
                userId: n.USERINFO().userId,
                teamId: e
            },
            success: function(s) {
                i(s);
            },
            fail: function(u) {
                s.isEmpty(r) || r(u);
            }
        });
    },
    CHECKMEMBER: function(e, i, r) {
        u.POST({
            url: E.TEAM_CHECKMEMBER,
            params: {
                userId: n.USERINFO().userId,
                teamId: e
            },
            success: function(s) {
                i(s);
            },
            fail: function(u) {
                s.isEmpty(r) || r(u);
            }
        });
    }
};