var t = getApp(), e = null;

Page({
    data: {
        additionPop: !1,
        friendsPop: !1,
        friendsAdd: null
    },
    showAdditionPop: function() {
        this.setData({
            additionPop: !0
        });
    },
    sharePoster: function() {
        wx.getStorageSync("isLogin") ? t.tapLoading(function() {
            wx.request({
                url: t.getData("/poster"),
                data: {
                    user_id: wx.getStorageSync("userId")
                },
                success: function(t) {
                    wx.hideLoading(), 200 == t.data.code ? wx.previewImage({
                        urls: [ t.data.data.info ]
                    }) : wx.showToast({
                        title: "海报加载失败",
                        icon: "none"
                    });
                }
            });
        }) : wx.showModal({
            title: "生成海报失败",
            content: "请先前往个人中心点击授权完成再来生成",
            confirmText: "去授权",
            confirmColor: "#ef2d2d",
            success: function(t) {
                t.confirm ? wx.switchTab({
                    url: "/pages/my/my"
                }) : t.cancel;
            }
        });
    },
    showFriendsPop: function() {
        this.data.friendsAdd.count.pid1 && this.setData({
            friendsPop: !0
        });
    },
    hiddenAll: function() {
        this.setData({
            additionPop: !1,
            friendsPop: !1
        });
    },
    onLoad: function(a) {
        e = this, t.shareInfo(1), t.httpsPost({
            url: t.getData("/getaddgold"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var a = t.data.data;
                    a.record = a.record.slice(0, 20), e.setData({
                        friendsAdd: a
                    });
                }
            }
        }), t.httpsGet({
            url: t.getData("/xs"),
            success: function(t) {
                e.setData({
                    tongzhi: t.data.data
                });
            }
        });
    },
    look_friend: function() {
        this.setData({
            friendsPop: !0
        });
    },
    no_friend: function() {
        console.log("没有好友");
    },
    onShareAppMessage: function(e) {
        var a = t.globalData.shareInfo;
        return a.path = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        a;
    }
});