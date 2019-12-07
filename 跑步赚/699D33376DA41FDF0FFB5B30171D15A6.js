getApp();

function t(t) {
    wx.request({
        url: t.url,
        data: t.data || {},
        method: t.method || "GET",
        header: t.header || {},
        success: t.success,
        fail: t.fail || function() {
            console.log("请求信息失败");
        }
    });
}

function e(t, e) {
    var n = 0, o = t.toString(), a = e.toString();
    try {
        n += o.split(".")[1].length;
    } catch (t) {}
    try {
        n += a.split(".")[1].length;
    } catch (t) {}
    return Number(o.replace(".", "")) * Number(a.replace(".", "")) / Math.pow(10, n);
}

module.exports = {
    getUpdate: function() {
        if (wx.canIUse("getUpdateManager")) {
            var t = wx.getUpdateManager();
            t.onCheckForUpdate(function(t) {
                console.log("版本有无更新", t.hasUpdate);
            }), t.onUpdateReady(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，请重启应用使用",
                    showCancel: !1,
                    confirmText: "知道了",
                    confirmColor: "#ff4c44",
                    success: function(e) {
                        e.confirm && t.applyUpdate();
                    }
                });
            }), t.onUpdateFailed(function() {
                wx.showModal({
                    title: "更新提示",
                    content: "新版本下载失败",
                    showCancel: !1
                });
            });
        }
    },
    reqGet: function(e) {
        t(e);
    },
    reqPost: function(e) {
        e.method = "POST", t(e);
    },
    numAdd: function(t, n) {
        var o, a, c;
        try {
            o = t.toString().split(".")[1].length;
        } catch (t) {
            o = 0;
        }
        try {
            a = n.toString().split(".")[1].length;
        } catch (t) {
            a = 0;
        }
        return (e(t, c = Math.pow(10, Math.max(o, a))) + e(n, c)) / c;
    },
    numSub: function(t, n) {
        var o, a, c;
        try {
            o = t.toString().split(".")[1].length;
        } catch (t) {
            o = 0;
        }
        try {
            a = n.toString().split(".")[1].length;
        } catch (t) {
            a = 0;
        }
        return (e(t, c = Math.pow(10, Math.max(o, a))) - e(n, c)) / c;
    }
};