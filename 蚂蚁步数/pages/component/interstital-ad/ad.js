var t = null, i = null, e = !0;

Component({
    properties: {
        isTiming: Number,
        timeLimit: Number,
        adUnitId: String
    },
    data: {},
    ready: function() {
        var t = this, e = this.properties.timeLimit;
        this.properties.isTiming && (i = setTimeout(function() {
            t.adShow();
        }, e));
    },
    pageLifetimes: {
        show: function() {
            var t = this.properties.adUnitId;
            this.adLoad(t), this.adShow();
        },
        hide: function() {
            i && clearTimeout(i), this.adOff();
        }
    },
    methods: {
        adLoad: function(i) {
            wx.createInterstitialAd && e && ((t = wx.createInterstitialAd({
                adUnitId: i
            })).onLoad(function() {}), t.onError(function(t) {
                console.log("interstitialAd onError event emit", t), e = !1;
            }), t.onClose(function() {
                var t = new Date().getTime();
                try {
                    wx.setStorageSync("adLimit", t);
                } catch (t) {}
            }));
        },
        adShow: function() {
            var i = null, o = this.properties.timeLimit;
            try {
                i = wx.getStorageSync("adLimit") || 0;
            } catch (t) {}
            var n = new Date().getTime() - i;
            (!i || n > o) && t && e && Object.getPrototypeOf(t).hasOwnProperty("show") && t.show().catch(function(t) {
                if (console.log("interstitialAd show catch", t), 2003 === t.errCode) {
                    var i = new Date().getTime();
                    try {
                        wx.setStorageSync("adLimit", i);
                    } catch (t) {}
                } else e = !1;
            });
        },
        adOff: function() {
            t && (t.offLoad(), t.offError(), t.offClose(), t = null);
        }
    }
});