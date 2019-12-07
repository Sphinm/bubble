Page({
    data: {},
    onLoad: function(e) {},
    feedback: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.title;
        wx.navigateTo({
            url: "../feedback/feedback?title=" + t
        });
    }
});