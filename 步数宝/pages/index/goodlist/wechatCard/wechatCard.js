var a = require("../../../../utils/request.js"), t = require("../../../../utils/urls.js");

Page({
    data: {
        headHeight: 0,
        headPdt: 0
    },
    onLoad: function(a) {
        this.getWxCard();
    },
    getWxCard: function() {
        var d = this, e = {};
        a.POST({
            url: t.api_getSignature4AddCard,
            params: {},
            success: function(a) {
                "OK" == a.code ? a.data.result.addStatus ? d.openWxCard(a.data.result.cardId, a.data.result.code) : (e = {
                    cardId: a.data.result.cardId,
                    nonce_str: a.data.result.nonceStr,
                    signature: a.data.result.signature,
                    timestamp: a.data.result.timestamp
                }, d.addWxCard(e)) : wx.showToast({
                    title: a.msg,
                    icon: "none"
                });
            },
            fail: function(a) {}
        });
    },
    addWxCard: function(d) {
        var e = this, n = d.cardId, r = JSON.stringify(d);
        "function" == typeof wx.addCard && wx.addCard({
            cardList: [ {
                cardId: n,
                cardExt: r
            } ],
            success: function(d) {
                var r = d.cardList[0].code;
                a.POST({
                    url: t.api_saveCardInfo,
                    params: {
                        cardId: n,
                        code: r
                    },
                    success: function(a) {
                        "OK" == a.code ? e.openWxCard(n, a.data.result) : wx.showToast({
                            title: a.msg,
                            icon: "none"
                        });
                    },
                    fail: function(a) {
                        wx.navigateBack({});
                    }
                });
            },
            fail: function(a) {
                wx.navigateBack({});
            }
        });
    },
    openWxCard: function(a, t) {
        wx.openCard({
            cardList: [ {
                cardId: a,
                code: t
            } ],
            success: function(a) {
                console.log(a), wx.navigateBack({});
            },
            fail: function(a) {
                console.log(a), wx.navigateBack({});
            }
        });
    }
});