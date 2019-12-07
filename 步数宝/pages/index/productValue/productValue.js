var e = getApp(), a = require("../../../utils/wglogin.js"), t = require("../../../utils/event.js"), i = require("../../../utils/urls.js"), s = require("../../../utils/urlGL.js"), r = require("../../../utils/request.js"), n = "homePage_steps_to_coins_forward_page";

Page({
    data: {
        productValueImg: "",
        subsidyShareImageurl: "https://rr.bushubao.cn//step_trade/share_pic/midea_vivo_phone.jpg",
        subsidyShareContent: "每天登录就送3000步 步数免费换礼品",
        pageType: "1",
        moreImage: [],
        event: 2,
        article: "",
        changeVideoInfo: {}
    },
    onLoad: function(a) {
        "1" == a.type || 1 == a.type ? this.setData({
            productValueImg: "https://sns-images-test.bushubao.cn/img/2019/06/20/16/8adf432b04a24aae950cc8f38205da32&750&1206&.png",
            color: "#FEEEE5",
            pageType: -99
        }) : a.imageUrl && "undefined" != a.imageUrl ? (this.setData({
            productValueImg: a.imageUrl
        }), a.pageType && "undefined" != a.pageType && this.setData({
            pageType: a.pageType
        })) : a.pageType && "undefined" != a.pageType && 15 == a.pageType ? (this.data.article = a.article, 
        this.data.pageType = a.pageType + "", this.setData({
            moreImage: [],
            isnewUser: e.globalData.isnewuser
        }), a.shareType && void 0 != a.shareType && 1 == a.shareType && (n = "article_share_enter_page_click", 
        this.data.event = a.shareType), this.getArticleDetail()) : this.setData({
            productValueImg: e.globalData.productValueImg
        }), a.titleName && "undefined" != a.titleName && wx.setNavigationBarTitle({
            title: a.titleName
        });
    },
    goquestion: function() {
        wx.navigateTo({
            url: "/pages/subpackage/question/question"
        });
    },
    onShareAppMessage: function(e) {
        var i = a.USERINFO().userId + "" + Date.parse(new Date()) / 1e3;
        if ("2" == this.data.pageType) {
            var r = {
                event: t.EVENT_HOTHELPDETAILSHAREBTNCLICK,
                share_card_id: i
            };
            t.EVENT_LOG(r, function(e) {});
            return {
                title: this.data.subsidyShareContent,
                path: "/pages/index/index?source=1&userId=" + a.USERINFO().userId + "&flag=" + i,
                imageUrl: "https://rr.bushubao.cn/step_trade/huodong/shareBubblePic.png",
                success: function(e) {},
                fail: function(e) {}
            };
        }
        if ("15" == this.data.pageType) {
            var n = this, u = {};
            u.event = t.EVENT_BSB_SHARE_EVENTS, u.share_card_id = i;
            var d = {
                flag: i
            };
            u.share_events = "首页-步数兑换成功弹窗-文章详情-右上角三个点", 1 == n.data.event && (u.share_events = "首页-点击好友加成气泡弹窗-文章详情-右上角三个点"), 
            e && (u.share_events = "首页-步数兑换成功弹窗-文章详情-分享给好友", 1 == n.data.event && (u.share_events = "首页-点击好友加成气泡弹窗-文章详情-分享给好友")), 
            d.basisPath = "/pages/index/productValue/productValue?pageType=15&article=" + n.data.changeVideoInfo.id, 
            d.source = 11, d.share_loc = u.share_events, d.share_events = "首页-步数兑换成功弹窗(新)", 
            1 == n.data.event && (d.share_events = "首页-点击好友加成气泡弹窗(新)"), u.page_content_id = n.data.changeVideoInfo.id, 
            d.videoId = n.data.changeVideoInfo.id;
            var c = n.data.changeVideoInfo.imgUrl + "?x-oss-process=image/resize,m_fill,w_500,h_400", o = n.data.changeVideoInfo.title;
            return t.EVENT_THINKDATATRACK(u), {
                title: o,
                path: s.BASISSHAREPATH(d),
                imageUrl: c,
                success: function(e) {},
                fail: function(e) {}
            };
        }
        var g = {
            event: t.EVENT_BSB_SHARE_EVENTS,
            share_card_id: i,
            share_events: "新手引导-产品价值（三个点)"
        };
        t.EVENT_THINKDATATRACK(g);
        var l = {
            event: t.EVENT_ADDITIONRULESHAREBTN,
            share_card_id: i
        };
        t.EVENT_LOG(l, function(e) {});
        var p = this.data.subsidyShareContent, h = this.data.subsidyShareImageurl;
        return {
            title: p,
            path: "/pages/index/index?source=1&userId=" + a.USERINFO().userId + "&flag=" + i,
            imageUrl: h,
            success: function(e) {},
            fail: function(e) {}
        };
    },
    getArticleDetail: function() {
        var e = this;
        r.POST({
            url: i.INDEX_IMGLIST,
            params: {
                isSwitch: "-1",
                id: e.data.article
            },
            success: function(a) {
                wx.setNavigationBarTitle({
                    title: a.data.result.title
                }), e.setData({
                    moreImage: a.data.result.imgUrlArray,
                    changeVideoInfo: a.data.result
                });
                var i = {
                    event: n,
                    activity_name: "文章详情曝光",
                    activity_id: e.data.article + ""
                };
                t.EVENT_LOG(i, function(e) {});
            },
            fail: function(e) {}
        });
    },
    returnRoot: function(e) {
        wx.navigateBack({});
        var a = {
            event: n,
            activity_name: e.currentTarget.dataset.type,
            activity_id: this.data.article + ""
        };
        t.EVENT_LOG(a, function(e) {});
    },
    shareFriends: function(e) {
        var a = {
            event: n,
            activity_name: e.currentTarget.dataset.type,
            activity_id: this.data.article + ""
        };
        t.EVENT_LOG(a, function(e) {});
    }
});