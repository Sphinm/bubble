function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e = getApp(), a = require("../../utils/community.js"), i = require("../../utils/wglogin.js"), s = require("../../utils/event.js"), n = require("../../utils/urls.js"), r = require("../../utils/request.js"), d = require("../index/js/share.js"), o = require("../../utils/urlGL.js"), c = o.TYPEVALUE(), u = !1, l = {}, m = [];

Page({
    data: {
        videoHidden: !0,
        animationData: "",
        unLockMask: "",
        currentItem: -1,
        friendCurrentPage: 1,
        pageSize: 15,
        pageNum: 1,
        isLast: !1,
        isFriendLast: !1,
        dynamicList: [],
        friendDynamicList: [],
        topList: [],
        refreshList: [],
        listswiper: [],
        refreshNum: 0,
        showRefreshTip: !1,
        showFirstTip: !0,
        tabIndex: 1,
        enter_time: 0,
        enterSource: "4",
        isFixed: !1,
        recommend_time: 0,
        follow_time: 0,
        vedio_time: 0,
        readDynamicId: 0,
        newsDynamicId: 0,
        shareContent: "",
        shareImg: "",
        videoId: "",
        videoList: [],
        isVideoLast: !1,
        clickTab: !1,
        idList: [],
        firstVideoList: [],
        secondVideList: [],
        thirdVideList: [],
        videoUrl: n.randomExperimentVideo
    },
    onTabItemTap: function(t) {
        if (!this.data.clickTab) {
            this.data.clickTab = !0;
            var e = {
                event: "homePage_tab_button_click",
                activity_name: t.text,
                activity_type: t.index + ""
            };
            s.EVENT_LOG(e, function(t) {});
        }
    },
    onPullDownRefresh: function() {
        var t = this;
        if (t.getRefresh(), t.loadAdvert(), 1 == t.data.tabIndex && (t.data.requestTime = JSON.stringify(new Date().getTime()), 
        t.recommendNews(), t.topAndEssence(), t.getChooseTopicList()), 2 == t.data.tabIndex && (t.data.friendRequestTime = JSON.stringify(new Date().getTime()), 
        t.getFriendDynamicList(!0, !0)), 3 == t.data.tabIndex) {
            t.data.videoUrl = n.VIDEOLIST, t.data.videoList = [], t.data.idList = [], t.getVideoList(1, !0);
            var e = {
                event: "community_homepage_refresh_vedio"
            };
            s.EVENT_LOG(e, function(t) {});
        }
        a.LIKECOUNT(function(e) {
            "OK" == e.code && t.setData({
                likeCount: e.data.result.likeCount || 0
            });
        });
    },
    onReachBottom: function() {
        var t = this;
        if (1 == t.data.tabIndex && (t.data.isLast || t.recommendRead()), 2 == t.data.tabIndex && (t.data.isFriendLast || t.getFriendDynamicList()), 
        3 == t.data.tabIndex) {
            if (t.data.isVideoLast) return;
            t.getVideoList(t.data.pageNum + 1);
        }
    },
    onLoad: function(t) {
        var a = this, i = e.globalData.communityTabIndex;
        a.setData({
            tabIndex: i
        }), a.data.enter_time = Date.parse(new Date()) / 1e3, a.data.recommend_time = Date.parse(new Date()) / 1e3, 
        1 == a.data.tabIndex && (a.data.requestTime = JSON.stringify(new Date().getTime()), 
        a.recommendRead(), a.topAndEssence(), a.getChooseTopicList()), 2 == a.data.tabIndex && (a.data.friendRequestTime = JSON.stringify(new Date().getTime()), 
        a.getFriendDynamicList(!0)), 3 == a.data.tabIndex && (a.data.videoUrl = n.randomExperimentVideo, 
        a.data.videoList = [], a.data.idList = [], a.getVideoList(1)), t.enterSource && void 0 != t.enterSource && (a.data.enterSource = t.enterSource), 
        d.SHARECARD("POST", function(t) {
            "OK" == t.code && (a.data.shareContent = t.data.result.content, a.data.shareImg = t.data.result.imgUrl);
        });
    },
    onShow: function() {
        var t = e.globalData.communityTabIndex;
        if (this.setData({
            tabIndex: t
        }), this.data.clickTab = !1, u) u = !1; else {
            if (3 == this.data.tabIndex && 0 == e.globalData.videoFlage) {
                var i = wx.createSelectorQuery();
                i.select("#NOVICE").boundingClientRect(), i.selectViewport().scrollOffset(), i.exec(function(t) {
                    wx.pageScrollTo({
                        scrollTop: 0,
                        duration: 0
                    });
                }), this.data.videoUrl = n.randomExperimentVideo, this.data.videoList = [], this.data.idList = [], 
                this.getVideoList(1);
            }
            this.data.enter_time = Date.parse(new Date()) / 1e3, this.data.recommend_time = Date.parse(new Date()) / 1e3;
            var r = this;
            r.loadAdvert(), a.LIKECOUNT(function(t) {
                r.setData({
                    likeCount: t.data.result.likeCount || 0
                });
            }), this.getRefresh();
            var d = {
                1: "首页五个按钮中的步友圈",
                2: "轮播广告位中的步友圈",
                3: "首页五个模块化入口中的步友圈",
                4: "底部tab中的步友圈"
            }, o = {
                event: s.EVENT_LOG_ENTER_INDEX_COMMUNITY,
                enter_source: d[this.data.enterSource]
            };
            s.EVENT_LOG(o, function(t) {});
        }
    },
    onHide: function(t) {
        if (e.globalData.videoFlage = !1, e.globalData.communityTabIndex = this.data.tabIndex, 
        !u) {
            if (0 != this.data.enter_time) {
                var a = {
                    event: s.EVENT_COMMUNITY_COMMUNITY_TOTAL_TIME,
                    total_time: Date.parse(new Date()) / 1e3 - this.data.enter_time,
                    enter_source: this.data.enterSource
                };
                s.EVENT_LOG(a, function(t) {});
            }
            this.pageStayTime();
        }
    },
    onUnload: function() {
        e.globalData.communityTabIndex = 3;
    },
    switchTab: function(t) {
        var e = this;
        if (t.currentTarget.dataset.index != e.data.tabIndex) {
            if (wx.pageScrollTo({
                scrollTop: 0,
                duration: 0
            }), e.pageStayTime(), e.setData({
                tabIndex: t.currentTarget.dataset.index,
                isFixed: !1
            }), 2 == e.data.tabIndex) {
                e.data.friendRequestTime = JSON.stringify(new Date().getTime()), e.getFriendDynamicList(!0), 
                e.data.follow_time = Date.parse(new Date()) / 1e3;
                var a = {
                    event: s.EVENT_COMMUNITY_ENTER_INDEX_FOLLOW_CLICK
                };
                s.EVENT_LOG(a, function(t) {});
            }
            if (1 == e.data.tabIndex) {
                e.data.requestTime = JSON.stringify(new Date().getTime()), 0 === e.data.dynamicList.length && (e.recommendRead(), 
                e.topAndEssence(), e.getChooseTopicList()), this.data.recommend_time = Date.parse(new Date()) / 1e3;
                var i = {
                    event: s.EVENT_COMMUNITY_ENTER_INDEX_RECOMMEND_CLICK
                };
                s.EVENT_LOG(i, function(t) {}), e.registerNotify();
            }
            3 == e.data.tabIndex && (e.data.videoUrl = n.randomExperimentVideo, e.data.videoList = [], 
            e.data.idList = [], e.getVideoList(1));
        }
    },
    pageStayTime: function() {
        if (0 != this.data.recommend_time) {
            var t = {
                event: s.EVENT_COMMUNITY_ENTER_INDEX_RECOMMEND_STAY_TIME,
                total_time: Date.parse(new Date()) / 1e3 - this.data.recommend_time
            };
            s.EVENT_LOG(t, function(t) {});
        }
        if (0 != this.data.follow_time) {
            var e = {
                event: s.EVENT_COMMUNITY_ENTER_INDEX_FOLLOW_STAY_TIME,
                total_time: Date.parse(new Date()) / 1e3 - this.data.follow_time
            };
            s.EVENT_LOG(e, function(t) {});
        }
        if (0 != this.data.vedio_time) {
            var a = {
                event: "community_vedio_list_page",
                total_time: Date.parse(new Date()) / 1e3 - this.data.vedio_time
            };
            s.EVENT_LOG(a, function(t) {});
        }
    },
    topAndEssence: function() {
        var t = this;
        r.POST({
            url: n.COMMUNITY_TOPANDESSENCE,
            params: {},
            success: function(e) {
                if ("OK" == e.code) {
                    t.setData({
                        topList: e.data.result
                    });
                    for (var a = 0; a < e.data.result.length; a++) {
                        var i = e.data.result[a];
                        t.uploadTopicShow(i.id, "content");
                    }
                }
            },
            fail: function(t) {}
        });
    },
    recommendRead: function(t) {
        t || wx.showLoading({
            title: "正在加载...",
            mask: !0
        });
        var e = this;
        r.POST({
            url: n.COMMUNITY_RECOMMENDREAD,
            params: {
                pageSize: e.data.pageSize,
                extreme: e.data.readDynamicId
            },
            success: function(a) {
                if ("OK" == a.code) {
                    if (a.data.result.length > 0) {
                        var i = e.data.dynamicList.concat(a.data.result);
                        e.setData({
                            dynamicList: i,
                            readDynamicId: a.data.result[a.data.result.length - 1].recommendId
                        }), e.data.newsDynamicId || e.setData({
                            newsDynamicId: a.data.result[0].recommendId
                        }), 1 == e.data.tabIndex && e.registerNotify();
                    }
                    a.data.result.length < e.data.pageSize ? e.setData({
                        isLast: !0
                    }) : e.setData({
                        isLast: !1
                    });
                }
                t ? wx.stopPullDownRefresh() : wx.hideLoading();
            },
            fail: function(e) {
                t ? wx.stopPullDownRefresh() : wx.hideLoading();
            }
        });
    },
    recommendNews: function() {
        var t = this;
        t.data.readDynamicId ? t.data.newsDynamicId ? t.data.showRefreshTip ? wx.stopPullDownRefresh() : r.POST({
            url: n.COMMUNITY_RECOMMENDNEWS,
            params: {
                pageSize: t.data.pageSize,
                extreme: t.data.newsDynamicId
            },
            success: function(e) {
                if ("OK" == e.code) {
                    if (t.data.showFirstTip && t.setData({
                        showFirstTip: !1
                    }), t.setData({
                        refreshNum: e.data.result.length,
                        showRefreshTip: !0
                    }), e.data.result.length > 0) {
                        if (t.data.refreshList.length > 0) {
                            var a = t.data.refreshList.concat(t.data.dynamicList);
                            a.length > 15 && (a = a.slice(0, 16)), t.setData({
                                readDynamicId: a[a.length - 1].recommendId,
                                refreshList: [],
                                dynamicList: a
                            });
                        }
                        t.setData({
                            refreshList: e.data.result,
                            newsDynamicId: e.data.result[0].recommendId
                        }), 3 != t.data.tabIndex && t.registerNotify();
                    }
                    setTimeout(function() {
                        t.setData({
                            showRefreshTip: !1
                        });
                    }, 2e3);
                }
                wx.stopPullDownRefresh();
            },
            fail: function(t) {
                wx.stopPullDownRefresh();
            }
        }) : wx.stopPullDownRefresh() : t.recommendRead(!0);
    },
    getFriendDynamicList: function(t, e) {
        e || wx.showLoading({
            title: "正在加载...",
            mask: !0
        });
        var i = this;
        a.GETFRIENDDYNAMICLIST(i.data.pageSize, i.data.friendRequestTime, function(e) {
            if ("OK" == e.code) {
                t && (i.data.friendDynamicList = []);
                var a = i.data.friendDynamicList.concat(e.data.result);
                i.setData({
                    friendDynamicList: a
                }), e.data.result.length > 0 ? (i.data.friendRequestTime = JSON.stringify(e.data.result[e.data.result.length - 1].createTime), 
                e.data.result.length < i.data.pageSize ? i.setData({
                    isFriendLast: !0
                }) : i.setData({
                    isFriendLast: !1
                })) : i.setData({
                    isFriendLast: !0
                }), wx.hideLoading(), wx.stopPullDownRefresh(), 3 != i.data.tabIndex && i.registerNotify();
            } else wx.showToast({
                title: e.msg,
                icon: "none"
            }), wx.hideLoading(), wx.stopPullDownRefresh();
        }, function(t) {
            wx.hideLoading(), wx.stopPullDownRefresh();
        });
    },
    getVideoList: function(t, e) {
        this.setData({
            animationData: ""
        }), e || wx.showLoading({
            title: "正在加载...",
            mask: !0
        });
        var a = this;
        r.POST({
            url: a.data.videoUrl,
            params: {
                pageSize: 10,
                pageNum: t,
                idList: a.data.idList
            },
            success: function(i) {
                if (e ? wx.stopPullDownRefresh() : wx.hideLoading(), "OK" == i.code) {
                    1 == t && (a.data.videoList = [], a.data.vedio_time = Date.parse(new Date()) / 1e3, 
                    a.data.recommend_time = 0, a.setData({
                        tabIndex: 3
                    }));
                    var s = i.data.result.length - 1;
                    i.data.result.length > 0 && (a.data.idList = i.data.result[s].idList);
                    var n = a.data.videoList.concat(i.data.result);
                    i.data.result.length > 0 && 1 == t ? (a.setData({
                        firstVideoList: i.data.result.slice(0, 2),
                        secondVideList: i.data.result.slice(2, 4),
                        thirdVideList: i.data.result.slice(4, 6),
                        videoList: i.data.result.slice(6),
                        pageNum: 1,
                        isVideoLast: !1
                    }), a.registerNotify("video-content"), a.setData({
                        animationData: "vedioDynamicEffect 1.6s ease-in-out infinite"
                    })) : i.data.result.length > 0 && 1 != t ? (a.setData({
                        videoList: n,
                        pageNum: t,
                        isVideoLast: !1
                    }), a.setData({
                        animationData: "vedioDynamicEffect 1.6s ease-in-out infinite"
                    }), a.registerNotify("video-content")) : (a.setData({
                        videoList: n,
                        isVideoLast: !0
                    }), a.setData({
                        animationData: "vedioDynamicEffect 1.6s ease-in-out infinite"
                    }), a.registerNotify("video-content")), a.data.videoHidden && a.setData({
                        videoHidden: !1
                    });
                } else "NO" == i.code && (a.data.vedio_time = 0, a.setData({
                    tabIndex: 1
                }));
            },
            fail: function(t) {
                e ? wx.stopPullDownRefresh() : wx.hideLoading();
            }
        });
    },
    getRefresh: function() {
        var t = this;
        a.REFRESH(function(e) {
            "OK" == e.code && t.setData({
                isFoucsPoint: e.data.result.isFoucsPoint,
                isReleasePoint: e.data.result.isReleasePoint
            });
        });
    },
    getChooseTopicList: function() {
        var t = this;
        a.CHOOSETOPICLIST(function(e) {
            "OK" == e.code && t.setData({
                topicList: e.data.result.recommend
            });
        });
    },
    addfollow: function(e) {
        var i = this, n = e.currentTarget.dataset.userid, r = e.currentTarget.dataset.status, d = e.currentTarget.dataset.index, o = e.currentTarget.dataset.type;
        a.SENDFOLLOWUSER(n, r, function(e) {
            if ("OK" == e.code) {
                if ("top" == o) {
                    for (var a = 0; a < i.data.topList.length; a++) i.data.topList[d].userId == i.data.topList[a].userId && i.setData(t({}, "topList[" + a + "].fansStatus", 1));
                    for (var n = 0; n < i.data.refreshList.length; n++) i.data.topList[d].userId == i.data.refreshList[n].userId && i.setData(t({}, "refreshList[" + n + "].fansStatus", 1));
                    for (var r = 0; r < i.data.dynamicList.length; r++) i.data.topList[d].userId == i.data.dynamicList[r].userId && i.setData(t({}, "dynamicList[" + r + "].fansStatus", 1));
                } else if ("refresh" == o) {
                    for (var c = 0; c < i.data.topList.length; c++) i.data.refreshList[d].userId == i.data.topList[c].userId && i.setData(t({}, "topList[" + c + "].fansStatus", 1));
                    for (var u = 0; u < i.data.refreshList.length; u++) i.data.refreshList[d].userId == i.data.refreshList[u].userId && i.setData(t({}, "refreshList[" + u + "].fansStatus", 1));
                    for (var l = 0; l < i.data.dynamicList.length; l++) i.data.refreshList[d].userId == i.data.dynamicList[l].userId && i.setData(t({}, "dynamicList[" + l + "].fansStatus", 1));
                } else {
                    for (var m = 0; m < i.data.topList.length; m++) i.data.dynamicList[d].userId == i.data.topList[m].userId && i.setData(t({}, "topList[" + m + "].fansStatus", 1));
                    for (var f = 0; f < i.data.refreshList.length; f++) i.data.dynamicList[d].userId == i.data.refreshList[f].userId && i.setData(t({}, "refreshList[" + f + "].fansStatus", 1));
                    for (var _ = 0; _ < i.data.dynamicList.length; _++) i.data.dynamicList[d].userId == i.data.dynamicList[_].userId && i.setData(t({}, "dynamicList[" + _ + "].fansStatus", 1));
                }
                var v = {
                    event: s.EVENT_COMMUNITY_FRIENDS_FOLLOW_CLICK,
                    enter_source: "点击推荐列表+关注"
                };
                s.EVENT_LOG(v, function(t) {}), wx.showToast({
                    title: "已关注",
                    icon: "none"
                });
            } else wx.showToast({
                title: e.msg,
                icon: "none"
            });
        });
    },
    myrelease: function() {
        var t = {
            event: s.EVENT_COMMUNITY_ENTER_INDEX_MY_PAGE_CLICK,
            enter_source: "点击我的发布进入个人主页"
        };
        s.EVENT_LOG(t, function(t) {}), wx.navigateTo({
            url: "/pages/community/personalhomepage/personalhomepage?friendId=" + i.USERINFO().userId
        });
    },
    commInfo: function(t) {
        var e = "2";
        2 == this.data.tabIndex && (e = "3"), wx.navigateTo({
            url: "/pages/community/communityInfo/communityInfo?dynamicId=" + t.currentTarget.dataset.id + "&enterSource=" + e
        });
    },
    myAt: function(t) {
        wx.navigateTo({
            url: "/pages/community/personalhomepage/personalhomepage?friendId=" + t.currentTarget.dataset.friendid + "&type=" + t.currentTarget.dataset.type
        });
        2 == this.data.tabIndex || this.data.tabIndex;
        var e = {
            event: s.EVENT_COMMUNITY_ENTER_INDEX_MY_PAGE_CLICK,
            enter_source: "点击用户头像进入个人主页",
            activity_type: "点击视频发布用户头像",
            activity_id: t.currentTarget.dataset.id + ""
        };
        s.EVENT_LOG(e, function(t) {});
    },
    linkTopicList: function(t) {
        var e = {
            event: s.EVENT_LOG_ENTER_COMMUNITY_TOPICS_CLICK,
            activity_id: t.currentTarget.dataset.id + "",
            activity_name: t.currentTarget.dataset.name
        };
        s.EVENT_LOG(e, function(t) {}), wx.navigateTo({
            url: "/pages/community/topicList/topicList?topicId=" + t.currentTarget.dataset.id + "&topicName=" + t.currentTarget.dataset.name + "&enterSource=2"
        });
    },
    linkAllTopic: function(t) {
        var e = void 0;
        1 == t.currentTarget.dataset.type ? e = "步友圈首页-查看更多话题按钮" : 2 == t.currentTarget.dataset.type && (e = "热门话题最后一个按钮-查看更多话题按钮");
        var a = {
            event: "enter_index_topics_more_click",
            activity_name: e
        };
        s.EVENT_LOG(a, function(t) {}), wx.navigateTo({
            url: "/pages/community/allTopic/allTopic"
        });
    },
    linkVideo: function(t) {
        e.globalData.videoFlage = !0, wx.navigateTo({
            url: "/pages/community/videoInfo/videoInfo?videoId=" + t.currentTarget.dataset.id + "&videoRatio=" + t.currentTarget.dataset.type
        });
        var a = {
            event: "community_vedio_list_page",
            enter_source: "视频列表页",
            activity_id: t.currentTarget.dataset.id + "",
            activity_type: "点击视频内容跳转视频详情页"
        };
        s.EVENT_LOG(a);
        var i = t.currentTarget.dataset.index + 1;
        if (i <= 10) {
            var n = {
                event: "community_vedio_list_page",
                enter_source: "步友圈视频列表页",
                activity_name: "第" + i + "位置",
                activity_type: "位置点击"
            };
            s.EVENT_LOG(n);
        }
    },
    linkVideoTask: function() {
        wx.navigateTo({
            url: "/pages/community/videoTask/videoTask?enter_source=vodieList"
        });
        var t = {
            event: "community_vedio_list_page",
            activity_type: "点击看视频赚现金"
        };
        s.EVENT_LOG(t);
    },
    callPreview: function(t) {
        u = !0;
        var e = "步友圈推荐页面";
        2 == this.data.tabIndex && (e = "步友圈关注页面");
        var a = {
            event: "community_list_page_show_click",
            enter_source: e,
            activity_id: t.detail + "",
            activity_type: "点击帖子图片"
        };
        s.EVENT_LOG(a, function(t) {});
    },
    likeInfo: function(e) {
        var a = this, i = e.detail.index, s = e.detail.type;
        if (1 == a.data.tabIndex) if ("top" == s) {
            if (1 == a.data.topList[i].isLike) {
                var n;
                a.setData((n = {}, t(n, "topList[" + i + "].isLike", 2), t(n, "topList[" + i + "].likeNum", a.data.topList[i].likeNum - 1), 
                n));
            } else if (2 == a.data.topList[i].isLike) {
                var r;
                a.setData((r = {}, t(r, "topList[" + i + "].isLike", 1), t(r, "topList[" + i + "].likeNum", a.data.topList[i].likeNum + 1), 
                r));
            }
        } else if ("refresh" == s) {
            if (1 == a.data.refreshList[i].isLike) {
                var d;
                a.setData((d = {}, t(d, "refreshList[" + i + "].isLike", 2), t(d, "refreshList[" + i + "].likeNum", a.data.refreshList[i].likeNum - 1), 
                d));
            } else if (2 == a.data.refreshList[i].isLike) {
                var o;
                a.setData((o = {}, t(o, "refreshList[" + i + "].isLike", 1), t(o, "refreshList[" + i + "].likeNum", a.data.refreshList[i].likeNum + 1), 
                o));
            }
        } else if (1 == a.data.dynamicList[i].isLike) {
            var c;
            a.setData((c = {}, t(c, "dynamicList[" + i + "].isLike", 2), t(c, "dynamicList[" + i + "].likeNum", a.data.dynamicList[i].likeNum - 1), 
            c));
        } else if (2 == a.data.dynamicList[i].isLike) {
            var u;
            a.setData((u = {}, t(u, "dynamicList[" + i + "].isLike", 1), t(u, "dynamicList[" + i + "].likeNum", a.data.dynamicList[i].likeNum + 1), 
            u));
        }
        if (2 == a.data.tabIndex) if (1 == a.data.friendDynamicList[i].isLike) {
            var l;
            a.setData((l = {}, t(l, "friendDynamicList[" + i + "].isLike", 2), t(l, "friendDynamicList[" + i + "].likeNum", a.data.friendDynamicList[i].likeNum - 1), 
            l));
        } else if (2 == a.data.friendDynamicList[i].isLike) {
            var m;
            a.setData((m = {}, t(m, "friendDynamicList[" + i + "].isLike", 1), t(m, "friendDynamicList[" + i + "].likeNum", a.data.friendDynamicList[i].likeNum + 1), 
            m));
        }
    },
    collectionChange: function(e) {
        var a = this, i = e.detail.index, s = e.detail.type;
        1 == a.data.tabIndex && ("top" == s ? 1 == a.data.topList[i].isCollection ? (a.setData(t({}, "topList[" + i + "].isCollection", -1)), 
        wx.showToast({
            title: "取消收藏成功",
            icon: "none"
        })) : -1 == a.data.topList[i].isCollection && (a.setData(t({}, "topList[" + i + "].isCollection", 1)), 
        wx.showToast({
            title: "收藏成功，请到个人中心查看",
            icon: "none"
        })) : "refresh" == s ? 1 == a.data.refreshList[i].isCollection ? (a.setData(t({}, "refreshList[" + i + "].isCollection", -1)), 
        wx.showToast({
            title: "取消收藏成功",
            icon: "none"
        })) : -1 == a.data.refreshList[i].isCollection && (a.setData(t({}, "refreshList[" + i + "].isCollection", 1)), 
        wx.showToast({
            title: "收藏成功，请到个人中心查看",
            icon: "none"
        })) : 1 == a.data.dynamicList[i].isCollection ? (a.setData(t({}, "dynamicList[" + i + "].isCollection", -1)), 
        wx.showToast({
            title: "取消收藏成功",
            icon: "none"
        })) : -1 == a.data.dynamicList[i].isCollection && (a.setData(t({}, "dynamicList[" + i + "].isCollection", 1)), 
        wx.showToast({
            title: "收藏成功，请到个人中心查看",
            icon: "none"
        }))), 2 == a.data.tabIndex && (1 == a.data.friendDynamicList[i].isCollection ? (a.setData(t({}, "friendDynamicList[" + i + "].isCollection", -1)), 
        wx.showToast({
            title: "取消收藏成功",
            icon: "none"
        })) : -1 == a.data.friendDynamicList[i].isCollection && (a.setData(t({}, "friendDynamicList[" + i + "].isCollection", 1)), 
        wx.showToast({
            title: "收藏成功，请到个人中心查看",
            icon: "none"
        })));
    },
    msgMotify: function() {
        wx.navigateTo({
            url: "/pages/community/msgNotify/msgNotify"
        });
    },
    onPageScroll: function(t) {
        t.scrollTop <= 100 ? this.setData({
            isFixed: !1
        }) : this.setData({
            isFixed: !0
        });
    },
    refresh: function() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        }), wx.startPullDownRefresh({});
        var t = {
            event: "community_homepage_refresh",
            activity_type: "之前看到这里，下拉刷新"
        };
        s.EVENT_LOG(t, function(t) {});
    },
    loadAdvert: function() {
        var t = this;
        r.POST({
            url: n.COMMUNITYBANNER,
            params: {},
            success: function(e) {
                if ("OK" == e.code) if (t.setData({
                    listswiper: e.data.result
                }), !1 === e.data.lockStatus) {
                    t.setData({
                        unLockMask: e.data.lockStatus
                    });
                    var a = {
                        event: "community_homepage_unused_functions",
                        activity_type: "曝光"
                    };
                    s.EVENT_LOG(a, function(t) {});
                } else t.setData({
                    unLockMask: !0
                });
            },
            fail: function(t) {}
        });
    },
    clickAdFail: function(t) {
        var e = {
            event: s.EVENT_HOMEPAGEADBUTTON,
            activity_type: c[t.currentTarget.dataset.areatype],
            activity_name: "广告内容关闭（取消）",
            commodity_id: t.currentTarget.dataset.appid
        };
        s.EVENT_LOG(e, function(t) {});
        var a = {
            event: s.EVENT_BSB_ADVERT_EVENTS,
            advert_events: c[t.currentTarget.dataset.areatype],
            advert_loc_name: c[t.currentTarget.dataset.areatype],
            advert_click: "广告内容关闭（取消）",
            page_content_id: t.currentTarget.dataset.appid
        };
        s.EVENT_THINKDATATRACK(a);
    },
    clickAdSucess: function(t) {
        var e = {
            event: s.EVENT_HOMEPAGEADBUTTON,
            activity_type: c[t.currentTarget.dataset.areatype],
            activity_name: "广告内容点击（允许）",
            commodity_id: t.currentTarget.dataset.appid
        };
        s.EVENT_LOG(e, function(t) {});
        var a = {
            event: s.EVENT_BSB_ADVERT_EVENTS,
            advert_events: c[t.currentTarget.dataset.areatype],
            advert_loc_name: c[t.currentTarget.dataset.areatype],
            advert_click: "广告内容点击（允许）",
            page_content_id: t.currentTarget.dataset.appid
        };
        s.EVENT_THINKDATATRACK(a), o.insertUserAdvert(t.currentTarget.dataset.appid);
    },
    clickAd: function(t) {
        var e = {
            event: s.EVENT_HOMEPAGEADBUTTON,
            activity_type: c[t.currentTarget.dataset.areatype],
            activity_name: "广告点击",
            commodity_id: t.currentTarget.dataset.appid
        };
        s.EVENT_LOG(e, function(t) {});
        var a = {
            event: s.EVENT_BSB_ADVERT_EVENTS,
            advert_events: c[t.currentTarget.dataset.areatype],
            advert_loc_name: c[t.currentTarget.dataset.areatype],
            advert_click: "广告点击",
            page_content_id: t.currentTarget.dataset.appid
        };
        s.EVENT_THINKDATATRACK(a);
    },
    linkUrl: function(t) {
        if (t.currentTarget.dataset.url) {
            if (1 == t.currentTarget.dataset.type) {
                var e = t.currentTarget.dataset.url;
                wx.navigateTo({
                    url: e,
                    fail: function() {
                        wx.showToast({
                            title: "该功能暂未开放",
                            icon: "none"
                        });
                    }
                });
            }
            if (3 == t.currentTarget.dataset.type) {
                var a = t.currentTarget.dataset.url;
                wx.navigateTo({
                    url: "/pages/webView/webView?webUrl=" + encodeURIComponent(a),
                    fail: function() {
                        wx.showToast({
                            title: "该功能暂未开放",
                            icon: "none"
                        });
                    }
                });
            }
            var i = {
                event: s.EVENT_HOMEPAGEADBUTTON,
                activity_type: t.currentTarget.dataset.areatype,
                activity_name: t.currentTarget.dataset.url
            };
            s.EVENT_LOG(i, function(t) {});
        }
    },
    uploadTopicShow: function(t, e, a) {
        var i = t + "";
        if (!l.hasOwnProperty(i)) {
            if ("content" == e) {
                var n = "步友圈推荐页面";
                2 == this.data.tabIndex && (n = "步友圈关注页面");
                var r = {
                    event: "community_list_page_show_click",
                    enter_source: n,
                    activity_id: t + "",
                    activity_type: "帖子曝光"
                };
                s.EVENT_LOG(r, function(t) {});
            } else {
                var d = {
                    event: "community_vedio_list_page",
                    enter_source: "视频列表页",
                    activity_id: t + "",
                    activity_type: "视频曝光"
                };
                if (s.EVENT_LOG(d, function(t) {}), a <= 10) {
                    var o = {
                        event: "community_vedio_list_page",
                        enter_source: "步友圈视频列表页",
                        activity_name: "第" + a + "位置",
                        activity_type: "位置曝光"
                    };
                    s.EVENT_LOG(o);
                }
            }
            l[i] = t;
        }
    },
    registerNotify: function(t) {
        var e = this, a = "content";
        e._observer && e._observer.disconnect(), e._observer = e.createIntersectionObserver({
            thresholds: [ 1 ],
            observeAll: !0
        }), t && (a = t), e._observer.relativeToViewport({
            top: 30
        }).observe("." + a, function(t) {
            for (var a = !1, i = t.dataset.index + 1, s = 0; s < m.length; s++) if (m[s].id == t.dataset.id) {
                a = !0;
                break;
            }
            if (!a) {
                var n = {};
                n.id = t.dataset.id, m.push(n), e.uploadTopicShow(t.dataset.id, t.dataset.content, i);
            }
        });
    },
    onShareAppMessage: function(t) {
        var e = this, a = i.USERINFO().userId + "" + Date.parse(new Date()) / 1e3;
        if ("button" === t.from) {
            if ("videoShare" == t.target.dataset.type) {
                var n = [], r = t.target.dataset.loc;
                n = 1 == r ? e.data.firstVideoList : 2 == r ? e.data.secondVideList : 3 == r ? e.data.thirdVideList : e.data.videoList;
                var d = {
                    event: s.EVENT_BSB_SHARE_EVENTS,
                    share_card_id: a,
                    share_events: "社区热门视频分享",
                    page_content_id: n[t.target.dataset.index].id + ""
                };
                s.EVENT_THINKDATATRACK(d);
                var c = {
                    event: "community_vedio_list_page",
                    share_card_id: a,
                    activity_type: "点击视频分享按钮",
                    activity_id: n[t.target.dataset.index].id + ""
                };
                s.EVENT_LOG(c, function(t) {});
                var u = {
                    share_loc: d.share_loc || "",
                    share_events: d.share_events,
                    flag: a,
                    basisPath: "/pages/community/videoInfo/videoInfo?videoId=" + n[t.target.dataset.index].id + "&videoRatio=" + n[t.target.dataset.index].type,
                    videoId: n[t.target.dataset.index].id,
                    source: 8
                }, l = o.BASISSHAREPATH(u);
                return {
                    imageUrl: n[t.target.dataset.index].imgUrl + "?x-oss-process=image/resize,m_fill,w_500,h_400/watermark,type_d3F5LXplbmhlaQ,size_30,image_ODE1NTg1MjAzMTRfLnBpY19oZC5qcGc,g_center",
                    title: n[t.target.dataset.index].title,
                    path: l
                };
            }
            var m = {
                event: "community_forward_share",
                share_card_id: a,
                activity_id: t.target.dataset.dynamicid + ""
            };
            s.EVENT_LOG(m, function(t) {});
            var f = {
                event: s.EVENT_BSB_SHARE_EVENTS,
                share_card_id: a,
                share_events: "社区首页分享",
                page_content_id: t.target.dataset.dynamicid + ""
            };
            s.EVENT_THINKDATATRACK(f);
            var _ = "", v = "";
            if (_ = t.target.dataset.content ? t.target.dataset.content : e.data.shareContent, 
            t.target.dataset.img) {
                var T = t.target.dataset.img;
                v = -1 == T.indexOf(".png") && -1 == T.indexOf(".PNG") && -1 == T.indexOf(".jpg") && -1 == T.indexOf(".JPG") ? e.data.shareImg : t.target.dataset.img;
            } else v = e.data.shareImg;
            var L = {
                share_loc: f.share_loc || "",
                share_events: f.share_events,
                flag: a,
                basisPath: "/pages/community/communityInfo/communityInfo?dynamicId=" + t.target.dataset.dynamicid + "&enterSource=9"
            };
            return {
                imageUrl: v,
                title: _,
                path: o.BASISSHAREPATH(L)
            };
        }
        var g = "社区首页三个点";
        3 == e.data.tabIndex && (g = "社区首页三个点(视频)");
        var h = {
            event: s.EVENT_BSB_SHARE_EVENTS,
            share_card_id: a,
            share_events: g
        };
        s.EVENT_THINKDATATRACK(h);
        var p = {
            event: "community_forward_click",
            share_card_id: a,
            activity_type: g
        };
        s.EVENT_LOG(p, function(t) {});
        var E = {
            share_loc: h.share_loc || "",
            share_events: h.share_events,
            flag: a,
            basisPath: "/pages/communityHomepage/community"
        };
        return {
            title: "我向你分享了一个有趣的社区",
            path: o.BASISSHAREPATH(E)
        };
    },
    videoAdload: function(t) {
        console.log("原生视频加载************", t);
    },
    videoAderror: function(t) {
        console.log("原生视频加载错误************", t);
    }
});