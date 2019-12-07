require("./utils/ald-stat.js");

var e = require("./utils/util.js"), r = require("./network/httpRequest.js");

App({
    onLaunch: function() {
        var e = new Date().getTime();
        try {
            wx.setStorageSync("adLimit", e);
        } catch (e) {}
    },
    onShow: function(t) {
        var a = {};
        if (t.query.channelId) {
            var n = t.query.channelId;
            e.log("隧道ID：" + n), a.channelId = n;
        }
        if (t.query.scene) {
            var o = decodeURIComponent(t.query.scene);
            e.log("隧道scene：" + o), a.scene = o;
        }
        if (t.query.referrerId) {
            var d = t.query.referrerId;
            e.log("邀请人ID：" + d), a.referrerId = d;
        }
        if (t.query.typeId) {
            var u = t.query.typeId;
            e.log("邀请人红包类型ID：" + u), a.typeId = u;
        }
        if (t.query.rId) {
            var c = t.query.rId;
            e.log("邀请人红包redEnvelopeId：" + c), a.rId = c;
        }
        a.iv = "", a.encryptedData = "", r.requestWxLogin(a), this.updateManager();
    },
    updateManager: function() {
        if (wx.canIUse("getUpdateManager")) {
            var r = wx.getUpdateManager();
            r.onCheckForUpdate(function(r) {
                e.log(r.hasUpdate);
            }), r.onUpdateReady(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启应用？",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && r.applyUpdate();
                    }
                });
            });
        }
    },
    globalData: {}
});