function t(e) {
    return (t = "function" == typeof Symbol && "symbol" == n(Symbol.iterator) ? function(t) {
        return void 0 === t ? "undefined" : n(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : n(t);
    })(e);
}

function e(t, e, n) {
    var r = i.autoTrackCustom[n];
    if (t[e]) {
        var a = t[e];
        t[e] = function(t) {
            r.apply(this, arguments), a.apply(this, arguments);
        };
    } else t[e] = function(t) {
        r.apply(this, arguments);
    };
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = {}, i = {};

i.para = require("thinkingdata_conf.js"), i._queue = [], i.scene = "";

var a = Array.prototype, o = Function.prototype, s = Object.prototype, u = a.slice, c = s.toString, p = s.hasOwnProperty;

i.lib_version = "1.2.0";

var f = null, h = 1, l = "", d = "", g = {}, y = "直接打开", m = "object" === t(m) ? m : {};

if (m.info = function() {
    if ("object" === ("undefined" == typeof console ? "undefined" : t(console)) && console.log) try {
        return console.log.apply(console, arguments);
    } catch (t) {
        console.log(arguments[0]);
    }
}, function() {
    o.bind;
    var e = a.forEach, n = a.indexOf, i = Array.isArray, s = {}, f = r.each = function(t, n, r) {
        if (null == t) return !1;
        if (e && t.forEach === e) t.forEach(n, r); else if (t.length === +t.length) {
            for (var i = 0, a = t.length; i < a; i++) if (i in t && n.call(r, t[i], i, t) === s) return !1;
        } else for (var o in t) if (p.call(t, o) && n.call(r, t[o], o, t) === s) return !1;
    };
    r.logger = m, r.deepCopy = function(e) {
        var n = {};
        for (var r in e) n[r] = "object" === t(e[r]) ? deepCopy(e[r]) : e[r];
        return n;
    }, r.extend = function(t) {
        return f(u.call(arguments, 1), function(e) {
            for (var n in e) void 0 !== e[n] && (t[n] = e[n]);
        }), t;
    }, r.extend2Lev = function(t) {
        return f(u.call(arguments, 1), function(e) {
            for (var n in e) void 0 !== e[n] && (r.isObject(e[n]) && r.isObject(t[n]) ? r.extend(t[n], e[n]) : t[n] = e[n]);
        }), t;
    }, r.coverExtend = function(t) {
        return f(u.call(arguments, 1), function(e) {
            for (var n in e) void 0 !== e[n] && void 0 === t[n] && (t[n] = e[n]);
        }), t;
    }, r.isArray = i || function(t) {
        return "[object Array]" === c.call(t);
    }, r.isFunction = function(t) {
        try {
            return /^\s*\bfunction\b/.test(t);
        } catch (t) {
            return !1;
        }
    }, r.isArguments = function(t) {
        return !(!t || !p.call(t, "callee"));
    }, r.toArray = function(t) {
        return t ? t.toArray ? t.toArray() : r.isArray(t) ? u.call(t) : r.isArguments(t) ? u.call(t) : r.values(t) : [];
    }, r.values = function(t) {
        var e = [];
        return null == t || f(t, function(t) {
            e[e.length] = t;
        }), e;
    }, r.include = function(t, e) {
        var r = !1;
        return null == t ? r : n && t.indexOf === n ? -1 != t.indexOf(e) : (f(t, function(t) {
            if (r || (r = t === e)) return s;
        }), r);
    };
}(), r.trim = function(t) {
    return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}, r.isObject = function(t) {
    return "[object Object]" == c.call(t) && null != t;
}, r.isEmptyObject = function(t) {
    if (r.isObject(t)) {
        for (var e in t) if (p.call(t, e)) return !1;
        return !0;
    }
    return !1;
}, r.isUndefined = function(t) {
    return void 0 === t;
}, r.isString = function(t) {
    return "[object String]" == c.call(t);
}, r.isDate = function(t) {
    return "[object Date]" == c.call(t);
}, r.isBoolean = function(t) {
    return "[object Boolean]" == c.call(t);
}, r.isNumber = function(t) {
    return "[object Number]" == c.call(t) && /[\d\.]+/.test(String(t));
}, r.isJSONString = function(t) {
    try {
        JSON.parse(t);
    } catch (t) {
        return !1;
    }
    return !0;
}, r.decodeURIComponent = function(t) {
    var e = "";
    try {
        e = decodeURIComponent(t);
    } catch (n) {
        e = t;
    }
    return e;
}, r.encodeDates = function(t) {
    return r.each(t, function(e, n) {
        r.isDate(e) ? t[n] = r.formatDate(e) : r.isObject(e) && (t[n] = r.encodeDates(e));
    }), t;
}, r.formatDate = function(t) {
    function e(t) {
        return t < 10 ? "0" + t : t;
    }
    return t.getFullYear() + "-" + e(t.getMonth() + 1) + "-" + e(t.getDate()) + " " + e(t.getHours()) + ":" + e(t.getMinutes()) + ":" + e(t.getSeconds()) + "." + ((n = t.getMilliseconds()) < 100 && 9 < n ? "0" + n : n < 10 ? "00" + n : n);
    var n;
}, r.searchObjDate = function(t) {
    r.isObject(t) && r.each(t, function(e, n) {
        r.isObject(e) ? r.searchObjDate(t[n]) : r.isDate(e) && (t[n] = r.formatDate(e));
    });
}, r.formatString = function(t) {
    return t.length > i.para.max_string_length ? (m.info("字符串长度超过限制，已经做截取--" + t), t.slice(0, i.para.max_string_length)) : t;
}, r.searchObjString = function(t) {
    r.isObject(t) && r.each(t, function(e, n) {
        r.isObject(e) ? r.searchObjString(t[n]) : r.isString(e) && (t[n] = r.formatString(e));
    });
}, r.unique = function(t) {
    for (var e, n = [], r = {}, i = 0; i < t.length; i++) (e = t[i]) in r || (r[e] = !0, 
    n.push(e));
    return n;
}, r.strip_ta_properties = function(t) {
    return r.isObject(t) && r.each(t, function(e, n) {
        if (r.isArray(e)) {
            var i = [];
            r.each(e, function(t) {
                r.isString(t) ? i.push(t) : m.info("您的数据-", e, "的数组里的值必须是字符串,已经将其删除");
            }), 0 !== i.length ? t[n] = i : (delete t[n], m.info("已经删除空的数组"));
        }
        r.isString(e) || r.isNumber(e) || r.isDate(e) || r.isBoolean(e) || r.isArray(e) || (m.info("您的数据-", e, "-格式不满足要求，我们已经将其删除"), 
        delete t[n]);
    }), t;
}, r.strip_empty_properties = function(t) {
    var e = {};
    return r.each(t, function(t, n) {
        null != t && (e[n] = t);
    }), e;
}, r.utf8Encode = function(t) {
    var e, n, r, i, a = "";
    for (e = n = 0, r = (t = (t + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length, 
    i = 0; i < r; i++) {
        var o = t.charCodeAt(i), s = null;
        o < 128 ? n++ : s = 127 < o && o < 2048 ? String.fromCharCode(o >> 6 | 192, 63 & o | 128) : String.fromCharCode(o >> 12 | 224, o >> 6 & 63 | 128, 63 & o | 128), 
        null !== s && (e < n && (a += t.substring(e, n)), a += s, e = n = i + 1);
    }
    return e < n && (a += t.substring(e, t.length)), a;
}, r.getShareDepth = function() {
    if ("number" == typeof h && 1 !== h) {
        var t = i.store.getDistinctId(), e = i.store.getAccountId();
        return r.isUndefined(d) || "" == d || r.isUndefined(e) || "" == e ? r.isUndefined(l) || "" == l || l != t ? h + 1 : h : d == e ? h : h + 1;
    }
    return 1;
}, r.setShareInfo = function(t) {
    var e = {};
    if (g["#share_depth"] = 1, !(t && r.isObject(t.query) && t.query.tashare)) return {};
    if (e = r.decodeURIComponent(t.query.tashare), !r.isJSONString(e)) return {};
    var n = (e = JSON.parse(e)).d, i = (e.p, e.i), a = e.a;
    "string" == typeof i && (l = i), "string" == typeof a && (d = a), "number" == typeof n ? (g["#share_depth"] = n, 
    h = n) : g["#share_depth"] = 1;
}, r.getShareInfo = function() {
    return JSON.stringify({
        i: i.store.getDistinctId() || "取值异常",
        p: r.getCurrentPath(),
        d: r.getShareDepth(),
        a: i.store.getAccountId()
    });
}, r.getCurrentPath = function() {
    var t = "未取到";
    try {
        var e = getCurrentPages();
        t = e[e.length - 1].route;
    } catch (t) {
        m.info(t);
    }
    return t;
}, r.getPath = function(t) {
    return "string" == typeof t ? t.replace(/^\//, "") : "取值异常";
}, r.info = {
    properties: {
        "#lib_version": String("1.2.0")
    },
    network: {},
    getSystem: function() {
        var t = this.properties, e = this.network;
        wx.getNetworkType({
            success: function(t) {
                var n = {
                    "#network_type": t.networkType
                };
                r.extend(e, n);
            },
            complete: function() {
                wx.getSystemInfo({
                    success: function(e) {
                        var n = {
                            "#manufacturer": e.brand,
                            "#device_model": e.model,
                            "#screen_width": Number(e.screenWidth),
                            "#screen_height": Number(e.screenHeight),
                            "#os": e.system.split(" ")[0],
                            "#os_version": e.system.split(" ")[1]
                        };
                        r.extend(t, n);
                    },
                    complete: function() {
                        i.initialState.systemIsComplete = !0, i.initialState.checkIsComplete();
                    }
                });
            }
        });
    }
}, i.initialState = {
    queue: [],
    isComplete: !1,
    systemIsComplete: !1,
    storeIsComplete: !1,
    checkIsComplete: function() {
        this.systemIsComplete && this.storeIsComplete && (this.isComplete = !0, 0 < this.queue.length && (r.each(this.queue, function(t) {
            i[t[0]].apply(i, u.call(t[1]));
        }), i.queue = []));
    }
}, i._ = r, i.prepareData = function(t, e, n) {
    var a = {
        "#lib_version": String("1.2.0"),
        "#lib": "MP",
        "#scene": i.scene
    };
    t.type || r.extend(a, r.info.properties);
    var o = {};
    "user_set" != t["#type"] && "user_setOnce" != t["#type"] && "user_del" != t["#type"] && "user_add" != t["#type"] && r.extend(o, r.info.network, i.store.getProps());
    var s = "";
    s = r.isDate(e) ? r.formatDate(e) : r.formatDate(new Date());
    var u = {
        "#distinct_id": this.store.getDistinctId(),
        "#time": s,
        properties: o
    };
    r.searchObjDate(t), r.searchObjString(t), r.isObject(t) && !r.isEmptyObject(t) && r.extend2Lev(u, t);
    var c = i.store.getAccountId();
    c && r.extend2Lev(u, {
        "#account_id": c
    });
    var p = new Array();
    p[0] = u;
    var f = {
        "#app_id": i.para.appid,
        automaticData: a,
        data: p
    };
    i.networkManager.send(f);
}, i.store = {
    getUUID: function() {
        var t = new Date().getTime();
        return String(Math.random()).replace(".", "").slice(1, 11) + "-" + t;
    },
    setStorage: function() {},
    getStorage: function() {
        return wx.getStorageSync("thinkingdata_wechat") || "";
    },
    _state: {},
    toState: function(t) {
        var e = null;
        r.isJSONString(t) && (e = JSON.parse(t)).distinct_id ? this._state = e : this.set("distinct_id", this.getUUID());
    },
    getDistinctId: function() {
        return this._state.distinct_id;
    },
    getAccountId: function() {
        return this._state.account_id;
    },
    getProps: function() {
        return this._state.props || {};
    },
    setProps: function(t, e) {
        var n = this._state.props || {};
        e ? this.set("props", t) : (r.extend(n, t), this.set("props", n));
    },
    set: function(e, n) {
        var r = {};
        for (var i in "string" == typeof e ? r[e] = n : "object" === t(e) && (r = e), this._state = this._state || {}, 
        r) this._state[i] = r[i];
        this.save();
    },
    change: function(t, e) {
        this._state[t] = e;
    },
    save: function() {
        wx.setStorageSync("thinkingdata_wechat", JSON.stringify(this._state));
    },
    init: function() {
        var t = this.getStorage();
        t ? this.toState(t) : (new Date(), this.set({
            "#distinct_id": this.getUUID()
        }));
    }
}, i.track = function(t, e, n) {
    this.prepareData({
        "#type": "track",
        "#event_name": t,
        properties: e
    }, n);
}, i.userSet = function(t, e) {
    this.prepareData({
        "#type": "user_set",
        properties: t
    }, e);
}, i.userSetOnce = function(t, e) {
    this.prepareData({
        "#type": "user_setOnce",
        properties: t
    }, e);
}, i.userDel = function(t) {
    this.prepareData({
        "#type": "user_del"
    }, t);
}, i.userAdd = function(t, e) {
    this.prepareData({
        "#type": "user_add",
        properties: t
    }, e);
}, i.authorizeOpenID = function(t) {
    if ("number" == typeof t) t = String(t); else if ("string" != typeof t) return !1;
    i.store.set("distinct_id", t);
}, i.login = function(t) {
    if ("number" == typeof t) t = String(t); else if ("string" != typeof t) return !1;
    i.store.set("account_id", t);
}, i.logout = function() {
    i.store.set("account_id", null);
}, i.initial = function() {
    this._.info.getSystem(), this.store.init(), i.para.server_url && (i.para.server_url = i.para.server_url + "/sync_xcx"), 
    "number" != typeof i.para.datasend_timeout && (i.para.datasend_timeout = 3e3);
}, i.init = function() {
    if (!0 === this.hasInit) return !1;
    this.hasInit = !0, i.initialState.storeIsComplete = !0, i.initialState.checkIsComplete();
}, r.each([ "userAdd", "userDel", "userSetOnce", "userSet", "track" ], function(t) {
    var e = i[t];
    i[t] = function() {
        if (i.initialState.isComplete) e.apply(i, arguments); else {
            var n = new Date();
            "track" == t ? r.isDate(arguments[2]) || (arguments.length = 3, arguments[2] = n) : "userSet" == t || "userAdd" == t || "userSetOnce" == t ? (arguments.length = 2, 
            arguments[1] = n) : "userDel" == t && (arguments.length = 1, arguments[0] = n), 
            i.initialState.queue.push([ t, arguments ]);
        }
    };
}), r.autoExeQueue = function() {
    return {
        items: [],
        enqueue: function(t) {
            this.items.push(t), this.start();
        },
        dequeue: function() {
            return this.items.shift();
        },
        getCurrentItem: function() {
            return this.items[0];
        },
        isRun: !1,
        start: function() {
            0 < this.items.length && !this.isRun && (this.isRun = !0, this.getCurrentItem().start());
        },
        close: function() {
            this.dequeue(), this.isRun = !1, this.start();
        },
        retry: function() {
            this.isRun = !1, this.start();
        }
    };
}, i.requestQueue = function(t) {
    this.data = t.data, this.tryTime = 0;
}, i.requestQueue.prototype.doEnd = function() {
    this.close();
}, i.requestQueue.prototype.isEnd = function() {
    var t = this;
    5 <= ++this.tryTime ? this.close() : setTimeout(function() {
        t.retry();
    }, 3e3);
}, i.requestQueue.prototype.start = function() {
    var t = this;
    r.wxrequest({
        url: i.para.server_url,
        method: "POST",
        data: this.data,
        success: function(e) {
            t.doEnd();
        },
        fail: function(e) {
            t.isEnd();
        }
    });
}, r.wxrequest = function(t) {
    var e = wx.request(t);
    setTimeout(function() {
        r.isObject(e) && r.isFunction(e.abort) && e.abort();
    }, i.para.datasend_timeout);
}, i.dataQueue = r.autoExeQueue(), i.networkManager = {
    dataHasSend: !0,
    dataHasChange: !1,
    send: function(t) {
        this.queueSend(t);
    },
    queueSend: function(t) {
        t = JSON.stringify(t);
        var e = new i.requestQueue({
            data: t
        });
        e.close = function() {
            i.dataQueue.close();
        }, e.retry = function() {
            i.dataQueue.retry();
        }, i.dataQueue.enqueue(e);
    }
}, i.autoTrackCustom = {
    pageShare: function(e, n) {
        var a = e.onShareAppMessage;
        e.onShareAppMessage = function() {
            var e = a.apply(this, arguments);
            return i.para.autoTrack && i.para.autoTrack.pageShare && i.track("ta_mp_share", {
                "#url_path": r.getCurrentPath()
            }), i.para.allow_share_info && ("object" != t(e) && ((e = {}).path = r.getCurrentPath()), 
            "object" != t(e) || !r.isUndefined(e.path) && "" != e.path || (e.path = r.getCurrentPath()), 
            "object" == t(e) && "string" == typeof e.path && (-1 === e.path.indexOf("?") ? e.path = e.path + "?" : "&" !== e.path.slice(-1) && (e.path = e.path + "&")), 
            e.path = e.path + "tashare=" + encodeURIComponent(r.getShareInfo())), e;
        };
    },
    appLaunch: function(t) {
        if ((this.thinkingdata = i).scene = t.scene, r.setShareInfo(t), i.para.autoTrack && i.para.autoTrack.appLaunch) {
            var e = {};
            t && t.path && (e["#url_path"] = r.getPath(t.path)), i.track("ta_mp_launch", e);
        }
    },
    appShow: function(t) {
        var e = new Date();
        if (f = e.getTime(), r.setShareInfo(t), i.para.autoTrack && i.para.autoTrack.appLaunch) {
            var n = {};
            t && t.path && (n["#url_path"] = r.getPath(t.path)), i.track("ta_mp_show", n);
        }
    },
    appHide: function() {
        if (i.para.autoTrack && i.para.autoTrack.appHide) {
            var t = new Date().getTime(), e = {};
            f && 0 < t - f && (t - f) / 36e5 < 24 && (e["#duration"] = (t - f) / 1e3), e["#url_path"] = r.getCurrentPath(), 
            i.track("ta_mp_hide", e);
        }
    },
    pageOnload: function(t) {},
    pageOnshow: function(e) {
        if (i.para.autoTrack && i.para.autoTrack.pageShow) {
            var n = {}, r = "系统没有取到值";
            "object" == t(this) && ("string" == typeof this.route ? r = this.route : "string" == typeof this.__route__ && (r = this.__route__)), 
            n["#url_path"] = r, n["#referrer"] = y, y = r, i.track("ta_mp_view", n);
        }
    }
}, i.para.is_plugin) i.App = function(t) {
    e(t = t || {}, "onLaunch", "appLaunch"), e(t, "onShow", "appShow"), e(t, "onHide", "appHide"), 
    App.apply(this, arguments);
}, i.Page = function(t) {
    e(t, "onLoad", "pageOnload"), e(t, "onShow", "pageOnshow"), "function" == typeof t.onShareAppMessage && i.autoTrackCustom.pageShare(t), 
    Page.apply(this, arguments);
}; else {
    var S = App;
    App = function(t) {
        e(t, "onLaunch", "appLaunch"), e(t, "onShow", "appShow"), e(t, "onHide", "appHide"), 
        S.apply(this, arguments);
    };
    var _ = Page;
    Page = function(t) {
        e(t, "onLoad", "pageOnload"), e(t, "onShow", "pageOnshow"), "function" == typeof t.onShareAppMessage && i.autoTrackCustom.pageShare(t), 
        _.apply(this, arguments);
    };
}

i.initial(), module.exports = i;