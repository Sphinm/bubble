var o = getApp();

require("../../utils/util.js"), o.globalData.resurl, o.globalData.key, o.globalData.deviceProperties, 
o.globalData.sharelist;

Page({
    data: {},
    onLoad: function(o) {
        var a = this;
        a.setData({
            goodsId: o.id
        }), wx.request({
            url: "https://pdd.xjs114.com/goodsDetail",
            data: {
                goodsId: o.id,
                pid: "8672284_76356779"
            },
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(o) {
                var e = o.data.goods_detail_response.goods_details[0];
                e.goods_gallery_url = e.goods_gallery_urls.slice(0, 3), console.log(e), e.min_group_price = parseFloat(e.min_group_price / 100).toFixed(2), 
                e.min_normal_price = parseFloat(e.min_normal_price / 100).toFixed(2), e.coupon_discount = parseFloat(e.coupon_discount / 100).toFixed(2), 
                a.setData({
                    detail: e
                });
            }
        });
    },
    onShow: function() {},
    index: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    buy: function() {
        var o = this;
        wx.request({
            url: "https://pdd.xjs114.com/generateGoodsPromotionUrl",
            data: {
                goodsId: o.data.goodsId,
                pid: "8672284_76356779"
            },
            header: {
                "Content-Type": "application/json;charset=utf-8"
            },
            method: "POST",
            success: function(o) {
                var a = o.data.goods_promotion_url_generate_response.goods_promotion_url_list[0].we_app_info;
                wx.navigateToMiniProgram({
                    appId: a.app_id,
                    path: a.page_path,
                    extraData: {
                        foo: "bar"
                    },
                    envVersion: "release",
                    success: function(o) {}
                });
            }
        });
    }
});