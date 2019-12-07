module.exports = {
    NAVAdvert: function(e, n) {
        e ? wx.navigateToMiniProgram({
            appId: e,
            path: n,
            envVersion: "release",
            success: function(e) {}
        }) : wx.navigateTo({
            url: n
        });
    }
};