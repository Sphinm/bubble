var t = getApp();

module.exports = function(a, e) {
    wx.request({
        url: t.getAdvert("/activity/getActivity"),
        method: "POST",
        data: {
            type: a,
            user_id: wx.getStorageSync("userId")
        },
        header: {},
        success: function(t) {
            (t.data.data ? t.data.data : null) && e && e(t.data.data);
        }
    });
};