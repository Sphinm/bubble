var t = getApp();

Component({
    properties: {
        noCol: {
            type: Boolean,
            value: !1
        },
        newDes: {
            type: Boolean,
            value: !1
        },
        showGuanzhu: {
            type: Boolean,
            value: !0
        }
    },
    attached: function() {
        this.requestTwo();
    },
    pageLifetimes: {
        show: function() {
            this.requestTwo();
        }
    },
    data: {
        followStatus: !1,
        followPopData: {
            title: "关注公众号",
            start: "进入客服页",
            followNum: 116,
            over: "每天领红包",
            image: "http://litemob-adn.oss-cn-beijing.aliyuncs.com//Md584504c86afb15c36f33ddf220644fc%E9%A6%96%E9%A1%B5_%E5%85%B3%E6%B3%A8%E5%85%AC%E4%BC%97%E5%8F%B7_%E5%AE%A2%E6%9C%8D%E4%BC%9A%E8%AF%9D.png",
            btnContent: "去关注"
        },
        addToMyapp: !1
    },
    methods: {
        showAddApp: function() {
            this.setData({
                addToMyapp: !0
            });
        },
        showVipcn: function(t) {
            console.log(t), 2 == t.currentTarget.dataset.vipcnstatus ? wx.showModal({
                title: "关注公众号",
                content: "已关注，前往首页头部领取"
            }) : this.setData({
                followStatus: !0
            });
        },
        hiddenAll: function() {
            var o = this, a = 600;
            t.globalData.ok || (a = 0), setTimeout(function() {
                o.setData({
                    followStatus: !1,
                    addToMyapp: !1
                });
            }, a);
        },
        requestTwo: function() {
            var o = this;
            t.requestTwo(function() {
                o.setData({
                    collect: t.globalData.collect,
                    vipcn: t.globalData.attention
                });
            });
        }
    }
});