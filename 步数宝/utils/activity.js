var s = require("./request.js"), n = require("./urls.js"), i = require("./utils.js"), u = require("./toast.js"), c = require("./wglogin.js");

module.exports = {
    GOODLIST: function(c, t) {
        s.POST({
            url: n.API_ACTIVITY_INFO,
            params: {},
            success: function(s) {
                c(s);
            },
            fail: function(s) {
                i.isEmpty(t) ? u.FAIL(s.msg) : t(s);
            }
        });
    },
    GETCOIN: function(c, t) {
        s.POST({
            url: n.API_ACTIVITY_GETICON,
            params: {},
            success: function(s) {
                c(s);
            },
            fail: function(s) {
                i.isEmpty(t) ? u.FAIL(s.msg) : t(s);
            }
        });
    },
    SHAREPAGE: function(c, t) {
        s.POST({
            url: n.API_ACTIVITY_SHARE,
            params: {},
            success: function(s) {
                c(s);
            },
            fail: function(s) {
                i.isEmpty(t) ? u.FAIL(s.msg) : t(s);
            }
        });
    },
    ACTIVELIST: function(c, t) {
        s.POST({
            url: n.API_ACTIVITY_List,
            params: {},
            success: function(s) {
                c(s);
            },
            fail: function(s) {
                i.isEmpty(t) ? u.FAIL(s.msg) : t(s);
            }
        });
    },
    USERCHALLENGEDETAILS: function(c, t, I) {
        s.POST({
            url: n.API_ACTIVITY_CHALLENGEDETAILS,
            params: {
                id: c
            },
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    SIGNIN: function(c, t, I) {
        s.POST({
            url: n.API_ACTIVITY_SIGNIN,
            params: {
                id: c
            },
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    ADDACTIVE: function(c, t, I) {
        s.POST({
            url: n.API_ACTIVITY_SinUp,
            params: {
                id: c
            },
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    RECEIVED: function(c, t, I) {
        s.POST({
            url: n.API_ACTIVITY_RECEIVED,
            params: {
                id: c
            },
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    UPDATESTRP: function(c, t, I) {
        s.POST({
            url: n.API_ACTIVITY_UPDATESTRP,
            params: {
                id: c
            },
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    RECALL: function(c, t, I, A) {
        s.POST({
            url: n.API_ACTIVITY_RECALL,
            params: {
                pageSize: c,
                currentPage: t
            },
            success: function(s) {
                I(s);
            },
            fail: function(s) {
                i.isEmpty(A) ? u.FAIL(s.msg) : A(s);
            }
        });
    },
    RECALLSUSSESS: function(c, t, I) {
        s.POST({
            url: n.API_ACTIVITY_RECALLSUCCESS,
            params: {
                friendId: c
            },
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    GETTABACTIVELIST: function(i, u) {
        s.POST({
            url: n.API_LISTACTIVITY,
            params: {},
            success: function(s) {
                i(s);
            },
            fail: function(s) {}
        });
    },
    SELECTCHALLENGEDETAILS: function(c, t, I) {
        s.POST({
            url: n.API_ACTIVITY_SELECTCHALLENGEDETAILS,
            params: {
                id: c
            },
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    GETREWARDLIST: function(c, t) {
        var I = getApp();
        s.POST({
            url: n.API_ADVERTLIST,
            params: {
                systemName: I.globalData.systemName
            },
            success: function(s) {
                c(s);
            },
            fail: function(s) {
                i.isEmpty(t) ? u.FAIL(s.msg) : t(s);
            }
        });
    },
    GETREWARDLISTB: function(c, t, I) {
        var A = getApp(), a = c;
        a.systemName = A.globalData.systemName, s.POST({
            url: n.API_ADVERTLISTB,
            params: a,
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    UPLOADREWARD: function(c, t, I) {
        var A = c;
        s.POST({
            url: n.API_ADVERTDOREWARD,
            params: A,
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    STARTADDPROGRAM: function(i, u) {
        s.POST({
            url: n.API_STARTADDPROGRAM,
            params: {},
            success: function(s) {
                i(s);
            },
            fail: function(s) {
                u(s);
            }
        });
    },
    GETGIF: function(i, u) {
        s.POST({
            url: n.API_GETGIF,
            params: {},
            success: function(s) {
                i(s);
            },
            fail: function(s) {
                u(s);
            }
        });
    },
    FINISHTASK: function(i, u, c) {
        var t = getApp();
        s.POST({
            url: n.API_FINISHTASK,
            params: {
                taskId: i,
                systemName: t.globalData.systemName
            },
            success: function(s) {
                u(s);
            },
            fail: function(s) {
                c(s);
            }
        });
    },
    FINISHTASKB: function(i, u, c) {
        var t = getApp();
        s.POST({
            url: n.API_FINISHTASKB,
            params: {
                taskId: i,
                systemName: t.globalData.systemName
            },
            success: function(s) {
                u(s);
            },
            fail: function(s) {
                c(s);
            }
        });
    },
    COMPLETETASK: function(i, u, c) {
        s.POST({
            url: n.API_COMPLETETASK,
            params: {
                type: i
            },
            success: function(s) {
                u(s);
            },
            fail: function(s) {
                c(s);
            }
        });
    },
    GETLUCKDRAWLIST: function(c, t, I) {
        var A = c;
        s.POST({
            url: n.API_ACTIVITY_LUCKDRAWLIST,
            params: A,
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    GETLUCKDRAWINFO: function(c, t, I) {
        var A = c;
        s.POST({
            url: n.API_ACTIVITY_LUCKDRAWINFO,
            params: A,
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    JOINLUCKDRAW: function(c, t, I) {
        var A = c;
        s.POST({
            url: n.API_ACTIVITY_JOINLUCKDRAW,
            params: A,
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    SAVELUCKDRAWEXCHANGE: function(c, t, I) {
        var A = c;
        s.POST({
            url: n.SAVELUCKDRAWEXCHANGE,
            params: A,
            success: function(s) {
                t(s);
            },
            fail: function(s) {
                i.isEmpty(I) ? u.FAIL(s.msg) : I(s);
            }
        });
    },
    BROWSEACTIVITY: function(i, u, t) {
        s.POST({
            url: n.BROWSEACTIVITY,
            params: {
                userId: c.USERINFO().userId,
                activityId: i
            },
            success: function(s) {
                u(s);
            },
            fail: function(s) {}
        });
    }
};