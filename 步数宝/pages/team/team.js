var t = require("../../utils/event.js"), a = require("../../utils/team.js"), e = require("../../utils/wglogin.js"), i = require("../../utils/util.js"), o = getApp();

Page({
    data: {
        showAuthorizedMask: !1,
        targetList: [ 5e3, 8e3, 1e4, 15e3, 2e4, 25e3 ],
        teamTarget: 0,
        pageSize: 10,
        currentPage: 1,
        teamList: [],
        isLast: !1,
        manifesto: "",
        enter_time: "",
        tipTxt: ""
    },
    onLoad: function(t) {},
    onUnload: function() {
        var a = {
            event: t.EVENT_TEAM_PAGESTAYTIME,
            total_time: Date.parse(new Date()) / 1e3 - this.data.enter_time
        };
        t.EVENT_LOG(a, function(t) {});
    },
    onShow: function() {
        this.data.enter_time = Date.parse(new Date()) / 1e3, wx.pageScrollTo({
            scrollTop: 0,
            duration: 0
        });
        var t = this;
        o.globalData.showAuthorizedMask && wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? (o.globalData.showAuthorizedMask = !1, t.setData({
                    showAuthorizedMask: !1
                })) : (o.globalData.showAuthorizedMask = !0, t.setData({
                    showAuthorizedMask: !0
                }));
            }
        }), t.getTeamList(1);
    },
    onPullDownRefresh: function() {
        this.getTeamList(1, !0);
    },
    onReachBottom: function() {
        var t = this;
        t.data.isLast || t.getTeamList(t.data.currentPage + 1);
    },
    getTeamList: function(t, e) {
        e || wx.showLoading({
            title: "正在加载"
        });
        var i = this;
        a.GETTEAMLIST(t, i.data.pageSize, function(a) {
            if ("OK" == a.code) {
                var n = [];
                t > 1 && (n = i.data.teamList), i.setData({
                    teamList: n.concat(a.data.result.data),
                    currentPage: t
                });
            }
            t * i.data.pageSize >= a.data.result.count ? i.data.isLast = !0 : i.data.isLast = !1, 
            e ? wx.stopPullDownRefresh() : wx.hideLoading(), o.globalData.teamTipTxt && (wx.showToast({
                title: o.globalData.teamTipTxt,
                icon: "none"
            }), o.globalData.teamTipTxt = "");
        }, function() {
            e ? wx.stopPullDownRefresh() : wx.hideLoading();
        });
    },
    inputManifesto: function(t) {
        this.data.manifesto = t.detail.value;
    },
    createTeam: i.throttle(function(t) {
        if (console.log(t), t.detail.value.teamName) if (this.data.manifesto) {
            wx.showLoading({
                title: "正在创建",
                mask: !0
            });
            var e = this;
            a.CREATETEAM({
                goalStep: e.data.targetList[e.data.teamTarget],
                teamName: t.detail.value.teamName,
                manifesto: e.data.manifesto
            }, function(t) {
                "OK" == t.code ? (wx.hideLoading(), wx.navigateTo({
                    url: "/pages/teamSubPackages/teamInfo/teamInfo?teamId=" + t.data.result
                })) : (wx.hideLoading(), wx.showToast({
                    title: t.msg,
                    icon: "none"
                }));
            }, function() {
                wx.hideLoading();
            });
        } else wx.showToast({
            title: "请输入宣言",
            icon: "none"
        }); else wx.showToast({
            title: "请输入名称",
            icon: "none"
        });
    }),
    linkInfo: function(t) {
        wx.navigateTo({
            url: "/pages/teamSubPackages/teamInfo/teamInfo?teamId=" + t.currentTarget.dataset.id
        });
    },
    linkCreate: function() {
        wx.navigateTo({
            url: "/pages/teamSubPackages/createTeam/createTeam"
        });
        var a = {
            event: t.EVENT_TEAM_CREATGROUPCLICK
        };
        t.EVENT_LOG(a, function(t) {});
    },
    linkRule: function() {
        wx.navigateTo({
            url: "/pages/teamSubPackages/teamRule/teamRule"
        });
        var a = {
            event: t.EVENT_TEAM_BANNERCLICK
        };
        t.EVENT_LOG(a, function(t) {});
    },
    bindPickerChange: function(t) {
        this.setData({
            teamTarget: t.detail.value
        });
    },
    maskAuthorized: function(a) {
        var i = this;
        if (a.detail.userInfo) {
            i.setData({
                showAuthorizedMask: !1
            }), o.globalData.showAuthorizedMask = !1, e.SYNCUSERINFO(a.detail, function(t) {});
            var n = {
                event: t.EVENT_LOG_PERSONINFO,
                activity_name: "健步团"
            };
            t.EVENT_LOG(n, function(t) {});
        }
    }
});