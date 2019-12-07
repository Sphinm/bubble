var t = getApp();

Page({
    data: {
        image: "",
        openset: !1
    },
    getUserToAlbum: function(t) {
        var e = this;
        wx.getSetting({
            success: function(o) {
                console.log("授权相册状态", o.authSetting["scope.writePhotosAlbum"]), o.authSetting["scope.writePhotosAlbum"] || null == o.authSetting["scope.writePhotosAlbum"] ? (e.setData({
                    openSet: !1
                }), t && t()) : (e.setData({
                    openSet: !0
                }), wx.showToast({
                    title: "打开授权才能保存图片到相册！",
                    icon: "none"
                }));
            }
        });
    },
    onShow: function() {
        var t = this;
        this.getUserToAlbum(function() {
            t.toAlbum();
        });
    },
    onLoad: function(e) {
        var o = this;
        t.dotCollect("index_home_punch"), wx.request({
            url: t.getUrl("/Poster/getPoster"),
            method: "POST",
            header: {},
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                o.setData({
                    image: t.data.data.url
                });
            }
        });
    },
    onShareAppMessage: function(e) {
        var o = t.globalData.shareInfo;
        return o.path = "pages/index/index?source=1&userId=" + wx.getStorageSync("userId"), 
        o;
    },
    toAlbum: function() {
        var e = this, o = e.data.image;
        if (o) {
            var s = o.replace("http", "https");
            wx.getImageInfo({
                src: s,
                success: function(o) {
                    wx.saveImageToPhotosAlbum({
                        filePath: o.path,
                        success: function(o) {
                            wx.showToast({
                                title: "保存成功"
                            }), t.dotCollect("index_home_punch_image"), console.log(e.data.image), wx.request({
                                url: t.getUrl("/Poster/deletePoster"),
                                method: "POST",
                                header: {},
                                data: {
                                    file: e.data.image
                                },
                                success: function() {
                                    console.log("删除成功");
                                }
                            });
                        },
                        fail: function() {
                            wx.showToast({
                                title: "打开授权才能保存图片到相册！",
                                icon: "none"
                            }), e.getUserToAlbum();
                        }
                    });
                }
            });
        }
    }
});