let page = 1; // 当前第几页,0代表第一页
const pagesize = 10; //每页显示多少数据
Page({
  data: {
    joke_list: [],
    loadMore: false, //"上拉加载"的变量，默认false，隐藏
    loadAll: false, // “没有数据”的变量，默认false，隐藏
  },

  onLoad: function() {
    this.doGetList();
    wx.showShareMenu({
      withShareTicket: true,
    });
  },

  onReachBottom() {
    let that = this;
    if (!that.data.loadMore) {
      that.setData({
        loadMore: true, //加载中
        loadAll: false, //是否加载完所有数据
      });

      //加载更多，这里做下延时加载
      that.doGetList();
    }
  },

  onShareAppMessage: function(res) {
    return {
      title: "快来看看历史上的今天发生的事件",
      path: "/pages/index/index",
    };
  },

  /**
   * 执行数据获取
   */
  doGetList: function() {
    const that = this;
    if (page == 1) {
      this.setData({
        loadMore: true,
        loadAll: false,
      });
    }
    wx.showLoading({
      title: "加载中...",
      icon: "none",
      mask: true,
    });
    wx.cloud
      .callFunction({
        name: "dream",
        data: {
          action: "latestJoke",
          page: page,
          pagesize: pagesize,
        },
      })
      .then(res => {
        wx.hideLoading();
        if (res.result.data && res.result.data.length > 0) {
          page++;
          let list = that.data.joke_list.concat(res.result.data);
          this.setData({
            joke_list: list,
            loadMore: false,
          });
          if (res.result.data.length < pagesize) {
            that.setData({
              loadMore: false, //隐藏加载中。。
              loadAll: true, //所有数据都加载完了
            });
          }
        } else {
          that.setData({
            loadAll: true, //所有数据都加载完了
            loadMore: false, //隐藏加载中。。
          });
        }
      })
      .catch(err => {
        console.log("请求失败", err);
        that.setData({
          loadAll: false,
          loadMore: false,
        });
      });
  },
});
