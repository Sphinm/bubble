import Toast from '../../vant/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.id = options.id;
    this.doGetDetail();
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  /**
   * 监听图片点击
   */
  onPicTap: function() {
    const pics = this.data.detail.picUrl;
    const urls = pics.map(item => item.url);
    wx.previewImage({
      urls
    })
  },

  /**
   * 执行获取详情
   */
  doGetDetail: function() {
    Toast.loading({
      mask: true,
      message: '加载中...'
    });
    wx.cloud.callFunction({
      name: 'dream',
      data: {
        action: 'historyDetail',
        id: this.id
      }
    }).then(res => {
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

      Toast.clear();
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