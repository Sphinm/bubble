Component({
    data: {
        selected: 0,
        color: "#868686",
        selectedColor: "#404040",
        list: [ {
            pagePath: "/pages/index/index",
            text: "首页",
            iconPath: "/images/index.png",
            selectedIconPath: "/images/indexd.png"
        }, {
            pagePath: "/pages/communityHomepage/community",
            text: "步友圈",
            iconPath: "/images/icon/activity.png",
            selectedIconPath: "/images/icon/activityd.png"
        }, {
            pagePath: "/pages/activityTab/activitytab",
            text: "活动",
            iconPath: "/images/icon/gifts.png",
            selectedIconPath: "/images/icon/giftsd.png"
        }, {
            pagePath: "/pages/mine/mine_new",
            text: "我的",
            iconPath: "/images/mine.png",
            selectedIconPath: "/images/mined.png"
        } ]
    },
    attached: function() {},
    created: function() {},
    methods: {
        switchTab: function(e) {
            var t = e.currentTarget.dataset, a = t.path;
            wx.switchTab({
                url: a
            }), this.setData({
                selected: t.index
            });
        }
    }
});