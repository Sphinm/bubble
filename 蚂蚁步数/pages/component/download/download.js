var t = require("../../../utils/globalDefine.js"), o = require("../../../network/httpRequest.js"), a = null;

Component({
    properties: {
        rewardNum: Number,
        isTiming: Number
    },
    data: {
        downloadInfo: {},
        downloadList: [],
        isShowDownload: !1,
        hasUserInfo: !1
    },
    ready: function() {
        var o = this, e = t.getDownloadList(), n = t.getUserLoginInfo();
        if (e.length > 0) {
            var i = 0;
            try {
                (i = wx.getStorageSync("dModalCount", 0) || 0) > e.length - 1 && (i = 0);
            } catch (t) {}
            var s = t.getDownloadList()[i];
            this.setData({
                downloadInfo: s,
                downloadList: e,
                hasUserInfo: n.hasInfo
            }), 1 === this.data.isTiming ? a = setTimeout(function() {
                o.isShowDownload();
            }, s.firstDisplayTime) : this.isShowDownload();
        }
    },
    pageLifetimes: {
        show: function() {
            2 === this.data.isTiming && this.isShowDownload();
        },
        hide: function() {
            a && clearTimeout(a), this.data.isShowDownload && this.bindHideDownload();
        }
    },
    methods: {
        isShowDownload: function() {
            var t = this, o = t.properties.rewardNum, a = t.data.downloadInfo, e = null, n = 0;
            try {
                e = wx.getStorageSync("downloadLastTime");
            } catch (t) {}
            var i = new Date().getTime() - e;
            o >= a.minLimit && o <= a.maxLimit && i > a.displayInterval && (n = 1), n && wx.getSystemInfo && wx.getSystemInfo({
                success: function(o) {
                    1 === a.deviceType ? "android" === o.platform && t.setData({
                        isShowDownload: !0
                    }) : 2 === a.deviceType ? "ios" === o.platform && t.setData({
                        isShowDownload: !0
                    }) : 3 === a.deviceType && ("android" !== o.platform && "ios" !== o.platform && "devtools" !== o.platform || t.setData({
                        isShowDownload: !0
                    }));
                }
            });
        },
        bindHideDownload: function() {
            var t = new Date().getTime();
            try {
                wx.setStorageSync("downloadLastTime", t);
            } catch (t) {}
            var o = 0;
            try {
                o = wx.getStorageSync("dModalCount", 0) || 0;
            } catch (t) {}
            try {
                o < this.data.downloadList.length - 1 ? wx.setStorageSync("dModalCount", o + 1) : wx.setStorageSync("dModalCount", 0);
            } catch (t) {}
            this.setData({
                isShowDownload: !1
            });
        },
        handleContact: function() {
            this.bindHideDownload();
        },
        getUserInfo: function(a) {
            var e = this;
            if (a.detail.userInfo) {
                var n = {};
                n.iv = a.detail.iv, n.encryptedData = a.detail.encryptedData, o.requestWxLogin(n).then(function() {
                    var o = t.getUserLoginInfo();
                    e.setData({
                        hasUserInfo: o.hasInfo
                    });
                });
            }
        }
    }
});