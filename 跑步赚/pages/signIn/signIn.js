var t = getApp(), a = null, e = require("../../7F36CF766DA41FDF1950A771F63D15A6.js");

Page({
    data: {
        autoplay: !1,
        signDay: [ {
            active: !1
        }, {
            active: !1
        }, {
            active: !1
        }, {
            active: !1
        }, {
            active: !1
        }, {
            active: !1
        }, {
            active: !1
        } ],
        signInfo: null,
        percentNum: 8,
        signSuc: !1,
        signAdInfo: null,
        continueTry: !1,
        isDouble: !1,
        showGuanzhu: !1,
        showGdtBanner: !0
    },
    hideGdtSwiper: function() {
        this.setData({
            showGdtBanner: !1
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
    gdtDouble: function() {
        t.httpsGet({
            url: t.getAdvert("/advert/pbz_gdtLive"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code ? a.setData({
                    isDouble: !0
                }) : wx.showToast({
                    title: t.data.message,
                    icon: "none"
                });
            }
        });
    },
    showLuoji: function() {
        t.show_luoji(this, "adunit-36f3b420a29e210a");
    },
    gdtLoad: function() {
        this.setData({
            gdtStatus: !0
        });
    },
    bannerErr: function() {
        t.bannerErr(this, "adunit-36f3b420a29e210a");
    },
    watchVideo: function() {
        var a = this;
        t.watchVideo(3, function() {
            a.gdtDouble();
        });
    },
    onShow: function() {
        (this.getlimitout(), this.setData({
            autoplay: !0
        }), t.adFlag(this, 90, function() {
            a.showLuoji();
        }), 0 != t.globalData.tryStart) ? 37 == t.globalData.tryAd.type && t.tryStatus({
            self: this,
            sucCb: function() {
                a.selectComponent("#adList").requestAd(), a.setData({
                    isDouble: !0
                });
            }
        }) : a.selectComponent("#adList").requestAd();
    },
    getlimitout: function() {
        t.httpsGet({
            url: t.getData("/getlimitout"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                200 == t.data.code && a.setData({
                    showGuanzhu: !0
                });
            }
        });
    },
    onHide: function() {
        this.data.gdtStatus && this.gdtDouble(), this.setData({
            autoplay: !1
        });
    },
    requestAd: function() {
        var t = this;
        e([ 37 ], function(a) {
            if (a) {
                var e = a.type_37 ? a.type_37 : null, s = !0;
                e || (s = !1), t.setData({
                    signAdInfo: e,
                    gdtFlag: s
                });
            } else t.setData({
                signAdInfo: null,
                gdtFlag: !1
            });
        });
    },
    tryResult: function(a) {
        var e = a.currentTarget.dataset.index, s = (a.currentTarget.dataset.type, this.data.signAdInfo);
        t.tryPlay(s, e);
    },
    signDayStatus: function(t) {
        for (var a = this.data.signDay, e = t.sign_num, s = 8, n = !1, i = 0; i < e; i++) a[i].active = !0;
        e < 7 ? s += 14 * (e - 1) : s = 100, n = !!t.today_sign_money, this.setData({
            percentNum: s,
            signDay: a,
            signSuc: n
        });
    },
    requestSign: function() {
        t.httpsGet({
            url: t.getData("/dosign"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var e = t.data.data;
                    a.signDayStatus(e), a.requestAd(), a.setData({
                        signInfo: e
                    });
                } else console.log("签到失败");
            }
        });
    },
    onLoad: function() {
        a = this, t.shareInfo(1), this.requestSign(), this.getapp();
    },
    hiddenAll: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                signSuc: !1,
                is_video: !1,
                is_banner: !1,
                is_Ad: !1,
                is_share: !1
            });
        }, 500);
    },
    hiddenTry: function() {
        var a = this, e = 600;
        t.globalData.ok || (e = 0), setTimeout(function() {
            a.setData({
                continueTry: !1
            });
        }, e);
    },
    onShareAppMessage: function(a) {
        var e = t.globalData.shareInfo, s = 1;
        return a.target && a.target.dataset.source && (s = a.target.dataset.source), e.path = "pages/index/index?source=" + s + "&userId=" + wx.getStorageSync("userId"), 
        e;
    }
});