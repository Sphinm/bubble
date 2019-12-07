var t = getApp(), a = null, e = null, o = !0;

Page({
    data: {
        ok: !1,
        autoplay: !1,
        showGdtBanner: !0,
        kf_win: !1
    },
    hideGdtSwiper: function() {
        this.setData({
            showGdtBanner: !1
        });
    },
    goShop: function(t) {
        var a = t.currentTarget.dataset.tab;
        wx.setStorageSync("goodTab", a), wx.navigateTo({
            url: "/pages/shop/shop"
        });
    },
    getlimitout: function() {
        t.httpsGet({
            url: t.getData("/getlimitout"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code ? a.setData({
                    showGuanzhu: !0
                }) : a.setData({
                    showGuanzhu: !1
                });
            }
        });
    },
    onLoad: function() {
        a = this, this.selectComponent("#adList").requestAd(), this.setData({
            userId: wx.getStorageSync("userId")
        });
    },
    onShow: function() {
        this.contact_statu(), this.getlimitout(), this.setData({
            autoplay: !0
        }), this.getapp(), t.shareInfo(1), this.loadVideo(), this.setData({
            ok: t.globalData.ok
        });
    },
    contact_statu: function() {
        var a = this;
        wx.request({
            url: t.getData("/checkTask"),
            method: "GET",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    kf_float: t.data.data.status
                });
            }
        });
    },
    onHide: function() {
        this.setData({
            autoplay: !1
        });
    },
    getapp: function() {
        t.httpsGet({
            url: t.getData("/getapp"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && a.setData({
                    appAd: t.data.data
                });
            }
        });
    },
    loadVideo: function() {
        (e = wx.createRewardedVideoAd({
            adUnitId: "adunit-e0bbda336d0e1388"
        })).load().then(function() {
            a.setData({
                videoStatus: !0
            });
        }).catch(function(t) {
            a.setData({
                videoStatus: !1
            });
        }), e.onError(function(t) {
            console.log(t);
        });
    },
    videoAdLive: function() {
        t.httpsGet({
            url: t.getData("/guandiantong"),
            data: {
                user_id: wx.getStorageSync("userId"),
                type: 2
            },
            success: function(t) {
                200 == t.data.code ? wx.showToast({
                    title: "前往首页领取视频奖励",
                    icon: "none",
                    duration: 3e3
                }) : wx.showToast({
                    title: "奖励次数达到限制",
                    icon: "none",
                    duration: 3e3
                });
            }
        });
    },
    showVideoAd: function() {
        if (this.data.videoStatus) {
            if (!o) return;
            o = !1, e.show().catch(function() {
                e.load().then(function() {
                    return e.show();
                }).catch(function(t) {});
            }), e.onClose(function(n) {
                o = !0, e.offClose(), n.isEnded && (t.ready_click(7), a.videoAdLive());
            });
        } else wx.showToast({
            title: "今日次数用完，明天再来看",
            icon: "none"
        });
    },
    onShareAppMessage: function(a) {
        var e = t.globalData.shareInfo;
        return e.path = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        e;
    },
    get_contact: function() {
        this.setData({
            kf_win: !0
        });
    },
    hiddenAll: function() {
        this.setData({
            kf_win: !1
        });
    },
    add_jl: function() {
        wx.request({
            url: t.getData("/addKefuTask"),
            method: "GET",
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                console.log("加记录成功");
            }
        });
    }
});