require("../../utils/util.js");

var e = require("../../utils/globalDefine.js");

require("../../network/httpRequest.js");

Page({
    data: {
        writePhotosAlbum: !0
    },
    onWxLoginCallBack: function() {},
    onLoad: function(t) {
        var i = this, s = t.steps || 0;
        wx.showLoading({
            title: "生成海报中"
        });
        var n = e.getUserLoginInfo();
        wx.getImageInfo({
            src: n.headImg,
            complete: function(e) {
                var t = e.path;
                i.posterCanvas(s, t);
            }
        });
    },
    posterCanvas: function(t, i) {
        var s = e.getUserLoginInfo(), n = s.userName, o = s.rewardNum + "", a = new Date(), l = a.getMonth() + 1 + "月" + a.getDate() + "日", r = "今日运动了" + t + "步", c = wx.createCanvasContext("posterCanvas", this), g = void 0, u = void 0;
        if (!wx.canIUse("createSelectorQuery")) return wx.showToast({
            title: "您手机微信版本不支持生成海报功能",
            icon: "none",
            duration: 5e3
        }), wx.hideLoading(), !1;
        var f = wx.createSelectorQuery();
        f.select("#myPosterView").boundingClientRect(), f.exec(function(e) {
            if (!e[0]) return wx.hideLoading(), !1;
            g = e[0].width, u = e[0].height, c.drawImage("../../images/poster/bg-poster.png", 0, 0, g, u), 
            c.save(), c.beginPath(), c.arc(45, 45, 25, 0, 2 * Math.PI, !1), c.clip(), c.drawImage(i, 20, 20, 50, 50), 
            c.restore(), c.setTextAlign("left"), c.setFillStyle("#000"), c.setFontSize(18), 
            c.fillText(n, 80, 50), c.setTextAlign("left"), c.setFillStyle("#000"), c.setFontSize(18), 
            c.fillText(l, 30, 100), c.setTextAlign("left"), c.setFillStyle("#000"), c.setFontSize(18), 
            c.fillText(r, 30, 130), c.setTextAlign("left"), c.setFillStyle("#000"), c.setFontSize(18), 
            c.fillText("我已经累计赚了", 30, 160), c.setTextAlign("left"), c.setFillStyle("#f00"), 
            c.setFontSize(30), c.fillText(o, 158, 160), c.setTextAlign("left"), c.setFillStyle("#000"), 
            c.setFontSize(18), c.fillText("元", 160 + 14 * o.length + 5, 160);
            var t = 50 / 525 * u;
            c.drawImage("../../images/poster/qrcode.jpg", g - t - 35, u - t - 30, t, t), c.draw(), 
            wx.hideLoading();
        });
    },
    export: function() {
        var e = this;
        wx.canvasToTempFilePath({
            canvasId: "posterCanvas",
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(e) {
                        console.log(e);
                    },
                    fail: function(t) {
                        wx.getSetting({
                            success: function(t) {
                                t.authSetting["scope.writePhotosAlbum"] || e.setData({
                                    writePhotosAlbum: !1
                                });
                            }
                        });
                    }
                });
            },
            fail: function(e) {
                console.error(e);
            }
        }, this);
    },
    bindOpenSetting: function(e) {
        e.detail.authSetting["scope.writePhotosAlbum"] && this.setData({
            writePhotosAlbum: !0
        });
    }
});