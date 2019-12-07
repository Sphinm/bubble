var e = require("../../utils/room.js"), t = require("../../utils/mine.js"), a = require("../../utils/event.js"), n = require("../../utils/wglogin.js"), i = require("../../utils/xmadx_sdk.min.js").xmad(i).xmPage, r = getApp(), o = require("../../utils/urlGL.js"), c = o.TYPEVALUE(), s = null;

i({
    data: {
        noAd: !1,
        userInfo: "",
        userLvInfo: {},
        gradeS: "",
        notice: !1,
        haveCoupon: !1,
        ToBePaid: "0",
        GoodsToBeReceived: "0",
        PendingDelivery: "0",
        miniProgramList: [],
        enter_time: 0,
        nickname: "",
        headImage: "",
        phone: "",
        listswiper: [],
        showAuthorizedMask: !1,
        clickTab: !1,
        userVersion: !1,
        xmad: {
            adData: {},
            ad: {
                banner: "xm23dab7299919b3cc3de2bb98e928d9"
            }
        }
    },
    onTabItemTap: function(e) {
        if (!this.data.clickTab) {
            this.data.clickTab = !0;
            var t = {
                event: "homePage_tab_button_click",
                activity_name: e.text,
                activity_type: e.index + ""
            };
            a.EVENT_LOG(t, function(e) {});
        }
    },
    onLoad: function() {
        this.loadAdvert(), wx.createInterstitialAd && ((s = wx.createInterstitialAd({
            adUnitId: "adunit-fc6cc6fd2aa3dc8a"
        })).onLoad(function() {}), s.onError(function(e) {}), s.onClose(function() {}));
    },
    onShow: function() {
        var i = this;
        "function" == typeof this.getTabBar && this.getTabBar() && this.getTabBar().setData({
            selected: 3
        });
        var o = {
            event: "my_zone_click",
            activity_type: "1"
        };
        a.EVENT_LOG(o), this.setData({
            userVersion: !0
        }), this.data.clickTab = !1, s && s.show().catch(function(e) {
            console.error(e);
        }), r.globalData.showAuthorizedMask && wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] ? (r.globalData.showAuthorizedMask = !1, i.setData({
                    showAuthorizedMask: !1
                })) : (r.globalData.showAuthorizedMask = !0, i.setData({
                    showAuthorizedMask: !0
                }));
            }
        }), n.USERINFO().userId || n.BSB_LOGIN(), i.ordernumber(), t.GETPROGRAMLIST(function(e) {
            i.setData({
                miniProgramList: e.data.result
            });
        }), e.INFO(function(e) {
            if (e.result) {
                if (!r.globalData.userLogindetail.userInfo) {
                    var t = {};
                    t.nickName = e.result.nickname, t.headImage = e.result.headImage, r.globalData.userLogindetail.userInfo = t;
                }
                e.result.nickname.length > 6 && (e.result.nickname = e.result.nickname.slice(0, 6) + "...");
                var a = e.result.topName;
                a && null != a && a.length > 4 && (a = a.slice(0, 3) + "..."), e.result.phone && null != e.result.phone && 11 == e.result.phone.length && i.setData({
                    phone: e.result.phone
                }), i.setData({
                    headImage: e.result.headImage,
                    nickname: e.result.nickname,
                    outId: e.result.outId,
                    signInDays: e.result.signInDays,
                    topName: a,
                    interrupt: e.result.interrupt,
                    isShowMywallet: e.result.displayWallet,
                    showReminderWallet: e.result.wallet,
                    userLvInfo: e.result,
                    gradeS: "/images/activity/" + e.result.gradeS + "_my.png"
                });
            }
        }), e.UNREADSYSTEMMESSAGE(function(e) {
            e.data.hasUnRead || e.data.couponRemind || wx.hideTabBarRedDot({
                index: 3
            }), i.setData({
                notice: e.data.hasUnRead,
                haveCoupon: e.data.couponRemind
            });
        }), this.data.enter_time = Date.parse(new Date()) / 1e3;
    },
    records: function(e) {
        wx.navigateTo({
            url: "/pages/mine_new/mall/order/order?id=" + e.currentTarget.dataset.status
        });
        var t = {
            event: "my_zone_MyOrder",
            activity_type: e.currentTarget.dataset.status
        };
        a.EVENT_THINKDATATRACK(t);
    },
    refund: function() {
        wx.navigateTo({
            url: "/pages/mine_new/mall/saleRefund/saleRefund"
        });
        var e = {
            event: "my_zone_MyOrder",
            activity_type: "4"
        };
        a.EVENT_THINKDATATRACK(e);
    },
    gotoSelfView: function() {
        wx.navigateTo({
            url: "/pages/community/personalhomepage/personalhomepage?friendId=" + n.USERINFO().userId
        });
        var e = {
            event: a.EVENT_COMMUNITY_ENTER_INDEX_MY_PAGE_CLICK,
            enter_source: "点击步数宝首页-我的-个人主页"
        };
        a.EVENT_LOG(e, function(e) {});
    },
    linkLvInfo: function(e) {
        wx.navigateTo({
            url: "/pages/growth/growth"
        });
        var t = {
            event: "mine_click_my_level",
            activity_type: e.currentTarget.dataset.name
        };
        a.EVENT_LOG(t, function(e) {});
    },
    todiary: function() {
        wx.navigateTo({
            url: "/pages/subpackage/diary/diary"
        });
        var e = {
            event: "mine_click_diary"
        };
        a.EVENT_LOG(e, function(e) {});
        var t = {
            event: "my_zone_click",
            activity_type: "15"
        };
        a.EVENT_THINKDATATRACK(t);
    },
    todiarys: function() {
        wx.navigateTo({
            url: "/pages/subpackage/Feedback/Feedback"
        });
    },
    adress_manager: function() {
        e.GETADDRESS(function(e) {
            Object.keys(e.data).length > 0 ? wx.navigateTo({
                url: "/pages/mine_new/addressInfo/addressInfo"
            }) : wx.navigateTo({
                url: "/pages/mine_new/address/address"
            });
        });
        var t = {
            event: "my_zone_click",
            activity_type: "6"
        };
        a.EVENT_THINKDATATRACK(t);
    },
    roles: function() {
        wx.navigateTo({
            url: "/pages/subpackage/roles/roles"
        });
    },
    message: function() {
        wx.navigateTo({
            url: "/pages/subpackage/message/message?noticeId=" + this.data.noticeId + "&content=" + this.data.content
        });
        var e = {
            event: "my_zone_click",
            activity_type: "5"
        };
        a.EVENT_THINKDATATRACK(e);
    },
    step_details: function() {
        wx.navigateTo({
            url: "/pages/setpDetails/setpDetails"
        });
        var e = {
            event: "my_zone_click",
            activity_type: "11"
        };
        a.EVENT_THINKDATATRACK(e);
    },
    collection: function() {
        wx.navigateTo({
            url: "/pages/mine_new/goodsCollection/goodsCollection"
        });
        var e = {
            event: a.EVENT_LOG_APP_CLICK_COOLECTION
        };
        a.EVENT_LOG(e, function(e) {});
        var t = {
            event: "my_zone_click",
            activity_type: "8"
        };
        a.EVENT_THINKDATATRACK(t);
    },
    friendList: function() {
        wx.navigateTo({
            url: "/pages/mine_new/friendList/friendList"
        });
        var e = {
            event: "my_zone_click",
            activity_type: "9"
        };
        a.EVENT_THINKDATATRACK(e);
    },
    helpList: function() {
        wx.navigateTo({
            url: "/pages/mine_new/helpList/helpList"
        });
        var e = {
            event: "my_zone_click",
            activity_type: "12"
        };
        a.EVENT_THINKDATATRACK(e);
    },
    linkCoupon: function() {
        wx.navigateTo({
            url: "/pages/coupon/myCoupon/myCoupon"
        }), a.EVENT_LOG({
            event: "mine_click_coupons"
        }, function(e) {});
        var e = {
            event: "my_zone_click",
            activity_type: "7"
        };
        a.EVENT_THINKDATATRACK(e);
    },
    ordernumber: function() {
        var t = this;
        e.ORDERNUMBER(function(e) {
            "OK" == e.code && t.setData({
                ToBePaid: e.data.ToBePaid + "",
                GoodsToBeReceived: e.data.GoodsToBeReceived + "",
                PendingDelivery: e.data.PendingDelivery + ""
            });
        });
    },
    clickKe: function() {
        var e = {
            event: "my_zone_click",
            activity_type: "10"
        };
        a.EVENT_THINKDATATRACK(e);
    },
    luckdraw: function() {
        wx.navigateTo({
            url: "/pages/mine_new/myluckdraw/myluckdraw"
        });
        var e = {
            event: "my_zone_click",
            activity_type: "4"
        };
        a.EVENT_THINKDATATRACK(e);
    },
    onHide: function() {
        var e = {
            event: a.ENENT_LOG_APP_ENTER_MINE,
            total_time: Date.parse(new Date()) / 1e3 - this.data.enter_time
        };
        a.EVENT_LOG(e, function(e) {});
    },
    getSignInfo: function() {
        var t = this;
        1 != this.data.interrupt ? e.INDEX_GETSIGIN(function(e) {
            "OK" == e.code && t.setData({
                listcl: e.data.result,
                isShow: 1
            });
        }) : wx.navigateTo({
            url: "/pages/activity/signView/newSignIn/newSignIn"
        });
    },
    help: function() {
        wx.navigateTo({
            url: "/pages/mine_new/helpAndFeedback/helpAndFeedback?nickname=" + this.data.nickname + "&headImage=" + this.data.headImage
        });
    },
    team: function() {
        wx.navigateTo({
            url: "/pages/team/team"
        });
        var e = {
            event: "mine_click_my_team"
        };
        a.EVENT_LOG(e, function(e) {});
        var t = {
            event: "my_zone_click",
            activity_type: "14"
        };
        a.EVENT_THINKDATATRACK(t);
    },
    mywallet: function() {
        wx.navigateTo({
            url: "/pages/mine_new/wallet/wallet?gradeNum=" + this.data.userLvInfo.gradeNum
        });
        var e = {
            event: "homepage_test004_click",
            activity_type: "我的页面-我的钱包"
        };
        a.EVENT_LOG(e, function(e) {});
    },
    maskAuthorized: function(e) {
        var t = this;
        if (e.detail.userInfo) {
            t.setData({
                showAuthorizedMask: !1
            }), r.globalData.showAuthorizedMask = !1;
            var i = e.detail.userInfo.nickName;
            i && null != i && i.length > 6 && (i = i.slice(0, 6) + "..."), t.setData({
                headImage: e.detail.userInfo.avatarUrl,
                nickname: i
            }), r.globalData.userLogindetail = e.detail, n.SYNCUSERINFO(e.detail, function(e) {});
            var o = {
                event: a.EVENT_LOG_PERSONINFO,
                activity_name: "我的页面"
            };
            a.EVENT_LOG(o, function(e) {});
        }
    },
    updateUserInfo: function(e) {
        var t = this;
        if (e.detail.userInfo) {
            t.setData({
                showAuthorizedMask: !1
            }), r.globalData.showAuthorizedMask = !1;
            var i = e.detail.userInfo.nickName;
            i && null != i && i.length > 6 && (i = i.slice(0, 6) + "..."), t.setData({
                headImage: e.detail.userInfo.avatarUrl,
                nickname: i
            }), r.globalData.userLogindetail = e.detail, n.SYNCUSERINFO(e.detail, function(e) {
                wx.showToast({
                    title: "信息更新成功",
                    icon: "none"
                });
            });
            var o = {
                event: a.EVENT_LOG_PERSONINFO,
                activity_name: "我的页面"
            };
            a.EVENT_LOG(o, function(e) {});
        }
    },
    loadAdvert: function() {
        var t = this;
        e.GETADVERINFO(17, function(e) {
            "OK" == e.code && t.setData({
                listswiper: e.data.result
            });
        });
    },
    loadAdError: function() {
        this.setData({
            noAd: !0
        });
    },
    clickAdFail: function(e) {
        var t = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: c[e.currentTarget.dataset.areatype],
            activity_name: " 广告内容关闭（取消）",
            commodity_id: e.currentTarget.dataset.appid
        };
        a.EVENT_LOG(t, function(e) {});
        var n = {
            event: a.EVENT_BSB_ADVERT_EVENTS,
            advert_events: c[e.currentTarget.dataset.areatype],
            advert_loc_name: c[e.currentTarget.dataset.areatype],
            advert_click: " 广告内容关闭（取消）",
            page_content_id: e.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(n);
    },
    clickAdSucess: function(e) {
        var t = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: c[e.currentTarget.dataset.areatype],
            activity_name: "广告内容点击（允许）",
            commodity_id: e.currentTarget.dataset.appid
        };
        a.EVENT_LOG(t, function(e) {});
        var n = {
            event: a.EVENT_BSB_ADVERT_EVENTS,
            advert_events: c[e.currentTarget.dataset.areatype],
            advert_loc_name: c[e.currentTarget.dataset.areatype],
            advert_click: " 广告内容点击（允许）",
            page_content_id: e.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(n), o.insertUserAdvert(e.currentTarget.dataset.appid, 17);
    },
    clickAd: function(e) {
        t.MINE_NEW_CKECKTHIRDPARTY(e.currentTarget.dataset.id, e.currentTarget.dataset.hitnumlimit, function(e) {});
        var n = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: c[e.currentTarget.dataset.areatype],
            activity_name: "广告点击",
            commodity_id: e.currentTarget.dataset.appid
        };
        a.EVENT_LOG(n, function(e) {});
        var i = {
            event: a.EVENT_BSB_ADVERT_EVENTS,
            advert_events: c[e.currentTarget.dataset.areatype],
            advert_loc_name: c[e.currentTarget.dataset.areatype],
            advert_click: " 广告点击",
            page_content_id: e.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(i);
        var r = {
            event: "my_zone_click",
            activity_type: "18",
            activity_id: e.currentTarget.dataset.appid
        };
        a.EVENT_THINKDATATRACK(r);
    },
    linkUrl: function(e) {
        var t = {
            event: "my_zone_click",
            activity_type: "2"
        };
        if (a.EVENT_THINKDATATRACK(t), 1 == e.currentTarget.dataset.type) {
            e.currentTarget.dataset.url;
            wx.navigateTo({
                url: e.currentTarget.dataset.url,
                fail: function() {
                    wx.showToast({
                        title: "该功能暂未开放",
                        icon: "none"
                    });
                }
            });
        }
        if (3 == e.currentTarget.dataset.type) {
            e.currentTarget.dataset.url;
            wx.navigateTo({
                url: "/pages/webView/webView?webUrl=" + encodeURIComponent(e.currentTarget.dataset.url),
                fail: function() {
                    wx.showToast({
                        title: "该功能暂未开放",
                        icon: "none"
                    });
                }
            });
        }
        var n = {
            event: a.EVENT_HOMEPAGEADBUTTON,
            activity_type: e.currentTarget.dataset.areatype,
            activity_name: e.currentTarget.dataset.url
        };
        a.EVENT_LOG(n, function(e) {});
    },
    toFire: function() {
        wx.navigateTo({
            url: "/pages/fireZone/fireZone"
        });
        var e = {
            event: "my_zone_click",
            activity_type: "16"
        };
        a.EVENT_THINKDATATRACK(e);
    },
    goToFeedback: function() {
        wx.navigateTo({
            url: "/pages/subpackage/Feedback/Feedback"
        });
        var e = {
            event: "my_zone_click",
            activity_type: "17"
        };
        a.EVENT_THINKDATATRACK(e);
    }
});