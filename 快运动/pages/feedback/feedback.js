var t = getApp(), a = require("../../utils/util.js");

Page({
    data: {
        photo: []
    },
    onLoad: function(t) {
        this.setData({
            title: t.title
        });
    },
    uploadphoto: function() {
        var a = this, a = this, e = (t.globalData.resurl, a.data.photo), o = 4 - e.length, l = e.length;
        wx.chooseImage({
            count: o,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                wx.showLoading({
                    title: "正在上传图片"
                });
                for (var e = 0; e < t.tempFilePaths.length; e++) {
                    var o = t.tempFilePaths[e], i = l + e;
                    a.uploadFile(o, i);
                }
            }
        });
    },
    uploadFile: function(a, e) {
        var o = this, l = o.data.photo, i = t.globalData.resurl;
        wx.uploadFile({
            url: i + "/cosUpload/upload.shtml",
            formData: {
                filePath: "xcx/groupBug/10086/titleImg/img/"
            },
            filePath: a,
            name: "file",
            success: function(t) {
                console.log(t), l[e] = t.data, o.setData({
                    photo: l
                }), console.log(l), wx.hideLoading();
            }
        });
    },
    input: function(t) {
        var a = this, e = t.detail.value;
        a.setData({
            val: e
        });
    },
    btn: function() {
        var e = this, o = t.globalData.resurl, l = t.globalData.key, i = t.globalData.deviceProperties, n = e.data.photo, s = e.data.title, c = e.data.val;
        if (0 == n.length && (void 0 == c || "" == c)) return wx.showToast({
            title: "请填写投诉描述",
            icon: "none",
            duration: 2e3
        }), !1;
        n = n.join("-"), console.log(n);
        var r = {
            deviceProperties: i,
            complaint: {
                content: c,
                complaintType: s,
                complaintImg: n
            }
        };
        r = JSON.stringify(r), r = a.base64_encode(r), r = a.xxtea_encrypt(r, l), wx.request({
            url: o + "/interface/sdkData.shtml?requestId=15&a=1&b=0",
            data: r,
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(t) {
                t = a.xxtea_decrypt(t.data, l), t = a.base64_decode(t), t = JSON.parse(t), console.log(t), 
                wx.showModal({
                    title: "反馈成功",
                    content: "您的投诉与建议已经提交，我们会认真核实处理",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 3
                        });
                    }
                });
            }
        });
    }
});