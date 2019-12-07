var t = getApp();

Page({
    data: {
        hidden: !1,
        height: "110rpx",
        curTab: 0,
        ishave: 2,
        pid: "",
        tabList: [ {
            tabName: "综合",
            tabStatus: 1
        }, {
            tabName: "价格",
            tabStatus: 0
        }, {
            tabName: "优惠券",
            tabStatus: 0
        }, {
            tabName: "销量",
            tabStatus: 0
        } ],
        shop_list: [],
        isshow: !0,
        sort: 0,
        pageNum: 1,
        type: "",
        hide: !0
    },
    onLoad: function(t) {
        this.setData({
            pid: t.search
        }), this.get_shop(), wx.setNavigationBarTitle({
            title: decodeURI(t.search)
        });
    },
    get_shop: function() {
        var a = this;
        a.setData({
            hide: !1
        }), wx.request({
            url: t.get_qdd("/main/search"),
            method: "GET",
            data: {
                keyword: a.data.pid,
                page: a.data.pageNum,
                sort: a.data.sort
            },
            success: function(t) {
                if (200 == t.data.code) {
                    var s = a.data.shop_list, e = t.data.data.shop_list;
                    for (var i in e) {
                        var o = Math.floor(35 * e[i].price);
                        o > 1e3 ? o = 1e3 : 0 == o && (o = 10), e[i].stepReward = o;
                    }
                    s = s.concat(e), a.setData({
                        shop_list: s,
                        hide: !0,
                        ishave: 1
                    });
                } else a.setData({
                    hide: !0,
                    ishave: 1
                });
            }
        });
    },
    toggleTab: function(t) {
        var a = t.currentTarget.dataset.updown, s = t.currentTarget.dataset.index, e = this.data.curTab, i = this.data.tabList;
        switch (this.setData({
            pageNum: 1,
            shop_list: [],
            hide: !1,
            ishave: 2
        }), s) {
          case 0:
            this.setData({
                sort: 0
            }), this.get_shop();
            break;

          case 1:
            0 == a || 1 == a ? (this.setData({
                sort: 2
            }), this.get_shop()) : 2 == a && (this.setData({
                sort: 3
            }), this.get_shop());
            break;

          case 2:
            0 == a || 1 == a ? (this.setData({
                sort: 4
            }), this.get_shop()) : 2 == a && (this.setData({
                sort: 5
            }), this.get_shop());
            break;

          case 3:
            0 == a || 1 == a ? (this.setData({
                sort: 6
            }), this.get_shop()) : 2 == a && (this.setData({
                sort: 7
            }), this.get_shop());
        }
        if (0 == s) {
            if (s == e) return;
            i[e].tabStatus = 0, i[s].tabStatus = 1;
        } else s == e ? 1 === i[s].tabStatus ? i[s].tabStatus = 2 : i[s].tabStatus = 1 : (i[e].tabStatus = 0, 
        i[s].tabStatus = 2 == s ? 2 : 1);
        this.setData({
            tabList: i,
            curTab: s
        }), wx.hideLoading();
    },
    goTop: function(t) {
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    onPageScroll: function(t) {
        var a = this;
        t.scrollTop <= 10 ? a.setData({
            isshow: !0
        }) : t.scrollTop > wx.getSystemInfoSync().windowHeight && (t.scrollTop = wx.getSystemInfoSync().windowHeight), 
        (t.scrollTop > 10 || t.scrollTop == wx.getSystemInfoSync().windowHeight) && a.setData({
            isshow: !1
        }), setTimeout(function() {
            a.setData({
                scrollTop: t.scrollTop
            });
        }, 0);
    },
    onReachBottom: function() {
        var t = this.data.pageNum + 1;
        this.setData({
            pageNum: t,
            hide: !1
        }), this.data.pid ? this.get_shop() : 1 == this.data.type ? this.get_nine() : 2 == this.data.type && this.get_top();
    },
    onShareAppMessage: function(a) {
        return t.globalData.shareInfo;
    }
});