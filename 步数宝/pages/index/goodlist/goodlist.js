function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = getApp(), e = require("../../../utils/event.js"), o = require("../../../utils/room.js"), s = require("../../../utils/urlGL.js"), i = require("../../../utils/utils.js"), d = require("../../../utils/wglogin.js"), n = require("../../../utils/urls.js"), r = require("../../../utils/request.js"), c = require("../../../utils/util.js"), u = null, h = void 0, g = null;

Page({
    data: {
        list: {},
        bannerAdHidden: !1,
        isAnimation: !1,
        windowHeight: "",
        autoplay: !0,
        interval: 2e3,
        duration: 500,
        hidden: !0,
        region: [ "请选择", "", "" ],
        flag: 0,
        subshow: !0,
        addressNull: !1,
        hasAddress: !1,
        address: "",
        goodid: "",
        listFlag: !1,
        goodsApplication: "",
        goodsImg: "",
        goodsPrice: "",
        goodsname: "",
        cash: "",
        goodsNum: 0,
        goodsProperty: "",
        btnText: "立即兑换",
        showAuthorizedMask: !1,
        statusImg: !1,
        statusTap: !0,
        collection: null,
        enter_time: 0,
        showDetails: !1,
        discardedCash: "",
        hideShopPopup: !0,
        isMoney: !1,
        buyNumber: 1,
        buyNumMin: 1,
        buyNumMax: "",
        moneytype: "",
        storelist: {},
        coupon: !0,
        couponList: [],
        shopCarNum: 0,
        haveExchange: !1,
        goodsCategoryNew: "1",
        videoLoadSuccess: !1,
        videoAdTime: 0,
        showGoApp: !1,
        frequency: 0,
        goodsTimes: 0,
        showVow: !1,
        isNewUser: -1,
        countFlage: !1,
        showWrong: !1
    },
    pageDiamond: function() {
        wx.navigateTo({
            url: "/pages/classify/newClassify/newClassify?type=DIAMOND"
        });
    },
    showCoupon: function() {
        this.getCouponInfo(), this.setData({
            coupon: !1
        });
        var t = {
            event: e.EVENT_LOG_ENTERINDEXGOODDETAILSCLICK,
            commodity_id: this.data.goodid,
            commodity_showcase_type: this.getGoodsType(),
            activity_name: "查看优惠券"
        };
        e.EVENT_LOG(t);
    },
    closeCoupon: function() {
        this.setData({
            coupon: !0
        });
    },
    getShopCarNum: function() {
        var t = this;
        r.POST({
            url: n.SHOPCARTGOODSNUM,
            params: {},
            success: function(a) {
                t.setData({
                    shopCarNum: a.data.result.goodsNums
                });
            },
            fail: function(t) {}
        });
    },
    toShopCar: function() {
        wx.navigateTo({
            url: "/pages/coupon/shopCar/shopCar"
        });
        var t = {
            event: e.EVENT_LOG_ENTER_INDEX_GOODDETAILS,
            commodity_id: this.data.goodid,
            commodity_showcase_type: this.getGoodsType(),
            activity_name: "购物车图标按钮"
        };
        e.EVENT_LOG(t);
    },
    getCouponInfo: function() {
        var t = this;
        r.POST({
            url: n.COUPONLIST,
            params: {
                status: 1
            },
            success: function(a) {
                t.setData({
                    couponList: a.data.data
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    addressFunction: function() {
        var t = this;
        o.LISTINFO(this.data.goodid, function(a) {
            Object.keys(a.data.address).length <= 0 ? t.data.addressNull = !0 : t.setData({
                address: a.data.address
            });
        });
    },
    onLoad: function(t) {
        var o = this, s = 750 * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth;
        if (t.goodid && (o.data.goodid = t.goodid), o.setData({
            windowHeight: s
        }), a.globalData.showAuthorizedMask && wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] ? (a.globalData.showAuthorizedMask = !1, o.setData({
                    showAuthorizedMask: !1
                })) : (a.globalData.showAuthorizedMask = !0, o.setData({
                    showAuthorizedMask: !0
                }));
            }
        }), wx.getStorage({
            key: "newFirst",
            success: function(t) {
                t.data ? o.setData({
                    isNewUser: 1
                }) : o.setData({
                    isNewUser: -1
                });
            }
        }), o.onLoadVideoAd(), o.loadBannerAd(), 4029 == t.goodid) {
            var i = {
                event: "homepage_test004_click",
                activity_type: "指定兑换商品详情页面-曝光"
            };
            e.EVENT_LOG(i);
        }
    },
    listInfo: function(t) {
        var a = this;
        o.LISTINFO(a.data.goodid, function(o) {
            if ("OK" == o.code) {
                if (19 == o.data.result.buttonType && o.data.result.exchangeDate && a.hourHandle(o.data.result.exchangeDate), 
                Object.keys(o.data.address).length <= 0 ? a.data.addressNull = !0 : a.setData({
                    address: o.data.address
                }), 1 == o.data.result.status ? a.setData({
                    collection: !0
                }) : 0 == o.data.result.status && a.setData({
                    collection: !1
                }), a.data.goodsProperty = o.data.result.goodsProperty, a.data.goodsApplication = o.data.result.goodsApplication, 
                a.setData({
                    list: o.data.result,
                    sunDrying: o.data.sunDrying,
                    goodsImg: o.data.result.goodsImg,
                    goodsPrice: o.data.result.goodsPrice,
                    goodsname: o.data.result.goodsName,
                    cash: o.data.result.goodsCash + "",
                    discardedCash: o.data.result.discardedCash + "",
                    goodsType: o.data.result.goodsType,
                    goodsCategoryNew: o.data.result.goodsCategoryNew,
                    goodsNum: o.data.result.goodsNum,
                    status: o.data.result.status,
                    recallCondition: o.data.result.recallCondition + ""
                }), o.data.storeInfo && a.setData({
                    storelist: o.data.storeInfo
                }), "TIME_PURCHASE" == a.data.list.goodsType && a.getShopCarNum(), o.data.result.goodsDetailImgList && (o.data.result.goodsDetailImgList.length > 0 ? a.setData({
                    showDetails: !0
                }) : a.setData({
                    showDetails: !1
                })), a.setData({
                    frequency: o.data.result.fireNum ? o.data.result.fireNum : 0,
                    goodsTimes: o.data.result.fireTime ? o.data.result.fireTime : 0
                }), 10 == a.data.list.goodsCategoryNew && t) {
                    var s = {
                        event: "homePage_wish_zone_goods_detail",
                        activity_type: "曝光",
                        activity_name: a.data.goodid
                    };
                    e.EVENT_LOG(s, function(t) {});
                }
                var i = Date.parse(new Date());
                wx.getStorage({
                    key: "goodsData",
                    success: function(t) {
                        (i - t.data.timestamp) / 1e3 > a.data.goodsTimes || !1 === t.data.countFlage ? a.setData({
                            videoAdTime: 0
                        }) : (a.setData({
                            videoAdTime: a.data.goodsTimes - (i - t.data.timestamp) / 1e3
                        }), a.countDown(a.data.goodsTimes - (i - t.data.timestamp) / 1e3));
                    }
                });
            } else wx.showToast({
                title: o.msg + "",
                icon: "none",
                duration: 2e3
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 2500);
        });
    },
    addShopCar: function() {
        var t = this, a = {
            goodsId: this.data.goodid,
            goodsNum: this.data.buyNumber,
            selectStatus: 0
        };
        r.POST({
            url: n.ADD_SHOP,
            params: a,
            success: function(a) {
                "OK" == a.code ? (wx.showToast({
                    title: "添加购物车成功",
                    icon: "none"
                }), t.getShopCarNum()) : wx.showToast({
                    title: a.msg,
                    icon: "none"
                });
            },
            fail: function(t) {}
        });
        var o = {
            event: e.EVENT_LOG_ENTER_INDEX_GOODDETAILS,
            commodity_id: this.data.goodid,
            commodity_showcase_type: this.getGoodsType(),
            activity_name: "加入购物车"
        };
        e.EVENT_LOG(o);
    },
    exchange: function(t) {
        if (this.data.goodsNum > 0 && this.data.buyNumber > 0) if (this.setData({
            hideShopPopup: !0
        }), "TIME_PURCHASE" == this.data.list.goodsType && 1 == t.currentTarget.dataset.moneytype) this.addShopCar(); else if ("TIME_PURCHASE" == this.data.list.goodsType && 0 == t.currentTarget.dataset.moneytype) {
            var a = [], o = {
                shopId: t.currentTarget.dataset.shopid,
                id: this.data.goodid,
                num: this.data.buyNumber
            };
            a.push(o), 10 == this.data.list.goodsCategoryNew ? wx.navigateTo({
                url: "/pages/coupon/sumbitorder/sumbitorder?isWish=1&goodsList=" + JSON.stringify(a)
            }) : wx.navigateTo({
                url: "/pages/coupon/sumbitorder/sumbitorder?goodsList=" + JSON.stringify(a)
            });
        } else {
            console.log(t.currentTarget.dataset.moneytype), wx.navigateTo({
                url: "/pages/mine_new/mall/sumbitorder/sumbitorder?goodid=" + this.data.goodid + "&moneytype=" + t.currentTarget.dataset.moneytype + "&buyNumber=" + this.data.buyNumber
            });
            var s = {
                event: e.EVENT_LOG_GOODDETAILSCLICK,
                commodity_id: this.data.goodid
            };
            e.EVENT_LOG(s);
        } else wx.showToast({
            title: "库存不足",
            icon: "none",
            duration: 2e3
        });
    },
    pullPop: function(t) {
        var a = this;
        t.currentTarget.dataset.onlyapp && 1 == t.currentTarget.dataset.onlyapp ? wx.showModal({
            title: "兑换提醒",
            content: "该商品只能在App上兑换并用微信登录，快去下载吧",
            success: function(t) {
                var o = void 0;
                t.confirm ? (o = {
                    event: e.EVENT_LOG_COMMODITYDETAILS_EXCHANGE_NOTICE,
                    activity_name: "确定"
                }, a.getWxCard()) : t.cancel && (o = {
                    event: e.EVENT_LOG_COMMODITYDETAILS_EXCHANGE_NOTICE,
                    activity_name: "取消"
                }), e.EVENT_LOG(o);
            }
        }) : "TIME_PURCHASE" == a.data.list.goodsType && "ENTITY" == a.data.list.goodsProperty ? "0" == t.currentTarget.dataset.moneytype ? a.setData({
            hideShopPopup: !1,
            isMoney: !1,
            moneytype: "0"
        }) : "1" == t.currentTarget.dataset.moneytype && a.setData({
            hideShopPopup: !1,
            isMoney: !0,
            moneytype: "1"
        }) : a.exchange(t);
    },
    getnull: function(t) {
        var a = !1;
        "contacts" == t.target.id ? t.detail.value != this.data.contacts && (a = !0, this.data.contactv = t.detail.value) : "numbers" == t.target.id ? (t.detail.value != this.data.numbers && (a = !0), 
        this.data.numbersv = t.detail.value) : "address" == t.target.id && t.detail.value != this.data.address && (a = !0, 
        this.data.addressv = t.detail.value), a = a && !i.isEmpty(this.data.contactv) && !i.isEmpty(this.data.numbersv) && !i.isEmpty(this.data.addressv), 
        this.setData({
            isSave: !a
        });
    },
    save: function() {
        var t = this, a = /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
        void 0 == t.data.contactv || void 0 == t.data.numbersv || void 0 == t.data.addressv || "" == t.data.region[1] || "" == t.data.region[2] ? wx.showToast({
            title: "请输入正确信息",
            icon: "none",
            duration: 1500
        }) : a.test(t.data.numbersv) ? o.SAVEADDRESS(t.data.contactv, t.data.numbersv, t.data.addressv, t.data.region, function(a) {
            "OK" == a.code ? (t.addressFunction(), t.data.addressNull = !1, t.setData({
                addressId: a.data.addressId,
                subshow: !1,
                hidden: !0
            })) : (wx.showToast({
                title: a.msg + "",
                icon: "none",
                duration: 2e3
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 2500));
        }) : wx.showToast({
            title: "请输入正确手机号",
            icon: "none",
            duration: 1500
        });
    },
    confirm: function() {
        this.save();
    },
    cancel: function() {
        this.setData({
            hidden: !0
        });
    },
    cancel2: function() {
        o.CHECKFID("", "", function(t) {}), this.setData({
            subshow: !0
        });
    },
    changeRegin: function(t) {
        this.setData({
            region: t.detail.value
        });
    },
    formSubmit: function(t) {
        var s = this;
        s.setData({
            subshow: !0
        }), o.CONVERT(s.data.address.id || s.data.addressId, s.data.goodsprice, s.data.id, 1, "NORMAL", function(e) {
            "OK" == e.code ? (a.globalData.isRefreshList = !0, o.CHECKFID(t.detail.formId, "", function(t) {
                "OK" == t.code ? wx.redirectTo({
                    url: "/pages/changed/changed?img=" + s.data.list.goodsImgList[0]
                }) : (wx.showToast({
                    title: t.msg + "",
                    icon: "none",
                    duration: 2e3
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 2500));
            })) : "TOKEN_NOT_ENOUGH" == e.code ? wx.showModal({
                content: "您的燃力不足",
                showCancel: !1
            }) : "ERR_NOT_EXIST" == e.code ? s.setData({
                hidden: !1
            }) : wx.showModal({
                content: e.msg,
                showCancel: !1
            });
        });
        var i = {
            event: e.EVENT_LOG_BUY,
            commodity_id: s.data.goodid
        };
        e.EVENT_LOG(i);
    },
    onShareAppMessage: function(t) {
        var a = d.USERINFO().userId, o = "商品详情页顶部三个点分享", i = this.data.list.goodsImg;
        if ("button" == t.from) if (3 == t.target.dataset.type) {
            o = "推荐给好友按钮分享";
            var n = {
                event: "homePage_wish_zone_goods_detail",
                activity_type: "点击推荐给好友按钮",
                activity_name: this.data.goodid
            };
            e.EVENT_LOG(n, function(t) {});
        } else o = "wish" == t.target.dataset.type ? "实现心愿按钮" : "底部按钮分享";
        var r = d.USERINFO().userId + "" + Date.parse(new Date()) / 1e3, c = {
            event: "commodityDetails_share_friendShare",
            commodity_id: this.data.goodid,
            share_source: o,
            share_card_id: r,
            activity_name: this.data.goodsname,
            activity_type: this.getGoodsType()
        };
        e.EVENT_LOG(c);
        var u = {
            event: e.EVENT_BSB_SHARE_EVENTS,
            share_card_id: r,
            page_content_name: this.data.goodsname,
            page_content_type: this.getGoodsType(),
            share_loc: o,
            share_events: "商品详情",
            page_content_id: this.data.goodid
        };
        if ("wish" == t.target.dataset.type) {
            u.share_events = "商品详情-实现心愿分享";
            var h = {
                share_loc: u.share_loc || "",
                share_events: "心愿专区-商品详情",
                flag: r,
                basisPath: "/pages/subpackage/wish/wishInfo/wishInfo?friendId=" + d.USERINFO().userId + "&wishId=" + this.data.list.wishId,
                source: 31
            }, g = s.BASISSHAREPATH(h);
            return e.EVENT_THINKDATATRACK(u), {
                title: "你的北极星点亮了吗？我的还差" + (8 - this.data.list.starNum) + "颗星，一起来玩吧",
                path: g,
                imageUrl: "https://sns-images.bushubao.cn/img/2019/11/15/11/644858599429466793c22623397b9a38&420&334&.png",
                success: function(t) {}
            };
        }
        if ("button" == t.from && "TIME_PURCHASE" == this.data.list.goodsType && "TIME_PURCHASE" == this.data.list.goodsType) {
            u.share_events = "商品详情-常规用户分享";
            var l = {
                share_loc: u.share_loc || "",
                share_events: u.share_events,
                flag: r,
                goodsId: this.data.goodid,
                basisPath: "/pages/index/shareLand/shareLand?shareGoodsId=" + this.data.goodid + "&fromUserId=" + a + "&pageType=2"
            }, m = s.BASISSHAREPATH(l);
            return e.EVENT_THINKDATATRACK(u), {
                title: "这个商品很适合你，快来看一下！",
                path: m,
                imageUrl: i,
                success: function(t) {}
            };
        }
        if ("BSB_B" == this.data.list.goodsType) {
            var _ = 2, p = "我正在步数宝免费兑换商品，真的可以领到，快来一起免费拿吧！";
            u.share_events = "商品详情-B版纯币专区分享", 3 == this.data.list.goodsCategoryNew && (_ = 1, 
            p = "我正在步数宝免费兑换商品，真的可以领到，快来帮我看一下！", u.share_events = "商品详情-B版火力专区分享");
            var T = {
                share_loc: u.share_loc || "",
                share_events: u.share_events,
                flag: r,
                goodsId: this.data.goodid,
                basisPath: "/pages/index/shareLand/shareLand?shareGoodsId=" + this.data.goodid + "&fromUserId=" + a + "&pageType=" + _
            }, y = s.BASISSHAREPATH(T);
            return e.EVENT_THINKDATATRACK(u), {
                title: p,
                path: y,
                imageUrl: i,
                success: function(t) {}
            };
        }
        u.share_events = "商品详情-常规用户分享";
        var f = {
            share_loc: u.share_loc || "",
            share_events: u.share_events,
            flag: r,
            goodsId: this.data.goodid,
            basisPath: "/pages/index/shareLand/shareLand?shareGoodsId=" + this.data.goodid + "&fromUserId=" + a + "&pageType=2"
        }, v = s.BASISSHAREPATH(f);
        return e.EVENT_THINKDATATRACK(u), {
            title: "我想买这个，帮我看看是不是正品，谢啦~",
            path: v,
            imageUrl: i,
            success: function(t) {}
        };
    },
    bindcancel: function() {},
    fc: function() {
        var t = this;
        t.setData({
            disabled: !0
        }), setTimeout(function() {
            t.setData({
                disabled: !1
            });
        }, 1e3);
    },
    correct: function(t) {
        this.setData({
            name: t.currentTarget.dataset.name,
            goodsprice: t.currentTarget.dataset.goodsprice,
            id: t.currentTarget.dataset.id,
            subshow: !1,
            hasAddress: !1
        });
    },
    tost: function(t) {
        var a = this;
        console.log(t);
        var o = this;
        s.SENDGOODSC(t.currentTarget.dataset.goodsid, o.data.status, function(t) {
            if ("OK" == t.code) {
                0 == o.data.status ? o.setData({
                    status: 1
                }) : 1 == o.data.status && o.setData({
                    status: 0
                }), o.setData({
                    collection: !o.data.collection
                }), wx.showToast({
                    title: 1 == o.data.status ? "收藏商品成功" : "取消收藏成功",
                    icon: "none",
                    duration: 2e3
                });
                var s = {
                    event: e.EVENT_LOG_CLICK_GOODCOLLECT,
                    commodity_id: o.data.goodid,
                    activity_type: 1 == o.data.status ? "收藏" : "取消收藏"
                };
                if (e.EVENT_LOG(s), 10 == a.data.list.goodsCategoryNew) {
                    var i = {
                        event: "homePage_wish_zone_goods_detail",
                        activity_type: "点击收藏",
                        activity_name: o.data.goodid
                    };
                    e.EVENT_LOG(i, function(t) {});
                }
            }
        }, function(t) {});
    },
    turn_exchangelist: function() {
        if (wx.navigateTo({
            url: "/pages/index/goodlist/exchangelist/exchangelist?goodsId=" + this.data.goodid
        }), 10 == this.data.list.goodsCategoryNew) {
            var t = {
                event: "homePage_wish_zone_goods_detail",
                activity_type: "点击兑换记录查看按钮",
                activity_name: this.data.goodid
            };
            e.EVENT_LOG(t, function(t) {});
        }
    },
    gocommity: function(t) {
        var a = {
            event: e.EVENT_LOG_ENTERINDEXGOODDETAILSCLICK,
            activity_type: t.currentTarget.dataset.type,
            activity_name: t.currentTarget.dataset.name
        };
        e.EVENT_LOG(a), wx.navigateTo({
            url: "/pages/community/topicList/topicList?topicId=2&enterSource=1&topicName=晒晒我用燃力兑到的那些好东西"
        });
    },
    onShow: function() {
        this.data.enter_time = Date.parse(new Date()) / 1e3, this.listInfo(!0);
    },
    onUnload: function() {
        clearTimeout(h);
        var t = 0;
        this.data.list.goodsCash && this.data.list.goodsCash > 0 ? t = 1 : this.data.list.postage && this.data.list.postage > 0 && (t = 2);
        var a = {};
        a.timestamp = Date.parse(new Date()), a.videoAdTime = this.data.goodsTimes, a.countFlage = this.data.countFlage, 
        wx.setStorage({
            key: "goodsData",
            data: a
        });
        var o = {
            event: e.EVENT_LOG_ENTER_INDEX_GOODDETAILS,
            total_time: Date.parse(new Date()) / 1e3 - this.data.enter_time,
            commodity_id: this.data.goodid,
            activity_type: this.data.goodsProperty,
            commodity_showcase_type: this.getGoodsType(),
            money_flag: t
        };
        e.EVENT_LOG(o), e.EVENT_DATA_LOG(o);
    },
    maskAuthorized: function(t) {
        var o = this;
        if (t.detail.userInfo) {
            o.setData({
                showAuthorizedMask: !1
            }), a.globalData.showAuthorizedMask = !1, d.SYNCUSERINFO(t.detail, function(t) {});
            var s = {
                event: e.EVENT_LOG_PERSONINFO,
                activity_name: "商品详情"
            };
            e.EVENT_LOG(s);
        }
    },
    numReduceTap: function() {
        if (this.data.buyNumber > this.data.buyNumMin) {
            var t = this.data.buyNumber;
            t--, this.setData({
                buyNumber: t
            });
        }
    },
    numAddTap: function() {
        if ("1" == this.data.moneytype) if (Number(this.data.buyNumber) < Number(this.data.list.goodsNum)) {
            var t = this.data.buyNumber;
            t++, this.setData({
                buyNumber: t
            });
        } else wx.showToast({
            title: "库存不足",
            icon: "none"
        }); else if (this.data.buyNumber < this.data.list.goodsNum) if (a.globalData.balance >= this.data.goodsPrice * (this.data.buyNumber + 1)) {
            var e = this.data.buyNumber;
            e++, this.setData({
                buyNumber: e
            });
        } else wx.showToast({
            title: "燃力不足",
            icon: "none"
        }); else wx.showToast({
            title: "库存不足",
            icon: "none"
        });
    },
    closePopupTap: function() {
        this.setData({
            hideShopPopup: !0
        });
    },
    recallPage: function() {
        wx.navigateTo({
            url: "/pages/activity/friendCall/friendCall"
        });
    },
    signPage: function(t) {
        6 == t.currentTarget.dataset.buttontype ? wx.navigateTo({
            url: "/pages/activity/signView/newSignIn/newSignIn"
        }) : 10 == t.currentTarget.dataset.buttontype && wx.navigateTo({
            url: "/pages/activity/signView/signViewB/signViewB"
        });
    },
    linkGrowth: function() {
        wx.navigateTo({
            url: "/pages/growth/growth"
        });
    },
    linkActiveRewardB: function() {
        wx.navigateTo({
            url: "/pages/index/activeReward/activeRewardB"
        });
    },
    throttleFn: c.throttle(function(t) {
        var a = this;
        a.setData({
            isAnimation: !0
        }), a.data.countFlage = !0, a.countDown(a.data.goodsTimes), setTimeout(function() {
            a.setData({
                isAnimation: !1
            }), a.videoAdRewardFirepower();
        }, 2800);
    }, 5e3),
    onLoadVideoAd: function() {
        var t = this;
        wx.createRewardedVideoAd && ((u = wx.createRewardedVideoAd({
            adUnitId: "adunit-4d4eb9c5f6b8fd44"
        })).onLoad(function(a) {
            t.data.videoLoadSuccess = !0;
        }), u.onError(function(a) {
            t.data.videoLoadSuccess = !1;
        }), u.onClose(function(a) {
            if (a && a.isEnded || void 0 === a) t.throttleFn(); else {
                wx.showToast({
                    title: "视频观看完，才能获取火力值哦",
                    icon: "none"
                });
                var o = {
                    event: e.EVENT_LOG_ENTER_INDEX_GOODDETAILS,
                    commodity_id: t.data.goodid,
                    commodity_showcase_type: t.getGoodsType(),
                    activity_name: "视频未观看完整"
                };
                e.EVENT_LOG(o);
            }
        }));
    },
    loadBannerAd: function() {
        if (!(d.CREATEBETWEENTIME() < 7)) {
            var t = c.getLoginCounts("goodsDetailCount");
            c.setStorageCount("goodsDetailCount"), t > 1 || (wx.createInterstitialAd && ((g = wx.createInterstitialAd({
                adUnitId: "adunit-4d0c56fbafcf8e67"
            })).onLoad(function() {}), g.onError(function(t) {}), g.onClose(function() {})), 
            g && g.show().catch(function(t) {
                console.error(t);
            }));
        }
    },
    openVideoAd: function() {
        if (this.data.videoAdTime > 0) this.data.videoLoadSuccess = !0; else if (this.data.videoLoadSuccess && 0 != this.data.frequency) {
            if (u) {
                u.show().catch(function(t) {
                    u.load().then(function() {
                        return u.show();
                    });
                });
                var t = {
                    event: e.EVENT_LOG_ENTER_INDEX_GOODDETAILS,
                    commodity_id: this.data.goodid,
                    commodity_showcase_type: this.getGoodsType(),
                    activity_name: "看视频攒火力值"
                };
                e.EVENT_LOG(t);
            }
        } else {
            this.setData({
                showGoApp: !0
            });
            var a = {
                event: "enter_index_gooddetails",
                commodity_id: this.data.goodid,
                commodity_showcase_type: this.getGoodsType(),
                activity_name: "弹窗-无视频&APP转化-曝光"
            };
            e.EVENT_LOG(a);
        }
    },
    hourHandle: function(t) {
        var a = this;
        this.data.timer = setInterval(function() {
            a.setData({
                timeLeft: c.getTimeLeft(t)
            }), "0天0时0分0秒" == a.data.timeLeft && (clearInterval(a.data.timer), a.listInfo());
        }, 1e3);
    },
    countDown: function(t) {
        var a = this;
        a.setData({
            videoAdTime: t
        }), t > 0 ? h = setTimeout(function() {
            a.countDown(t - 1);
        }, 1e3) : a.data.countFlage = !1;
    },
    hideGoAppFn: function() {
        this.setData({
            showGoApp: !1
        });
        var t = {
            event: "enter_index_gooddetails",
            commodity_id: this.data.goodid,
            commodity_showcase_type: this.getGoodsType(),
            activity_name: "弹窗-无视频&APP转化-取消/关闭"
        };
        e.EVENT_LOG(t);
    },
    linkAppDownLoad: function() {
        this.setData({
            showGoApp: !1
        }), this.getWxCard();
        var t = {
            event: "enter_index_gooddetails",
            commodity_id: this.data.goodid,
            commodity_showcase_type: this.getGoodsType(),
            activity_name: "弹窗-无视频&APP转化-去APP观看更多视频"
        };
        e.EVENT_LOG(t);
    },
    videoAdRewardFirepower: function() {
        var t = this;
        r.POST({
            url: n.api_videoAdRewardFirepower,
            params: {
                fromUserId: d.USERINFO().userId,
                goodsId: t.data.goodid
            },
            success: function(a) {
                if ("OK" == a.code) {
                    t.setData({
                        frequency: t.data.frequency - 1
                    }), console.log(t.data.frequency), t.listInfo();
                    var o = {
                        event: e.EVENT_LOG_ENTER_INDEX_GOODDETAILS,
                        commodity_id: t.data.goodid,
                        commodity_showcase_type: t.getGoodsType(),
                        activity_name: "看视频成功获取火力值"
                    };
                    e.EVENT_LOG(o);
                } else wx.showToast({
                    title: a.msg,
                    icon: "none"
                });
            },
            fail: function(t) {}
        });
    },
    gotoIndex: function(t) {
        wx.switchTab({
            url: "/pages/index/index"
        });
        var a = {
            event: e.EVENT_LOG_ENTER_INDEX_GOODDETAILS,
            commodity_id: this.data.goodid,
            commodity_showcase_type: this.getGoodsType(),
            activity_name: t.currentTarget.dataset.type
        };
        if (e.EVENT_LOG(a), 4029 == this.data.goodid && 30 == this.data.list.buttonType) {
            var o = {
                event: "homepage_test004_click",
                activity_type: "指定兑换商品详情页面-燃力不足快去兑换燃力吧"
            };
            e.EVENT_LOG(o);
        }
    },
    shareTap: function(t) {
        var a = {
            event: e.EVENT_LOG_ENTER_INDEX_GOODDETAILS,
            commodity_id: this.data.goodid,
            commodity_showcase_type: this.getGoodsType(),
            activity_name: t.currentTarget.dataset.type
        };
        e.EVENT_LOG(a);
    },
    getGoodsType: function() {
        return "BSB_B" == this.data.goodsType ? s.commodityArea_B()[this.data.goodsCategoryNew] : s.COMMODITYAREA()[this.data.goodsType];
    },
    getWxCard: function() {
        wx.navigateTo({
            url: "/pages/index/goodlist/wechatCard/wechatCard"
        });
    },
    firepower: function() {
        wx.navigateTo({
            url: "/pages/index/fireDetail/fireDetail"
        });
    },
    loadBannerAdSuccess: function() {
        this.setData({
            bannerAdHidden: !1
        });
    },
    loadBannerAdError: function() {
        this.setData({
            bannerAdHidden: !0
        });
    },
    goToMall: function() {
        wx.switchTab({
            url: "/pages/mallsHome/mallsHome"
        });
    },
    handleRepReminder: function(t) {
        var a = this, e = t.currentTarget.dataset.status;
        if (1 == e) {
            var o = wx.getSystemInfoSync().SDKVersion;
            i.compareVersion(o, "2.8.2") >= 0 ? wx.requestSubscribeMessage({
                tmplIds: [ "2LkDMbb92_tXIUeHzreAsBuAgwOj_AC5dm40zeyBUWQ" ],
                success: function(t) {
                    "accept" == t["2LkDMbb92_tXIUeHzreAsBuAgwOj_AC5dm40zeyBUWQ"] && a.subRepReminder(e);
                }
            }) : wx.showModal({
                title: "提示",
                content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
            });
        } else a.subRepReminder(e);
    },
    subRepReminder: function(a) {
        var o = this;
        r.POST({
            url: n.HTTP_URL + "api/goods/v1/replenishmentRemindSave",
            params: {
                goodsId: o.data.list.id,
                status: a
            },
            success: function(s) {
                if ("OK" == s.code) {
                    if (wx.showToast({
                        title: "设置成功",
                        icon: "none"
                    }), 1 == a) {
                        var i = {
                            event: "Free_exchange _page_of_goods",
                            activity_type: "1",
                            activity_name: o.data.list.id
                        };
                        e.EVENT_LOG(i);
                    }
                    o.setData(t({}, "list.replenishmentRemindStatus", a));
                }
            },
            fail: function() {}
        });
    },
    showVowFn: function(t) {
        this.setData({
            showVow: !0
        });
        var a = {
            event: "homePage_wish_zone_goods_detail",
            activity_type: "点击许愿免费拿按钮",
            activity_name: this.data.goodid
        };
        e.EVENT_LOG(a, function(t) {});
    },
    ownWish: function() {
        var t = this;
        r.POST({
            url: n.OWNWISH,
            params: {
                goodsId: t.data.goodid,
                newUser: t.data.isNewUser
            },
            success: function(a) {
                "OK" == a.code ? (t.setData({
                    showVow: !1
                }), wx.navigateTo({
                    url: "/pages/subpackage/wish/wishInfo/wishInfo?friendId=" + d.USERINFO().userId
                })) : "TOKEN_NOT_ENOUGH" == a.code ? t.setData({
                    showWrong: !0,
                    showVow: !1
                }) : wx.showToast({
                    title: a.msg,
                    icon: "none"
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    hideVowFn: function() {
        this.setData({
            showVow: !1
        });
    },
    hideWrongFn: function() {
        this.setData({
            showWrong: !1
        });
    },
    linkWishInfo: function(t) {
        wx.navigateTo({
            url: "/pages/subpackage/wish/wishInfo/wishInfo?friendId=" + d.USERINFO().userId + "&wishId=" + t.currentTarget.dataset.id
        });
        var a = {
            event: "homePage_wish_zone_goods_detail",
            activity_type: "点击商品许愿瓶",
            activity_name: this.data.goodid
        };
        e.EVENT_LOG(a, function(t) {});
    }
});