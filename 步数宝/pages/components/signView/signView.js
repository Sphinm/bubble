var t = require("../../../utils/room.js");

Component({
    properties: {
        listcl: {
            type: [],
            value: null
        },
        isShow: {
            type: Number,
            value: 2
        },
        isNew: {
            type: Boolean,
            value: !1
        }
    },
    data: {},
    methods: {
        powerDrawer: function() {
            this.setData({
                isShow: 2
            });
        },
        appointment: function() {},
        formSubmit: function(e) {
            var o = this;
            t.UPLOADFORMID(e.detail.formId, function(t) {
                "OK" == t.code && wx.showToast({
                    title: "预约成功",
                    icon: "none"
                });
            }), o.setData({
                isShow: 2
            });
        }
    }
});