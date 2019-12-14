Page({
  data: {
    year: 1990,
    month: 1,
    day: 1,
    list: [],
    show: false,
    currentDate: Date.now()
  },

  onLoad: function() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    this.setData({
      year,
      month,
      day
    });
    this.doGetList();
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onChangeDate: function() {
    this.setData({
      show: true
    });
  },


  onCancel: function() {
    this.setData({
      show: false
    });
  },

  onConfirm: function(event) {
    const date = new Date(event.detail);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.setData({
      year,
      month,
      day,
      show: false
    });
    this.doGetList();
  },

  /**
   * 监听用户分享
   */
  onShareAppMessage: function(res) {
    return {
      title: '快来看看历史上的今天发生的事件',
      path: '/pages/today-in-history/index'
    }
  },

  /**
   * 执行数据获取
   */
  doGetList: function() {
    const {
      month,
      day
    } = this.data;
    wx.showLoading({
      title: '加载中...',
      icon: 'none',
      mask: true
    })
    wx.cloud.callFunction({
        name: 'dream',
        data: {
          action: 'todayInHistory',
          month,
          day
        }
      }).then(res => {
        wx.hideLoading();
        if (res.result) {
          let list = res.result.reverse();
          this.setData({
            list
          });
        }
      })
      .catch(console.error)
  }
})