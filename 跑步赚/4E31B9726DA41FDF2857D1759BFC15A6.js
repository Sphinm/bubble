var t, n = require("@babel/runtime/helpers/interopRequireDefault.js")(require("@babel/runtime/helpers/typeof.js"));

t = function() {
    function t() {
        "function" == typeof rt && "" === C && rt().then(function(t) {
            28 === t.length && (C = t, wx.setStorageSync("aldstat_op", t));
        });
    }
    function e(t) {
        this.app = t;
    }
    function o(t) {
        L = v(), B = t, tt = t.scene, this.aldstat = new e(this);
    }
    function r(n) {
        var e;
        t(), e = n.scene != tt, tt = n.scene, E = 0, B = n, N = n.query.ald_share_src, Q = n.query.aldsrc || "", 
        n.query.ald_share_src, Y || (T = !1), Y = !1, (0 !== k && Date.now() - k > 3e4 || e) && (Z || (b = v(), 
        O = Date.now(), ot = 0)), 0 !== k && Date.now() - k < 3e4 && ($ = !0), n.query.ald_share_src && "1044" == n.scene && n.shareTicket ? wx.getShareInfo({
            shareTicket: n.shareTicket,
            success: function(t) {
                G = t, m("event", "ald_share_click", JSON.stringify(t));
            }
        }) : n.query.ald_share_src && m("event", "ald_share_click", 1), "" === K && wx.getSetting({
            withCredentials: !0,
            success: function(t) {
                t.authSetting["scope.userInfo"] && wx.getUserInfo({
                    withCredentials: !0,
                    success: function(t) {
                        var n = w();
                        K = t, n.ufo = y(t), U = g(t.userInfo.avatarUrl.split("/")), d(n);
                    }
                });
            }
        }), S("app", "show");
    }
    function s() {
        t(), k = Date.now(), "" === K && wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && wx.getUserInfo({
                    withCredentials: !0,
                    success: function(t) {
                        K = t, U = g(t.userInfo.avatarUrl.split("/"));
                        var n = w();
                        n.ufo = y(t), d(n);
                    }
                });
            }
        }), S("app", "hide");
    }
    function a(t) {
        J++, m("event", "ald_error_message", t);
    }
    function i(t) {
        X = t;
    }
    function u() {
        var t, n, e;
        et = Date.now(), z = R ? this.$mp.page.route : this.route, t = "page", n = "show", 
        (e = w()).ev = t, e.life = n, e.pp = z, e.pc = F, e.dr = Date.now() - O, Z && (e.so = 1), 
        Z = !1, X && "{}" != JSON.stringify(X) && (e.ag = X), Q && (e.qr = Q, e.sr = Q), 
        N && (e.usr = N), $ && (e.ps = 1), W ? e.pdr = ot : (z, W = !0, e.ifp = W, e.fp = z, 
        e.pdr = 0), d(e), $ = !1;
    }
    function c() {
        F = z, ot = Date.now() - et;
    }
    function f() {
        F = z, ot = Date.now() - et;
    }
    function h() {
        m("event", "ald_pulldownrefresh", 1);
    }
    function l() {
        m("event", "ald_reachbottom", 1);
    }
    function p(t) {
        Z = !0;
        var n = function(t) {
            if (-1 == t.indexOf("?")) return "";
            var n = {};
            return t.split("?")[1].split("&").forEach(function(t) {
                var e = t.split("=")[1];
                n[t.split("=")[0]] = e;
            }), n;
        }(t.path), e = {};
        for (var o in B.query) "ald_share_src" === o && (e[o] = B.query[o]);
        var r = "";
        if (r = -1 == t.path.indexOf("?") ? t.path + "?" : t.path.substr(0, t.path.indexOf("?")) + "?", 
        "" !== n) for (var o in n) e[o] = n[o];
        for (var s in e.ald_share_src ? -1 == e.ald_share_src.indexOf(j) && e.ald_share_src.length < 200 && (e.ald_share_src = e.ald_share_src + "," + j) : e.ald_share_src = j, 
        e) -1 == s.indexOf("ald") && (r += s + "=" + e[s] + "&");
        return t.path = r + "ald_share_src=" + e.ald_share_src, m("event", "ald_share_status", t), 
        t;
    }
    function d(t) {
        function n() {
            return new Promise(function(n, e) {
                var o = {
                    AldStat: "MiniApp-Stat",
                    se: H || "",
                    op: C || "",
                    img: U
                };
                "" === P || (o.ai = P), wx.request({
                    url: "https://" + M + ".aldwx.com/d.html",
                    data: t,
                    header: o,
                    method: "GET",
                    success: function(t) {
                        n(200 == t.statusCode ? "" : "status error");
                    },
                    fail: function() {
                        n("fail");
                    }
                });
            });
        }
        E++, t.at = b, t.uu = j, t.v = A, t.ak = D.app_key.replace(/(\t)|(\s)/g, ""), t.wsr = B, 
        t.ifo = T, t.rq_c = E, t.ls = L, t.te = I, t.et = Date.now(), t.st = Date.now(), 
        D.useOpen ? "" === C ? nt.push(n) : (wx.Queue.push(n), nt.concat()) : wx.Queue.push(n);
    }
    function w() {
        var t = {};
        for (var n in V) t[n] = V[n];
        return t;
    }
    function g(t) {
        for (var n = "", e = 0; e < t.length; e++) t[e].length > n.length && (n = t[e]);
        return n;
    }
    function v() {
        return "" + Date.now() + Math.floor(1e7 * Math.random());
    }
    function y(t) {
        var n = {};
        for (var e in t) "rawData" != e && "errMsg" != e && (n[e] = t[e]);
        return n;
    }
    function S(t, n) {
        var e = w();
        e.ev = t, e.life = n, e.ec = J, e.dr = Date.now() - O, Q && (e.qr = Q, e.sr = Q), 
        N && (e.usr = N), d(e);
    }
    function m(t, n, e) {
        var o = w();
        o.ev = t, o.tp = n, o.dr = Date.now() - O, e && (o.ct = e), d(o);
    }
    function _(t, n, e) {
        if (t[n]) {
            var o = t[n];
            t[n] = function(t) {
                e.call(this, t, n), o.call(this, t);
            };
        } else t[n] = function(t) {
            e.call(this, t, n);
        };
    }
    function x(t) {
        var n = {};
        for (var e in t) "onLaunch" !== e && "onShow" !== e && "onHide" !== e && "onError" !== e && (n[e] = t[e]);
        return n.onLaunch = function(n) {
            o.call(this, n), "function" == typeof t.onLaunch && t.onLaunch.call(this, n);
        }, n.onShow = function(n) {
            r.call(this, n), t.onShow && "function" == typeof t.onShow && t.onShow.call(this, n);
        }, n.onHide = function() {
            s.call(this), t.onHide && "function" == typeof t.onHide && t.onHide.call(this);
        }, n.onError = function(n) {
            a.call(this, n), t.onError && "function" == typeof t.onError && t.onError.call(this, n);
        }, n;
    }
    function q(t) {
        var n = {};
        for (var e in t) "onLoad" !== e && "onShow" !== e && "onHide" !== e && "onUnload" !== e && "onPullDownRefresh" !== e && "onReachBottom" !== e && "onShareAppMessage" !== e && (n[e] = t[e]);
        return n.onLoad = function(n) {
            i.call(this, n), "function" == typeof t.onLoad && t.onLoad.call(this, n);
        }, n.onShow = function(n) {
            u.call(this), "function" == typeof t.onShow && t.onShow.call(this, n);
        }, n.onHide = function(n) {
            c.call(this), "function" == typeof t.onHide && t.onHide.call(this, n);
        }, n.onUnload = function(n) {
            f.call(this), "function" == typeof t.onUnload && t.onUnload.call(this, n);
        }, n.onReachBottom = function(n) {
            l(), t.onReachBottom && "function" == typeof t.onReachBottom && t.onReachBottom.call(this, n);
        }, n.onPullDownRefresh = function(n) {
            h(), t.onPullDownRefresh && "function" == typeof t.onPullDownRefresh && t.onPullDownRefresh.call(this, n);
        }, t.onShareAppMessage && "function" == typeof t.onShareAppMessage && (n.onShareAppMessage = function(n) {
            var e = t.onShareAppMessage.call(this, n);
            return void 0 === e ? (e = {}).path = this.route : void 0 === e.path && (e.path = this.route), 
            p.call(this, e);
        }), n;
    }
    var D = require("D9D324F16DA41FDFBFB54CF6FBEC15A6.js");
    void 0 === wx.Queue && (wx.Queue = new function() {
        this.concurrency = 4, this.queue = [], this.tasks = [], this.activeCount = 0;
        var t = this;
        this.push = function(n) {
            this.tasks.push(new Promise(function(e, o) {
                var r = function() {
                    t.activeCount++, n().then(function(t) {
                        e(t);
                    }).then(function() {
                        t.next();
                    });
                };
                t.activeCount < t.concurrency ? r() : t.queue.push(r);
            }));
        }, this.all = function() {
            return Promise.all(this.tasks);
        }, this.next = function() {
            t.activeCount--, t.queue.length > 0 && t.queue.shift()();
        };
    }(), wx.Queue.all()), D.useOpen && console.warn("提示：开启了useOpen配置后，如果不上传用户opendId则不会上报数据。");
    var A = "7.3.2", M = "log", I = "wx", P = void 0 === wx.getAccountInfoSync ? "" : wx.getAccountInfoSync().miniProgram.appId.split("").map(function(t) {
        return t.charCodeAt(0) + 9;
    }).join("-"), R = !1, b = v(), L = "", O = Date.now(), k = 0, H = "", C = function() {
        var t = "";
        try {
            t = wx.getStorageSync("aldstat_op");
        } catch (t) {}
        return t;
    }(), U = "", E = 0, B = "", T = "", j = function() {
        var t = "";
        try {
            t = wx.getStorageSync("aldstat_uuid");
        } catch (n) {
            t = "uuid_getstoragesync";
        }
        if (t) T = !1; else {
            t = function() {
                function t() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                }
                return t() + t() + t() + t() + t() + t() + t() + t();
            }();
            try {
                wx.setStorageSync("aldstat_uuid", t), T = !0;
            } catch (t) {
                wx.setStorageSync("aldstat_uuid", "uuid_getstoragesync");
            }
        }
        return t;
    }(), N = "", Q = "", J = 0, G = "", K = "", V = {}, W = !1, $ = !1, z = "", F = "", X = "", Y = !0, Z = !1, tt = "", nt = new function() {
        this.request = [], this.updata = !1, this.push = function(n) {
            this.request.length >= 8 && !this.updata && (this.updata = !0, t()), this.request.length >= 10 ? (this.request.shift(), 
            this.request.push(n)) : this.request.push(n);
        }, this.concat = function() {
            this.request.map(function(t) {
                wx.Queue.push(t);
            }), this.request = [];
        };
    }(), et = 0, ot = 0, rt = "";
    wx.request({
        url: "https://" + M + ".aldwx.com/config/app.json",
        header: {
            AldStat: "MiniApp-Stat"
        },
        method: "GET",
        success: function(t) {
            200 === t.statusCode && (A < t.data.version && console.warn("您的SDK不是最新版本，请尽快升级！"), 
            t.data.warn && console.warn(t.data.warn), t.data.error && console.error(t.data.error));
        }
    }), wx.aldstat = new e("");
    try {
        var st = wx.getSystemInfoSync();
        V.br = st.brand, V.pm = st.model, V.pr = st.pixelRatio, V.ww = st.windowWidth, V.wh = st.windowHeight, 
        V.lang = st.language, V.wv = st.version, V.wvv = st.platform, V.wsdk = st.SDKVersion, 
        V.sv = st.system;
    } catch (t) {}
    return wx.getNetworkType({
        success: function(t) {
            V.nt = t.networkType;
        }
    }), wx.getSetting({
        success: function(t) {
            t.authSetting["scope.userLocation"] ? wx.getLocation({
                type: "wgs84",
                success: function(t) {
                    V.lat = t.latitude, V.lng = t.longitude, V.spd = t.speed;
                }
            }) : D.getLocation && wx.getLocation({
                type: "wgs84",
                success: function(t) {
                    V.lat = t.latitude, V.lng = t.longitude, V.spd = t.speed;
                }
            });
        }
    }), e.prototype.sendEvent = function(t, e) {
        if ("" !== t && "string" == typeof t && t.length <= 255) if ("string" == typeof e && e.length <= 255) m("event", t, e); else if ("object" == (0, 
        n.default)(e)) {
            if (JSON.stringify(e).length >= 255) return void console.error("自定义事件参数不能超过255个字符");
            if (function(t) {
                for (var e in t) if ("object" == (0, n.default)(t[e]) && null !== t[e]) return !0;
                return !1;
            }(e)) return void console.error("事件参数，参数内部只支持Number,String等类型，请参考接入文档");
            for (var o in e) "number" == typeof e[o] && (e[o] = e[o] + "s##");
            m("event", t, JSON.stringify(e));
        } else void 0 === e ? m("event", t, !1) : console.error("事件参数必须为String,Object类型,且参数长度不能超过255个字符"); else console.error("事件名称必须为String类型且不能超过255个字符");
    }, e.prototype.sendSession = function(t) {
        if ("" !== t && t) {
            H = t;
            var n = w();
            n.tp = "session", n.ct = "session", n.ev = "event", "" === K ? wx.getSetting({
                success: function(t) {
                    t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                        success: function(t) {
                            n.ufo = y(t), U = g(t.userInfo.avatarUrl.split("/")), "" !== G && (n.gid = G), d(n);
                        }
                    }) : "" !== G && (n.gid = G, d(n));
                }
            }) : (n.ufo = K, "" !== G && (n.gid = G), d(n));
        } else console.error("请传入从后台获取的session_key");
    }, e.prototype.sendOpenid = function(t) {
        if ("" !== t && t && 28 === t.length) {
            C = t, wx.setStorageSync("aldstat_op", t);
            var n = w();
            n.tp = "openid", n.ev = "event", n.ct = "openid", d(n);
        } else console.error("openID不能为空");
    }, e.prototype.setOpenid = function(n) {
        "function" == typeof n && (rt = n, t());
    }, D.plugin ? {
        App: function(t) {
            return App(x(t));
        },
        Page: function(t) {
            return Page(q(t));
        },
        MpvueApp: function(t) {
            return R = !0, x(t);
        },
        MpvuePage: function(t) {
            return q(t);
        }
    } : void function() {
        var t = App, n = Page, e = Component;
        App = function(n) {
            _(n, "onLaunch", o), _(n, "onShow", r), _(n, "onHide", s), _(n, "onError", a), t(n);
        }, Page = function(t) {
            var e = t.onShareAppMessage;
            _(t, "onLoad", i), _(t, "onUnload", f), _(t, "onShow", u), _(t, "onHide", c), _(t, "onReachBottom", l), 
            _(t, "onPullDownRefresh", h), null != e && (t.onShareAppMessage = function(t) {
                if (void 0 !== e) {
                    var n = e.call(this, t);
                    return void 0 === n ? (n = {}).path = z : void 0 === n.path && (n.path = z), p(n);
                }
            }), n(t);
        }, Component = function(t) {
            try {
                var n = t.methods.onShareAppMessage;
                _(t.methods, "onLoad", i), _(t.methods, "onUnload", f), _(t.methods, "onShow", u), 
                _(t.methods, "onHide", c), _(t.methods, "onReachBottom", l), _(t.methods, "onPullDownRefresh", h), 
                null != n && (t.methods.onShareAppMessage = function(t) {
                    if (void 0 !== n) {
                        var e = n.call(this, t);
                        return void 0 === e ? (e = {}).path = z : void 0 === e.path && (e.path = z), p(e);
                    }
                }), e(t);
            } catch (n) {
                e(t);
            }
        };
    }();
}, "object" == ("undefined" == typeof exports ? "undefined" : (0, n.default)(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (void 0).Ald = t();