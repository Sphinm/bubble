var t = getApp(), e = null;

Page({
    data: {
        userInfo: null,
        stepIsAu: !0,
        isAuthorize: !1
    },
    launchAppError: function(t) {},
    onLoad: function(t) {
        e = this, this.setData({
            uid: t.uid
        });
    },
    appOnshow: function() {
        wx.getStorageSync("isLogin") && this.setData({
            isAuthorize: !0
        }), t.getInfo(function(t) {
            e.setData({
                userInfo: t
            });
        }), this.getRunData();
    },
    getUser: function(n) {
        t.getUser(n, function(n) {
            e.setData({
                isAuthorize: !0
            }), t.getInfo(function(t) {
                e.setData({
                    userInfo: t
                });
            });
        });
    },
    onShow: function() {
        wx.getStorageSync("userId") ? e.appOnshow() : t.appOnshow = function() {
            e.appOnshow();
        };
    },
    getRunData: function() {
        wx.getSetting({
            success: function(n) {
                n.authSetting["scope.werun"] || null == n.authSetting["scope.werun"] ? wx.login({
                    success: function(n) {
                        wx.getWeRunData({
                            success: function(s) {
                                t.httpsPost({
                                    url: t.getData("/getstep"),
                                    data: {
                                        user_id: wx.getStorageSync("userId"),
                                        iv: encodeURIComponent(s.iv),
                                        encryptedData: encodeURIComponent(s.encryptedData),
                                        code: n.code
                                    },
                                    success: function(t) {
                                        200 == t.data.code ? (e.setData({
                                            stepDisplay: t.data.data.step
                                        }), e.setAppStep(t.data.data.step)) : wx.showToast({
                                            title: t.data.message,
                                            icon: "none"
                                        });
                                    }
                                });
                            },
                            fail: function() {
                                e.setData({
                                    stepIsAu: !1
                                }), e.getRewards(), wx.showToast({
                                    title: "获取步数失败",
                                    icon: "none"
                                }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
                            }
                        });
                    }
                }) : e.setData({
                    stepIsAu: !1
                });
            }
        });
    },
    setAppStep: function(n) {
        t.httpsGet({
            url: "https://online.litemob.com/run_app/user/set_step",
            data: {
                uid: e.data.uid,
                type: 1,
                step: n
            },
            success: function(t) {
                200 == t.data.code && wx.showToast({
                    title: "步数同步成功"
                });
            }
        });
    }
});