var e = require("../../utils/util.js"), t = require("../../utils/globalDefine.js"), s = require("../../network/httpRequest.js");

Page({
    data: {
        iesId: "",
        integralNum: "",
        isAuthAddress: !0,
        addressInfo: {},
        addressModal: !0,
        dAnimation: null,
        goodsInfo: {},
        successModal: !0
    },
    bindToExchange: function() {
        t.safetySwitchPage("../exchange/exchange");
    },
    bindShowSuccess: function() {
        this.setData({
            successModal: !1
        });
    },
    bindHideSuccess: function() {
        this.setData({
            successModal: !0
        });
    },
    chooseAddress: function() {
        var t = this;
        wx.chooseAddress({
            success: function(e) {
                if (e.hasAddressInfo = !0, "内蒙古自治区" === e.provinceName || "西藏自治区" === e.provinceName || "新疆维吾尔自治区" === e.provinceName) return setTimeout(function() {
                    wx.showToast({
                        title: "物流暂不支持" + e.provinceName + "地区！",
                        icon: "none",
                        duration: 3e3
                    });
                }, 1e3), !1;
                t.setData({
                    addressInfo: e
                });
                try {
                    wx.setStorageSync("addressInfo", e);
                } catch (e) {}
            },
            fail: function(s) {
                e.log(s), wx.getSetting({
                    success: function(e) {
                        e.authSetting["scope.address"] || t.setData({
                            isAuthAddress: !1
                        });
                    }
                });
            }
        });
    },
    bindOpenSetting: function(e) {
        e.detail.authSetting["scope.address"] && this.setData({
            isAuthAddress: !0
        });
    },
    bindShowAddress: function() {
        var e = this;
        if (this.data.integralNum >= this.data.goodsInfo.target) {
            var t = wx.createAnimation({
                duration: 1e3,
                timingFunction: "ease"
            });
            t.translateY(-215).step(), this.setData({
                addressModal: !1
            }), setTimeout(function() {
                e.setData({
                    dAnimation: t.export()
                });
            }, 100);
        } else wx.showModal({
            title: "提示",
            content: "积分不足",
            showCancel: !1
        });
    },
    bindHideAddress: function(e) {
        var t = this, s = wx.createAnimation({
            duration: 1e3,
            timingFunction: "ease"
        });
        s.translateY(215).step(), this.setData({
            dAnimation: s.export()
        }), setTimeout(function() {
            t.setData({
                addressModal: !0
            }), e.isSuccess && t.bindShowSuccess();
        }, 500);
    },
    onWxLoginCallBack: function() {},
    getGoodsDetails: function(e) {
        var t = this, n = {
            iesId: e
        };
        s.getGoodsDetails(n).then(function(e) {
            t.setData({
                goodsInfo: e.shopInfo || {}
            });
        });
    },
    onLoad: function(e) {
        var s = this, n = e.iesid;
        s.getGoodsDetails(n);
        var a = wx.getStorageSync("addressInfo");
        s.setData({
            iesId: n,
            integralNum: t.getIntegral(),
            addressInfo: a || {}
        });
    },
    bindExchange: function() {
        var e = this, n = this.data.addressInfo;
        if (n.hasOwnProperty("telNumber")) {
            var a = {
                iesId: this.data.iesId,
                address: n.provinceName + n.cityName + n.countyName + n.detailInfo,
                phone: n.telNumber,
                userName: n.userName
            };
            s.getGoodsReward(a).then(function(s) {
                s.curTotalIntegral >= 0 ? (e.setData({
                    integralNum: s.curTotalIntegral
                }), t.setIntegral(s.curTotalIntegral), e.bindHideAddress({
                    isSuccess: !0
                })) : (e.bindHideAddress(), wx.showToast({
                    title: "兑换失败",
                    icon: "none",
                    duration: 3e3
                }));
            });
        } else wx.showModal({
            title: "提示",
            content: "地址不能为空",
            showCancel: !1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onShareAppMessage: function() {}
});