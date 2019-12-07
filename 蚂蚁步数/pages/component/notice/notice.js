var t = require("../../../network/httpRequest.js");

require("../../../utils/globalDefine.js");

Component({
    properties: {},
    data: {
        infoList: []
    },
    ready: function() {
        this.getNoticeList();
    },
    pageLifetimes: {
        show: function() {},
        hide: function() {}
    },
    methods: {
        getNoticeList: function() {
            var e = this;
            t.getNoticeList().then(function(t) {
                for (var i = t.msgList || "", s = 0; s < i.length; s++) {
                    var n = unescape(i[s].userName);
                    n.length > 4 && (n = n.substring(0, 4) + "...", i[s].userName = n);
                }
                e.setData({
                    infoList: i
                });
            });
        }
    }
});