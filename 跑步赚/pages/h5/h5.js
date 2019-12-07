Page({
    data: {
        h5Url: ""
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            h5Url: "https://online.litemob.com/run_app" + t.url
        });
    }
});