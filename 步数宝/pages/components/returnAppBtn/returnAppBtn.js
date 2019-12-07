var t = require("../../../utils/wglogin.js"), e = require("../../../utils/event.js"), a = getApp();

Component({
    properties: {
        pageType: {
            type: String
        },
        bottom: {
            type: Number,
            value: 45
        }
    },
    data: {
        returnAppParam: {},
        showReturnAppBtn: !1,
        showDownloadAppBtn: !1
    },
    methods: {
        downLoadAppClick: function() {
            wx.navigateTo({
                url: "/pages/index/goodlist/wechatCard/wechatCard"
            });
            var t = {
                event: "homepage_floating_window_open_app",
                activity_type: this.data.pageType
            };
            e.EVENT_LOG(t, function(t) {});
        }
    },
    pageLifetimes: {
        show: function() {
            var e = {};
            if (e.loginState = !0, e.userId = t.USERINFO().userId, 1069 != a.globalData.scene || this.data.pageType || this.setData({
                showReturnAppBtn: !0,
                returnAppParam: JSON.stringify(e)
            }), this.data.pageType.length) {
                var p = 45;
                "首页" != this.data.pageType && (p = 160), this.setData({
                    showDownloadAppBtn: !0,
                    bottom: p
                });
            }
        }
    }
});