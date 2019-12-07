var t, e = require("../../../utils/activity.js"), a = require("../../../utils/event.js"), i = require("../../../utils/wglogin.js"), n = require("../../index/js/share.js"), r = require("../../../utils/room.js"), s = require("../../../utils/request.js"), c = require("../../../utils/urls.js"), o = require("../../../utils/urlGL.js"), d = require("../../../utils/util.js"), u = o.GETREWARD(), _ = null, v = null, l = getApp(), T = {}, g = null;

Page({
    data: {
        nullNoviceTask: !1,
        nullCommunityTask: !1,
        showGoApp: !1,
        activeTab: 1,
        list: [],
        taskList: [],
        award_value: "",
        subsidyShareContent: "每天登录就送3000步,步数免费换礼品",
        subsidyShareImageurl: "https://rr.bushubao.cn//step_trade/share_pic/midea_vivo_phone.jpg",
        showAddApplet: !1,
        showAddDesktop: !1,
        noAd: !1,
        videoAdTime: 0,
        frequency: 0,
        taskTimes: 0,
        countFlage: !1
    },
    onLoad: function(t) {
        var e = this;
        n.SHAREINFO(function(t) {
            "OK" == t.code && (e.data.subsidyShareContent = t.data.result.content, e.data.subsidyShareImageurl = t.data.result.url);
        }), e.loadBannerAd();
    },
    onShow: function() {
        var t = this, e = Date.parse(new Date());
        t.getRewardListData(t.data.activeTab);
        var i = "active_time", n = wx.getStorageSync(i), r = e - n.timestamp, s = n.stateTimeLong;
        if (0 != s && void 0 != s && "undefined" != s || (s = 35), n) if (r / 1e3 < s) wx.showModal({
            title: "温馨提示",
            content: "需要超过" + s + "秒才可以获取奖励哦",
            showCancel: !1
        }), wx.removeStorageSync(i); else {
            var c = {};
            c.advertId = n.advertId, t.uploadReward(c, n.stepValue), wx.removeStorageSync(i);
            var o = {
                event: a.EVENT_LOG_ADVERTLISTREWARDCLICK,
                advertId: n.appid,
                activity_type: "done"
            };
            a.EVENT_LOG(o, function(t) {});
        }
    },
    getReward: function(t) {
        var e = {};
        e.taskId = t.currentTarget.dataset.taskid, e.systemName = l.globalData.systemName;
        var i = t.currentTarget.dataset.stepvalue, n = this;
        s.POST({
            url: c.API_FINISHTASKB,
            params: e,
            success: function(t) {
                if (console.log(t), i && "OK" == t.code) {
                    var e = "已获得" + i + "步奖励";
                    wx.showModal({
                        title: "温馨提示",
                        content: e,
                        showCancel: !1
                    });
                }
                n.getRewardListData(n.data.activeTab);
            },
            fail: function(t) {}
        });
        var r = {
            event: a.EVENT_LOG_ADVERTLISTREWARDCLICK,
            advertId: t.currentTarget.dataset.taskId,
            activity_type: "完成任务领取奖励"
        };
        a.EVENT_LOG(r, function(t) {});
    },
    getRewardListData: function(t) {
        wx.showLoading({
            title: "正在加载..."
        });
        var a = this;
        e.GETREWARDLISTB({
            type: t || 1
        }, function(t) {
            if (wx.hideLoading(), "OK" == t.code) {
                t.data.result.noviceTask && t.data.result.noviceTask.length > 0 && (console.log(t), 
                a.setData({
                    nullNoviceTask: !0
                })), t.data.result.communityTask && t.data.result.communityTask.length > 0 && a.setData({
                    nullCommunityTask: !0
                }), a.setData({
                    taskList: t.data.result,
                    taskTimes: t.data.result.time,
                    frequency: t.data.result.number
                }), t.data.result.length > 0 && a.setData({
                    award_value: t.data.configValue
                });
                var e = Date.parse(new Date());
                wx.getStorage({
                    key: "taskData",
                    success: function(t) {
                        console.log(t.data), (e - t.data.timestamp) / 1e3 > a.data.taskTimes || !1 === t.data.countFlage ? a.setData({
                            videoAdTime: 0
                        }) : (a.setData({
                            videoAdTime: a.data.taskTimes - (e - t.data.timestamp) / 1e3
                        }), a.countDown(a.data.taskTimes - (e - t.data.timestamp) / 1e3));
                    }
                }), wx.getSystemInfo({
                    success: function(t) {
                        var e = t.SDKVersion.replace(/\./g, "");
                        parseInt(e) > 250 && a.loadAdvedio();
                    }
                });
            }
            wx.stopPullDownRefresh();
        }, function(t) {
            wx.stopPullDownRefresh();
        });
    },
    uploadReward: function(t, a) {
        var i = this;
        e.UPLOADREWARD(t, function(t) {
            if (a) {
                var e = "已获得" + a + "步奖励";
                wx.showModal({
                    title: "温馨提示",
                    content: e,
                    showCancel: !1
                });
            }
            i.getRewardListData(i.data.activeTab);
        }, function(t) {});
    },
    clickCell: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.type.advertId, i = t.currentTarget.dataset.type.stateTimeLong, n = t.currentTarget.dataset.type.advertAppId, r = t.currentTarget.dataset.type.stepValue;
        t.currentTarget.dataset.type.advertLink;
        if ("2" == t.currentTarget.dataset.type.got) {
            var s = Date.parse(new Date()), c = {};
            c.timestamp = s, c.appid = n, c.stateTimeLong = i, c.stepValue = r, c.advertId = e, 
            wx.setStorage({
                key: "active_time",
                data: c
            });
        }
        var o = "2";
        l.globalData.isnewuser && (o = "1");
        var d = {
            event: a.EVENT_LOG_ADVERTLISTREWARDCLICK,
            advertId: n,
            activity_type: "click",
            isnewuser: o
        };
        a.EVENT_LOG(d, function(t) {});
    },
    onPullDownRefresh: function() {
        this.getRewardListData(this.data.activeTab);
    },
    onShareAppMessage: function(t) {
        var e = void 0, n = i.USERINFO().userId + "" + Date.parse(new Date()) / 1e3;
        t.target && t.target.dataset.taskid ? (this.loadInterstitialAd(), e = {
            event: a.EVENT_BSB_SHARE_EVENTS,
            share_card_id: n,
            page_content_id: u[t.target.dataset.taskid],
            share_events: "成长任务页面--邀请好友"
        }) : e = {
            event: a.EVENT_BSB_SHARE_EVENTS,
            share_card_id: n,
            share_events: "成长任务页面",
            share_loc: "右上角三个点"
        }, a.EVENT_THINKDATATRACK(e);
        var r = {
            share_loc: e.share_loc || "",
            share_events: e.share_events,
            flag: n
        }, s = o.BASISSHAREPATH(r);
        return {
            title: this.data.subsidyShareContent,
            path: s,
            imageUrl: this.data.subsidyShareImageurl,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    doTask: function(t) {
        console.log(t.currentTarget.dataset.title);
        var e = "日常任务";
        2 == this.data.activeTab && (e = "新手任务");
        var i = {
            event: "taskPage_task_click",
            activity_type: e,
            activity_name: t.currentTarget.dataset.title
        };
        a.EVENT_LOG(i, function(t) {});
        var n = this;
        if (2 != t.currentTarget.dataset.type) if (4 != t.currentTarget.dataset.type) if (20 != t.currentTarget.dataset.type && 12 != t.currentTarget.dataset.type && 15 != t.currentTarget.dataset.type && 18 != t.currentTarget.dataset.type && 19 != t.currentTarget.dataset.type && 8 != t.currentTarget.dataset.type) if (19 != t.currentTarget.dataset.type) if (3 != t.currentTarget.dataset.type) if (5 != t.currentTarget.dataset.type) if (6 != t.currentTarget.dataset.type) if (50 != t.currentTarget.dataset.type) if (52 != t.currentTarget.dataset.type) if (53 != t.currentTarget.dataset.type) if (56 != t.currentTarget.dataset.type) if (57 != t.currentTarget.dataset.type) if (58 != t.currentTarget.dataset.type) if (59 != t.currentTarget.dataset.type) if (60 != t.currentTarget.dataset.type) if (54 != t.currentTarget.dataset.type && 55 != t.currentTarget.dataset.type) ; else {
            console.log(t.currentTarget.dataset.type), wx.switchTab({
                url: "/pages/index/index"
            });
            var r = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "去兑换",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(r, function(t) {});
        } else {
            wx.navigateTo({
                url: "/pages/activity/friendCall/friendCall"
            });
            var s = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "好友召回",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(s, function(t) {});
        } else {
            wx.navigateTo({
                url: "/pages/activity/challenge/challenge"
            });
            var c = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "挑战赛",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(c, function(t) {});
        } else {
            wx.navigateTo({
                url: "/pages/activity/luckdraw/luckdraw"
            });
            var o = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "抽奖",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(o, function(t) {});
        } else {
            wx.navigateTo({
                url: "/pages/activity/moneytree/moneytree"
            });
            var d = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "摇钱树",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(d, function(t) {});
        } else {
            wx.navigateTo({
                url: "/pages/community/videoTask/videoTask"
            });
            var u = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "看视频赚现金",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(u, function(t) {});
        } else {
            wx.navigateTo({
                url: "/pages/answer/pages/answer"
            });
            var _ = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "答题",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(_, function(t) {});
        } else {
            if (0 == t.currentTarget.dataset.jumptype) {
                wx.navigateTo({
                    url: "/pages/activity/signView/signViewB/signViewB"
                });
                var v = {
                    event: "homePage_new_button_upgrade_missions_click",
                    activity_name: "B版本签到",
                    activity_type: e,
                    activity_id: t.currentTarget.dataset.id + ""
                };
                return void a.EVENT_LOG(v, function(t) {});
            }
            wx.navigateTo({
                url: "/pages/activity/signView/newSignIn/newSignIn"
            });
            var l = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "签到",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(l, function(t) {});
        } else {
            if (this.setData({
                taskId: t.currentTarget.dataset.type
            }), this.data.videoAdTime > 0) return;
            if (0 == this.data.frequency) {
                this.setData({
                    showGoApp: !0
                });
                var T = {
                    event: "taskPage_task_click",
                    activity_type: "日常任务",
                    activity_name: "弹窗-无视频&APP转化-曝光"
                };
                return void a.EVENT_LOG(T, function(t) {});
            }
            this.videoShow();
            var g = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "去观看",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(g, function(t) {});
        } else {
            wx.navigateTo({
                url: "/pages/activity/friendCall/friendCall"
            });
            var p = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "好友召回",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(p, function(t) {});
        } else {
            wx.navigateTo({
                url: "/pages/subpackage/setup/bindPhone/bindPhone?source=0"
            });
            var y = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "绑定手机号",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(y, function(t) {});
        } else {
            n.setData({
                showAddApplet: !0
            });
            var E = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(E, function(t) {});
        } else {
            wx.navigateTo({
                url: "/pages/community/release/release"
            });
            var f = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "去发布",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(f, function(t) {});
        } else {
            wx.switchTab({
                url: "/pages/communityHomepage/community",
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
            });
            var w = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_name: "步友圈",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(w, function(t) {});
        } else {
            wx.navigateTo({
                url: "/pages/index/activeReward/guideFollow/guideFollow"
            });
            var m = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(m, function(t) {});
        } else {
            n.setData({
                showAddDesktop: !0
            });
            var h = {
                event: "homePage_new_button_upgrade_missions_click",
                activity_type: e,
                activity_id: t.currentTarget.dataset.id + ""
            };
            a.EVENT_LOG(h, function(t) {});
        }
    },
    hideTip: function(t) {
        var a = this;
        if (2 == t.currentTarget.dataset.type) {
            a.setData({
                showAddDesktop: !1
            });
            var i = Date.parse(new Date());
            T.timestamp = i;
            wx.setStorage({
                key: "addTo_android",
                data: T
            });
        }
        3 == t.currentTarget.dataset.type && (e.STARTADDPROGRAM(function(t) {}, function(t) {}), 
        a.setData({
            showAddApplet: !1
        }));
    },
    loadAdError: function() {
        this.setData({
            noAd: !0
        }), this.loadAdvert();
    },
    loadAd: function() {
        this.setData({
            noAd: !1
        });
    },
    loadAdvert: function() {
        var t = this;
        r.GETADVERINFO(24, function(e) {
            "OK" == e.code && t.setData({
                listswiper: e.data.result
            });
        });
    },
    onUnload: function() {
        if (g = null, this.data.countFlage) {
            var t = {};
            t.timestamp = Date.parse(new Date()), t.videoAdTime = this.data.taskTimes, t.countFlage = this.data.countFlage, 
            wx.setStorage({
                key: "taskData",
                data: t
            });
        }
    },
    videoShow: function() {
        var t = this;
        g.show().catch(function(e) {
            t.setData({
                showGoApp: !0
            });
            var i = {
                event: "taskPage_task_click",
                activity_type: "日常任务",
                activity_name: "弹窗-无视频&APP转化-曝光"
            };
            a.EVENT_LOG(i, function(t) {});
        });
    },
    loadAdvedio: function() {
        var t = this;
        null != g && g || ((g = wx.createRewardedVideoAd({
            adUnitId: "adunit-1ea0061203ca62c7"
        })).onLoad(function(t) {
            var e = {
                event: a.EVENT_BSB_ADVERT_EVENTS,
                advert_click: "视频加载成功",
                advert_events: "成长任务-看视频领步数"
            };
            a.EVENT_THINKDATATRACK(e);
        }), g.onError(function(t) {
            var e = {
                event: a.EVENT_BSB_ADVERT_EVENTS,
                advert_click: "视频加载失败",
                advert_events: "成长任务-看视频领步数"
            };
            a.EVENT_THINKDATATRACK(e);
        }), g.onClose(function(e) {
            if (e.isEnded) console.log("adState.isEnded", e.isEnded), t.throttleFn(); else {
                var i = {
                    event: a.EVENT_BSB_ADVERT_EVENTS,
                    advert_click: "中途结束关闭广告",
                    advert_events: "成长任务-看视频领步数"
                };
                a.EVENT_THINKDATATRACK(i);
            }
        }));
    },
    throttleFn: d.throttle(function(t) {
        var e = this;
        this.data.countFlage = !0, this.countDown(this.data.taskTimes), s.POST({
            url: c.API_VIDEOTASKB,
            params: {
                taskId: 1
            },
            success: function(t) {
                e.setData({
                    frequency: e.data.frequency - 1
                }), console.log(e.data.frequency);
                var i = {
                    event: a.EVENT_BSB_ADVERT_EVENTS,
                    advert_click: "发送奖励",
                    advert_events: "成长任务-看视频领步数"
                };
                a.EVENT_THINKDATATRACK(i);
            },
            fail: function(t) {}
        });
    }, 5e3),
    linkUrl: function(t) {
        if (1 == t.currentTarget.dataset.type && (-1 != (e = t.currentTarget.dataset.url).search("pages/team/team") ? (console.log(e), 
        wx.switchTab({
            url: e,
            fail: function() {
                wx.showToast({
                    title: "该功能已关闭",
                    icon: "none"
                });
            }
        })) : wx.navigateTo({
            url: t.currentTarget.dataset.url,
            fail: function() {
                wx.showToast({
                    title: "该功能暂未开放",
                    icon: "none"
                });
            }
        })), 3 == t.currentTarget.dataset.type) {
            var e = t.currentTarget.dataset.url;
            wx.navigateTo({
                url: "/pages/webView/webView?webUrl=" + encodeURIComponent(t.currentTarget.dataset.url),
                fail: function() {
                    wx.showToast({
                        title: "该功能暂未开放",
                        icon: "none"
                    });
                }
            });
        }
        var i = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: "index_reward",
            activity_name: t.currentTarget.dataset.url
        };
        a.EVENT_LOG(i, function(t) {});
    },
    clickAdFail: function(t) {
        var e = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: "index_reward",
            activity_name: "close",
            commodity_id: t.currentTarget.dataset.appid
        };
        a.EVENT_LOG(e, function(t) {});
        var i = {
            event: a.EVENT_BSB_ADVERT_EVENTS,
            advert_events: "首页-首屏-赚步数-底部banner",
            advert_loc_name: "首页-首屏-赚步数-底部banner",
            advert_click: " 广告内容关闭（取消）",
            page_content_id: t.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(i);
    },
    clickAdSucess: function(t) {
        var e = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: "index_reward",
            activity_name: "done",
            commodity_id: t.currentTarget.dataset.appid
        };
        a.EVENT_LOG(e, function(t) {});
        var i = {
            event: a.EVENT_BSB_ADVERT_EVENTS,
            advert_events: "首页-首屏-赚步数-底部banner",
            advert_loc_name: "首页-首屏-赚步数-底部banner",
            advert_click: "done广告内容点击（允许）",
            page_content_id: t.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(i);
    },
    clickAd: function(t) {
        var e = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: "index_reward",
            activity_name: "click",
            commodity_id: t.currentTarget.dataset.appid
        };
        a.EVENT_LOG(e, function(t) {});
        var i = {
            event: a.EVENT_BSB_ADVERT_EVENTS,
            advert_events: "首页-首屏-赚步数-底部banner",
            advert_loc_name: "首页-首屏-赚步数-底部banner",
            advert_click: "广告点击",
            page_content_id: t.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(i);
    },
    countDown: function(e) {
        var a = this;
        a.setData({
            videoAdTime: e
        }), e > 0 ? t = setTimeout(function() {
            a.countDown(e - 1);
        }, 1e3) : a.data.countFlage = !1;
    },
    hideGoAppFn: function() {
        this.setData({
            showGoApp: !1
        });
        var t = {
            event: "taskPage_task_click",
            activity_type: "日常任务",
            activity_name: "弹窗-无视频&APP转化-取消/关闭"
        };
        a.EVENT_LOG(t, function(t) {});
    },
    linkAppDownLoad: function() {
        this.setData({
            showGoApp: !1
        }), this.getWxCard();
        var t = {
            event: "taskPage_task_click",
            activity_type: "日常任务",
            activity_name: "弹窗-无视频&APP转化-去APP观看更多视频"
        };
        a.EVENT_LOG(t, function(t) {});
    },
    getWxCard: function() {
        wx.navigateTo({
            url: "/pages/index/goodlist/wechatCard/wechatCard"
        });
    },
    loadBannerAd: function() {
        if (!(i.CREATEBETWEENTIME() < 7)) {
            var t = d.getLoginCounts("taskDetailCount");
            d.setStorageCount("taskDetailCount"), t > 1 || (wx.createInterstitialAd && ((_ = wx.createInterstitialAd({
                adUnitId: "adunit-4e7bb63bb75a3a82"
            })).onLoad(function() {
                console.log("********加载插屏");
            }), _.onError(function(t) {
                console.log("********加载失败", t);
            }), _.onClose(function() {})), _ && _.show().catch(function(t) {
                console.error(t);
            }));
        }
    },
    loadInterstitialAd: function() {
        if (!(i.CREATEBETWEENTIME() < 7)) {
            var t = d.getLoginCounts("taskDetailShareCount");
            d.setStorageCount("taskDetailShareCount"), t > 1 || (wx.createInterstitialAd && ((v = wx.createInterstitialAd({
                adUnitId: "adunit-1e8bca9dd545966c"
            })).onLoad(function() {}), v.onError(function(t) {}), v.onClose(function() {})), 
            v && v.show().catch(function(t) {
                console.error(t);
            }));
        }
    }
});