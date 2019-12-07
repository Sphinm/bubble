function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

var e = require("../../utils/util.js"), r = (require("../../utils/globalDefine.js"), 
require("../../network/httpRequest.js"));

Page({
    data: {
        budgetList: [],
        listTitle: [],
        totalList: {}
    },
    onWxLoginCallBack: function() {},
    onLoad: function() {
        var a = this;
        r.getCalorieDetails().then(function(r) {
            for (var i = r.rewardList, n = [], o = [], s = {}, u = 0; u < i.length; u++) {
                var l = e.formatTime(new Date(i[u].createDate)), c = l.split(" ")[0];
                s.hasOwnProperty(c) ? s[c] += i[u].rewardAmount : (s[c] = 0, s[c] += i[u].rewardAmount), 
                s[c] = Math.round(100 * s[c]) / 100, n.push({
                    time: l.split(" ")[1],
                    type: i[u].resourcesDesc,
                    rewardAmount: i[u].rewardAmount,
                    title: c
                }), o.push(c);
            }
            a.setData({
                budgetList: n,
                listTitle: [].concat(t(new Set(o))),
                totalList: s
            });
        });
    },
    onShareAppMessage: function(t) {
        return "button" === t.from && e.log(t.target), {
            title: "步数可换钱，运动币可提现",
            path: "/pages/index/index",
            imageUrl: "/images/common/share-cover.png",
            success: function(t) {
                e.log("--- 转发回调成功 ---");
            }
        };
    }
});