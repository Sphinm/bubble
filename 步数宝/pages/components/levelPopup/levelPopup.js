var e = require("../../../utils/event.js"), t = require("../../../utils/util.js");

Component({
    properties: {
        info: {
            type: Object
        },
        levelLimitsTest: {
            type: Boolean
        }
    },
    data: {},
    methods: {
        linkPage: function() {
            var a = this;
            if (a.triggerEvent("hidePopupFn"), !a.data.levelLimitsTest) {
                var i = t.formateDateOther(new Date());
                wx.getStorage({
                    key: "uppie",
                    success: function(e) {
                        console.log(e.data), e.data.timestamp = i, e.data.mask = !0, wx.setStorage({
                            key: "uppie",
                            data: e.data
                        });
                    }
                });
            }
            -1 != a.data.info.linkUrl.indexOf("communityHomepage/community") || -1 != a.data.info.linkUrl.indexOf("activityTab/activitytab") ? wx.switchTab({
                url: a.data.info.linkUrl,
                success: function() {
                    var t = a.data.info, i = {
                        event: "homePage_upgrade_forward_page",
                        activity_name: "去看看",
                        activity_type: a.userLevel(t.dialogGrade),
                        activity_id: a.userLevelStar(t.dialogGrade)
                    };
                    e.EVENT_LOG(i, function(e) {});
                }
            }) : wx.navigateTo({
                url: a.data.info.linkUrl,
                success: function() {
                    var t = a.data.info, a = this, i = {
                        event: "homePage_upgrade_forward_page",
                        activity_name: "去看看",
                        activity_type: a.userLevel(t.dialogGrade),
                        activity_id: a.userLevelStar(t.dialogGrade)
                    };
                    e.EVENT_LOG(i, function(e) {});
                }
            });
        },
        hidePopupFn: function() {
            if (!this.data.levelLimitsTest) {
                var a = t.formateDateOther(new Date());
                wx.getStorage({
                    key: "uppie",
                    success: function(e) {
                        console.log(e.data), e.data.timestamp = a, e.data.mask = !0, wx.setStorage({
                            key: "uppie",
                            data: e.data
                        });
                    }
                });
            }
            this.triggerEvent("hidePopupFn");
            var i = this, r = i.data.info, n = {
                event: "homePage_upgrade_forward_page",
                activity_name: "取消",
                activity_type: i.userLevel(r.dialogGrade),
                activity_id: i.userLevelStar(r.dialogGrade)
            };
            e.EVENT_LOG(n, function(e) {});
        },
        userLevel: function(e) {
            var t = "";
            return (e = parseInt(e)) < 20 && e > 0 ? t = "等级S1" : e < 30 ? t = "等级S2" : e < 40 ? t = "等级S3" : e < 50 ? t = "等级S4" : e < 60 && (t = "等级S5"), 
            t;
        },
        userLevelStar: function(e) {
            return (e = parseInt(e)) % 10 == 1 ? "一星" : e % 10 == 2 ? "二星" : e % 10 == 3 ? "三星" : "没星";
        }
    }
});