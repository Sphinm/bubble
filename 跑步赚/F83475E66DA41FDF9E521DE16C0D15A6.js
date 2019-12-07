var e = getApp();

module.exports = function(t, o, c) {
    wx.request({
        url: e.getAdvert("/activity/actClick"),
        method: "POST",
        data: {
            user_id: wx.getStorageSync("userId"),
            openid: wx.getStorageSync("openId"),
            act_id: t[o].id,
            type: t[o].type
        },
        success: function(e) {
            200 == e.data.code ? (console.log(t[o].activity_name + ":活动点击汇报成功"), c && c()) : console.log("活动汇报点击失败");
        }
    });
};