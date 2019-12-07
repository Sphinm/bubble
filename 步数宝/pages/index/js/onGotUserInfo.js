require("../../../utils/wglogin.js");

var t = require("../../../utils/event.js"), e = require("../../../utils/urlGL.js");

module.exports = {
    OGTUI: function(r) {
        if (wx.navigateTo({
            url: "/pages/index/goodlist/goodlist?goodid=" + r.currentTarget.dataset.id
        }), 4029 == r.currentTarget.dataset.id) {
            var a = {
                event: "homepage_test004_click",
                activity_type: "指定兑换商品点击"
            };
            t.EVENT_LOG(a, function(t) {});
        }
        var i = e.COMMODITYAREA(), n = {
            commodity_id: r.currentTarget.dataset.id,
            event: t.EVENT_LOG_HOMEPRODUCT,
            enter_source: r.currentTarget.dataset.index,
            activity_type: i[r.currentTarget.dataset.type],
            activity_name: r.currentTarget.dataset.name
        };
        t.EVENT_LOG(n, function(t) {});
    }
};