var t = require("../../network/httpRequest.js");

Page({
    data: {
        conditionArr: [ "界面卡顿", "界面错位", "不实信息", "数据异常", "其他异常", "意见与建议" ],
        conditionIndex: 0,
        textValue: "",
        isChoose: !1
    },
    onLoad: function() {},
    bindInputValue: function(t) {
        this.setData({
            textValue: t.detail.value
        });
    },
    bindChoose: function(t) {
        var n = parseInt(t.currentTarget.dataset.type);
        this.setData({
            conditionIndex: n,
            isChoose: !0
        });
    },
    bindCommit: function() {
        var n = this, e = {};
        if (e.complaintType = n.data.conditionArr[n.data.conditionIndex], e.complaintDes = n.data.textValue, 
        "" === e.complaintDes) return wx.showToast({
            title: "内容不能为空！",
            icon: "none",
            duration: 2e3
        }), !1;
        t.userComplaint(e).then(function(t) {
            wx.showToast({
                title: "商家已接受投诉",
                icon: "none",
                duration: 3e3
            }), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 1e3);
        });
    }
});