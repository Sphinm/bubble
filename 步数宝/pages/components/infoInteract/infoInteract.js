var t = require("../../../utils/community.js"), e = (require("../../../utils/toast.js"), 
require("../../../utils/util.js"));

Component({
    properties: {
        interactInfo: {
            type: Object
        },
        listType: {
            type: String
        },
        listIndex: {
            type: Number,
            value: -1
        },
        dynamicIndex: {
            type: Number
        },
        isLink: {
            type: Number
        },
        isLike: {
            type: Number
        },
        likeNum: {
            type: Number
        },
        showDelete: {
            type: Number
        },
        isShowShare: {
            type: Number
        },
        showRedDot: {
            type: Number
        },
        isCollection: {
            type: Number
        }
    },
    data: {
        interactInfo: {}
    },
    methods: {
        liked: function() {
            var e = this;
            t.DYNAMICLIKE(e.data.interactInfo.id, e.data.isLike, function(t) {
                "OK" === t.code && 1 === t.data.result && e.triggerEvent("likeInfo", {
                    index: e.data.dynamicIndex,
                    type: e.data.listType
                });
            });
        },
        collection: e.throttle(function() {
            var e = this, i = void 0;
            1 == e.data.isCollection && (i = -1), -1 == e.data.isCollection && (i = 1), t.COLLECTION(e.data.interactInfo.id, i, function(t) {
                "OK" === t.code ? e.triggerEvent("collectionChange", {
                    index: e.data.dynamicIndex,
                    type: e.data.listType
                }) : "DYNAMIC_IS_NOT_COLLECTION" === t.code && e.triggerEvent("collectionChange", {
                    index: e.data.dynamicIndex,
                    type: e.data.listType
                });
            });
        }, 1500),
        comment: function() {
            var t = this;
            1 === this.data.isLink ? wx.navigateTo({
                url: "/pages/community/communityInfo/communityInfo?isFocus=1&dynamicId=" + t.data.interactInfo.id + "&enterSource=2"
            }) : this.triggerEvent("comment");
        },
        deleteInfo: function() {
            var t = this;
            wx.showModal({
                content: " 确定删除该内容吗",
                success: function(e) {
                    e.confirm && t.triggerEvent("deleteInfo", t.data.dynamicIndex);
                }
            });
        }
    }
});