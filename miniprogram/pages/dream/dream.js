Page({
  data: {
    categoryList: [],
    currentCategory: {},
    searchStr: '',
    activeNames: ['1'],
    resultList: null
  },

  onLoad: function(options) {
    this.doGetCategory();
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onShareAppMessage: function(res) {
    return {
      title: '来看看关于梦的解析',
      path: '/pages/dream/dream'
    }
  },

  onSearch: function(event) {
    const {
      searchStr,
      currentCategory
    } = this.data;
    console.log('onSearch', searchStr, currentCategory)

    this.setData({
      activeNames: []
    });
    if (!searchStr) {
      wx.showToast({
        title: '请输入关键词',
        icon: 'none',
      })
      return;
    }
    wx.showLoading({
      title: '搜索中...',
      icon: 'none',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'dream',
      data: {
        action: 'dreamQuery',
        q: searchStr,
        cid: currentCategory.id || ''
      }
    }).then(res => {
      wx.hideLoading()
      const list = res.result;
      this.setData({
        resultList: list || []
      });
    })
  },

  /**
   * 监听搜索字段改变
   * TODO 节流操作
   */
  onChangeSearch(event) {
    const value = event.detail;
    this.setData({
      searchStr: value
    });
  },

  /**
   * 监听展开
   */
  onActiveChange: function(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  /**
   * 监听tag点击
   */
  onTagClick: function(event) {
    const id = event.currentTarget.dataset.id;
    const {
      categoryList: list,
      currentCategory: current
    } = this.data;
    if (current && id === current.id) {
      this.setData({
        currentCategory: {}
      });
      return;
    }
    const target = list.find(item => item.id === id);
    this.setData({
      currentCategory: target
    })
  },

  /**
   * 执行获取分类
   * 如果类型有了则不需要重新获取
   */
  doGetCategory: function() {
    const categoryList = wx.getStorageSync('categoryList')
    if (categoryList.length) {
      this.setData({
        categoryList: categoryList
      })
    } else {
      wx.cloud.callFunction({
        name: 'dream',
        data: {
          action: 'dreamCategory'
        }
      }).then(res => {
        const list = res.result
        wx.setStorageSync('categoryList', list)
        this.setData({
          categoryList: list
        })
      })
    }
  }
})