var t = getApp(), e = require("../../utils/request.js"), a = require("../../utils/wglogin.js"), i = (require("../../utils/urlGL.js"), 
require("../../utils/urls.js")), n = require("../../utils/room.js");

Page({
    data: {
        info: !1,
        step: !1,
        todayStepNum: 0,
        wechat: {
            loginState: !1,
            userId: ""
        },
        returnApp: ""
    },
    onLoad: function(t) {
        t && t.isLogin && (this.data.wechat.isLogin = t.isLogin), a.LOGOUT();
    },
    onShow: function() {
        this.getUserInfor();
    },
    getUserInfor: function() {
        var n = this;
        if (a.USERINFO().userId) e.POST({
            url: i.INDEX_GETUSERINFO,
            params: {},
            success: function(e) {
                if ("OK" == e.code && "{}" != JSON.stringify(e.data.userInfo) && null != e.data.userInfo) {
                    n.setData({
                        userLogindetail: e.data.userInfo
                    }), t.globalData.userLogindetail = e.data, t.globalData.showAuthorizedMask = !1, 
                    t.globalData.isShowModel = !0, n.userLogin();
                    var i = n.data.wechat;
                    i.loginState = !0, i.userId = a.USERINFO().userId, n.setData({
                        info: !0,
                        returnApp: JSON.stringify(i)
                    });
                } else if ("OK" != e.code) wx.setStorageSync("userInfo", {}), a.LOGIN(function(t) {
                    n.setData({
                        info: !1
                    });
                }, function() {}, "", "", "", ""); else {
                    var s = n.data.wechat;
                    s.loginState = !0, s.userId = a.USERINFO().userId, n.setData({
                        info: !1,
                        returnApp: JSON.stringify(s)
                    });
                }
            },
            fail: function(t) {
                n.setData({
                    info: !1
                });
            }
        }); else {
            var s = this;
            a.LOGIN(function(t) {
                s.setData({
                    info: !1
                }), s.updateStep();
            }, function() {}, "", "", "", "");
        }
    },
    getUserNickName: function(e) {
        if (e.detail) {
            this.userLogin();
            a.SYNCUSERINFO(e.detail, function(t) {
                console.log(t), "OK" != t.code && wx.setStorageSync("userInfo", {});
            });
            var i = this.data.wechat;
            i.loginState = !0, i.userId = a.USERINFO().userId, this.setData({
                info: !0,
                step: !0,
                returnApp: JSON.stringify(i),
                userLogindetail: e.detail.userInfo
            }), t.globalData.userLogindetail = e.detail;
        } else {
            var n = this.data.wechat;
            n.loginState = !1, n.userId = "", this.setData({
                info: !0,
                returnApp: JSON.stringify(n)
            });
        }
    },
    userLogin: function() {
        var t = this;
        a.LOGIN(function(e) {
            t.updateStep();
        }, function() {}, "", "", "", "");
    },
    updateStep: function() {
        wx.showLoading();
        var t = this;
        wx.getWeRunData({
            success: function(e) {
                n.INDEX(e.encryptedData, e.iv, function(e) {
                    "OK" == e.code ? (wx.hideLoading(), t.setData({
                        todayStepNum: e.data.index.todayStepNum,
                        step: !0
                    })) : (wx.hideLoading(), t.setData({
                        step: !1
                    }));
                });
            },
            fail: function(e) {
                wx.hideLoading(), console.log(e), t.setData({
                    step: !1,
                    loginState: !0
                });
            }
        });
    },
    launchAppError: function(t) {
        console.log(t.detail.errMsg);
    },
    openSettingCallback: function(t) {
        console.log(t);
    }
});