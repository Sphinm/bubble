var t = getApp(), e = null;

Component({
    properties: {
        friendNum: {
            type: Number,
            value: 0
        }
    },
    data: {
        myFriends: null
    },
    attached: function() {
        e = this, t.httpsGet({
            url: t.getData("/tributealways"),
            data: {
                user_id: wx.getStorageSync("userId")
            },
            success: function(t) {
                var a = t.data.data;
                e.setData({
                    myFriends: a
                });
            }
        });
    },
    methods: {
        hiddenAll: function() {
            this.triggerEvent("hidden");
        }
    }
});