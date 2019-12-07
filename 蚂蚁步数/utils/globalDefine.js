function e(e) {
    try {
        for (var t = {}, n = e.split("?")[1].split("&"), r = 0; r < n.length; ++r) {
            var a = n[r].split("=");
            t[a[0]] = a[1];
        }
        return t;
    } catch (e) {
        return null;
    }
}

function t(e) {
    n.userId = e.userId, n.userName = e.userName, n.headImg = e.headImg || "/images/common/default.png", 
    n.hasInfo = e.hasInfo, n.rewardNum = e.rewardNum, n.invitedResult = e.invitedResult, 
    n.newUserReward = e.newUserReward, n.newUserRewardAmount = e.newUserRewardAmount, 
    n.referrerInfo = e.referrerInfo, n.isNewUser = e.isNewUser, n.allowWithdrawal = e.allowWithdrawal;
}

var n = {}, r = 1, a = {}, o = {}, i = [], s = [], u = [], f = "";

module.exports = {
    userInfo: n,
    safetySwitchPage: function(t) {
        if (t) {
            for (var n = getCurrentPages(), r = -1, a = 0; a < n.length; ++a) if (t.indexOf(n[a].route) > -1) {
                r = a;
                break;
            }
            if (r > 0) {
                var o = n[r], i = e(t);
                o.setPageData && o.setPageData(i);
                var s = n.length - 1 - r;
                wx.navigateBack({
                    delta: s
                });
            } else wx.navigateTo({
                url: t
            });
        }
    },
    getUserLoginInfo: function() {
        return n;
    },
    setUserLoginInfo: function(e) {
        t(e);
    },
    splitUrlString: e,
    setTestFlag: function(e) {
        r = e;
    },
    getTestFlag: function() {
        return r;
    },
    setAdList: function(e) {
        a = e;
    },
    getAdList: function() {
        return a;
    },
    setDownloadInfo: function(e) {
        o = e;
    },
    getDownloadInfo: function() {
        return o;
    },
    setDownloadList: function(e) {
        i = e;
    },
    getDownloadList: function() {
        return i;
    },
    setTakeConfig: function(e) {
        s = e;
    },
    getTakeConfig: function() {
        return s;
    },
    setTakeHistory: function(e) {
        u = e;
    },
    getTakeHistory: function() {
        return u;
    },
    setIntegral: function(e) {
        f = e;
    },
    getIntegral: function() {
        return f;
    }
};