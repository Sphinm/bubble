var e = require("../../../utils/event.js");

module.exports = {
    INIT: function(t) {
        t.setData({
            moveball: ""
        });
        var a = [], i = [], n = [ {
            left: 510,
            top: 30
        }, {
            left: 70,
            top: 220
        }, {
            left: 610,
            top: 168
        }, {
            left: 550,
            top: 336
        }, {
            left: 30,
            top: 394
        } ];
        if (t.data.indexd.bubbleList) {
            var l = 5 * t.data.slice;
            i = t.data.indexd.bubbleList.slice(l, l + 5);
        }
        for (var b = 0; b < i.length; b++) {
            if (76 != i[b].bubbleType || t.data.openCountDown) {
                if (118 == i[b].bubbleType) {
                    var o = {
                        event: "homePage_ball_exchangeStep",
                        activity_name: "曝光",
                        activity_type: "分享奖励"
                    };
                    e.EVENT_LOG(o, function(e) {});
                } else if (300 == i[b].bubbleType) {
                    var d = {
                        event: "homePage_ball_exchangeStep",
                        activity_name: "曝光",
                        activity_type: "领取福利"
                    };
                    e.EVENT_LOG(d, function(e) {});
                }
            } else {
                t.setData({
                    bubbleTime: i[b].wheel
                }), t.countDown(i[b].wheel, i[b].wheel), t.data.openCountDown = !0;
                var u = {
                    event: "homePage_ball_exchangeStep",
                    activity_name: "曝光",
                    activity_type: "倒计时" + i[b].wheel + "s气泡"
                };
                e.EVENT_LOG(u, function(e) {});
            }
            if (a.push({
                id: i[b].id,
                width: 100,
                height: 140,
                left: n[b].left,
                top: n[b].top,
                numDesc: i[b].numDesc,
                con: i[b].stepNum,
                butype: i[b].bubbleType,
                signType: i[b].signType,
                refId: i[b].refId || "",
                colour: i[b].colour || "",
                explain: i[b].explain || "",
                linkUrl: i[b].linkUrl || "",
                diamondNum: i[b].diamondNum || "",
                diamondType: i[b].diamondType || "",
                userAwardDiamondId: i[b].userAwardDiamondId || ""
            }), 0 == i[b].bubbleType) {
                var r = {};
                r.bubble_operation_id = i[b].bubbleType + "", r.bubble_name = i[b].explain, r.bubble_step_num = i[b].stepNum, 
                r.bubble_link_url = i[b].linkUrl || "", r.event = "bsb_bubble", e.EVENT_LOG(r, function(e) {});
            }
            t.setData({
                bubbleArr: a
            });
        }
    },
    Circel: function(e, t, a, i) {
        var n = 0;
        e.animationMiddleHeaderItem = wx.createAnimation({
            duration: t,
            timingFunction: i,
            transformOrigin: "50% 50%",
            success: function(e) {}
        }), setInterval(function() {
            n % 2 == 0 ? e.animationMiddleHeaderItem.scale(a, a).step() : e.animationMiddleHeaderItem.scale(1, 1).step(), 
            e.setData({
                animationMiddleHeaderItem: e.animationMiddleHeaderItem.export()
            }), ++n == t && (n = 0);
        }.bind(e), t);
    }
};