function e(e, t, r, i, s, c, l, g) {
    wx.login({
        complete: function(t) {
            var f = getApp(), I = new Object(), S = {};
            I.code = t.code, "" != r && "undefined" != r && (S.friendId = r), "" != i && "undefined" != i && (S.s = i), 
            "" != s && "undefined" != s && (S.channelId = s), "" != c && "undefined" != c && (S.goodsHelpId = c), 
            "" != g && "undefined" != g && (S.videoId = g), "" != l && "undefined" != l && (S.goodsId = l), 
            S.scene = f.globalData.scene, "" != f.globalData.share_cardid && "undefined" != f.globalData.share_cardid && f.globalData.share_cardid && (S.share_card_id = f.globalData.share_cardid), 
            f.globalData.userLogindetail && null != f.globalData.userLogindetail && (I.rawData = f.globalData.userLogindetail.rawData, 
            I.emoji = "rawData", I.signature = f.globalData.userLogindetail.signature, I.encryptedData = f.globalData.userLogindetail.encryptedData, 
            I.iv = f.globalData.userLogindetail.iv), S.cs = 1, I.loginExt = S, u.POST({
                url: d.API_LOGIN,
                params: I,
                success: function(t) {
                    if ("OK" == t.code) {
                        wx.removeStorageSync("userId"), o = t.data.result.userId;
                        var a = getApp();
                        if (a.thinkingdata.login(t.data.result.userId), a.globalData.thinkDataGlobal = t.data.result.userId, 
                        a.thinkingdata.init(), t.data.result.createTime && void 0 != t.data.result.createTime && "" != t.data.result.createTime) {
                            var r = {};
                            r.createTime = t.data.result.createTime, a.thinkingdata.userSetOnce(r), a.globalData.createTime = t.data.result.createTime;
                        }
                        n(t.data.result), 20 == i && wx.setStorageSync("wh_shareGoods", t.data.result.shareGoods), 
                        e({
                            userId: t.data.result.userId,
                            showGuide: t.data.result.showGuide,
                            shareVideo: t.data.result.shareVideo,
                            openId: t.data.result.openId,
                            newEdition: t.data.result.newEdition
                        });
                    }
                },
                fail: function(t) {
                    a(), e();
                }
            });
        }
    });
}

function t(t, a, n, r, o, u, s, d) {
    wx.checkSession({
        success: function(c) {
            i() ? t() : e(t, a, n, r, o, u, s, d);
        },
        fail: function(e) {
            function t(t) {
                return e.apply(this, arguments);
            }
            return t.toString = function() {
                return e.toString();
            }, t;
        }(function(i) {
            e(t, a, n, r, o, u, s, d);
        })
    });
}

function a() {
    n({});
}

function n(e) {
    getApp().globalData.userInfo = e, wx.setStorageSync("userInfo", e), wx.setStorageSync("hjh_userInfo", e);
}

function r() {
    var e = getApp();
    if (!s.isEmpty(e.globalData.userInfo)) return e.globalData.userInfo;
    var t = wx.getStorageSync("userInfo");
    return e.globalData.userInfo = wx.getStorageSync("userInfo"), s.isEmpty(t) && (t = wx.getStorageSync("hjh_userInfo")), 
    t;
}

function i() {
    getApp().globalData.userInfo = wx.getStorageSync("userInfo");
    var e = wx.getStorageSync("userInfo");
    return !s.isEmpty(e) && !s.isEmpty(e);
}

var o, u = require("./request.js"), s = require("./utils.js"), d = require("./urls.js");

module.exports = {
    LOGIN: t,
    LOGOUT: a,
    ISLOGIN: i,
    USERINFO: r,
    AUTHSTATUS: function(e) {
        wx.getSetting({
            success: function(t) {
                e(1 == t.authSetting["scope.userInfo"] ? !s.isEmpty(r().userId) : t.authSetting["scope.userInfo"]);
            }
        });
    },
    SYNCUSERINFO: function(e, t, a) {
        var i = new Object(), o = e.userInfo;
        i.userId = r().userId, i.headImage = o.avatarUrl, i.nickname = o.nickName, i.sex = o.gender, 
        i.province = o.province, i.city = o.city, i.country = o.country, i.rawData = e.rawData, 
        i.signature = e.signature, i.encryptedData = e.encryptedData, i.iv = e.iv, u.POST({
            url: d.API_USER_INFO,
            params: i,
            success: function(e) {
                n({
                    userId: r().userId,
                    headImage: o.avatarUrl,
                    nickname: o.nickName,
                    newEdition: r().newEdition
                }), t(e);
            },
            fail: function(e) {
                function t(t) {
                    return e.apply(this, arguments);
                }
                return t.toString = function() {
                    return e.toString();
                }, t;
            }(function(e) {
                s.isEmpty(a) || t(e);
            })
        });
    },
    SETTING: function(e) {
        wx.openSetting({
            success: function(e) {
                1 == e.authSetting["scope.userInfo"] || fail();
            }
        });
    },
    BSB_LOGIN: function(e) {
        t(e);
    },
    CREATEBETWEENTIME: function() {
        var e = wx.getStorageSync("userInfo");
        if (e && e.createTime) {
            var t = e.createTime + "", a = new Date(), n = new Date(t), r = (a.getTime() - n.getTime()) / 864e5;
            return r <= 0 ? 0 : parseInt(r);
        }
        return -1;
    }
};