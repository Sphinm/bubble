var t = require("../../utils/request.js"), e = require("../../utils/urls.js"), a = (require("../../utils/util.js"), 
require("../../utils/event.js")), i = (require("../../utils/util.js"), require("../../utils/urlGL.js")), o = require("../../utils/wglogin.js"), n = getApp();

Page({
    data: {
        info: {},
        painting: {},
        currentData: "",
        monday: "",
        currentDay: ""
    },
    onLoad: function(t) {
        var e = new Date(), a = "星期" + [ "日", "一", "二", "三", "四", "五", "六" ][e.getDay()];
        this.setData({
            monday: a,
            currentData: "/" + (e.getMonth() + 1) + "/" + e.getFullYear(),
            currentDay: e.getDate() > 9 ? e.getDate() : "0" + e.getDate(),
            allSteam: n.globalData.allStempNumber
        }), this.getTestShareInfo(), this.getQrCode();
    },
    getQrCode: function() {
        var t = this;
        wx.request({
            url: e.API_SHAREQRV + "?uid=" + o.USERINFO().userId,
            method: "GET",
            success: function(e) {
                "OK" == e.data.code && t.setData({
                    qrCode: e.data.data.imgUrl
                });
            }
        });
    },
    getTestShareInfo: function() {
        var a = this;
        t.POST({
            url: e.API_DAILYPUNCH,
            params: {},
            success: function(t) {
                "OK" == t.code && a.setData({
                    info: t.data.result
                });
            },
            fail: function(t) {}
        });
    },
    eventSave: function() {
        this.data.savePic = !0, wx.showLoading({
            title: "正在保存"
        }), this.drawerDiary();
        var t = {
            event: "homepage_test003_share_button_click",
            activity_type: "保存图片",
            activity_name: this.data.info.name
        };
        a.EVENT_LOG(t, function(t) {});
    },
    eventGetImage: function(t) {
        console.log(t);
        var e = t.detail.tempFilePath;
        this.setData({
            shareImage: e
        }), console.log(this.data.shareImage), e && this.data.savePic && this.savePic();
    },
    savePic: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.writePhotosAlbum"] ? wx.saveImageToPhotosAlbum({
                    filePath: t.data.shareImage,
                    success: function(t) {
                        wx.showToast({
                            title: "保存图片成功",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function(e) {
                        console.log(e.errMsg), "saveImageToPhotosAlbum:fail file not found" == e.errMsg || "saveImageToPhotosAlbum:fail get file data fail" == e.errMsg ? t.savePic() : wx.hideLoading();
                    }
                }) : wx.showModal({
                    content: "打开设置授权保存图片到相册",
                    success: function(e) {
                        e.confirm ? wx.authorize({
                            scope: "scope.writePhotosAlbum",
                            success: function() {
                                wx.saveImageToPhotosAlbum({
                                    filePath: t.data.shareImage,
                                    success: function(t) {
                                        wx.showToast({
                                            title: "保存图片成功",
                                            icon: "success",
                                            duration: 2e3
                                        });
                                    }
                                });
                            },
                            fail: function() {
                                o.SETTING(), wx.hideLoading();
                            }
                        }) : wx.hideLoading();
                    }
                });
            },
            fail: function(t) {
                wx.hideLoading();
            }
        });
    },
    drawerDiary: function() {
        var t = this, e = wx.createCanvasContext("myCanvas");
        e.setFontSize(50);
        var a = e.measureText(t.data.allSteam + "");
        console.log(a.width);
        var i = new Array();
        i.push({
            type: "image",
            url: t.data.info.saveImg,
            top: 0,
            left: 0,
            width: 750,
            height: 1150
        }), 2 == t.data.info.type && (i.push({
            type: "text",
            content: t.data.currentDay,
            fontSize: 120,
            color: "#fff",
            textAlign: "right",
            top: 18,
            left: 170,
            bolder: !0
        }), i.push({
            type: "text",
            content: t.data.currentData,
            fontSize: 30,
            color: "#fff",
            textAlign: "left",
            top: 40,
            left: 178,
            bolder: !0
        }), i.push({
            type: "text",
            content: t.data.monday,
            fontSize: 30,
            color: "#fff",
            textAlign: "left",
            top: 100,
            left: 178,
            bolder: !0
        }), i.push({
            type: "text",
            content: "步",
            fontSize: 26,
            color: "#fff",
            textAlign: "right",
            top: 1098,
            left: 723
        }), i.push({
            type: "text",
            content: t.data.allSteam,
            fontSize: 50,
            color: "#fff",
            textAlign: "right",
            top: 1076,
            left: 693,
            bolder: !0
        }), i.push({
            type: "text",
            content: "今天已经走了",
            fontSize: 26,
            color: "#fff",
            textAlign: "right",
            top: 1098,
            left: 686 - a.width
        })), i.push({
            type: "rect",
            background: "#FFFFFF",
            top: 1150,
            left: 0,
            width: 750,
            height: 184
        }), i.push({
            type: "image",
            url: t.data.info.avatar,
            top: 1193,
            left: 30,
            width: 94,
            height: 94
        }), i.push({
            type: "image",
            url: "https://rr.bushubao.cn/step_trade/huodong/shadow_head1.png",
            top: 1193,
            left: 30,
            width: 94,
            height: 94
        }), i.push({
            type: "text",
            content: t.data.info.nickName.length > 6 ? t.data.info.nickName.slice(0, 6) + "..." : t.data.info.nickName,
            fontSize: 26,
            color: "#868686",
            textAlign: "left",
            top: 1258,
            left: 132
        }), i.push({
            type: "image",
            url: t.data.qrCode,
            top: 1170,
            left: 587,
            width: 146,
            height: 146
        }), i.push({
            type: "text",
            content: "步数宝",
            fontSize: 36,
            color: "#404040",
            textAlign: "right",
            top: 1196,
            left: 564
        }), i.push({
            type: "text",
            content: "让健康陪你到老",
            fontSize: 26,
            color: "#868686",
            textAlign: "right",
            top: 1258,
            left: 564
        }), this.setData({
            painting: {
                width: 750,
                height: 1334,
                clear: !0,
                views: i
            }
        }), console.log(this.data.painting);
    },
    onShareAppMessage: function() {
        var t = this, e = a.EVENT_SHARE_FLAG(), o = void 0;
        o = 1 == t.data.info.type ? "分享给好友-早安打卡" : "分享给好友-运动打卡";
        var n = {
            event: "homepage_test003_share_button_click",
            share_card_id: e,
            activity_type: "分享给好友",
            activity_name: t.data.info.name
        };
        a.EVENT_LOG(n, function(t) {});
        var s = {
            event: a.EVENT_BSB_SHARE_EVENTS,
            share_card_id: e,
            share_loc: o,
            share_events: "测试版-首页邀请按钮变更"
        };
        a.EVENT_THINKDATATRACK(s);
        var r = {
            share_loc: s.share_loc || "",
            share_events: s.share_events,
            flag: e
        }, l = i.BASISSHAREPATH(r);
        return {
            imageUrl: t.data.info.shareImg,
            title: t.data.info.content,
            path: l
        };
    }
});