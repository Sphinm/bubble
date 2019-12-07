var e = getApp(), t = require("../../utils/util.js"), a = e.globalData.resurl, s = e.globalData.key, r = e.globalData.deviceProperties, d = e.globalData.sharelist;

Page({
    data: {
        active: 1,
        modal: 0
    },
    onLoad: function(d) {
        var n = this, o = {
            deviceProperties: r,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        o = JSON.stringify(o), o = t.base64_encode(o), o = t.xxtea_encrypt(o, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=5&a=1&b=0",
            data: o,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data).nowDate;
                var a = t.userDate(e), r = a + " 05:00:00", d = a + " 09:00:00", o = a + " 11:00:00", i = a + " 13:00:00", c = a + " 19:00:00", p = a + " 23:00:00";
                r = t.strtotime(r), d = t.strtotime(d), o = t.strtotime(o), i = t.strtotime(i), 
                c = t.strtotime(c), p = t.strtotime(p);
                var u = 0;
                e >= r && e <= d ? u = 1 : e >= o && e <= i ? u = 2 : e >= c && e <= p && (u = 3), 
                n.setData({
                    active: u
                });
            }
        });
        c = {
            deviceProperties: r,
            user: {
                parentUserId: wx.getStorageSync("userId")
            }
        };
        c = JSON.stringify(c), c = t.base64_encode(c), c = t.xxtea_encrypt(c, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=23&a=1&b=0",
            data: c,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), void 0 == (e = JSON.parse(e.data)).userList && (e.userList = []), 
                n.setData({
                    userList: e.userList
                });
            }
        });
        var i = {
            deviceProperties: r
        };
        i = JSON.stringify(i), i = t.base64_encode(i), i = t.xxtea_encrypt(i, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=11&a=1&b=0",
            data: i,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data), 
                console.log(e), n.setData({
                    isOpen: e.isOpen,
                    isForward: e.isForward,
                    delayMoney: e.delayMoney,
                    isgundong: e.isgundong
                });
            }
        });
        var c = {
            deviceProperties: r,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        c = JSON.stringify(c), c = t.base64_encode(c), c = t.xxtea_encrypt(c, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=10&a=1&b=0",
            data: c,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data).advertisingList;
                for (var a = [], r = 0; r < e.length; r++) 97 == e[r].advertisingType && a.push(e[r]);
                console.log(a), n.setData({
                    adver: a
                });
            }
        }), wx.login({
            success: function(d) {
                wx.getWeRunData({
                    success: function(o) {
                        r.jsonStr = {
                            code: d.code,
                            appId: e.globalData.appId,
                            iv: o.iv,
                            encryptedData: o.encryptedData
                        };
                        var i = {
                            deviceProperties: r,
                            user: {
                                openId: wx.getStorageSync("openId")
                            }
                        };
                        i = JSON.stringify(i), i = t.base64_encode(i), i = t.xxtea_encrypt(i, s), wx.request({
                            url: a + "/interface/sdkData.shtml?requestId=13&a=1&b=0",
                            data: i,
                            header: {
                                "Content-Type": "application/json;charset=utf-8"
                            },
                            method: "POST",
                            success: function(e) {
                                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data).step, 
                                n.setData({
                                    step_step: e
                                });
                            }
                        });
                    },
                    fail: function(e) {
                        var d = {
                            deviceProperties: r,
                            user: {
                                openId: wx.getStorageSync("openId")
                            }
                        };
                        console.log(r), d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, s), 
                        wx.request({
                            url: a + "/interface/sdkData.shtml?requestId=13&a=1&b=0",
                            data: d,
                            header: {
                                "Content-Type": "application/json;charset=utf-8"
                            },
                            method: "POST",
                            success: function(e) {
                                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data).step, 
                                n.setData({
                                    step_step: e
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    morning: function() {
        var e = this, d = e.data.active;
        if (0 == d) return e.setData({
            modal: 2
        }), !1;
        r.pushType = d;
        var n = {
            deviceProperties: r,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        n = JSON.stringify(n), n = t.base64_encode(n), n = t.xxtea_encrypt(n, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=24&a=1&b=0",
            data: n,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), console.log(a), 
                0 == a.resultCode ? e.setData({
                    modal: 4
                }) : e.setData({
                    modal: 3
                });
            }
        });
    },
    reward: function(e) {
        var d = this, n = e.currentTarget.dataset.userid, o = e.currentTarget.dataset.index, i = d.data.userList, c = {
            deviceProperties: r,
            user: {
                parentUserId: wx.getStorageSync("userId"),
                userId: n
            }
        };
        console.log(c), c = JSON.stringify(c), c = t.base64_encode(c), c = t.xxtea_encrypt(c, s), 
        wx.request({
            url: a + "/interface/sdkData.shtml?requestId=22&a=1&b=0",
            data: c,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data);
                var a = d.data.step_step;
                a = parseInt(a), a += e.step, console.log(e), d.setData({
                    modal: 1,
                    fstep: e.step,
                    step_step: a
                }), i[o].isFriendGain = 1, d.setData({
                    userList: i
                });
            }
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
    modal: function() {
        var e = this;
        0 == e.data.active && e.setData({
            modal: 5
        });
    },
    close: function() {
        var e = this, t = e.data.delayMoney;
        t = parseFloat(t);
        var a = e.data.isgundong, s = e.data.money;
        if (s = parseFloat(s), 1 == a) e.setData({
            modal: 0
        }); else if (s > t) setTimeout(function() {
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