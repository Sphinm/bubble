var t = getApp(), i = null;

Component({
    properties: {
        adInfo: {
            type: Object,
            value: null
        }
    },
    data: {
        gdtStatus: !1,
        adinfo: {
            all: !0
        }
    },
    attached: function() {
        i = this, t.adFlag(this, 100, function() {
            i.showLuoji();
        });
    },
    methods: {
        adliveVideo: function() {
            this.triggerEvent("videoLive");
        },
        adliveGdt: function() {
            this.triggerEvent("adLive");
        },
        showLuoji: function() {
            t.show_luoji(this, "adunit-f527d40e02df45e6");
        },
        gdtLoad: function() {
            console.log("幸运广电同"), this.setData({
                gdtStatus: !0
            });
        },
        bannerErr: function() {
            t.bannerErr(this, "adunit-f527d40e02df45e6");
        },
        watchVideo: function() {
            var i = this;
            t.watchVideo(function() {
                i.data.is_video ? i.adliveVideo() : i.adliveGdt();
            });
        },
        hiddenAll: function() {
            this.setData({
                is_video: !1,
                is_banner: !1,
                is_Ad: !1,
                is_share: !1,
                gdtStatus: !1
            }), this.triggerEvent("hidden");
        },
        tryResult: function() {
            this.triggerEvent("tryResult");
        },
        tryLuck: function() {
            var t = this.data.adInfo, i = this;
            0 == t.jump_type ? wx.navigateToMiniProgram({
                appId: t.appid,
                path: t.ad_url,
                success: function() {
                    i.tryResult();
                }
            }) : wx.navigateToMiniProgram({
                appId: "wx31117a8ad7834d13",
                path: "/pages/ad/ad",
                extraData: t.extraData
            });
        }
    },
    pageLifetimes: {
        show: function() {
            i = this;
        },
        hide: function() {
            this.data.gdtStatus && this.adliveGdt();
        }
    }
});