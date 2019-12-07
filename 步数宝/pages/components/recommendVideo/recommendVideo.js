var e = require("../../../utils/event.js");

Component({
    properties: {
        info: {
            type: Object
        },
        isDetail: {
            type: Boolean,
            value: !1
        },
        pageType: {
            type: String
        },
        isNewUser: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        userVersion: !1,
        showTip: !1
    },
    attached: function() {
        var e = getApp();
        this.setData({
            userVersion: e.globalData.userVersion
        });
    },
    methods: {
        linkVideoInfo: function() {
            var i = this;
            i.data.isDetail ? wx.redirectTo({
                url: "/pages/community/videoInfo/videoInfo?videoId=" + i.data.info.id + "&videoRatio=" + i.data.info.type
            }) : wx.navigateTo({
                url: "/pages/community/videoInfo/videoInfo?videoId=" + i.data.info.id + "&videoRatio=" + i.data.info.type
            });
            var t = i.data.pageType;
            i.data.isNewUser && (t = i.data.pageType);
            var a = {
                event: "community_vedio_list_page",
                activity_id: i.data.info.id + "",
                activity_type: t
            };
            e.EVENT_LOG(a, function(e) {});
        },
        hideTipFn: function() {
            this.setData({
                showTip: !1
            }), this.triggerEvent("callFn", "hideTip");
            var i = "community_vedio_detail_page_foward";
            this.data.isNewUser && (i = "community_vedio_detail_new_user_page_click");
            var t = {
                event: i,
                activity_type: "点击视频内容弹窗_取消",
                activity_name: "A版_宝箱"
            };
            e.EVENT_LOG(t, function(e) {});
        },
        linkIndex: function() {
            wx.switchTab({
                url: "/pages/index/index"
            });
            var i = "community_vedio_detail_page_foward";
            this.data.isNewUser && (i = "community_vedio_detail_new_user_page_click");
            var t = {
                event: i,
                activity_type: "点击视频内容弹窗_点我换商品/点我领红包",
                activity_name: "A版_宝箱"
            };
            e.EVENT_LOG(t, function(e) {});
        }
    }
});