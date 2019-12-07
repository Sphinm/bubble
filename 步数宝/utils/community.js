var s = require("./utils.js"), u = require("./request.js"), n = require("./urls.js"), I = require("./wglogin.js"), i = require("./toast.js");

module.exports = {
    MINECENTERMESSAGEREQUEST: function(n, i, e, r) {
        var c = i;
        c.userId = I.USERINFO().userId, u.POST({
            url: n,
            params: c,
            success: function(s) {
                e(s);
            },
            fail: function(u) {
                s.isEmpty(r) || r(u);
            }
        });
    },
    PERSONALHOMEPAGE: function(i, e, r, c, t, E) {
        u.POST({
            url: n.COMMUNITY_GETTUSERDYNAMICLIST,
            params: {
                userId: I.USERINFO().userId,
                pageSize: i,
                currentPage: e,
                friendId: r,
                extreme: c
            },
            success: function(s) {
                t(s);
            },
            fail: function(u) {
                s.isEmpty(E) || E(u);
            }
        });
    },
    DELETEDYNAMIC: function(i, e, r) {
        u.POST({
            url: n.COMMUNITY_DELETEDYNAMIC,
            params: {
                userId: I.USERINFO().userId,
                id: i
            },
            success: function(s) {
                e(s);
            },
            fail: function(u) {
                s.isEmpty(r) || r(u);
            }
        });
    },
    SENDFOLLOWUSER: function(i, e, r, c) {
        u.POST({
            url: n.COMMUNITY_SENDFOLLOWUSER,
            params: {
                userId: I.USERINFO().userId,
                friendId: i,
                status: e
            },
            success: function(s) {
                r(s);
            },
            fail: function(u) {
                s.isEmpty(c) || c(u);
            }
        });
    },
    GETUSERINFO: function(I, i, e) {
        u.POST({
            url: n.COMMUNITY_GETUSERINFO,
            params: {
                friendId: I
            },
            success: function(s) {
                i(s);
            },
            fail: function(u) {
                s.isEmpty(e) || e(u);
            }
        });
    },
    GETTUSERFRIENDLIST: function(i, e, r, c, t) {
        u.POST({
            url: n.COMMUNITY_GETTUSERFRIENDLIST,
            params: {
                userId: Number(I.USERINFO().userId),
                type: i,
                currentPage: e,
                pageSize: r
            },
            success: function(s) {
                c(s);
            },
            fail: function(u) {
                s.isEmpty(t) || t(u);
            }
        });
    },
    DYNAMICLIKE: function(i, e, r, c) {
        u.POST({
            url: n.COMMUNITY_DYNAMICLIKE,
            params: {
                userId: I.USERINFO().userId,
                dynamicId: i,
                status: e
            },
            success: function(s) {
                r(s);
            },
            fail: function(u) {
                s.isEmpty(c) || c(u);
            }
        });
    },
    ADDRELEASE: function(e, r, c) {
        e.userId = I.USERINFO().userId, u.POST({
            url: n.COMMUNITY_ADDRELEASE,
            params: e,
            success: function(s) {
                r(s);
            },
            fail: function(u) {
                s.isEmpty(c) ? i.FAIL(u.msg) : c(u);
            }
        });
    },
    RECOMMEND: function(i, e, r, c, t, E) {
        u.POST({
            url: n.COMMUNITY_RECOMMEND,
            params: {
                userId: I.USERINFO().userId,
                date: r,
                pageCurrent: i,
                pageSize: e,
                extreme: c
            },
            success: function(s) {
                t(s);
            },
            fail: function(u) {
                s.isEmpty(E) || E(u);
            }
        });
    },
    GETFRIENDDYNAMICLIST: function(i, e, r, c) {
        u.POST({
            url: n.COMMUNITY_FRIENDDYNAMICLIST,
            params: {
                userId: I.USERINFO().userId,
                date: e,
                pageSize: i
            },
            success: function(s) {
                r(s);
            },
            fail: function(u) {
                s.isEmpty(c) || c(u);
            }
        });
    },
    DYNAMICDETAIL: function(e, r, c) {
        u.POST({
            url: n.COMMUNITY_DYNAMICDETAIL,
            params: {
                userId: I.USERINFO().userId,
                dynamicId: e
            },
            success: function(s) {
                r(s);
            },
            fail: function(u) {
                s.isEmpty(c) ? i.FAIL(u.msg) : c(u);
            }
        });
    },
    COMMENTLIST: function(i, e, r) {
        i.userId = I.USERINFO().userId, u.POST({
            url: n.COMMUNITY_COMMENTLIST,
            params: i,
            success: function(s) {
                e(s);
            },
            fail: function(u) {
                s.isEmpty(r) || r(u);
            }
        });
    },
    ADDCOMMENT: function(e, r, c) {
        e.userId = I.USERINFO().userId, u.POST({
            url: n.COMMUNITY_ADDCOMMENT,
            params: e,
            success: function(s) {
                r(s);
            },
            fail: function(u) {
                s.isEmpty(c) ? i.FAIL(u.msg) : c(u);
            }
        });
    },
    DELCOMMENT: function(e, r, c, t) {
        u.POST({
            url: n.COMMUNITY_DELCOMMENT,
            params: {
                userId: I.USERINFO().userId,
                commentId: e,
                dynamicId: r
            },
            success: function(s) {
                c(s);
            },
            fail: function(u) {
                s.isEmpty(t) ? i.FAIL(u.msg) : t(u);
            }
        });
    },
    REFRESH: function(i, e) {
        u.POST({
            url: n.COMMUNITY_REFRESH,
            params: {
                userId: I.USERINFO().userId
            },
            success: function(s) {
                i(s);
            },
            fail: function(u) {
                s.isEmpty(e) || e(u);
            }
        });
    },
    LIKELIST: function(e, r, c, t) {
        u.POST({
            url: n.COMMUNITY_LIKELIST,
            params: {
                userId: I.USERINFO().userId,
                currentTime: Date.parse(new Date()),
                pageSize: r,
                currentPage: e
            },
            success: function(s) {
                c(s);
            },
            fail: function(u) {
                s.isEmpty(t) ? i.FAIL(u.msg) : t(u);
            }
        });
    },
    LIKECOUNT: function(e, r) {
        u.POST({
            url: n.COMMUNITY_LIKECOUNT,
            params: {
                userId: I.USERINFO().userId,
                currentTime: Date.parse(new Date())
            },
            success: function(s) {
                e(s);
            },
            fail: function(u) {
                s.isEmpty(r) ? i.FAIL(u.msg) : r(u);
            }
        });
    },
    LIKECOUNTSTATUS: function(e, r, c) {
        u.POST({
            url: n.COMMUNITY_LIKECOUNT_STATUS,
            params: {
                notificationType: e,
                userId: I.USERINFO().userId,
                currentTime: Date.parse(new Date())
            },
            success: function(s) {
                r(s);
            },
            fail: function(u) {
                s.isEmpty(c) ? i.FAIL(u.msg) : c(u);
            }
        });
    },
    LIKEREMOVE: function(i, e) {
        u.POST({
            url: n.COMMUNITY_LIKE_REMOVE,
            params: {
                userId: I.USERINFO().userId
            },
            success: function(s) {
                i(s);
            },
            fail: function(u) {
                s.isEmpty(e) || e(u);
            }
        });
    },
    CHOOSETOPICLIST: function(i, e) {
        u.POST({
            url: n.COMMUNITY_CHOOSETOPICLIST,
            params: {
                userId: I.USERINFO().userId
            },
            success: function(s) {
                i(s);
            },
            fail: function(u) {
                s.isEmpty(e) || e(u);
            }
        });
    },
    TOPICDYNAMICLIST: function(i, e, r, c, t, E) {
        u.POST({
            url: n.COMMUNITY_TOPIC_DYNAMICLIST,
            params: {
                userId: I.USERINFO().userId,
                topicId: r,
                date: c,
                pageCurrent: i,
                pageSize: e
            },
            success: function(s) {
                t(s);
            },
            fail: function(u) {
                s.isEmpty(E) || E(u);
            }
        });
    },
    COLLECTION: function(i, e, r, c) {
        u.POST({
            url: n.COMMUNITY_COLLECTION,
            params: {
                userId: I.USERINFO().userId,
                dynamicId: i,
                status: e
            },
            success: function(s) {
                r(s);
            },
            fail: function(u) {
                s.isEmpty(c) || c(u);
            }
        });
    },
    COMMENTINFOLIST: function(i, e, r) {
        i.userId = I.USERINFO().userId, u.POST({
            url: n.REPLIESDETAILS,
            params: i,
            success: function(s) {
                e(s);
            },
            fail: function(u) {
                s.isEmpty(r) || r(u);
            }
        });
    }
};