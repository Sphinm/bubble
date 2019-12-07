var e = getApp(), t = require("../../utils/util.js"), a = e.globalData.resurl, s = e.globalData.key, n = e.globalData.deviceProperties;

e.globalData.sharelist;

Page({
    data: {
        dati: !0,
        modal: 0,
        block: [ 0, 0, 0, 0, 0 ]
    },
    onLoad: function(e) {
        var o = this, r = {
            deviceProperties: n,
            user: {
                userId: wx.getStorageSync("userId")
            }
        };
        r = JSON.stringify(r), r = t.base64_encode(r), r = t.xxtea_encrypt(r, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=10&a=1&b=0",
            data: r,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), e = JSON.parse(e.data).advertisingList, 
                console.log(e);
                for (var a = [], n = [], r = 0; r < e.length; r++) 1200 == e[r].advertisingType && n.push(e[r]), 
                1 == e[r].advertisingType && a.push(e[r]);
                if (n.length > 0) {
                    var i = null;
                    wx.createInterstitialAd && (i = wx.createInterstitialAd({
                        adUnitId: n[0].advertisingTitle
                    })), i.onError(function(e) {}), i && i.show().catch(function(e) {});
                }
                o.setData({
                    adver: a
                });
            }
        }), o.answer();
    },
    topic_btn: function(e) {
        var o = this;
        console.log(e);
        var r = o.data.question, i = e.currentTarget.dataset.type, d = {
            deviceProperties: n,
            answerUser: {
                questionId: r.id,
                correctOption: i,
                userId: wx.getStorageSync("userId"),
                id: o.data.ruId
            }
        };
        console.log(d), d = JSON.stringify(d), d = t.base64_encode(d), d = t.xxtea_encrypt(d, s), 
        wx.request({
            url: a + "/interface/sdkData.shtml?requestId=38&a=1&b=0",
            data: d,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(e) {
                e = t.xxtea_decrypt(e.data, s), e = t.base64_decode(e), e = JSON.parse(e), console.log(e), 
                0 == e.resultCode ? ((e = JSON.parse(e.data)).money = parseFloat(e.money / 1e4).toFixed(4), 
                o.setData({
                    modal: 1,
                    money: e.money
                })) : o.setData({
                    modal: 2
                }), o.answer();
            }
        });
    },
    close: function() {
        this.setData({
            modal: 0
        });
    },
    answer: function() {
        var e = this, o = {
            deviceProperties: n,
            answerUser: {
                userId: wx.getStorageSync("userId")
            }
        };
        o = JSON.stringify(o), o = t.base64_encode(o), o = t.xxtea_encrypt(o, s), wx.request({
            url: a + "/interface/sdkData.shtml?requestId=37&a=1&b=0",
            data: o,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(a) {
                if (a = t.xxtea_decrypt(a.data, s), a = t.base64_decode(a), a = JSON.parse(a), console.log(a), 
                0 == a.resultCode) (a = JSON.parse(a.data)).question.answerContent = JSON.parse(a.question.answerContent).arr, 
                "C" == a.question.correctOption ? (a.question.answer = [], a.question.answer.push(a.question.answerContent[0]), 
                a.question.answer.push(a.question.answerContent[2])) : a.question.answer = a.question.answerContent.slice(0, 2), 
                console.log(a), a.question.money = parseFloat(a.question.money / 1e4).toFixed(4), 
                e.setData({
                    question: a.question,
                    question_number: a.question_number,
                    ruId: a.ruId
                }); else {
                    var n = new Date().getHours();
                    console.log(n), n >= 12 ? (console.log(n), n = n >= 18 ? 24 : 18) : n = 12, e.setData({
                        hour: n,
                        dati: !1
                    });
                }
            }
        });
    },
    guize: function() {
        this.setData({
            modal: 4
        });
    }
});