var e = getApp(), t = require("../../utils/util.js"), a = e.globalData.resurl, s = e.globalData.key, o = e.globalData.deviceProperties, n = e.globalData.sharelist, r = null;

Page({
    data: {
        list: [],
        top: !1,
        boxList: [],
        modal_close_time: 0,
        jinri: !0,
        timeint: 0,
        modal: 0,
        xinyonghuswitc: !0,
        kaihongbaosw: !0,
        swiper: [ {
            name: "张运豪",
            money: 86
        }, {
            name: "此石、此刻",
            money: 59
        }, {
            name: "猜猜",
            money: 56
        }, {
            name: "幸福小女人",
            money: 87
        }, {
            name: "豪琦卓越",
            money: 59
        }, {
            name: "貞ｌōｖé珺",
            money: 67
        }, {
            name: "ʚ柠檬少女酱ɞ",
            money: 89
        }, {
            name: "A布凡墙纸店",
            money: 105
        }, {
            name: "独行者",
            money: 56
        }, {
            name: "邱峰",
            money: 78
        }, {
            name: "不懂姐就别去猜",
            money: 98
        }, {
            name: "你好陌生",
            money: 50
        }, {
            name: "蓝带烤地瓜",
            money: 52.8
        }, {
            name: "犟丫头",
            money: 78.4
        }, {
            name: "快乐自由人",
            money: 65.7
        }, {
            name: "方斌",
            money: 60
        }, {
            name: "手工加工",
            money: 95
        }, {
            name: "A舒天红",
            money: 56.9
        }, {
            name: "陈红",
            money: 67.8
        }, {
            name: "改变自己",
            money: 85.5
        }, {
            name: "陈娜小号",
            money: 89
        }, {
            name: "旭日阳光",
            money: 97
        }, {
            name: "清荷~叶叶",
            money: 59
        }, {
            name: "凝云冰兰",
            money: 69
        }, {
            name: "伴城烟雨",
            money: 58
        }, {
            name: "幸福家庭",
            money: 68
        }, {
            name: "青春无悔",
            money: 68.8
        }, {
            name: "海阔天空",
            money: 72
        }, {
            name: "一帆风顺小葡萄",
            money: 72
        }, {
            name: "盘锦魏丽",
            money: 89.6
        }, {
            name: "茜茜",
            money: 78.5
        }, {
            name: "重头再来",
            money: 89.6
        }, {
            name: "孙乐君",
            money: 125.5
        }, {
            name: "天山雪莲",
            money: 78.5
        }, {
            name: "淡了喜欢",
            money: 56.8
        }, {
            name: "星星",
            money: 78.8
        }, {
            name: "大哥没感情",
            money: 76.5
        }, {
            name: "不完美的梦",
            money: 78
        }, {
            name: "明水晶",
            money: 88
        }, {
            name: "米雪",
            money: 77
        }, {
            name: "改变",
            money: 99
        } ],
        videor: !1,
        timeInt: 0,
        videoavtive: !1,
        qiancontact: !0,
        isNewUser: 0
    },
    onLoad: function(e) {
        var n = this, r = Math.floor(2 * Math.random());
        n.setData({
            nums: r
        }), void 0 !== e.userId && n.setData({
            parentuserId: e.userId
        }), void 0 !== e.scene && n.setData({
            parentuserId: e.scene
        }), void 0 !== e.qiqiu_userId && n.setData({
            qiqiu_userId: e.qiqiu_userId
        }), void 0 !== e.walk_userId && n.setData({
            walk_userId: e.walk_userId
        });
        for (var i = n.data.swiper, d = [], c = 0; c < i.length; c++) {
            var i = n.data.swiper, l = parseInt(Math.random() * (i.length - 1));
            d.push(i[l]), i.splice(l, 1);
        }
        n.setData({
            swiperlist: d
        }), "" == wx.getStorageSync("closenum") && wx.setStorageSync("closenum", 0);
        var u = wx.getStorageSync("userId");
        void 0 != u && "" != u || n.userinfo();
        var p = wx.getStorageSync("qiancontacts");
        "" !== p && p == new Date().getDate() && n.setData({
            qiancontact: !1
        });
        var g = {
            deviceProperties: o
        };
        g = JSON.stringify(g), g = t.base64_encode(g), g = t.xxtea_encrypt(g, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=11&a=1&b=0",
            data: g,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e);
                var a = (e = JSON.parse(e.data)).isSister, o = wx.getStorageSync("videotimes"), r = wx.getStorageSync("sister");
                if ("" !== r) if (r == (c = (d = new Date()).getDate())) {
                    var i = wx.getStorageSync("adload");
                    if ("" == i && (wx.setStorageSync("adload", !0), i = !0), 0 == i) n.setData({
                        isSister: 1
                    }); else if (0 == a) {
                        l = Date.parse(new Date());
                        l = parseFloat(l / 1e3), "" == o ? (wx.setStorageSync("videotimes", l), n.setData({
                            isSisters: 1
                        })) : (l -= o) > e.sisterTime ? n.setData({
                            isSisters: 0
                        }) : n.setData({
                            isSisters: 1
                        });
                    } else n.setData({
                        isSisters: 1
                    });
                } else if (wx.setStorageSync("sister", c), wx.setStorageSync("adload", !0), 0 == a) {
                    l = Date.parse(new Date());
                    l = parseFloat(l / 1e3), "" == o ? (wx.setStorageSync("videotimes", l), n.setData({
                        isSisters: 1
                    })) : (l -= o) > e.sisterTime ? n.setData({
                        isSisters: 0
                    }) : n.setData({
                        isSisters: 1
                    });
                } else n.setData({
                    isSisters: 1
                }); else {
                    var d = new Date(), c = d.getDate();
                    if (wx.setStorageSync("sister", c), 0 == a) {
                        var l = Date.parse(new Date());
                        l = parseFloat(l / 1e3), "" === o ? (wx.setStorageSync("videotimes", l), n.setData({
                            isSisters: 1
                        })) : (l -= o) > e.sisterTime ? n.setData({
                            isSisters: 0
                        }) : n.setData({
                            isSisters: 1
                        });
                    } else n.setData({
                        isSisters: 1
                    });
                }
                e.delayMoney = parseFloat(e.delayMoney), e.close_rate = parseFloat(e.close_rate), 
                1 == e.isFriend && wx.getSystemInfo({
                    success: function(e) {
                        "devtools" == e.platform ? n.setData({
                            isFriend: 0
                        }) : "ios" == e.platform ? n.setData({
                            isFriend: 1
                        }) : "android" == e.platform && n.setData({
                            isFriend: 0
                        });
                    }
                }), e.isHide1 = parseFloat(e.isHide1), 2 == e.isHide1 && (isHide1 = 1), console.log(e), 
                e.isHide = parseFloat(e.isHide), 2 == e.isHide && (isHide = 1), n.setData({
                    isOpen: e.isOpen,
                    isForward: e.isForward,
                    beginTime: e.beginTime,
                    endTime: e.endTime,
                    isgundong: e.isgundong,
                    delayMoney: e.delayMoney,
                    isfrward: e.isfrward,
                    sisterTime: e.sisterTime,
                    isHide1: e.isHide1,
                    isSignIn: e.isSignIn,
                    isHide: e.isHide,
                    close_rate: e.close_rate
                });
            }
        }), wx.request({
            url: "https://pdd.szlzyd.com/searchGoods",
            data: {
                type: 0,
                pid: "8672284_69814181"
            },
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                for (var t = e.data.goods_search_response.goods_list, a = 0; a < t.length; a++) {
                    t[a].min_group_price = t[a].min_group_price - t[a].coupon_discount, t[a].min_group_price = parseFloat(t[a].min_group_price / 100).toFixed(2), 
                    t[a].coupon_discount = parseFloat(t[a].coupon_discount / 100).toFixed(2);
                    var s = a;
                    s > 13 ? (s -= 13, t[a].adver = s % 8 == 0) : (s -= 2, t[a].adver = 0 == s || s % 6 == 0);
                }
                console.log(t), n.setData({
                    list: t,
                    pageing: 1
                });
            }
        });
    },
    userinfo: function() {
        var e = this;
        e.setData({
            interout: !0
        }), wx.login({
            success: function(n) {
                wx.showLoading({
                    title: "登录中"
                });
                o.key = n.code;
                var r = {
                    deviceProperties: o
                }, i = e.data.parentuserId;
                void 0 !== i && (r.user = {
                    parentUserId: i
                }, e.savefriendstep(i)), r = JSON.stringify(r), r = t.base64_encode(r), r = t.xxtea_encrypt(r, s), 
                wx.request({
                    url: a + "/interface/sdkData.shtml?requestId=6&a=1&b=0",
                    data: r,
                    header: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    method: "POST",
                    success: function(n) {
                        n = t.xxtea_decrypt(n.data, s), n = t.base64_decode(n), n = JSON.parse(n), console.log(n), 
                        n = JSON.parse(n.data), wx.setStorageSync("userId", n.user.userId), wx.setStorageSync("openId", n.user.openId);
                        var r = e.data.qiqiu_userId;
                        if (void 0 !== r) {
                            d = {
                                deviceProperties: o,
                                user: {
                                    parentUserId: r,
                                    userId: wx.getStorageSync("userId"),
                                    isBalloon: 1
                                }
                            };
                            d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, s), wx.request({
                                url: a + "/interface/sdkData.shtml?requestId=36&a=1&b=0",
                                data: d,
                                header: {
                                    "Content-Type": "application/json;charset=utf-8"
                                },
                                method: "POST",
                                success: function(e) {
                                    e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), console.log(e);
                                }
                            });
                        }
                        var i = e.data.walk_userId;
                        if (void 0 !== i) {
                            i = parseFloat(i);
                            var d = {
                                deviceProperties: o,
                                user: {
                                    parentUserId: i,
                                    userId: wx.getStorageSync("userId"),
                                    isBalloon: 1,
                                    isNewUser: n.user.isNewUser
                                }
                            };
                            d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, s), wx.request({
                                url: a + "/interface/sdkData.shtml?requestId=43&a=1&b=0",
                                data: d,
                                header: {
                                    "Content-Type": "application/json;charset=utf-8"
                                },
                                method: "POST",
                                success: function(e) {
                                    e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), console.log(e);
                                }
                            });
                        }
                        var c = parseInt(n.user.money / 10);
                        c = (c / 1e3).toFixed(3), n.user.is_floating_coin > 0 ? (e.setData({
                            is_floating_coin: 0
                        }), e.receenergy(n.user.is_floating_coin)) : e.setData({
                            is_floating_coin: 1
                        }), n.user.is_floating_step_200 > 0 ? (e.setData({
                            is_floating_step_200: 0
                        }), e.receenergys(n.user.is_floating_step_200)) : e.setData({
                            is_floating_step_200: 1
                        }), e.setData({
                            money: c,
                            is_floating_step: n.user.is_floating_step,
                            friendNum: n.user.friendNum,
                            isNewUser: n.user.isNewUser,
                            modal: 10,
                            user: n.user
                        });
                        var l = {
                            deviceProperties: o,
                            user: {
                                openId: wx.getStorageSync("openId")
                            }
                        };
                        l = JSON.stringify(l), l = t.base64_encode(l), l = t.xxtea_encrypt(l, s), wx.request({
                            url: a + "/interface/sdkData.shtml?requestId=13&a=1&b=0",
                            data: l,
                            header: {
                                "Content-Type": "application/json;charset=utf-8"
                            },
                            method: "POST",
                            success: function(a) {
                                a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), a = JSON.parse(a.data).step, 
                                wx.setStorageSync("jinri", !1), e.setData({
                                    step_step: a
                                }), e.hongbao();
                            }
                        }), e.userlist(), e.adverlist(), wx.hideLoading();
                    }
                });
            }
        });
    },
    onShow: function() {
        var e = this;
        e.setData({
            interout: !0,
            modal_close_time: 0
        });
        var n = wx.getStorageSync("userId");
        if (void 0 !== n && "" !== n) {
            e.authstep(), e.userlist(), 0 == e.data.videor && e.adverlist();
            var r = e.data.qiqiu_userId;
            if (void 0 !== r) {
                m = {
                    deviceProperties: o,
                    user: {
                        parentUserId: r,
                        userId: wx.getStorageSync("userId")
                    }
                };
                console.log(m), m = JSON.stringify(m), m = t.base64_encode(m), m = t.xxtea_encrypt(m, s), 
                wx.request({
                    url: a + "/interface/sdkData.shtml?requestId=36&a=1&b=0",
                    data: m,
                    header: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    method: "POST",
                    success: function(e) {
                        e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), console.log(e);
                    }
                });
            }
            var i = e.data.walk_userId;
            if (void 0 !== i) {
                i = parseFloat(i);
                m = {
                    deviceProperties: o,
                    user: {
                        parentUserId: wx.getStorageSync("userId"),
                        userId: i,
                        isBalloon: 1,
                        isNewUser: 0
                    }
                };
                m = JSON.stringify(m), m = t.base64_encode(m), m = t.xxtea_encrypt(m, s), wx.request({
                    url: a + "/interface/sdkData.shtml?requestId=43&a=1&b=0",
                    data: m,
                    header: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    method: "POST",
                    success: function(e) {
                        e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), console.log(e);
                    }
                });
            }
            var d = {
                deviceProperties: o,
                user: {
                    userId: wx.getStorageSync("userId")
                }
            }, c = e.data.parentuserId;
            void 0 !== c && (d.user.parentuserId = c), d = JSON.stringify(d), d = t.base64_encode(d), 
            d = t.xxtea_encrypt(d, s), wx.request({
                url: a + "/interface/sdkData.shtml?requestId=5&a=1&b=0",
                data: d,
                header: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                method: "POST",
                success: function(a) {
                    a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), 0 == (a = JSON.parse(a.data)).isorder && e.setData({
                        modal: 11
                    }), wx.setStorageSync("userId", a.user.userId);
                    var o = parseFloat(a.user.money / 1e4).toFixed(4);
                    o = parseFloat(o);
                    var n = e.data.delayMoney;
                    if (n = parseFloat(n), o < n) {
                        e.setData({
                            isSister: 1
                        });
                        var r = wx.getStorageSync("videotime");
                        if ("" == r) wx.setStorageSync("videotime", a.nowDate), e.setData({
                            videoavtive: !1
                        }); else {
                            r = a.nowDate - r;
                            var i = e.data.beginTime;
                            r > (i = parseFloat(i)) ? (wx.setStorageSync("videotime", a.nowDate), e.setData({
                                videoavtive: !0
                            })) : e.setData({
                                videoavtive: !1
                            });
                        }
                    } else 0 == e.data.isSisters && e.setData({
                        isSister: 0
                    }), e.setData({
                        videoavtive: !0
                    });
                    a.user.is_floating_coin > 0 ? (e.setData({
                        is_floating_coin: 0
                    }), e.receenergy(a.user.is_floating_coin)) : e.setData({
                        is_floating_coin: 1
                    }), a.user.is_floating_step_200 > 0 ? (e.setData({
                        is_floating_step_200: 0
                    }), e.receenergys(a.user.is_floating_step_200)) : e.setData({
                        is_floating_step_200: 1
                    }), console.log(a), e.setData({
                        money: o,
                        is_floating_step: a.user.is_floating_step,
                        friendNum: a.user.friendNum,
                        user: a.user
                    }), wx.hideLoading();
                }
            });
        }
        var l = e.data.jump, u = e.data.tiao, p = e.data.adver1, g = e.data.index;
        if (1 == l) if (e.setData({
            jump: !1
        }), u <= 0) {
            var m = {
                deviceProperties: o,
                statAdvertising: {
                    advertisingId: p[g].id,
                    userId: wx.getStorageSync("userId"),
                    appId: p[g].appId,
                    url: p[g].url,
                    isFirst: p[g].isClick
                }
            };
            m = JSON.stringify(m), m = t.base64_encode(m), m = t.xxtea_encrypt(m, s), wx.request({
                url: a + "/interface/sdkData.shtml?requestId=12&a=1&b=0",
                data: m,
                header: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                method: "POST",
                success: function(a) {
                    a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), console.log(a), 
                    e.onShow(), e.adverlist();
                }
            });
        } else wx.showToast({
            title: "您的试玩时间不足20秒，试玩失败",
            icon: "none",
            duration: 2e3
        });
        var f = e.data.adload;
        if (0 == wx.getStorageSync("adloadadload")) return e.setData({
            adload: !1
        }), !1;
        if (1 == f) {
            var x = {
                deviceProperties: o,
                gainUser: {
                    userId: wx.getStorageSync("userId")
                }
            };
            x = JSON.stringify(x), x = t.base64_encode(x), x = t.xxtea_encrypt(x, s), wx.request({
                url: a + "/interface/sdkData.shtml?requestId=26&a=1&b=0",
                data: x,
                header: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                method: "POST",
                success: function(a) {
                    a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), console.log(a), 
                    0 == a.resultCode ? (a = JSON.parse(a.data), e.setData({
                        modal: 8,
                        modal_close_time: 3,
                        stepsstep: a.step,
                        adload: !1,
                        step: e.data.step + a.step
                    }), e.close_time()) : (e.setData({
                        modal: 0,
                        adload: !1,
                        isSister: 1
                    }), wx.showToast({
                        title: "你今天的彩蛋领取次数已经达到上限",
                        icon: "none",
                        duration: 2e3
                    }));
                }
            });
        }
    },
    authstep: function(n) {
        var r = this;
        wx.login({
            success: function(i) {
                wx.getWeRunData({
                    success: function(n) {
                        o.jsonStr = {
                            code: i.code,
                            appId: e.globalData.appId,
                            iv: n.iv,
                            encryptedData: n.encryptedData
                        };
                        var d = {
                            deviceProperties: o,
                            user: {
                                openId: wx.getStorageSync("openId")
                            }
                        };
                        d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, s), wx.request({
                            url: a + "/interface/sdkData.shtml?requestId=13&a=1&b=0",
                            data: d,
                            header: {
                                "Content-Type": "application/json;charset=utf-8"
                            },
                            method: "POST",
                            success: function(e) {
                                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), console.log(e), 
                                e = JSON.parse(e.data).step, wx.setStorageSync("jinri", 1), r.setData({
                                    step_step: e,
                                    jinri: !0
                                }), r.hongbao();
                            }
                        });
                    },
                    fail: function(e) {
                        if (delete o.jsonStr, console.log(e), "getWeRunData:fail auth deny" == e.errMsg) if (r.setData({
                            jintri: !1
                        }), void 0 !== n) wx.showModal({
                            title: "提示",
                            content: "暂时获取不到您的运动步数，是否进入设置页设置更改授权",
                            confirmText: "进入设置",
                            success: function(e) {
                                e.confirm ? wx.openSetting() : e.cancel && console.log("用户点击取消");
                            }
                        }); else {
                            wx.setStorageSync("jinri", 2);
                            var i = wx.getStorageSync("jinritime"), d = wx.getStorageSync("jinriday");
                            if (i = parseFloat(i), "" == (d = parseFloat(d))) {
                                i = Date.parse(new Date());
                                i = parseFloat(timestamp / 1e3), d = (d = new Date()).getDate(), wx.setStorageSync("jinritime", i), 
                                wx.setStorageSync("jinriday", d), wx.setStorageSync("jinrinum", 1), wx.showModal({
                                    title: "提示",
                                    content: "暂时获取不到您的运动步数，是否进入设置页设置更改授权",
                                    confirmText: "进入设置",
                                    success: function(e) {
                                        e.confirm ? wx.openSetting() : e.cancel && console.log("用户点击取消");
                                    }
                                });
                            } else {
                                var c = wx.getStorageSync("jinrinum"), l = Date.parse(new Date());
                                l = parseFloat(l / 1e3);
                                var u = new Date();
                                if ((u = u.getDate()) == d) {
                                    if (l -= 3600, i <= l) {
                                        c = wx.getStorageSync("jinrinum");
                                        (c = parseFloat(c)) < 4 && (c++, wx.setStorageSync("jinrinum", c), wx.showModal({
                                            title: "提示",
                                            content: "暂时获取不到您的运动步数，是否进入设置页设置更改授权",
                                            confirmText: "进入设置",
                                            success: function(e) {
                                                e.confirm ? wx.openSetting() : e.cancel && console.log("用户点击取消");
                                            }
                                        }));
                                    }
                                } else {
                                    i = Date.parse(new Date());
                                    i = parseFloat(i / 1e3), d = (d = new Date()).getDate(), wx.setStorageSync("jinritime", i), 
                                    wx.setStorageSync("jinriday", d), wx.setStorageSync("jinrinum", 1), wx.showModal({
                                        title: "提示",
                                        content: "暂时获取不到您的运动步数，是否进入设置页设置更改授权",
                                        confirmText: "进入设置",
                                        success: function(e) {
                                            e.confirm ? wx.openSetting() : e.cancel && console.log("用户点击取消");
                                        }
                                    });
                                }
                            }
                        } else wx.setStorageSync("jinri", 3), r.setData({
                            jinri: !0
                        });
                        var p = {
                            deviceProperties: o,
                            user: {
                                openId: wx.getStorageSync("openId")
                            }
                        };
                        console.log(o), p = JSON.stringify(p), p = t.base64_encode(p), p = t.xxtea_encrypt(p, s), 
                        wx.request({
                            url: a + "/interface/sdkData.shtml?requestId=13&a=1&b=0",
                            data: p,
                            header: {
                                "Content-Type": "application/json;charset=utf-8"
                            },
                            method: "POST",
                            success: function(e) {
                                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data).step, 
                                wx.setStorageSync("jinri", !1), r.setData({
                                    step_step: e,
                                    jinri: !1
                                }), r.hongbao();
                            }
                        });
                    }
                });
            }
        });
    },
    floatstep: function() {
        var e = this, n = {
            deviceProperties: o,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        n = JSON.stringify(n), n = t.base64_encode(n), n = t.xxtea_encrypt(n, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=1&a=1&b=0",
            data: n,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                if (a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), console.log(a), 
                0 == a.resultCode) {
                    a = JSON.parse(a.data).step, e.setData({
                        is_floating_step: 0,
                        step_step: a,
                        modal_close_time: 3,
                        modal: 2
                    }), e.close_time();
                    var o = wx.getStorageSync("closenum");
                    o = parseFloat(o), o++, wx.setStorageSync("closenum", o);
                } else e.setData({
                    is_floating_step: 0
                }), wx.showToast({
                    title: "当前领取时间未到",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    floatsteps: function(e) {
        var n = this, r = {
            deviceProperties: o,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        r = JSON.stringify(r), r = t.base64_encode(r), r = t.xxtea_encrypt(r, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=17&a=1&b=0",
            data: r,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                if (e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), console.log(e), 
                0 == e.resultCode) {
                    e = JSON.parse(e.data), n.setData({
                        is_floating_step_200: 0,
                        step_step: e.step,
                        modal_close_time: 3,
                        modal: 5
                    }), n.close_time();
                    var a = wx.getStorageSync("closenum");
                    a = parseFloat(a), a++, wx.setStorageSync("closenum", a), n.receenergys(900);
                } else {
                    e = JSON.parse(e.data);
                    var o = parseInt(e.nowDate - e.date);
                    o = 900 - o, n.receenergys(o), n.setData({
                        is_floating_step_200: 0,
                        modal: 6
                    });
                }
            }
        });
    },
    floathb: function() {
        var e = this, n = {
            deviceProperties: o,
            gainUser: {
                userId: wx.getStorageSync("userId"),
                gainType: 2
            }
        };
        n = JSON.stringify(n), n = t.base64_encode(n), n = t.xxtea_encrypt(n, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=4&a=1&b=0",
            data: n,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                if (a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), console.log(a), 
                0 == a.resultCode) {
                    a = JSON.parse(a.data);
                    var o = parseInt(a.money / 10);
                    o = (o / 1e3).toFixed(3);
                    var n = e.data.money;
                    n = parseFloat(o - n).toFixed(3), e.setData({
                        money: o,
                        is_floating_coin: 0,
                        modal: 13,
                        modal_close_time: 3,
                        moneys: n
                    }), e.close_time(), e.receenergy(7200);
                } else {
                    a = JSON.parse(a.data);
                    var r = parseInt(a.nowDate - a.date);
                    r = 7200 - r, e.receenergy(r), e.setData({
                        is_floating_coin: 0,
                        modal: 7
                    });
                }
            }
        });
    },
    hongbao: function() {
        var e = this, n = e.data.step_step, r = {
            deviceProperties: o,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        r = JSON.stringify(r), r = t.base64_encode(r), r = t.xxtea_encrypt(r, s);
        var i = 0;
        wx.request({
            url: a + "/interface/sdkData.shtml?requestId=14&a=1&b=0",
            data: r,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), a = JSON.parse(a.data).stepAwardList;
                for (var o = 0; o < a.length; o++) a[o].money = parseInt(a[o].money / 10), a[o].money = (a[o].money / 1e3).toFixed(3), 
                n > a[o].step && 0 == a[o].isClick && i++;
                e.setData({
                    stepAwardList: a,
                    num: i
                });
            }
        });
    },
    friends: function() {
        var e = this, n = e.data.friendNum;
        if (0 == n) return wx.showToast({
            title: "当前没有气泡红包可领取",
            icon: "none",
            duration: 2e3
        }), !1;
        var r = {
            deviceProperties: o,
            gainUser: {
                userId: wx.getStorageSync("userId"),
                gainType: 3
            }
        };
        r = JSON.stringify(r), r = t.base64_encode(r), r = t.xxtea_encrypt(r, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=8&a=1&b=0",
            data: r,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), console.log(a), 
                a = JSON.parse(a.data);
                var o = parseFloat(a.money / 1e4).toFixed(4), r = e.data.money;
                r = parseFloat(o - r).toFixed(4), e.setData({
                    modal: 1,
                    modal_close_time: 3,
                    moneys: r,
                    money: o,
                    friendNum: n - 1
                }), e.close_time();
            }
        });
    },
    stepaward: function(e) {
        var n = this, r = e.currentTarget.dataset.index, i = n.data.stepAwardList, d = {
            deviceProperties: o,
            gainUser: {
                userId: wx.getStorageSync("userId"),
                gainType: 3
            },
            stepAward: {
                id: i[r].id
            }
        };
        d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=2&a=1&b=0",
            data: d,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data), 
                i[r].isClick = 0;
                var a = parseFloat(e.money / 1e4).toFixed(4), o = n.data.money;
                o = parseFloat(a - o).toFixed(4), n.setData({
                    modal: 1,
                    modal_close_time: 3,
                    money: a,
                    moneys: o,
                    stepAwardList: i
                }), n.close_time();
            }
        });
    },
    tousu: function() {
        wx.navigateTo({
            url: "../complaints/complaints"
        });
    },
    userlist: function() {
        var e = this, n = {
            deviceProperties: o,
            user: {
                parentUserId: wx.getStorageSync("userId")
            }
        };
        n = JSON.stringify(n), n = t.base64_encode(n), n = t.xxtea_encrypt(n, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=9&a=1&b=0",
            data: n,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), a = JSON.parse(a.data).userList, 
                e.setData({
                    userList: a
                });
            }
        });
    },
    adverlist: function() {
        var e = this, n = {
            deviceProperties: o,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        n = JSON.stringify(n), n = t.base64_encode(n), n = t.xxtea_encrypt(n, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=10&a=1&b=0",
            data: n,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), a = JSON.parse(a.data).advertisingList, 
                console.log(a);
                for (var o = [], n = [], r = [], i = [], d = [], c = [], l = [], u = [], p = [], g = [], m = [], f = [], x = 0; x < a.length; x++) 57 == a[x].advertisingType && 1 == a[x].isClick && o.push(a[x]), 
                97 == a[x].advertisingType && n.push(a[x]), 98 == a[x].advertisingType && r.push(a[x]), 
                1e3 == a[x].advertisingType && 1 == a[x].isClick && i.push(a[x]), 3e3 == a[x].advertisingType && 1 == a[x].isClick && c.push(a[x]), 
                1200 == a[x].advertisingType && d.push(a[x]), 101 == a[x].advertisingType && 1 == a[x].isClick && l.push(a[x]), 
                102 == a[x].advertisingType && 1 == a[x].isClick && u.push(a[x]), 103 == a[x].advertisingType && 1 == a[x].isClick && p.push(a[x]), 
                104 == a[x].advertisingType && 1 == a[x].isClick && g.push(a[x]), 105 == a[x].advertisingType && 1 == a[x].isClick && m.push(a[x]), 
                106 == a[x].advertisingType && 1 == a[x].isClick && f.push(a[x]);
                if (d.length > 0) {
                    var y = null;
                    wx.createInterstitialAd && (y = wx.createInterstitialAd({
                        adUnitId: d[0].advertisingTitle
                    })), y.onError(function(e) {});
                    setTimeout(function() {
                        y && y.show().catch(function(e) {});
                    }, 15e3);
                }
                if (i.length > 0) {
                    var S = null;
                    wx.createRewardedVideoAd ? (S = wx.createRewardedVideoAd({
                        adUnitId: i[0].advertisingTitle
                    }), e.setData({
                        videoAd: S,
                        videos: i
                    }), S.load().catch(function(t) {
                        console.log("123"), e.setData({
                            videos: []
                        });
                    }), S.onError(function(t) {
                        return function(t) {
                            e.setData({
                                videos: []
                            });
                        };
                    })) : wx.showToast({
                        title: "当前微信版本过低，无法观看视频获得奖励，请升级微信",
                        icon: "none",
                        duration: 2e3
                    });
                } else e.setData({
                    videos: []
                });
                o.length > 5 && (o = o.slice(0, 5)), e.setData({
                    adver1: o,
                    advers1: n,
                    advers2: r,
                    videoadver: c,
                    adver101: l,
                    adver102: u,
                    adver103: p,
                    adver104: g,
                    adver105: m,
                    adver106: f
                });
            }
        });
        r = {
            deviceProperties: o,
            user: {
                userId: wx.getStorageSync("userId")
            },
            advertising: {
                advertisingType: 200
            }
        };
        r = JSON.stringify(r), r = t.base64_encode(r), r = t.xxtea_encrypt(r, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=39&a=1&b=0",
            data: r,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), a = JSON.parse(a.data), 
                console.log(a), e.setData({
                    advertisinglist: a.advertisingList
                });
            }
        });
        var r = {
            deviceProperties: o,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        r = JSON.stringify(r), r = t.base64_encode(r), r = t.xxtea_encrypt(r, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=42&a=1&b=0",
            data: r,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), console.log(a);
                var o = !0;
                if (0 == a.resultCode) {
                    a = JSON.parse(a.data), console.log(a);
                    var n = e.data.list;
                    console.log(a);
                    for (var r = 0; r < n.length; r++) {
                        n[r].box = !1;
                        for (var i = 0; i < a.boxList.length; i++) a.boxList[i] = parseInt(a.boxList[i]), 
                        r == a.boxList[i] && (n[r].box = !0);
                    }
                    e.setData({
                        boxList: a.boxList,
                        list: n
                    });
                } else o = !1, e.setData({
                    boxList: []
                });
                e.setData({
                    boxshow: o
                });
            }
        });
    },
    navigate: function(e) {
        var t = this, a = t.data.adver1, s = e.currentTarget.dataset.index;
        t.setData({
            jump: !0,
            index: s
        }), wx.navigateToMiniProgram({
            appId: a[s].appId,
            path: a[s].url,
            extraData: {
                foo: "bar"
            },
            envVersion: "release",
            success: function(e) {}
        });
    },
    onHide: function() {
        var e = this;
        if (e.setData({
            interout: !1
        }), clearInterval(r), 1 == e.data.jump) var t = 20, a = setInterval(function() {
            t--, e.setData({
                tiao: t
            }), console.log(t), 0 == t && clearInterval(a), 0 == e.data.jump && clearInterval(a);
        }, 1e3);
    },
    headleft: function() {
        wx.switchTab({
            url: "../my/my"
        });
    },
    close: function() {
        var e = this;
        e.setData({
            adload: !1
        });
        var t = e.data.close_rate, a = Math.floor(10 * Math.random()), s = e.data.delayMoney;
        s = parseFloat(s);
        var o = e.data.isgundong, n = e.data.money;
        if (n = parseFloat(n), 1 == o) e.setData({
            modal: 0
        }); else if (a > t) e.setData({
            modal: 0
        }); else if (n > s) setTimeout(function() {
            e.setData({
                modal: 0
            });
        }, 1e3); else e.setData({
            modal: 0
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
    stepaward1: function() {
        this.setData({
            modal: 4
        });
    },
    stepaward2: function() {
        this.setData({
            modal: 3
        });
    },
    receenergy: function(e) {
        var t = this, a = setInterval(function() {
            e--;
            var s = parseInt(e / 3600), o = parseInt(e / 60);
            o = parseInt(o % 60);
            var n = parseInt(e % 60);
            s < 10 && (s = "0" + s), o < 10 && (o = "0" + o), n < 10 && (n = "0" + n), t.setData({
                hours: s,
                minus: o,
                seconds: n
            }), 0 == t.data.interout && clearInterval(a), e <= 0 && (clearInterval(a), t.setData({
                active: !0
            }));
        }, 1e3);
    },
    receenergys: function(e) {
        var t = this, a = setInterval(function() {
            e--;
            var s = parseInt(e / 3600), o = parseInt(e / 60);
            o = parseInt(o % 60);
            var n = parseInt(e % 60);
            s < 10 && (s = "0" + s), o < 10 && (o = "0" + o), n < 10 && (n = "0" + n), t.setData({
                hourss: s,
                minuss: o,
                secondss: n
            }), 0 == t.data.interout && clearInterval(a), e <= 0 && (clearInterval(a), t.setData({
                is_floating_step_200: 1
            }));
        }, 1e3);
    },
    savefriendstep: function(e) {
        var n = {
            deviceProperties: o,
            user: {
                parentUserId: e,
                userId: wx.getStorageSync("userId")
            }
        };
        n = JSON.stringify(n), n = t.base64_encode(n), n = t.xxtea_encrypt(n, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=21&a=1&b=0",
            data: n,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), console.log(e);
            }
        });
    },
    video: function() {
        var e = this, n = e.data.videos;
        if (0 !== e.data.timeInt) return wx.showToast({
            title: "当前时间不可领取",
            icon: "none",
            duration: 2e3
        }), !1;
        var r = e.data.videoAd;
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
        }), r.onClose(function(i) {
            if (1 == i.isEnded) {
                console.log(n);
                var d = {
                    deviceProperties: o,
                    statAdvertising: {
                        advertisingId: n[0].id,
                        userId: wx.getStorageSync("userId"),
                        appId: n[0].appId,
                        url: n[0].url,
                        isFirst: n[0].isClick
                    }
                };
                d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, s), wx.request({
                    url: a + "/interface/sdkData.shtml?requestId=25&a=1&b=0",
                    data: d,
                    header: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    method: "POST",
                    success: function(a) {
                        if (a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), console.log(a), 
                        0 == a.resultCode) {
                            (a = JSON.parse(a.data)).step = parseInt(a.step);
                            var o = wx.getStorageSync("closenum");
                            o = parseFloat(o), o++, wx.setStorageSync("closenum", o), e.setData({
                                modal: 8,
                                modal_close_time: 3,
                                stepsstep: a.step,
                                step_step: e.data.step_step + a.step,
                                videor: !0
                            }), e.close_time();
                            var n = e.data.money;
                            n = parseFloat(n);
                            var r = e.data.endTime;
                            if (r = parseFloat(r), n > 10) var i = r, d = setInterval(function() {
                                i--, e.setData({
                                    timeInt: i
                                }), 0 == i && clearInterval(d);
                            }, 1e3); else e.onShow();
                        } else wx.showToast({
                            title: "今日观看视频获得奖励次数已达到上限！",
                            icon: "none",
                            duration: 2e3
                        }), e.setData({
                            videos: []
                        });
                    }
                });
            } else e.setData({
                modal: 9
            });
            r.offLoad(), r.offError(), r.offClose();
        });
    },
    submit: function(e) {
        var n = this;
        if (n.authstep(), 1 == n.data.xinyonghuswitc) {
            o.pushType = 1, o.jsonStr = e.detail.formId;
            var r = {
                deviceProperties: o,
                user: {
                    openId: wx.getStorageSync("openId")
                }
            };
            r = JSON.stringify(r), r = t.base64_encode(r), r = t.xxtea_encrypt(r, s), wx.request({
                url: a + "/interface/sdkData.shtml?requestId=20&a=1&b=0",
                data: r,
                header: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                method: "POST",
                success: function(e) {
                    e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), console.log(e), 
                    n.setData({
                        modal: 0
                    });
                }
            });
        } else n.setData({
            modal: 0
        });
    },
    btn: function(e) {
        var t = this.data.list, a = e.currentTarget.dataset.index;
        wx.request({
            url: "https://pdd.szlzyd.com/generateGoodsPromotionUrl",
            data: {
                goodsId: t[a].goods_id,
                pid: "8672284_69814181"
            },
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                var t = e.data.goods_promotion_url_generate_response.goods_promotion_url_list[0].we_app_info;
                wx.navigateToMiniProgram({
                    appId: t.app_id,
                    path: t.page_path,
                    extraData: {
                        foo: "bar"
                    },
                    envVersion: "release",
                    success: function(e) {}
                });
            }
        });
    },
    candan: function() {
        var e = this, t = Date.parse(new Date());
        t = parseFloat(t / 1e3), wx.setStorageSync("videotimes", t), e.setData({
            modal: 12
        });
        var a = e.data.sisterTime, s = setInterval(function() {
            a--, e.setData({
                timeint: a
            }), a <= 0 && clearInterval(s);
        }, 1e3);
    },
    adload: function() {
        this.setData({
            adload: !0
        }), wx.setStorageSync("adloadadload", !0);
    },
    hbtuisong: function(e) {
        var n = this;
        if (1 == n.data.kaihongbaosw) {
            var r = new Date();
            r = r.getDate(), r = parseFloat(r);
            var i = wx.getStorageSync("newday");
            if (r !== i) {
                o.pushType = 2, o.jsonStr = e.detail.formId;
                var d = {
                    deviceProperties: o,
                    user: {
                        openId: wx.getStorageSync("openId")
                    }
                };
                d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, s), wx.request({
                    url: a + "/interface/sdkData.shtml?requestId=20&a=1&b=0",
                    data: d,
                    header: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    method: "POST",
                    success: function(e) {
                        e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), console.log(e), 
                        n.setData({
                            modal: 0
                        }), wx.setStorageSync("newday", r);
                    }
                });
            } else n.setData({
                modal: 0
            });
        } else n.setData({
            modal: 0
        });
    },
    switch1Change: function() {
        var e = this, t = e.data.xinyonghuswitc;
        console.log(t), 1 == t ? e.setData({
            xinyonghuswitc: !1
        }) : e.setData({
            xinyonghuswitc: !0
        });
    },
    switch1Changes: function() {
        var e = this, t = e.data.kaihongbaosw;
        console.log(t), 1 == t ? e.setData({
            kaihongbaosw: !1
        }) : e.setData({
            kaihongbaosw: !0
        });
    },
    qian: function() {
        this.setData({
            modal: 15
        });
    },
    contact: function(e) {
        var n = this;
        if (console.log(e), "" !== e.detail.path) {
            var r = {
                deviceProperties: o,
                gainUser: {
                    userId: wx.getStorageSync("userId")
                }
            };
            r = JSON.stringify(r), r = t.base64_encode(r), r = t.xxtea_encrypt(r, s), wx.request({
                url: a + "/interface/sdkData.shtml?requestId=27&a=1&b=0",
                data: r,
                header: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                method: "POST",
                success: function(e) {
                    e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), console.log(e), 
                    0 == e.resultCode ? (e = JSON.parse(e.data), n.setData({
                        modal: 8,
                        modal_close_time: 3,
                        stepsstep: e.step
                    }), n.close_time()) : -6 == e.resultCode ? n.setData({
                        modal: 15
                    }) : wx.showToast({
                        title: "签到失败",
                        icon: "none",
                        duration: 2e3
                    }), n.setData({
                        qiancontact: !1
                    });
                    var a = new Date().getDate();
                    wx.setStorageSync("qiancontacts", a);
                }
            });
        }
    },
    sixfold: function() {
        var e = this, n = e.data.videos, r = e.data.videoAd;
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
        }), r.onClose(function(i) {
            if (1 == i.isEnded) {
                console.log(n);
                var d = {
                    deviceProperties: o,
                    gainUser: {
                        userId: wx.getStorageSync("userId")
                    }
                };
                d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, s), wx.request({
                    url: a + "/interface/sdkData.shtml?requestId=28&a=1&b=0",
                    data: d,
                    header: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    method: "POST",
                    success: function(a) {
                        if (a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), console.log(a), 
                        0 == a.resultCode) {
                            a = JSON.parse(a.data);
                            var o = e.data.step_step;
                            o = parseInt(o), a.step = parseInt(a.step), console.log(a.step), console.log(o), 
                            o += a.step, console.log(o), e.setData({
                                modal: 2,
                                modal_close_time: 3,
                                step_step: o
                            }), e.close_time();
                        } else wx.showToast({
                            title: "今日观看视频获得奖励次数已达到上限！",
                            icon: "none",
                            duration: 2e3
                        }), e.setData({
                            modal: 0
                        });
                    }
                });
            } else e.setData({
                modal: 9
            });
            r.offLoad(), r.offError(), r.offClose();
        });
    },
    guize: function() {
        wx.navigateTo({
            url: "../guize/guize"
        });
    },
    neitiao: function(e) {
        var t = this, a = e.currentTarget.dataset.url;
        console.log(a);
        var s = t.data.user;
        "pages/punck/punck" == a ? wx.switchTab({
            url: "../../" + a
        }) : "pages/walk/walk" == a ? wx.switchTab({
            url: "../../" + a
        }) : "pages/balloon/balloon" == a ? wx.navigateTo({
            url: "../balloon/balloon?balloonNum=" + s.balloonNum
        }) : wx.navigateTo({
            url: "../../" + a
        });
    },
    waitiao: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.appid, a = e.currentTarget.dataset.url;
        wx.navigateToMiniProgram({
            appId: t,
            path: a,
            extraData: {
                foo: "bar"
            },
            envVersion: "release",
            success: function(e) {}
        });
    },
    mation: function() {},
    internal: function(e) {
        var n = this, r = n.data.advertisinglist;
        console.log(r);
        var i = e.currentTarget.dataset.index, d = {
            deviceProperties: o,
            statAdvertising: {
                advertisingId: r[i].id,
                userId: wx.getStorageSync("userId"),
                url: r[i].url,
                isFirst: r[i].isClick
            }
        };
        d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=40&a=1&b=0",
            data: d,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                if (e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), console.log(e), 
                0 == e.resultCode) {
                    e = JSON.parse(e.data);
                    var a = wx.createAnimation({
                        duration: 1e3,
                        timingFunction: "linear"
                    });
                    a.translateX(-100).translateY(-20).opacity(0).step(), n.setData({
                        animationData: a.export()
                    }), setTimeout(function() {
                        var t = n.data.step_step;
                        if (t = parseFloat(t), e.step = parseFloat(e.step), t += e.step, n.setData({
                            step_step: t
                        }), "pages/punck/punck" == r[i].url) wx.switchTab({
                            url: "../../" + r[i].url
                        }); else if ("pages/walk/punck" == r[i].url) wx.switchTab({
                            url: "../../" + r[i].url
                        }); else if ("pages/balloon/balloon" == r[i].url) {
                            var a = n.data.user;
                            wx.navigateTo({
                                url: "../balloon/balloon?balloonNum=" + a.balloonNum
                            });
                        } else "pages/draw/draw" == r[i].url ? wx.switchTab({
                            url: "../../" + r[i].url
                        }) : wx.navigateTo({
                            url: "../../" + r[i].url
                        });
                    }, 1e3), setTimeout(function() {
                        var e = wx.createAnimation({
                            duration: 1e3,
                            timingFunction: "step-start"
                        });
                        e.translateX(0).translateY(0).opacity(1).step(), n.setData({
                            animationData: e.export()
                        });
                    }, 4e3);
                } else wx.showToast({
                    title: "今日已领取，请明日再来",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    onReachBottom: function() {
        var e = this, t = e.data.pageing;
        t++;
        var a = e.data.list;
        e.data.type;
        wx.request({
            url: "https://pdd.szlzyd.com/searchGoods",
            data: {
                type: 0,
                pid: "8672284_69814181",
                page: t
            },
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(s) {
                for (var o = s.data.goods_search_response.goods_list, n = 0; n < o.length; n++) {
                    o[n].min_group_price = o[n].min_group_price - o[n].coupon_discount, o[n].min_group_price = parseFloat(o[n].min_group_price / 100).toFixed(2), 
                    o[n].coupon_discount = parseFloat(o[n].coupon_discount / 100).toFixed(2);
                    var r = n + a.length - 1;
                    r >= 13 ? (r -= 13, o[n].adver = r % 8 == 0) : (r -= 2, o[n].adver = 0 == r || r % 6 == 0);
                }
                o = a.concat(o);
                for (var i = e.data.boxList, n = 0; n < o.length; n++) {
                    o[n].box = !1;
                    for (var d = 0; d < i.length; d++) i[d] = parseInt(i[d]), n == i[d] && (o[n].box = !0);
                }
                console.log(o), e.setData({
                    list: o,
                    pageing: t
                });
            }
        });
    },
    box_shop: function(e) {
        console.log(e);
        var n = this, r = o, i = n.data.boxList;
        r.index = e.currentTarget.dataset.index;
        var d = {
            deviceProperties: r,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        console.log(d), d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, s), 
        wx.request({
            url: a + "/interface/sdkData.shtml?requestId=41&a=1&b=0",
            data: d,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                if (a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), console.log(a), 
                0 == a.resultCode) {
                    a = JSON.parse(a.data);
                    for (var o = [], r = 0; r < i.length; r++) i[r] !== e.currentTarget.dataset.index && o.push(i[r]);
                    var d = n.data.list;
                    i = o;
                    for (r = 0; r < d.length; r++) {
                        d[r].box = !1;
                        for (var c = 0; c < i.length; c++) i[c] = parseInt(i[c]), r == i[c] && (console.log("1234567"), 
                        d[r].box = !0);
                    }
                    var l = n.data.step_step;
                    l = parseInt(l), l += a.step, n.setData({
                        step_step: l,
                        modal: 14,
                        modalstep: a.step,
                        boxList: o,
                        list: d
                    }), 0 == i.length && n.setData({
                        boxshow: !1
                    });
                } else wx.showToast({
                    title: "这是一个假宝箱，请继续寻找其他宝箱",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    walk: function() {
        wx.switchTab({
            url: "../walk/walk"
        });
    },
    onPageScroll: function(e) {
        var t = this;
        e.scrollTop > 1260 ? t.setData({
            top: !0
        }) : t.setData({
            top: !1
        });
    },
    top: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    },
    authsteps: function() {
        wx.openSetting();
    },
    close_time: function() {
        var e = this, t = e.data.modal_close_time;
        r = setInterval(function() {
            --t < 0 ? clearInterval(r) : e.setData({
                modal_close_time: t
            });
        }, 1e3);
    }
});