function n(n, t, i) {
    u.POST({
        url: n,
        params: {
            userId: r.USERINFO().userId
        },
        success: function(n) {
            t(n);
        },
        fail: function(n) {}
    });
}

function n(n, t, i) {
    u.POST({
        url: n,
        params: {
            userId: r.USERINFO().userId
        },
        success: function(n) {
            t(n);
        },
        fail: function(n) {}
    });
}

var t = require("./utils.js"), u = require("./request.js"), i = require("./urls.js"), r = require("./wglogin.js"), o = require("./toast.js"), s = getApp();

module.exports = {
    LOGIN: function(n, r, s, c, e, f) {
        wx.showLoading(), u.POST({
            url: i.API_LOGIN,
            params: {
                code: n,
                nickname: r,
                headImage: s,
                friendId: c
            },
            success: function(n) {
                wx.hideLoading(), e(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(f) ? o.FAIL(n.msg) : f(n);
            })
        });
    },
    GOODLIST: function(n, s, c, e) {
        u.POST({
            url: i.API_GOOD_LIST,
            params: {
                pageSize: n,
                currentPage: s,
                userId: r.USERINFO().userId
            },
            success: function(n) {
                c(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(e) ? o.FAIL(n.msg) : e(n);
            })
        });
    },
    GETGOODSMORELIST: function(n, r, s) {
        var c = i.GOODSMORELIST;
        "ORDINARY" == n.goodsType && (c = i.RECOMMENDGOODSLIST), u.POST({
            url: c,
            params: n,
            success: function(n) {
                r(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    INDEX: function(n, c, e, f) {
        u.POST({
            url: i.API_INDEX,
            params: {
                userId: r.USERINFO().userId,
                encryptedData: n,
                model: s.globalData.systemName,
                iv: c
            },
            success: function(n) {
                e(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(f) ? o.FAIL(n.msg) : f(n);
            })
        });
    },
    CONVERT: function(n, o, s, c, e, f, S, I, a) {
        wx.showLoading(), u.POST({
            url: i.API_CONVERT,
            params: {
                rechangeTelNum: n,
                userId: r.USERINFO().userId,
                addressId: o,
                goodsPrice: s,
                goodsId: c,
                exchangeNum: e,
                notes: f,
                buyType: S,
                phone: n
            },
            success: function(n) {
                wx.hideLoading(), I(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(a) || a(n);
            })
        });
    },
    REWARD: function(n, s, c, e) {
        wx.showLoading(), u.POST({
            url: i.API_REWARD,
            params: {
                userId: r.USERINFO().userId,
                pageSize: n,
                currentPage: s
            },
            success: function(n) {
                wx.hideLoading(), c(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(e) ? o.FAIL(n.msg) : e(n);
            })
        });
    },
    GOLD_REQARD: function(n, s, c, e) {
        wx.showLoading(), u.POST({
            url: i.API_GOLD_REWARD,
            params: {
                userId: r.USERINFO().userId,
                pageSize: n,
                currentPage: s
            },
            success: function(n) {
                wx.hideLoading(), c(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(e) ? o.FAIL(n.msg) : e(n);
            })
        });
    },
    COLLECT: function(n, s, c, e, f) {
        u.POST({
            url: i.API_COLLECT,
            params: {
                userId: r.USERINFO().userId,
                stepNum: n,
                refId: c,
                stepType: s
            },
            success: function(n) {
                "OK" == n.code && e(n.data);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(f) ? o.FAIL(n.msg) : f(n);
            })
        });
    },
    UPDATE: function(n, s, c, e, f) {
        wx.showLoading(), u.POST({
            url: i.API_UPDATE,
            params: {
                userId: r.USERINFO().userId,
                contactUser: n,
                contactPhone: s,
                address: c
            },
            success: function(n) {
                wx.hideLoading(), e(n.data);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(f) ? o.FAIL(n.msg) : f(n);
            })
        });
    },
    EXCHANGE: function(n, s, c) {
        wx.showLoading(), u.POST({
            url: i.API_EXCHANGE,
            params: {
                userId: r.USERINFO().userId,
                stepNum: n
            },
            success: function(n) {
                wx.hideLoading(), s(n.data);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(c) ? o.FAIL(n.msg) : c(n);
            })
        });
    },
    GETADDRESS: function(n, s) {
        wx.showLoading(), u.POST({
            url: i.API_GET_ADDRESS,
            params: {
                userId: r.USERINFO().userId
            },
            success: function(t) {
                wx.hideLoading(), n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    SETADDRESS: function(n, r, s, c, e, f, S) {
        wx.showLoading(), u.POST({
            url: i.API_SETADDRESS,
            params: {
                id: n,
                contactUser: r,
                contactPhone: s,
                address: c,
                province: e[0],
                city: e[1],
                area: e[2]
            },
            success: function(n) {
                wx.hideLoading(), f(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(S) ? o.FAIL(n.msg) : S(n);
            })
        });
    },
    SAVEADDRESS: function(n, s, c, e, f, S) {
        wx.showLoading(), u.POST({
            url: i.API_SAVE_ADDRESS,
            params: {
                userId: r.USERINFO().userId,
                contactUser: n,
                contactPhone: s,
                address: c,
                province: e[0],
                city: e[1],
                area: e[2]
            },
            success: function(n) {
                wx.hideLoading(), f(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(S) ? o.FAIL(n.msg) : S(n);
            })
        });
    },
    DEFAULTADDRESS: function(n, r, s) {
        wx.showLoading(), u.POST({
            url: i.API_DEFALUT_ADDRESS,
            params: {
                id: n
            },
            success: function(n) {
                wx.hideLoading(), r(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    DELETEADDRESS: function(n, r, s) {
        wx.showLoading(), u.POST({
            url: i.API_DELETE_ADDRESS,
            params: {
                id: n
            },
            success: function(n) {
                wx.hideLoading(), r(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    REGISTER: function(n, r, s) {
        u.POST({
            url: i.API_REGISTER,
            params: {
                id: n
            },
            success: function(n) {
                r(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    FRIENDS: function(n, s, c, e) {
        u.POST({
            url: i.API_FRIENDS,
            params: {
                pageSize: n,
                curPage: s,
                userId: r.USERINFO().userId
            },
            success: function(n) {
                c(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(e) ? o.FAIL(n.msg) : e(n);
            })
        });
    },
    FRIENDSTEPRANK: function(n, s, c, e) {
        u.POST({
            url: i.API_FRIENDSTEPTANK,
            params: {
                pageSize: n,
                pageCurrent: s,
                userId: r.USERINFO().userId
            },
            success: function(n) {
                c(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(e) ? o.FAIL(n.msg) : e(n);
            })
        });
    },
    FRIENDSTEPCOLLECT: function(n, o, s) {
        n.userId = r.USERINFO().userId, u.POST({
            url: i.API_FRIENDSTECOLLECT,
            params: n,
            success: function(n) {
                o(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) || s(n);
            })
        });
    },
    SHARE: function(n, r) {
        u.GET({
            url: i.API_SHARE,
            success: function(t) {
                n(t.data);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(r) ? o.FAIL(n.msg) : r(n);
            })
        });
    },
    SHAREALL: function(n, s, c) {
        u.POST({
            url: i.API_SHAREALL,
            params: {
                userId: r.USERINFO().userId,
                key: n
            },
            success: function(n) {
                s(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(c) ? o.FAIL(n.msg) : c(n);
            })
        });
    },
    CHECK: function(n, s) {
        u.POST({
            url: i.API_CHECK,
            params: {
                userId: r.USERINFO().userId
            },
            success: function(t) {
                n(t.data);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    CHECKINDEXID: function(n, s, c) {
        u.POST({
            url: i.API_INDEX_ID,
            params: {
                formId: n,
                userId: r.USERINFO().userId
            },
            success: function(n) {
                s(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(c) ? o.FAIL(n.msg) : c(n);
            })
        });
    },
    CHECKFID: function(n, s, c, e) {
        u.POST({
            url: i.API_ID,
            params: {
                formId: n,
                msgType: s,
                userId: r.USERINFO().userId
            },
            success: function(n) {
                c(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(e) ? o.FAIL(n.msg) : e(n);
            })
        });
    },
    INFO: function(n, s) {
        u.POST({
            url: i.API_INFO,
            params: {
                userId: r.USERINFO().userId
            },
            success: function(t) {
                n(t.data);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    LISTINFO: function(n, s, c) {
        wx.showLoading(), u.POST({
            url: i.API_GOOD_INFO,
            params: {
                id: n,
                userId: r.USERINFO().userId
            },
            success: function(n) {
                s(n), wx.hideLoading();
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(c) ? o.FAIL(n.msg) : c(n);
            })
        });
    },
    LISTHELPINFO: function(n, s, c) {
        var e = n;
        e.userId = r.USERINFO().userId, u.POST({
            url: i.API_GOOD_INFO,
            params: e,
            success: function(n) {
                s(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(c) ? o.FAIL(n.msg) : c(n);
            })
        });
    },
    UNREAD: function(n, s) {
        u.POST({
            url: i.API_UNREAD,
            params: {
                userId: r.USERINFO().userId
            },
            success: function(t) {
                n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    READ: function(n, s, c) {
        u.POST({
            url: i.API_READ,
            params: {
                noticeId: n,
                userId: r.USERINFO().userId
            },
            success: function(n) {
                s(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(c) ? o.FAIL(n.msg) : c(n);
            })
        });
    },
    GETDIARYRESOURCE: function(n, r) {
        u.POST({
            url: i.API_DIARY,
            success: function(t) {
                n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(r) ? o.FAIL(n.msg) : r(n);
            })
        });
    },
    GETSHAREQCODE: function(n, t) {
        wx.request({
            url: i.API_SHAREQRV2 + "?uid=" + r.USERINFO().userId,
            method: "GET",
            success: function(t) {
                "OK" == t.data.code && n(t.data.data);
            }
        });
    },
    GETBALANCEDETAILES: function(n, s) {
        u.POST({
            url: i.API_BALANCE_DETAILS,
            params: {
                userId: r.USERINFO().userId
            },
            success: function(t) {
                n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    GETLISTMES: function(n, s, c, e) {
        u.POST({
            url: i.API_MESSAGE_LISTMESG,
            params: {
                userId: r.USERINFO().userId,
                currentPage: n,
                pageSize: s
            },
            success: function(n) {
                c(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(e) ? o.FAIL(n.msg) : e(n);
            })
        });
    },
    UNREADSYSTEMMESSAGE: function(n, s) {
        u.POST({
            url: i.API_MESSAGE_SYSTEMUNREAD,
            params: {
                userId: r.USERINFO().userId
            },
            success: function(t) {
                n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    STEPDETAILS: function(n, s, c, e) {
        u.POST({
            url: i.API_STEP_DETAIL,
            params: {
                userId: r.USERINFO().userId,
                currentPage: n,
                pageSize: s
            },
            success: function(n) {
                c(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(e) ? o.FAIL(n.msg) : e(n);
            })
        });
    },
    INDEX_CONFIG: function(n, o) {
        u.POST({
            url: i.API_INDEX_CONFIG,
            params: {
                type: "1",
                userId: r.USERINFO().userId
            },
            success: function(t) {
                n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(o) || o(n);
            })
        });
    },
    INDEX_GETSIGIN: function(n) {
        var t = new Object();
        t.userId = r.USERINFO().userId, u.POST({
            url: i.API_USERSIGIN,
            params: t,
            success: function(t) {
                n(t);
            },
            fail: function(n) {}
        });
    },
    LISTCATEGORY: function(n) {
        new Object();
        u.POST({
            url: i.API_LISTCATEGORY,
            success: function(t) {
                n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(fail) ? o.FAIL(n.msg) : fail(n);
            })
        });
    },
    LISTGOODSBYCATEGORY: function(n, r) {
        u.POST({
            url: i.API_LISTGOODSBYCATEGORY,
            params: {
                id: n
            },
            success: function(n) {
                r(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(fail) ? o.FAIL(n.msg) : fail(n);
            })
        });
    },
    BROWSE: function(n) {
        u.POST({
            url: i.API_BROWSE,
            params: {
                userId: r.USERINFO().userId
            },
            success: function(t) {
                n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(fail) ? o.FAIL(n.msg) : fail(n);
            })
        });
    },
    GETCLASSIFYMENUSLIST: function(n, r) {
        u.POST({
            url: i.API_CLASSIFY_MENUSLIST,
            success: function(t) {
                n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(r) ? o.FAIL(n.msg) : r(n);
            })
        });
    },
    GETCLASSIFYMENUSLISTBYTYPE: function(n, r, s) {
        u.POST({
            url: i.API_CLASSIFY_MENUSLISTBYTYPE,
            params: {
                goodsCatType: n
            },
            success: function(n) {
                r(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    GETCLASSIFYGOODSLIST: function(n, r, s) {
        u.POST({
            url: i.API_CLASSIFY_GOODSLIST,
            params: n,
            success: function(n) {
                r(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    GETCLASSIFYGOODSLISTBYTYPE: function(n, r, s) {
        u.POST({
            url: i.API_CLASSIFY_GOODSLISTBYTYPE,
            params: n,
            success: function(n) {
                r(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    PLAY_COIN: function(n, o, s, c, e, f, S) {
        wx.showLoading(), u.POST({
            url: i.API_PLAYCOIN,
            params: {
                userId: r.USERINFO().userId,
                addressId: n,
                goodsPrice: o,
                goodsId: s,
                exchangeNum: c,
                goodsApplication: e
            },
            success: function(n) {
                wx.hideLoading(), f(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(S) || S(n);
            })
        });
    },
    ORDERNUMBER: function(n) {
        u.POST({
            url: i.API_STATISTICSORDER,
            params: {
                userId: r.USERINFO().userId
            },
            success: function(t) {
                n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(fail) ? o.FAIL(n.msg) : fail(n);
            })
        });
    },
    COLLECTIONS: function(n, s) {
        u.POST({
            url: i.LISTGOODSCOLLECTIONS,
            params: {
                userId: r.USERINFO().userId
            },
            success: function(t) {
                n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    CANCELCOLLECTION: function(n, s, c, e) {
        u.POST({
            url: i.SENDGOODSC,
            params: {
                userId: r.USERINFO().userId,
                collectionStatus: 1,
                goodsId: s
            },
            success: function(n) {
                c(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(e) ? o.FAIL(n.msg) : e(n);
            })
        });
    },
    GETINDEXGOODSLIST: function(n, s) {
        u.POST({
            url: i.INDEXGOODSLIST,
            params: {
                userId: r.USERINFO().userId
            },
            success: function(t) {
                n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    GETINDEXACTIVITYLIST: function(n, s) {
        u.POST({
            url: i.INDEXACTIVITYLIST,
            params: {
                userId: r.USERINFO().userId
            },
            success: function(t) {
                n(t);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) ? o.FAIL(n.msg) : s(n);
            })
        });
    },
    INDEXJOINACTIVITY: function(n, s, c) {
        u.POST({
            url: i.INDEXJOINACTIVITY,
            params: {
                userId: r.USERINFO().userId,
                activityId: n
            },
            success: function(n) {
                s(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(c) ? o.FAIL(n.msg) : c(n);
            })
        });
    },
    HELPLIST: function(n, s, c, e, f) {
        u.POST({
            url: i.HELPLIST,
            params: {
                userId: r.USERINFO().userId,
                pageSize: n,
                currentPage: s,
                goodsType: c
            },
            success: function(n) {
                e(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(f) ? o.FAIL(n.msg) : f(n);
            })
        });
    },
    GOODEXCHANGELIST: function(n, s, c, e) {
        wx.showLoading(), u.POST({
            url: i.API_GOODEXCHANGELIST,
            params: {
                userId: r.USERINFO().userId,
                pageSize: s,
                id: n
            },
            success: function(n) {
                wx.hideLoading(), c(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(e) ? o.FAIL(n.msg) : e(n);
            })
        });
    },
    GETADVERINFO: function(n, s, c) {
        u.POST({
            url: i.GETADVERINFO,
            params: {
                userId: r.USERINFO().userId,
                code: n
            },
            success: function(n) {
                s(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(c) ? o.FAIL(n.msg) : c(n);
            })
        });
    },
    UPLOADFORMID: function(n, s, c) {
        u.POST({
            url: i.API_UPLOADFORMID,
            params: {
                formId: n,
                userId: r.USERINFO().userId
            },
            success: function(n) {
                s(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(c) ? o.FAIL(n.msg) : c(n);
            })
        });
    },
    LOGREPORT: function(n, o, s, c) {
        "" != r.USERINFO().userId && void 0 != r.USERINFO().userId ? u.POST({
            url: i.LOG_API_LOGREPORT,
            params: {
                userId: r.USERINFO().userId,
                uuid: n,
                channelId: o
            },
            success: function(n) {
                s(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(c) || c(n);
            })
        }) : u.POST({
            url: i.LOG_API_LOGREPORT,
            params: {
                uuid: n,
                channelId: o
            },
            success: function(n) {
                s(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(c) || c(n);
            })
        });
    },
    SENDSMSCODE: function(n, o, s) {
        u.POST({
            url: i.API_SENDSMSCODE,
            params: {
                userId: r.USERINFO().userId,
                phone: n
            },
            success: function(n) {
                o(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(s) || s(n);
            })
        });
    },
    BINDPHONE: function(n, o, s, c) {
        u.POST({
            url: i.API_BINDPHONE,
            params: {
                userId: r.USERINFO().userId,
                phone: n,
                code: o
            },
            success: function(n) {
                s(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(c) || c(n);
            })
        });
    },
    GETDIARYDATA: n,
    GETSTEPOFMONTH: function(n, t, o) {
        u.POST({
            url: i.API_STEPOFMONTHS,
            params: {
                userId: r.USERINFO().userId,
                dateMonth: n
            },
            success: function(n) {
                t(n);
            },
            fail: function(n) {}
        });
    },
    GETSTOREINFO: function(n, s, c) {
        wx.showLoading(), u.POST({
            url: i.API_GETSTOREINFO,
            params: {
                userId: r.USERINFO().userId,
                storeId: n
            },
            success: function(n) {
                s(n), wx.hideLoading();
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                wx.hideLoading(), t.isEmpty(c) ? o.FAIL(n.msg) : c(n);
            })
        });
    },
    STOREGOODSLIST: function(n, s, c, e, f) {
        wx.showLoading(), u.POST({
            url: i.API_STOREGOODSLIST,
            params: {
                userId: r.USERINFO().userId,
                storeId: n,
                currentPage: s,
                pageSize: c
            },
            success: function(n) {
                wx.hideLoading(), e(n);
            },
            fail: function(n) {
                function t(t) {
                    return n.apply(this, arguments);
                }
                return t.toString = function() {
                    return n.toString();
                }, t;
            }(function(n) {
                t.isEmpty(f) ? o.FAIL(n.msg) : f(n);
            })
        });
    }
};