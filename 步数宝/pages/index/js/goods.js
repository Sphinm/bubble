function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
        return r;
    }
    return Array.from(e);
}

var t = require("../../../utils/request.js"), r = require("../../../utils/urls.js"), i = require("../../../utils/event.js");

module.exports = {
    getIndexGoodsList: function(a, s) {
        s || (s = 1), t.POST({
            url: r.INDEXGOODSLIST,
            params: {
                currentPage: s,
                pageSize: 10
            },
            success: function(t) {
                if (wx.stopPullDownRefresh(), "OK" == t.code) {
                    var r = t.data.result;
                    a.data.homeGoodsList = r;
                    var o = r.newComerGoodsList ? r.newComerGoodsList : [], n = r.referrerGoodsPageList.data, d = r.advert1.length ? r.advert1[0] : null, c = r.advert2.length ? r.advert2[0] : null;
                    if (1 == s) {
                        var l = [].concat(e(o), e(n));
                        if (d) {
                            l.splice(2, 0, d);
                            var u = {
                                event: "homePage_adver_click",
                                activity_type: 1,
                                activity_id: 1
                            };
                            i.EVENT_LOG(u);
                        }
                        if (c) {
                            l.splice(7, 0, c);
                            var v = {
                                event: "homePage_adver_click",
                                activity_type: 1,
                                activity_id: 2
                            };
                            i.EVENT_LOG(v);
                        }
                        a.setData({
                            indexGoodsList: l
                        });
                    } else a.setData({
                        indexGoodsList: [].concat(e(a.data.indexGoodsList), e(n))
                    });
                }
            },
            fail: function(e) {
                wx.showToast({
                    title: e.msg,
                    icon: "none"
                });
            }
        });
    }
};