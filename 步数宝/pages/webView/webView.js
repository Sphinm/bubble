var t = require("../../utils/urls.js"), a = require("../../utils/request.js"), e = require("../../utils/event.js");

Page({
    data: {
        webUrl: "",
        pageType: 1,
        ballId: "",
        wxchat: "",
        copyScuess: !1
    },
    onLoad: function(i) {
        i.webUrl && void 0 != i.webUrl ? this.setData({
            webUrl: decodeURIComponent(i.webUrl),
            pageType: 0
        }) : i.type && void 0 != i.type && (this.setData({
            pageType: i.type
        }), i.wxchat && void 0 != i.wxchat && this.setData({
            wxchat: i.wxchat
        }), i.id && void 0 != i.id && this.setData({
            ballId: i.id
        })), 1 == this.data.pageType && (wx.setNavigationBarTitle({
            title: "福利活动"
        }), a.POST({
            url: t.UpdateClickStatus,
            params: {},
            success: function(t) {},
            fail: function() {}
        }));
        var s = {
            event: "homePage_ball_exchangeStep",
            activity_type: "领取福利",
            activity_name: "福利活动页面-曝光"
        };
        e.EVENT_THINKDATATRACK(s);
    },
    onShow: function() {},
    onUnload: function() {},
    copy: function(t) {
        var a = this;
        wx.setClipboardData({
            data: a.data.wxchat,
            success: function(t) {
                wx.getClipboardData({
                    success: function(t) {
                        wx.showToast({
                            title: "复制成功",
                            icon: "none"
                        }), a.updateUserRecord(), a.data.copyScuess = !0;
                    }
                });
            }
        });
        var i = {
            event: "homePage_ball_exchangeStep",
            activity_type: "领取福利",
            activity_name: "福利活动页面-点击复制"
        };
        e.EVENT_THINKDATATRACK(i);
    },
    updateUserRecord: function() {
        if (!this.data.copyScuess) {
            var e = {};
            e.id = this.data.ballId, e.wxchat = this.data.wxchat, a.POST({
                url: t.UpdateUserRecord,
                params: e,
                success: function(t) {},
                fail: function() {}
            });
        }
    }
});