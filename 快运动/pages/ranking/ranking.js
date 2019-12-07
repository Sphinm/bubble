var e = getApp(), a = require("../../utils/util.js"), t = e.globalData.resurl, s = e.globalData.key, r = e.globalData.deviceProperties, n = e.globalData.sharelist;

Page({
    data: {
        modal: 0
    },
    onShow: function(e) {
        var n = this, o = {
            deviceProperties: r,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        o = JSON.stringify(o), o = a.base64_encode(o), o = a.xxtea_encrypt(o, s), wx.request({
            url: t + "/interface/sdkData.shtml?requestId=5&a=1&b=0",
            data: o,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = a.xxtea_decrypt(e.data, s), e = a.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data), 
                console.log(e);
                var t = parseFloat(e.user.money / 1e4).toFixed(4);
                t = parseFloat(t), n.setData({
                    money: t
                });
            }
        });
        var d = {
            deviceProperties: r
        };
        d = JSON.stringify(d), d = a.base64_encode(d), d = a.xxtea_encrypt(d, s), wx.request({
            url: t + "/interface/sdkData.shtml?requestId=11&a=1&b=0",
            data: d,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                if (e = a.xxtea_decrypt(e.data, s), e = a.base64_decode(e), e = JSON.parse(e), 0 == (e = JSON.parse(e.data)).isRank) n.lingqu(); else {
                    wx.showLoading({
                        title: "加载中。。。"
                    });
                    var o = {
                        deviceProperties: r,
                        user: {
                            userId: wx.getStorageSync("userId")
                        }
                    };
                    o = JSON.stringify(o), o = a.base64_encode(o), o = a.xxtea_encrypt(o, s), wx.request({
                        url: t + "/interface/sdkData.shtml?requestId=18&a=1&b=0",
                        data: o,
                        header: {
                            "Content-Type": "application/json;charset=utf-8"
                        },
                        method: "POST",
                        success: function(e) {
                            e = a.xxtea_decrypt(e.data, s), e = a.base64_decode(e), e = JSON.parse(e), console.log(e), 
                            e = JSON.parse(e.data), console.log(e), e.rankList = e.rankList.slice(0, 99), wx.hideLoading();
                            for (var t = 0; t < e.rankList.length; t++) e.rankList[t].money = (e.rankList[t].money / 1e4).toFixed(4), 
                            e.rankList[t].money = parseFloat(e.rankList[t].money);
                            "100" == e.userRank.rank && (e.userRank.rank = "100+"), e.userRank.money = (e.userRank.money / 1e4).toFixed(4), 
                            e.userRank.createTime = e.rankList[0].createTime.slice(0, 10), e.userRank.createTime = e.userRank.createTime + "  00:00 -- 24:00", 
                            n.lingqu(), n.setData({
                                rankList: e.rankList,
                                userRank: e.userRank
                            });
                        }
                    });
                }
                n.setData({
                    isOpen: e.isOpen,
                    isForward: e.isForward,
                    delayMoney: e.delayMoney,
                    isgundong: e.isgundong,
                    isRank: e.isRank
                });
            }
        });
        var i = {
            deviceProperties: r,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        i = JSON.stringify(i), i = a.base64_encode(i), i = a.xxtea_encrypt(i, s), wx.request({
            url: t + "/interface/sdkData.shtml?requestId=10&a=1&b=0",
            data: i,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = a.xxtea_decrypt(e.data, s), e = a.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data).advertisingList;
                for (var t = [], r = 0; r < e.length; r++) 97 == e[r].advertisingType && t.push(e[r]);
                n.setData({
                    advers2: t
                });
            }
        });
    },
    lingqu: function() {
        var e = this, n = {
            deviceProperties: r,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        n = JSON.stringify(n), n = a.base64_encode(n), n = a.xxtea_encrypt(n, s), wx.request({
            url: t + "/interface/sdkData.shtml?requestId=19&a=1&b=0",
            data: n,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(t) {
                t = a.xxtea_decrypt(t.data, s), t = a.base64_decode(t), t = JSON.parse(t), console.log(t), 
                0 == t.resultCode ? ((t = JSON.parse(t.data).userRank).money = (t.money / 1e4).toFixed(4), 
                e.setData({
                    rank: t.rank,
                    money: t.money,
                    modal: 1
                })) : -9 == t.resultCode ? (t = JSON.parse(t.data), console.log(t), "" !== t && e.setData({
                    modal: 2,
                    rank: t.userRank.rank,
                    totalNum: t.userRank.totalNum
                })) : 0 == e.data.isRank && e.setData({
                    modal: 3
                });
            }
        });
    },
    onShareAppMessage: function() {
        var e = Math.floor(3 * Math.random());
        return {
            title: n[e].text,
            path: "pages/index/index?userId=" + wx.getStorageSync("userId"),
            imageUrl: n[e].url
        };
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
    onTabItemTap: function() {
        wx.setStorageSync("adloadadload", !1);
    }
});