require("../../utils/util.js");

var n = require("../../utils/globalDefine.js"), e = require("../../network/httpRequest.js");

Page({
    data: {
        downloadInfo: {},
        hasUserInfo: !1
    },
    onWxLoginCallBack: function() {},
    getUserInfo: function(o) {
        var t = this;
        if (o.detail.userInfo) {
            var a = {};
            a.iv = o.detail.iv, a.encryptedData = o.detail.encryptedData, e.requestWxLogin(a).then(function() {
                var e = n.getUserLoginInfo();
                t.setData({
                    hasUserInfo: e.hasInfo
                });
            });
        }
    },
    onLoad: function() {
        var e = n.getDownloadInfo(), o = n.getUserLoginInfo();
        this.setData({
            downloadInfo: e,
            hasUserInfo: o.hasInfo
        });
    },
    onShow: function() {}
});