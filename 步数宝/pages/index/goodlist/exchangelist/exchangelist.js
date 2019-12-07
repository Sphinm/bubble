var e = require("../../../../utils/event.js"), a = require("../../../../utils/room.js");

Page({
    data: {
        goodsId: ""
    },
    onLoad: function(e) {
        e.goodsId && (this.setData({
            goodsId: e.goodsId
        }), this.exchangeList(e.goodsId));
    },
    exchangeList: function(e) {
        var t = this;
        a.GOODEXCHANGELIST(e, 20, function(e) {
            "OK" == e.code && t.setData({
                changeList: e.data.exchangeList,
                exchangeTotal: e.data.exchangeTotal
            });
        });
    },
    toContentDetails: function(a) {
        var t = a.currentTarget.dataset.friendid;
        wx.navigateTo({
            url: "/pages/community/personalhomepage/personalhomepage?friendId=" + t
        });
        var o = {
            event: "goods_exchange_records_page",
            activity_id: t,
            activity_name: "点击"
        };
        e.EVENT_LOG(o);
    }
});