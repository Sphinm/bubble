var t = getApp(), e = require("../../7F36CF766DA41FDF1950A771F63D15A6.js");

Component({
    properties: {
        isMy: {
            type: Boolean,
            value: !1
        },
        isList: {
            type: Boolean,
            value: !1
        },
        isSign: {
            type: Boolean,
            value: !1
        },
        showHeader: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        adList: null,
        tryAd: null
    },
    pageLifetimes: {
        show: function() {
            var e = this;
            if (0 != t.globalData.tryStart) {
                var a = t.globalData.tryAd;
                32 != a.type && 39 != a.type || t.tryStatus({
                    self: e,
                    sucCb: function() {
                        wx.showToast({
                            title: "领取到" + a.vir_money + "个金币",
                            icon: "none"
                        }), e.triggerEvent("yes"), e.triggerEvent("requestAd");
                    }
                });
            }
        }
    },
    methods: {
        requestAd: function() {
            var t = this;
            e([ 32 ], function(e) {
                if (e) {
                    var a = e.type_32 ? e.type_32 : null;
                    t.setData({
                        adList: a
                    });
                } else t.setData({
                    adList: null
                });
            });
        },
        tryResult: function(e) {
            e.currentTarget.dataset.type;
            var a = e.currentTarget.dataset.index, s = this.data.adList;
            2 == s[a].jump_type ? wx.previewImage({
                urls: [ s[a].ld_image ],
                success: function() {
                    t.tryPlay(s, a);
                }
            }) : t.tryPlay(s, a);
        }
    }
});