Component({
    properties: {
        adData: Object
    },
    attached: function() {
        this.setData({
            adID: this.dataset.id
        });
    },
    methods: {
        cancelJump: function(a, t) {
            t && wx.request({
                url: a + "v1/api/cancelclk",
                data: {
                    curl: t
                },
                method: "POST"
            });
        },
        adLoad: function() {
            this.triggerEvent("adload");
        },
        clickAd: function(a) {
            this.triggerEvent("click");
        },
        complete: function() {},
        navSuc: function(a) {},
        close: function() {
            this.triggerEvent("close");
        },
        navFail: function(a) {
            var t = this;
            console.log("errMsg:", a.detail.errMsg);
            var e = a.detail.errMsg, i = this.data, n = i.adData, c = i.adID;
            if (-1 !== e.indexOf("not in navigateToMiniProgramAppIdList")) wx.request({
                url: n.baseURL + "v1/api/skipfail",
                data: {
                    appid: n[c].appid[1],
                    appkey: n[c].ak
                },
                method: "GET"
            }); else if (-1 !== e.indexOf("cancel")) {
                var s = this.data.adData[this.data.adID];
                s ? this.cancelJump(n.baseURL, s.curl) : setTimeout(function() {
                    t.cancelJump(n.baseURL, s ? s.curl : "");
                }, 3e3);
            } else e.indexOf("fail to open");
        }
    }
});