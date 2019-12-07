Page({
    data: {
        indicatorDots: !0,
        autoplay: !0,
        circular: !0,
        interval: 5e3,
        duration: 1e3,
        genderIndex: "",
        userInfo: {},
        dataJson: [],
        formConfig: {},
        base: "",
        title: "",
        hasAuth: !0,
        num: {
            canSub: !1,
            canAdd: !0,
            total: 1
        }
    },
    onLoad: function(t) {
        var a = this;
        this.setData({
            base: t.bs,
            title: t.title,
            "formConfig.uuid": t.ukey,
            "formConfig.ak": t.appkey,
            "formConfig.page_key": t.pagekey,
            "formConfig.curl": t.cu.replace(/!/gi, "=")
        }), this.setTitle();
        var e = JSON.parse(t.xmadPage);
        e.forEach(function(t) {
            "form" == t.type && t.data.config.goods.details.forEach(function(t) {
                t.values[0].checked = !0;
            });
        }), this.setData({
            dataJson: e
        }), wx.getSetting({
            success: function(t) {
                t.authSetting["scope.address"] || wx.authorize({
                    scope: "scope.address",
                    success: function() {
                        a.setData({
                            hasAuth: !0
                        });
                    },
                    fail: function() {
                        a.setData({
                            hasAuth: !1
                        });
                    }
                });
            }
        });
    },
    onShow: function() {},
    setCallBack: function(t) {
        t.detail.authSetting["scope.address"] && this.setData({
            hasAuth: !0
        });
    },
    toDetail: function() {
        wx.createSelectorQuery().select(".form-container").boundingClientRect(function(t) {
            wx.pageScrollTo({
                scrollTop: t.top,
                duration: 300
            });
        }).exec();
    },
    _subNum: function(t) {
        var a = this.data.num.total;
        1 != a && this.setData({
            "num.total": --a,
            "num.canSub": a > 1,
            "num.canAdd": a < 200
        });
    },
    _inputNum: function(t) {
        var a = t.detail.value;
        a < 1 && (a = 1), a > 200 && (a = 200), this.setData({
            "num.total": a,
            "num.canSub": a > 1,
            "num.canAdd": a < 200
        });
    },
    _addNum: function(t) {
        var a = this.data.num.total;
        this.setData({
            "num.total": ++a,
            "num.canSub": a > 1,
            "num.canAdd": a < 200
        });
    },
    checkItem: function(t) {
        var a = t.target.dataset.i, e = t.target.dataset.idx;
        this.data.dataJson.forEach(function(t) {
            "form" == t.type && t.data.config.goods.details.forEach(function(t, n) {
                a === n && (t.values.forEach(function(t) {
                    return t.checked = !1;
                }), t.values[e].checked = !0);
            });
        }), this.setData({
            dataJson: this.data.dataJson
        });
    },
    postLog: function(t, a) {
        var e = 0, n = this.data.base;
        !function o() {
            wx.request({
                url: n + t.url,
                data: t.data,
                method: "post",
                success: function() {
                    a && wx.showModal({
                        content: "下单成功~",
                        showCancel: !1,
                        confirmText: "好的"
                    });
                },
                fail: function() {
                    e < 2 && (e++, setTimeout(function() {
                        o();
                    }, 1e3));
                }
            });
        }();
    },
    submitForm: function(t) {
        var a = this, e = t.detail.value, n = this.data.dataJson.filter(function(t) {
            return "form" === t.type;
        })[0].data.config.goods, o = {};
        o.leave_msg = e.leave_msg || "", o.detail = n.details.map(function(t) {
            var a = t.values.filter(function(t) {
                return t.checked;
            })[0];
            return {
                name: t.name,
                value: a.label
            };
        }), o.num = this.data.num.total, wx.chooseAddress({
            success: function(t) {
                delete t.errMsg, a.postLog({
                    url: "order",
                    data: Object.assign({}, {
                        dataType: 3
                    }, a.data.formConfig, {
                        good: o,
                        customer: t
                    })
                }, 1);
            },
            fail: function(t) {}
        });
    },
    hotLine: function() {
        var t = this, a = this.data.dataJson.filter(function(t) {
            return "form" === t.type;
        })[0];
        a && wx.makePhoneCall({
            phoneNumber: a.data.config.contactPhone,
            success: function() {
                t.postLog({
                    url: "phone",
                    data: t.data.formConfig
                }, 0);
            },
            fail: function() {}
        });
    },
    setTitle: function() {
        this.data.title && wx.setNavigationBarTitle({
            title: this.data.title
        });
    }
});