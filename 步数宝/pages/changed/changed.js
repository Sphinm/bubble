getApp();

var e = require("../../utils/event.js"), t = require("../../utils/wglogin.js"), a = require("../../utils/urlGL.js");

Page({
    data: {
        maskFlage: !1,
        painting: {},
        pic: "",
        orderId: "",
        goodsname: "",
        zhuanqu: "",
        randomAmount: 0,
        mainOrderId: "",
        endCoolDate: "",
        endCoolTime: "",
        goodsImg: "",
        goodsName: "",
        goodsPrice: "",
        diamondPrice: "",
        nickname: "",
        headImg: "",
        exchangeTotalNum: "",
        exchangeTime: "",
        moneyValue: "",
        remark: "",
        thresholdValue: ""
    },
    onLoad: function(t) {
        if (wx.showShareMenu({
            withShareTicket: !0
        }), t.moneyValue && t.remark && t.thresholdValue && this.setData({
            moneyValue: t.moneyValue,
            remark: t.remark,
            thresholdValue: t.thresholdValue,
            maskFlage: !0
        }), this.setData({
            goodId: t.goodId,
            pic: decodeURIComponent(t.img),
            orderId: t.orderId,
            goodsname: t.goodsname,
            zhuanqu: t.zhuanqu,
            revertPrice: t.revertPrice || 0,
            randomAmount: t.randomAmount,
            mainOrderId: t.mainOrderId,
            endCoolDate: t.endCoolTime ? t.endCoolTime.split(" ")[0] : "",
            endCoolTime: t.endCoolTime ? t.endCoolTime.split(" ")[1] : "",
            nickname: t.nickname,
            headImg: decodeURIComponent(t.headImg),
            exchangeTotalNum: t.exchangeTotalNum,
            exchangeTime: t.exchangeTime
        }), 4029 == this.data.goodId) {
            var a = {
                event: "homepage_test004_click",
                activity_name: "指定商品兑换成功页面-曝光"
            };
            e.EVENT_LOG(a, function(e) {});
        }
    },
    onShareAppMessage: function() {
        var o = t.USERINFO().userId + "" + Date.parse(new Date()) / 1e3, n = {
            event: "exchangeSuccess_share_friendShare",
            share_source: "none",
            share_card_id: o,
            activity_name: this.data.goodsname,
            activity_type: this.data.zhuanqu
        };
        e.EVENT_LOG(n, function(e) {});
        var i = {
            event: e.EVENT_BSB_SHARE_EVENTS,
            share_card_id: o,
            activity_name: this.data.goodsname,
            activity_type: this.data.zhuanqu,
            share_events: "商品兑换成功"
        };
        e.EVENT_THINKDATATRACK(i);
        var r = {
            share_loc: i.share_loc || "",
            share_events: i.share_events,
            flag: o
        };
        return {
            title: "换到了！换到了！原来步数真的可以换商品！",
            path: a.BASISSHAREPATH(r),
            imageUrl: this.data.pic,
            success: function(e) {}
        };
    },
    eventGetImage: function(e) {
        var t = e.detail.tempFilePath;
        wx.hideLoading(), wx.redirectTo({
            url: "/pages/community/release/release?topicName=晒晒我用燃力兑到的那些好东西&topicId=2&defaultImg=" + encodeURIComponent(t)
        });
    },
    drawerDiary: function() {
        wx.showLoading({
            title: ""
        });
        try {
            var e = this, t = new Array();
            t.push({
                type: "image",
                url: e.data.headImg,
                top: 30,
                left: 30,
                width: 80,
                height: 80
            }), t.push({
                type: "image",
                url: "https://sns-images.bushubao.cn/img/2019/08/05/11/13cdc9b264c343138e73b779447b8cd5&610&610&.png",
                top: 0,
                left: 0,
                width: 610,
                height: 610
            }), t.push({
                type: "text",
                content: e.data.nickname,
                fontSize: 30,
                color: "#404040",
                textAlign: "left",
                top: 42,
                left: 136
            }), t.push({
                type: "text",
                content: e.data.exchangeTime,
                fontSize: 24,
                color: "#868686",
                textAlign: "left",
                top: 86,
                left: 136
            }), t.push({
                type: "text",
                content: "我的第" + e.data.exchangeTotalNum + "次兑换",
                fontSize: 24,
                color: "#7861ff",
                textAlign: "left",
                top: 166,
                left: 190
            }), t.push({
                type: "image",
                url: e.data.pic + "?x-oss-process=image/resize,l_340",
                top: 216,
                left: 136,
                width: 340,
                height: 340
            }), e.setData({
                painting: {
                    width: 610,
                    height: 610,
                    clear: !0,
                    views: t
                }
            });
        } catch (e) {
            console.log(e), wx.redirectTo({
                url: "/pages/community/release/release?topicName=晒晒我用燃力兑到的那些好东西&topicId=2"
            });
        }
    },
    toorder: function() {
        wx.redirectTo({
            url: "/pages/mine_new/mall/orderdetalis/orderdetails?mainOrderId=" + this.data.mainOrderId + "&orderFlag=1"
        });
    },
    linkWallet: function() {
        wx.redirectTo({
            url: "/pages/mine_new/wallet/wallet"
        });
        var t = {
            event: "homepage_test004_click",
            activity_name: "指定商品兑换成功页面-查看我的钱包"
        };
        e.EVENT_LOG(t, function(e) {});
    },
    toShop: function() {
        var t = {
            event: "PureCoin_Redeem_coupons_page",
            Redeem_coupons_use: " 快去使用"
        };
        e.EVENT_LOG(t), this.setData({
            maskFlage: !1
        }), wx.switchTab({
            url: "/pages/mallsHome/mallsHome"
        });
    },
    close: function() {
        this.setData({
            maskFlage: !1
        });
    }
});