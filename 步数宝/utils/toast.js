function n(n, o, t, c, e) {
    wx.showToast({
        title: n,
        icon: o || "none",
        duration: t || 2e3,
        mask: !0,
        success: function(n) {
            e && e(n);
        },
        fail: function(n) {
            console.log(n), e && e(n);
        },
        complete: function(n) {
            e && e(n);
        }
    });
}

module.exports = {
    SUCCESS: function(o) {
        n(o, "none");
    },
    FAIL: function(o) {
        n(o, "none");
    },
    SHOW: n
};