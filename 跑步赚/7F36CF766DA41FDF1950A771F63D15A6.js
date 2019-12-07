var e = getApp();

module.exports = function(t, a) {
    wx.request({
        url: e.getAdvert("/advert/pbz_getAdvert"),
        method: "POST",
        header: {},
        data: {
            unionid: wx.getStorageSync("unionId"),
            user_id: wx.getStorageSync("userId"),
            openid: wx.getStorageSync("openId"),
            type: t
        },
        success: function(e) {
            if (200 == e.data.code) {
                var t = e.data.data ? e.data.data : null;
                if (!t) return void (a && a(t));
                var d = JSON.parse(JSON.stringify(t)), r = [];
                for (var n in t) for (var o in t[n]) if ("type_app" != n) {
                    var i = {};
                    i.ad_id = t[n][o].id, i.pro_id = t[n][o].pro_id, i.type = t[n][o].type, i.jump_type = t[n][o].jump_type, 
                    i.main_id = t[n][o].main_id, r.push(i), t[n][o].extraData = {
                        userId: wx.getStorageSync("userId"),
                        openId: wx.getStorageSync("openId"),
                        unionId: wx.getStorageSync("unionId"),
                        adInfo: d[n][o]
                    };
                }
                a && a(t);
            } else console.log("请求广告", e.data.message);
        }
    });
};