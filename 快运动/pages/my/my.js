var e = getApp(), a = require("../../utils/util.js"), t = e.globalData.resurl, s = e.globalData.key, r = e.globalData.deviceProperties, d = e.globalData.sharelist;

Page({
    data: {
        modal: 0
    },
    onLoad: function(e) {
        var d = this, i = wx.getStorageSync("userId");
        d.setData({
            userId: i
        });
        var o = {
            deviceProperties: r
        };
        o = JSON.stringify(o), o = a.base64_encode(o), o = a.xxtea_encrypt(o, s), wx.request({
            url: t + "/interface/sdkData.shtml?requestId=11&a=1&b=0",
            data: o,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = a.xxtea_decrypt(e.data, s), e = a.base64_decode(e), e = JSON.parse(e), (e = JSON.parse(e.data)).isHide1 = parseFloat(e.isHide1), 
                2 == e.isHide1 && (isHide1 = 1), console.log(e), e.isHide = parseFloat(e.isHide), 
                2 == e.isHide && (isHide = 1), d.setData({
                    isOpen: e.isOpen,
                    isForward: e.isForward,
                    delayMoney: e.delayMoney,
                    isgundong: e.isgundong,
                    isHide1: e.isHide1,
                    isHide: e.isHide
                });
            }
        });
    },
    onShow: function() {
        var e = this, d = {
            deviceProperties: r,
            user: {
                userId: wx.getStorageSync("userId")
            }
        }, i = e.data.parentuserId;
        void 0 !== i && (d.user.parentuserId = i), d = JSON.stringify(d), d = a.base64_encode(d), 
        d = a.xxtea_encrypt(d, s), wx.request({
            url: t + "/interface/sdkData.shtml?requestId=5&a=1&b=0",
            data: d,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(t) {
                t = a.xxtea_decrypt(t.data, s), t = a.base64_decode(t), t = JSON.parse(t), t = JSON.parse(t.data), 
                wx.setStorageSync("userId", t.user.userId);
                var r = parseFloat(t.user.money / 1e4).toFixed(4);
                e.setData({
                    money: r
                }), wx.hideLoading();
            }
        });
        var o = {
            deviceProperties: r,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        o = JSON.stringify(o), o = a.base64_encode(o), o = a.xxtea_encrypt(o, s), wx.request({
            url: t + "/interface/sdkData.shtml?requestId=10&a=1&b=0",
            data: o,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(t) {
                t = a.xxtea_decrypt(t.data, s), t = a.base64_decode(t), t = JSON.parse(t), t = JSON.parse(t.data).advertisingList;
                for (var r = [], d = 0; d < t.length; d++) 97 == t[d].advertisingType && r.push(t[d]);
                e.setData({
                    advers2: r
                });
            }
        });
    },
    btn: function() {
        var e = this, a = e.data.money;
        (a = parseFloat(a)) >= 50 ? e.setData({
            modal: 2
        }) : e.setData({
            modal: 1
        });
    },
    close: function() {
        var e = this, a = e.data.delayMoney;
        a = parseFloat(a);
        var t = e.data.isgundong, s = e.data.money;
        if (s = parseFloat(s), 1 == t) e.setData({
            modal: 0
        }); else if (s > a) setTimeout(function() {
            e.setData({
                modal: 0
            });
        }, 1e3); else e.setData({
            modal: 0
        });
    },
    tousu: function() {
        wx.navigateTo({
            url: "../complaints/complaints"
        });
    },
    onShareAppMessage: function() {
        var e = Math.floor(3 * Math.random());
        return {
            title: d[e].text,
            path: "pages/index/index?userId=" + wx.getStorageSync("userId"),
            imageUrl: d[e].url
        };
    },
    copy: function() {
        var e = this.data.userId;
        console.log(e), e = JSON.stringify(e), wx.setClipboardData({
            data: e,
            success: function(e) {}
        });
    },
    onTabItemTap: function() {
        wx.setStorageSync("adloadadload", !1);
    }
});