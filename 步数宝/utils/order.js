var i = require("./utils.js"), n = require("./request.js"), s = require("./urls.js"), e = require("./wglogin.js"), d = require("./toast.js");

module.exports = {
    ORDER_LIST_STATUS: function(u, a, r, o, t) {
        wx.showLoading();
        var c = new Object();
        c.userId = e.USERINFO().userId, c.currentPage = u, c.pageSize = a, i.isEmpty(r) || (c.status = r), 
        n.POST({
            url: s.ORDER_LIST_STATUS,
            params: c,
            success: function(i) {
                wx.hideLoading(), o(i);
            },
            fail: function(n) {
                wx.hideLoading(), i.isEmpty(t) ? d.FAIL(n.msg) : t(n);
            }
        });
    },
    ORDER_CANCEL: function(u, a, r) {
        wx.showLoading();
        var o = new Object();
        o.userId = e.USERINFO().userId, o.mainOrderId = u, n.POST({
            url: s.ORDER_CANCEL,
            params: o,
            success: function(i) {
                wx.hideLoading(), a(i);
            },
            fail: function(n) {
                wx.hideLoading(), i.isEmpty(r) ? d.FAIL(n.msg) : r(n);
            }
        });
    },
    ORDER_DEL: function(e, u, a) {
        wx.showLoading(), n.POST({
            url: s.ORDER_DELETE,
            params: {
                orderId: e
            },
            success: function(i) {
                wx.hideLoading(), u(i);
            },
            fail: function(n) {
                wx.hideLoading(), i.isEmpty(a) ? d.FAIL(n.msg) : a(n);
            }
        });
    },
    ORDER_CONFIRM: function(u, a, r) {
        wx.showLoading();
        var o = new Object();
        o.userId = e.USERINFO().userId, o.orderId = u, n.POST({
            url: s.ORDER_CONFIRM,
            params: o,
            success: function(i) {
                wx.hideLoading(), a(i);
            },
            fail: function(n) {
                wx.hideLoading(), i.isEmpty(r) ? d.FAIL(n.msg) : r(n);
            }
        });
    },
    GET_TOKEN: function(e, u) {
        var a = new Object();
        n.POST({
            url: s.QI_TOKEN,
            params: a,
            success: function(i) {
                wx.hideLoading(), e(i);
            },
            fail: function(n) {
                wx.hideLoading(), i.isEmpty(u) ? d.FAIL(n.msg) : u(n);
            }
        });
    },
    ORDER_REFUND: function(u, a, r, o, t, c, E, I, O) {
        var L = new Object();
        i.isEmpty(t) || (L.refundRemark = t), i.isEmpty(E) || (L.imgUrl = E), i.isEmpty(c) || (L.refundId = c), 
        L.userId = e.USERINFO().userId, L.orderId = u, L.goodsStatus = a, L.refundType = r, 
        L.refundReason = o, n.POST({
            url: s.ORDER_REFUND,
            params: L,
            success: function(i) {
                wx.hideLoading(), I(i);
            },
            fail: function(n) {
                wx.hideLoading(), i.isEmpty(O) ? d.FAIL(n.msg) : O(n);
            }
        });
    },
    CONSULTATIVE_HISTORY: function(e, u, a) {
        wx.showLoading();
        new Object();
        n.POST({
            url: s.CONSULTATIVE_HISTORY,
            params: {
                refundId: e
            },
            success: function(i) {
                wx.hideLoading(), u(i);
            },
            fail: function(n) {
                wx.hideLoading(), i.isEmpty(a) ? d.FAIL(n.msg) : a(n);
            }
        });
    },
    REFUND_ORDER_DETTAILS: function(u, a, r) {
        wx.showLoading();
        var o = new Object();
        o.userId = e.USERINFO().userId, o.orderId = u, n.POST({
            url: s.REFUND_ORDER_DETAILS,
            params: o,
            success: function(i) {
                wx.hideLoading(), a(i);
            },
            fail: function(n) {
                wx.hideLoading(), i.isEmpty(r) ? d.FAIL(n.msg) : r(n);
            }
        });
    },
    REFUND_ORDER_LIST: function(u, a, r, o) {
        wx.showLoading();
        var t = new Object();
        t.userId = e.USERINFO().userId, t.currentPage = u, t.pageSize = a, n.POST({
            url: s.REFUND_ORDER_LIST,
            params: t,
            success: function(i) {
                wx.hideLoading(), r(i);
            },
            fail: function(n) {
                wx.hideLoading(), i.isEmpty(o) ? d.FAIL(n.msg) : o(n);
            }
        });
    },
    REVOKEAPPLY: function(u, a, r) {
        wx.showLoading();
        var o = new Object();
        o.userId = e.USERINFO().userId, o.refundId = u, n.POST({
            url: s.REVOKE_APPLY,
            params: o,
            success: function(i) {
                wx.hideLoading(), a(i);
            },
            fail: function(n) {
                wx.hideLoading(), i.isEmpty(r) ? d.FAIL(n.msg) : r(n);
            }
        });
    },
    COMMIT_INFO: function(u, a, r, o, t) {
        wx.showLoading();
        var c = new Object();
        c.userId = e.USERINFO().userId, c.refundId = u, c.expressNum = a, i.isEmpty(r) || (c.returnGoodsRemark = r), 
        n.POST({
            url: s.COMMIT_INFO,
            params: c,
            success: function(i) {
                wx.hideLoading(), o(i);
            },
            fail: function(n) {
                wx.hideLoading(), i.isEmpty(t) ? d.FAIL(n.msg) : t(n);
            }
        });
    },
    UNIFIEDORDER: function(u, a, r) {
        wx.showLoading();
        var o = new Object();
        o.userId = e.USERINFO().userId, o.mainOrderId = u, n.POST({
            url: s.API_ORDER_UNIFIEDORDER,
            params: o,
            success: function(i) {
                wx.hideLoading(), a(i);
            },
            fail: function(n) {
                wx.hideLoading(), i.isEmpty(r) ? d.FAIL(n.msg) : r(n);
            }
        });
    },
    EXPRESSORDER: function(i, e, d, u) {
        wx.showLoading();
        var a = new Object();
        a.trackingNumber = i, a.trackingCode = e, n.POST({
            url: s.API_EXPRESS_QUERY,
            params: a,
            success: function(i) {
                wx.hideLoading(), d(i);
            },
            fail: function(i) {
                wx.hideLoading();
            }
        });
    }
};