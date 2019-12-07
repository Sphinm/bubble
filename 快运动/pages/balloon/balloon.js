var e = getApp(), t = require("../../utils/util.js"), a = e.globalData.resurl, s = e.globalData.key, o = e.globalData.deviceProperties, r = e.globalData.sharelist, n = !0;

Page({
    data: {
        haoyou_list: [ 0, 0, 0, 0, 0 ],
        current: 0,
        reta: 0,
        animation: "",
        animationData: "",
        modal: 0,
        video: []
    },
    onLoad: function(e) {
        var r = this;
        r.setData({
            balloonNum: e.balloonNum
        });
        var n = {
            deviceProperties: o
        };
        n = JSON.stringify(n), n = t.base64_encode(n), n = t.xxtea_encrypt(n, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=11&a=1&b=0",
            data: n,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), (e = JSON.parse(e.data)).delayMoney = parseFloat(e.delayMoney), 
                console.log(e), r.setData({
                    isAgin: e.isAgin,
                    isOpen: e.isOpen,
                    isForward: e.isForward,
                    beginTime: e.beginTime,
                    endTime: e.endTime,
                    isgundong: e.isgundong,
                    delayMoney: e.delayMoney,
                    isfrward: e.isfrward,
                    sisterTime: e.sisterTime,
                    isSignIn: e.isSignIn,
                    isHide: e.isHide
                });
            }
        });
        i = {
            deviceProperties: o,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        i = JSON.stringify(i), i = t.base64_encode(i), i = t.xxtea_encrypt(i, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=33&a=1&b=0",
            data: i,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                console.log(e), e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), 
                console.log(e), e = JSON.parse(e.data).list;
                for (var a = 0; a < e.length; a++) e[a] = parseFloat(e[a] / 1e4).toFixed(4);
                console.log(e), r.setData({
                    qiqiu_list: e
                });
            }
        });
        var i = {
            deviceProperties: o,
            user: {
                parentUserId: wx.getStorageSync("userId")
            }
        };
        i = JSON.stringify(i), i = t.base64_encode(i), i = t.xxtea_encrypt(i, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=35&a=1&b=0",
            data: i,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data);
                var a = r.data.haoyou_list;
                if (void 0 == e.userList) o = []; else var o = e.userList;
                for (var n = 0; n < o.length; n++) o[n].createTime = o[n].createTime.slice(5, 10);
                o.length < 5 && (o = o.concat(a.slice(0, 5 - o.length + 1))), r.setData({
                    haoyou_list: o
                });
            }
        });
        var d = {
            deviceProperties: o,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=10&a=1&b=0",
            data: d,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data).advertisingList, 
                console.log(e);
                for (var a = [], o = [], n = [], i = 0; i < e.length; i++) 1 == e[i].advertisingType && a.push(e[i]), 
                1e3 == e[i].advertisingType && 1 == e[i].isClick && o.push(e[i]), 1200 == e[i].advertisingType && n.push(e[i]);
                if (n.length > 0) {
                    var d = null;
                    wx.createInterstitialAd && (d = wx.createInterstitialAd({
                        adUnitId: n[0].advertisingTitle
                    })), d.onError(function(e) {});
                    setTimeout(function() {
                        d && d.show().catch(function(e) {});
                    }, 15e3);
                }
                if (o.length > 0) {
                    var c = null;
                    wx.createRewardedVideoAd ? (c = wx.createRewardedVideoAd({
                        adUnitId: o[0].advertisingTitle
                    }), r.setData({
                        videoAd: c,
                        videos: o
                    }), c.load().catch(function(e) {
                        r.setData({
                            videos: []
                        });
                    }), c.onError(function(e) {
                        return function(e) {
                            r.setData({
                                videos: []
                            });
                        };
                    })) : wx.showToast({
                        title: "当前微信版本过低，无法观看视频获得奖励，请升级微信",
                        icon: "none",
                        duration: 2e3
                    });
                } else r.setData({
                    videos: []
                });
                r.setData({
                    adver: a
                });
            }
        });
        var c = {
            deviceProperties: o,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        c = JSON.stringify(c), c = t.base64_encode(c), c = t.xxtea_encrypt(c, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=5&a=1&b=0",
            data: c,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data);
                var a = parseInt(e.user.totalMoney / 10);
                a = (a / 1e3).toFixed(3), a = parseFloat(a).toFixed(3), console.log(a), r.setData({
                    totalMoney: a
                });
            }
        });
    },
    swiper_right: function(e) {
        var t = this, a = t.data.current, s = t.data.haoyou_list.length - 1;
        s <= 5 ? s = 5 : ++a > s ? t.setData({
            current: 0
        }) : t.setData({
            current: a
        });
    },
    swiper_current: function(e) {
        this.setData({
            current: e.detail.current
        });
    },
    qiqiu_daqi: function() {
        var e = this;
        wx.vibrateShort();
        var r = e.data.reta, i = wx.createAnimation({
            duration: 200,
            timingFunction: "linear"
        });
        i.scale(.8).step(), e.setData({
            animationDatas: i.export()
        });
        setTimeout(function() {
            i.scale(1).step(), e.setData({
                animationDatas: i.export()
            });
        }, 200);
        var d = e.data.balloonNum;
        if (d > 0) {
            var c = wx.createAnimation({
                duration: 400,
                timingFunction: "linear"
            });
            if (clearTimeout(n), r++, console.log(r), r >= 15) {
                c.scale(1).bottom(0).step(), e.setData({
                    reta: 0,
                    animationData: c.export()
                });
                var l = {
                    deviceProperties: o,
                    user: {
                        userId: wx.getStorageSync("userId")
                    }
                };
                l = JSON.stringify(l), l = t.base64_encode(l), l = t.xxtea_encrypt(l, s), wx.request({
                    url: a + "/interface/sdkData.shtml?requestId=32&a=1&b=0",
                    data: l,
                    header: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    method: "POST",
                    success: function(r) {
                        r = t.xxtea_decrypt(r.data, s), r = t.base64_decode(r), r = JSON.parse(r), console.log(r), 
                        (r = JSON.parse(r.data)).money = parseFloat(r.money / 1e4).toFixed(4), d--, e.setData({
                            money: r.money,
                            balloonNum: d,
                            modal: 1
                        });
                        var n = {
                            deviceProperties: o,
                            user: {
                                userId: wx.getStorageSync("userId")
                            }
                        };
                        n = JSON.stringify(n), n = t.base64_encode(n), n = t.xxtea_encrypt(n, s), wx.request({
                            url: a + "/interface/sdkData.shtml?requestId=33&a=1&b=0",
                            data: n,
                            header: {
                                "Content-Type": "application/json;charset=utf-8"
                            },
                            method: "POST",
                            success: function(a) {
                                a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), a = JSON.parse(a.data).list;
                                for (var o = 0; o < a.length; o++) a[o] = parseFloat(a[o] / 1e4).toFixed(4);
                                e.setData({
                                    qiqiu_list: a
                                });
                            }
                        });
                    }
                });
            } else {
                var u = 3 * r + 100;
                u = parseFloat(u / 100).toFixed(2), c.scale(u).bottom(500 * u).step(), e.setData({
                    reta: r,
                    animationData: c.export()
                }), n = setTimeout(function() {
                    c.scale(1).bottom(0).step(), e.setData({
                        reta: 0,
                        animationData: c.export()
                    });
                }, 1500);
            }
        } else e.setData({
            modal: 2
        });
    },
    onShareAppMessage: function() {
        var e = Math.floor(3 * Math.random());
        return {
            title: r[e].text,
            path: "pages/index/index?qiqiu_userId=" + wx.getStorageSync("userId"),
            imageUrl: r[e].url
        };
    },
    close: function() {
        var e = this, t = e.data.delayMoney;
        t = parseFloat(t);
        var a = e.data.isgundong, s = e.data.totalMoney;
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
    videobtn: function() {
        var e = this, r = (e.data.videos, e.data.videoAd);
        r && r.show().catch(function(t) {
            r.load().then(function() {
                return r.show();
            }).catch(function(t) {
                e.setData({
                    videos: []
                }), wx.showToast({
                    title: "今日观看视频获得奖励次数已达到上限！",
                    icon: "none",
                    duration: 2e3
                });
            });
        }), r.onClose(function(n) {
            if (1 == n.isEnded) {
                var i = {
                    deviceProperties: o,
                    user: {
                        userId: wx.getStorageSync("userId")
                    }
                };
                i = JSON.stringify(i), i = t.base64_encode(i), i = t.xxtea_encrypt(i, s), wx.request({
                    url: a + "/interface/sdkData.shtml?requestId=34&a=1&b=0",
                    data: i,
                    header: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    method: "POST",
                    success: function(a) {
                        a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), console.log(a), 
                        0 == a.resultCode ? (a = JSON.parse(a.data), console.log(a), e.setData({
                            balloonNums: a.balloonNum,
                            balloonNum: a.user.balloonNum,
                            modal: 3,
                            videos: []
                        }), setTimeout(function() {
                            e.onLoad();
                        }, 3e4)) : (wx.showToast({
                            title: "今日观看视频获得奖励次数已达到上限！",
                            icon: "none",
                            duration: 2e3
                        }), e.setData({
                            videos: [],
                            modal: 0
                        }));
                    }
                });
            } else e.setData({
                modal: 4
            });
            r.offLoad(), r.offError(), r.offClose();
        });
    }
});