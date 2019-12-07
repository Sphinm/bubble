var e = require("../../../utils/wglogin.js"), t = require("../../../utils/event.js"), a = require("../../../pages/index/js/share.js"), s = require("../../../utils/request.js"), r = require("../../../utils/urls.js"), i = require("../../../utils/urlGL.js"), n = getApp();

Page({
    data: {
        imageUrl: "",
        subsidyShareImageurl: "https://sns-images.bushubao.cn/img/2019/03/27/21/ad52b282b50b4dea8525b591640af076.jpg",
        subsidyShareContent: "每天登录就送3000步 步数免费换礼品",
        currentFriendNum: 0,
        currentRate: "0"
    },
    onLoad: function(e) {
        this.config(), n.globalData.userVersion ? this.setData({
            imageUrl: "https://sns-images-test.bushubao.cn/img/2019/08/01/09/2ce1c743259c4f2ab9750f406cea5dbf&750&2260&.png"
        }) : this.setData({
            imageUrl: "https://rr.bushubao.cn/step_trade/128c9c0c69d3451db8d8394c730b6b2d"
        });
    },
    onShareAppMessage: function(a) {
        var s = e.USERINFO().userId + "" + Date.parse(new Date()) / 1e3, r = void 0, n = {
            event: t.EVENT_BSB_SHARE_EVENTS,
            share_card_id: s,
            share_events: "首页-加成规则-邀请好友页面-去邀请按钮"
        };
        "button" === a.from ? (r = "去邀请分享按钮", n.share_loc = r) : (r = "右上角（三个点）分享", n.share_loc = r);
        var u = {
            event: "additionRule_share",
            share_card_id: s,
            activity_name: r
        };
        t.EVENT_LOG(u, function(e) {}), t.EVENT_THINKDATATRACK(n);
        var c = {
            share_loc: n.share_loc || "",
            share_events: n.share_events,
            flag: s
        }, d = i.BASISSHAREPATH(c);
        return {
            title: this.data.subsidyShareContent,
            path: d,
            imageUrl: this.data.subsidyShareImageurl,
            success: function(e) {},
            fail: function(e) {}
        };
    },
    config: function() {
        var e = this;
        s.POST({
            url: r.API_ADDITIONRULE,
            params: {},
            success: function(t) {
                "OK" == t.code && e.setData({
                    currentFriendNum: t.data.result.currentFriendNum,
                    currentRate: t.data.result.currentRate
                });
            },
            fail: function(e) {
                wx.hideLoading();
            }
        }), a.SHARECARD("ADD", function(t) {
            "OK" == t.code && (e.data.subsidyShareContent = t.data.result.content, e.data.subsidyShareImageurl = t.data.result.imgUrl);
        });
    },
    link: function() {
        var e = {
            event: "additionRule_myfriends_click"
        };
        t.EVENT_LOG(e, function(e) {}), wx.navigateTo({
            url: "/pages/mine_new/friendList/friendList",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    }
});