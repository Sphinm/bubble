var t = getApp(), a = require("../../7F36CF766DA41FDF1950A771F63D15A6.js"), e = !0, i = null;

Component({
    properties: {
        redStatus: {
            type: Number,
            value: 1
        },
        redMoney: {
            type: Number,
            value: 0
        },
        four_status: {
            type: Boolean,
            value: ""
        }
    },
    data: {
        firstTixian: !1,
        tixianPop: !1,
        runAuthorize: !1,
        sevenAd: null,
        bagList: [ {
            status: 2
        }, {
            status: 2
        }, {
            status: 2
        }, {
            status: 2
        } ],
        gdtStatus: !1,
        adinfo: {
            all: !0
        }
    },
    attached: function() {
        i = this, this.getapp(), this.setData({
            isAuthorize: t.globalData.isAuthorize,
            ok: t.globalData.ok
        }), 3 == this.data.redStatus ? (this.getInfo(), this.fourRed(), this.requestAd()) : t.adFlag(this, 80, function() {
            i.showLuoji();
        });
    },
    pageLifetimes: {
        show: function() {
            if (i = this, this.data.gdtStatus && this.adFunc(), 3 == this.data.redStatus) {
                if (0 == t.globalData.tryStart) this.requestAd(); else {
                    var a = t.globalData.tryAd;
                    this.setData({
                        tryAd: a
                    }), 31 == a.type && t.tryStatus({
                        self: i,
                        sucCb: function() {
                            i.fourRed(), i.triggerEvent("indexAd"), wx.showModal({
                                title: "试玩成功",
                                content: "已解锁红包，去打开",
                                showCancel: !1,
                                confirmText: "知道了",
                                confirmColor: "#ef2d2d"
                            });
                        }
                    });
                }
                i.getInfo();
            }
        }
    },
    methods: {
        getapp: function() {
            t.httpsGet({
                url: t.getData("/getapp"),
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function(t) {
                    200 == t.data.code && i.setData({
                        appAd: t.data.data
                    });
                }
            });
        },
        adFunc: function() {
            if (80 == this.data.position) this.chaiFree(); else if (340 != this.data.position) return;
            this.setData({
                is_video: !1,
                is_banner: !1,
                is_Ad: !1,
                is_share: !1,
                gdtStatus: !1,
                position: 0
            });
        },
        createpacket: function() {
            t.httpsPost({
                url: t.getData("/createpacket"),
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function(t) {
                    200 == t.data.code && (wx.showToast({
                        title: "解锁成功"
                    }), i.fourRed());
                }
            });
        },
        bannerErr: function() {
            t.bannerErr(this, "adunit-f527d40e02df45e6");
        },
        gdtLoad: function() {
            this.setData({
                gdtStatus: !0
            });
        },
        watchVideo: function() {
            var a = this;
            t.watchVideo(function() {
                a.adFunc();
            });
        },
        show_status: function() {
            this.triggerEvent("first");
        },
        chai_four: function() {
            this.triggerEvent("four");
        },
        goTixianPage: function() {
            wx.navigateTo({
                url: "/pages/myMoney/myMoney",
                success: function() {
                    i.hidddenTixianPop();
                }
            });
        },
        modelSubmit: function(a) {
            t.modelSubmit(a);
        },
        getInfo: function() {
            t.getInfo(function(a) {
                t.globalData.firstTixian && i.setData({
                    tixianPop: !0
                }), i.setData({
                    userInfo: a,
                    firstTixian: t.globalData.firstTixian,
                    otherTixian: t.globalData.otherTixian
                });
            });
        },
        fourRed: function() {
            t.httpsGet({
                url: t.getData("/packetlog"),
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function(t) {
                    if (200 == t.data.code && t.data.data) {
                        var a = i.data.bagList, e = t.data.data;
                        for (var s in e) {
                            if (s >= 4) break;
                            a[s] = e[s];
                        }
                        i.setData({
                            bagList: a
                        });
                    } else console.log("暂无已解锁红包/请求红包失败");
                }
            });
        },
        requestAd: function() {
            var t = this;
            a([ 31 ], function(a) {
                if (a) {
                    var e = a ? a.type_31 : null;
                    t.setData({
                        sevenAd: e
                    });
                } else t.setData({
                    sevenAd: null
                });
            });
        },
        hidddenTixianPop: function() {
            this.setData({
                tixianPop: !1
            });
        },
        hiddenAll: function() {
            var a = this, e = 600;
            t.globalData.ok || (e = 0), setTimeout(function() {
                a.setData({
                    is_video: !1,
                    is_banner: !1,
                    is_Ad: !1,
                    is_share: !1
                });
            }, e), this.triggerEvent("hidden");
        },
        tryFourRedAd: function(a) {
            var e = this.data.sevenAd, i = a.currentTarget.dataset.index;
            t.tryPlay(e, i);
        },
        chaiFree: function() {
            wx.getSetting({
                success: function(t) {
                    t.authSetting["scope.werun"] ? i.triggerEvent("chai") : i.setData({
                        runAuthorize: !0
                    });
                }
            });
        },
        openfour: function() {
            this.setData({
                redStatus: 3,
                adinfo: {
                    all: !1
                }
            }), i.requestAd(), i.fourRed(), i.getInfo();
        },
        openbag: function(a) {
            if (e) {
                e = !1;
                var s = a.currentTarget.dataset.index, n = a.currentTarget.dataset.id;
                t.httpsGet({
                    url: t.getData("/getpacket"),
                    data: {
                        user_id: wx.getStorageSync("userId"),
                        packet_id: n
                    },
                    success: function(t) {
                        i.triggerEvent("getRewards"), i.getInfo();
                        var a = i.data.bagList;
                        a[s].status = 1, a[s].amount = t.data.data.amount, setTimeout(function() {
                            e = !0;
                        }, 500), i.setData({
                            bagList: a
                        });
                    }
                });
            }
        },
        chai: function() {
            this.setData({
                runAuthorize: !1
            }), this.triggerEvent("chai");
        },
        getUser: function(a) {
            a.currentTarget.dataset.url;
            t.getUser(a, function(a) {
                t.globalData.isAuthorize = !0, i.setData({
                    isAuthorize: !0
                }), i.triggerEvent("isTrue"), i.chaiFree();
            }, function() {
                i.setData({
                    redStatus: 0
                });
            });
        }
    }
});