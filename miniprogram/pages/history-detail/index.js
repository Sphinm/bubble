
Page({
  data: {
    detail: {}
  },

  onLoad: function(options) {
    this.id = options.id;
    this.doGetDetail();
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onPicTap: function() {
    const pics = this.data.detail.picUrl;
    const urls = pics.map(item => item.url);
    wx.previewImage({
      urls
    })
  },


  doGetDetail: function() {
    wx.showLoading({
      title: '加载中...',
      icon: 'none',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'dream',
      data: {
        action: 'historyDetail',
        id: this.id
      }
    }).then(res => {
      wx.hideLoading()
      let detail = {
        title: '抱歉，未找到相关信息'
      };
      const result = res.result;
      if (result) {
        detail = res.result[0]
      }
      console.log(detail);
      this.setData({
        detail
      });
    });
  },

  /**
   * 监听用户分享
   */
  onShareAppMessage: function(res) {
    const detail = this.data.detail;
    return {
      title: `${detail.title}`,
      path: `/pages/history-detail/index?id=${this.id}`
    }
  }
})