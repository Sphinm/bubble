var t = require("../../utils/util.js"), e = (require("../../utils/globalDefine.js"), 
require("../../network/httpRequest.js"));

Page({
    data: {
        historyList: []
    },
    getHistoryRedList: function() {
        var i = this;
        e.getHistoryRedList().then(function(e) {
            for (var s = e.openRedEnvelopeList || [], r = 0; r < s.length; r++) {
                var a = t.formatTime(new Date(s[r].createDate));
                s[r].createDate = a;
            }
            i.setData({
                historyList: s
            });
        });
    },
    onWxLoginCallBack: function() {},
    onLoad: function() {
        this.getHistoryRedList();
    }
});