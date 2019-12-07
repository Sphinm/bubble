var e = getApp(), t = require("../../utils/util.js"), a = e.globalData.resurl, r = e.globalData.key, s = e.globalData.deviceProperties, n = e.globalData.sharelist, i = null, o = null;

Page({
    data: {
        make_list: [ 0, 0, 0, 0, 0, 0, 0 ],
        img: "../../img/right_step.gif",
        modal: 0
    },
    onLoad: function() {
        var e = this, n = Math.floor(4 * Math.random());
        e.setData({
            nums: n
        });
        var i = {
            deviceProperties: s,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        i = JSON.stringify(i), i = t.base64_encode(i), i = t.xxtea_encrypt(i, r), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=10&a=1&b=0",
            data: i,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                a = t.xxtea_decrypt(a.data, r), a = t.base64_decode(a), a = JSON.parse(a), a = JSON.parse(a.data).advertisingList;
                for (var s = [], n = [], i = 0; i < a.length; i++) 57 == a[i].advertisingType && 1 == a[i].isClick && s.push(a[i]), 
                1200 == a[i].advertisingType && n.push(a[i]);
                if (n.length > 0) {
                    var o = null;
                    wx.createInterstitialAd && (o = wx.createInterstitialAd({
                        adUnitId: n[0].advertisingTitle
                    })), o.onError(function(e) {});
                    setTimeout(function() {
                        o && o.show().catch(function(e) {});
                    }, 15e3);
                }
                e.setData({
                    adver1: s
                });
            }
        }), e.setData({
            width: wx.getSystemInfoSync().windowWidth
        }), e.steps();
    },
    onShow: function(e) {
        var n = this, i = {
            deviceProperties: s,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        i = JSON.stringify(i), i = t.base64_encode(i), i = t.xxtea_encrypt(i, r), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=44&a=1&b=0",
            data: i,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                if (e = t.xxtea_decrypt(e.data, r), e = t.base64_decode(e), 0 == (e = JSON.parse(e)).resultCode) {
                    (e = JSON.parse(e.data)).friendMap.length > 4 && (e.friendMap = e.friendMap.slice(0, 4));
                    for (s = 0; s < e.friendMap.length; s++) e.friendMap[s] = JSON.parse(e.friendMap[s]), 
                    e.friendMap[s].show = !0;
                    for (var a = 4 - e.friendMap.length, s = 0; s < a; s++) {
                        var i = {
                            show: !1
                        };
                        e.friendMap.push(i);
                    }
                    n.setData({
                        friendMap: e.friendMap,
                        userInfo: e.userInfo
                    }), n.addicon();
                } else wx.showModal({
                    title: "提示",
                    content: "加载失败，请点击重试",
                    success: function(e) {
                        e.confirm ? n.onShow() : e.cancel && wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        });
    },
    addicon: function() {
        for (var e = this, t = e.data.friendMap, a = .2, r = 0; r < t.length; r++) 1 == t[r].show && (0 == t[r].isNewUser ? a += .2 : a += 1);
        a = parseFloat(a).toFixed(2), a = parseFloat(a), o = setInterval(function() {
            var t = e.data.userInfo;
            t.nowStep = parseFloat(t.nowStep), t.nowStep = t.nowStep + a, t.nowStep = parseFloat(t.nowStep).toFixed(1), 
            t.nowStep > t.stepCapacity ? clearInterval(o) : e.setData({
                userInfo: t
            });
        }, 1e3);
    },
    steps: function() {
        var e = this, t = e.data.width, a = wx.createAnimation({
            duration: 2e3,
            timingFunction: "linear"
        });
        a.translate(.7 * t, 0).step(), a.translate(.7 * t, .656 * t).step(), a.translate(0, .656 * t).step(), 
        a.translate(0, 0).step(), e.setData({
            ani: a.export()
        });
        var r = 0;
        i = setInterval(function() {
            ++r < 3 ? e.setData({
                img: "../../img/left_step.gif"
            }) : r > 3 ? (clearInterval(i), e.setData({
                img: "../../img/right_step.gif"
            }), e.steps()) : e.setData({
                img: "../../img/right_step.gif"
            });
        }, 2e3);
    },
    shouqu: function() {
        var e = this, n = {
            deviceProperties: s,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        n = JSON.stringify(n), n = t.base64_encode(n), n = t.xxtea_encrypt(n, r), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=45&a=1&b=0",
            data: n,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                a = t.xxtea_decrypt(a.data, r), a = t.base64_decode(a), 0 == (a = JSON.parse(a)).resultCode ? (a = JSON.parse(a.data), 
                e.setData({
                    modal: 2,
                    step_num: a.step
                }), clearInterval(o), e.onShow()) : (e.setData({
                    modal: 3
                }), clearInterval(o), e.onShow());
            }
        });
    },
    onShareAppMessage: function() {
        var e = Math.floor(3 * Math.random());
        return {
            title: n[e].text,
            path: "pages/index/index?walk_userId=" + wx.getStorageSync("userId"),
            imageUrl: n[e].url
        };
    },
    onHide: function() {
        clearInterval(i), clearInterval(o);
    },
    close: function() {
        var e = this, t = Math.floor(4 * Math.random());
        console.log(t), e.setData({
            modal: 0,
            nums: t
        });
    },
    guize: function() {
        this.setData({
            modal: 1
        });
    }
});