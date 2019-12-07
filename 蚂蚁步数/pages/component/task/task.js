var t = require("../../../utils/util.js"), a = require("../../../network/httpRequest.js");

require("../../../utils/globalDefine.js");

Component({
    properties: {
        taskObj: Object
    },
    data: {
        failModal: !0,
        taskModal: !0,
        taskId: "",
        timeTotal: 0,
        intervalId: null,
        isShowTask: 0
    },
    ready: function() {
        this.isShowTask();
    },
    pageLifetimes: {
        show: function() {
            var t = this, a = t.data.timeTotal;
            a > 0 && a < 30 && (t.stopTimer(), t.setData({
                failModal: !(t.properties.taskObj.taskReward > 0),
                timeTotal: 0
            })), this.isShowTask();
        }
    },
    methods: {
        isShowTask: function() {
            var t = this, a = wx.getStorageSync("finishTaskTime") || "";
            a ? new Date().getTime() - a > 6e5 && t.setData({
                isShowTask: 1
            }) : t.setData({
                isShowTask: 1
            });
        },
        bindHideFailModal: function() {
            this.setData({
                failModal: !0
            });
        },
        bindShowTaskModal: function() {
            this.setData({
                taskModal: !1
            });
        },
        bindHideTaskModal: function() {
            this.setData({
                taskModal: !0
            });
        },
        bindJumpApp: function(t) {
            var e = this, i = t.currentTarget.dataset.appid, s = t.currentTarget.dataset.appurl, n = t.currentTarget.dataset.type;
            e.setData({
                taskId: t.currentTarget.dataset.taskid
            }), 1 === n ? wx.navigateToMiniProgram({
                appId: i,
                path: s,
                extraData: {
                    foo: "bar"
                },
                envVersion: "release",
                success: function(t) {
                    e.bindHideFailModal(), e.startTimer();
                    var s = {};
                    s.appId = i, a.reportAppJump(s).then(function(t) {});
                }
            }) : 2 == n && wx.previewImage({
                current: s,
                urls: [ s ],
                success: function(t) {
                    e.bindHideFailModal(), e.startTimer();
                    var s = {};
                    s.appId = i, a.reportAppJump(s).then(function(t) {});
                }
            });
        },
        finishTask: function() {
            var t = this, e = {};
            e.taskId = t.data.taskId || "", a.finishTask(e).then(function(a) {
                t.setData({
                    timeTotal: 0,
                    isShowTask: 0
                });
                var e = new Date().getTime();
                wx.setStorageSync("finishTaskTime", e);
            });
        },
        startTimer: function() {
            var a = this;
            null != this.data.intervalId && this.stopTimer();
            var e = "";
            e = setInterval(function() {
                var e = a.data.timeTotal;
                e < 30 ? a.setData({
                    timeTotal: e + 1
                }) : (t.log("完成任务！"), a.finishTask(), a.stopTimer());
            }, 1e3), a.setData({
                intervalId: e
            });
        },
        stopTimer: function() {
            null != this.data.intervalId && clearInterval(this.data.intervalId), this.setData({
                intervalId: null
            });
        }
    }
});