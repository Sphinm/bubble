var t = require("../../../utils/util.js"), i = (require("../../../utils/wglogin.js"), 
require("../../../utils/event.js"));

Component({
    properties: {
        imgList: {
            type: Array,
            observer: function() {
                this.getImgInfo();
            }
        },
        hideFold: {
            type: Boolean
        },
        time: {
            type: Number
        },
        pageType: {
            type: String
        },
        disableLink: {
            type: Boolean
        },
        dynamicInfo: {
            type: Object,
            observer: function() {
                this.data.dynamicInfo.content;
            }
        }
    },
    data: {
        oneImgWidth: 0,
        isOpend: !1,
        isLongImg: !1,
        disableLink: !1,
        hideFold: !1
    },
    attached: function() {},
    methods: {
        previewImage: t.throttle(function(t) {
            this.triggerEvent("callPreview", this.data.dynamicInfo.id);
            for (var i = t.target.dataset.url.split("?")[0] || t.target.dataset.url, a = this.data.imgList, s = 0; s < a.length; s++) a[s] = a[s].split("?")[0] || a[s];
            wx.previewImage({
                current: i,
                urls: a
            });
        }, 1e3),
        switchFn: function() {
            var t = "点击向下箭头";
            if (this.data.isOpend && (t = "点击向上箭头收起帖子"), this.setData({
                isOpend: !this.data.isOpend
            }), this.data.pageType) {
                var a = {
                    event: "community_list_page_show_click",
                    enter_source: this.data.pageType,
                    activity_id: this.data.dynamicInfo.id + "",
                    activity_type: t
                };
                i.EVENT_LOG(a, function(t) {});
            }
        },
        getImgInfo: function() {
            var t, i = this, a = null;
            if (1 == i.data.imgList.length) {
                if (0 != i.data.oneImgWidth) return;
                if (-1 != i.data.imgList[0].indexOf("https://sns") ? (t = i.data.imgList[0] + "?x-oss-process=image/info", 
                a = !0) : (a = !1, t = i.data.imgList[0] + "?imageInfo"), -1 != i.data.imgList[0].indexOf("&")) {
                    var s, e, g, d;
                    if (g = i.data.imgList[0], g = g.slice(g.indexOf("&") + 1, g.lastIndexOf("&")), 
                    d = g.split("&"), s = parseInt(d[0]), e = parseInt(d[1]), s >= e) i.setData({
                        oneImgWidth: 400,
                        isLongImg: !1
                    }), -1 != i.data.imgList[0].indexOf("https://sns") ? i.data.imgList[0] = i.data.imgList[0] + "?x-oss-process=image/resize,l_400" : i.data.imgList[0] = i.data.imgList[0] + "?imageView2/0/w/400", 
                    i.setData({
                        imgList: i.data.imgList
                    }); else {
                        if (s / e < .46) i.setData({
                            oneImgWidth: 300,
                            isLongImg: !0
                        }), -1 != i.data.imgList[0].indexOf("https://sns") ? i.data.imgList[0] = i.data.imgList[0] + "?x-oss-process=image/resize,m_fill,h_400,w_300" : i.data.imgList[0] = i.data.imgList[0] + "?imageView2/5/w/400/h/300"; else {
                            var m = parseInt(s / e * 400);
                            i.setData({
                                oneImgWidth: m,
                                isLongImg: !1
                            }), -1 != i.data.imgList[0].indexOf("https://sns") ? i.data.imgList[0] = i.data.imgList[0] + "?x-oss-process=image/resize,l_400" : i.data.imgList[0] = i.data.imgList[0] + "?imageView2/0/w/400";
                        }
                        i.setData({
                            imgList: i.data.imgList
                        });
                    }
                } else wx.request({
                    url: t,
                    success: function(t) {
                        var s, e;
                        if (1 == a ? (s = t.data.ImageWidth.value - 0, e = t.data.ImageHeight.value - 0) : (s = t.data.width, 
                        e = t.data.height), s >= e) i.setData({
                            oneImgWidth: 400,
                            isLongImg: !1
                        }), -1 != i.data.imgList[0].indexOf("https://sns") ? i.data.imgList[0] = i.data.imgList[0] + "?x-oss-process=image/resize,l_400" : i.data.imgList[0] = i.data.imgList[0] + "?imageView2/0/w/400", 
                        i.setData({
                            imgList: i.data.imgList
                        }); else {
                            if (s / e < .46) i.setData({
                                oneImgWidth: 300,
                                isLongImg: !0
                            }), -1 != i.data.imgList[0].indexOf("https://sns") ? i.data.imgList[0] = i.data.imgList[0] + "?x-oss-process=image/resize,m_fill,h_400,w_300" : i.data.imgList[0] = i.data.imgList[0] + "?imageView2/5/w/400/h/300"; else {
                                var g = parseInt(s / e * 400);
                                i.setData({
                                    oneImgWidth: g,
                                    isLongImg: !1
                                }), -1 != i.data.imgList[0].indexOf("https://sns") ? i.data.imgList[0] = i.data.imgList[0] + "?x-oss-process=image/resize,l_400" : i.data.imgList[0] = i.data.imgList[0] + "?imageView2/0/w/400";
                            }
                            i.setData({
                                imgList: i.data.imgList
                            });
                        }
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            } else {
                for (var n = 0; n < i.data.imgList.length; n++) -1 != i.data.imgList[n].indexOf("https://sns") ? i.data.imgList[n] = i.data.imgList[n] + "?x-oss-process=image/resize,m_fill,h_182,w_182" : i.data.imgList[n] = i.data.imgList[n] + "?imageView2/5/w/182";
                i.setData({
                    imgList: i.data.imgList
                });
            }
        },
        linkTopicList: function() {
            var t = this;
            if (!t.data.disableLink) {
                var a = {
                    event: i.EVENT_LOG_ENTER_COMMUNITY_TOPICS_CLICK,
                    activity_id: t.data.dynamicInfo.topicId,
                    activity_name: t.data.dynamicInfo.topicName
                };
                i.EVENT_LOG(a, function(t) {}), wx.navigateTo({
                    url: "/pages/community/topicList/topicList?topicId=" + t.data.dynamicInfo.topicId + "&topicName=" + t.data.dynamicInfo.topicName + "&enterSource=3"
                });
            }
        }
    }
});