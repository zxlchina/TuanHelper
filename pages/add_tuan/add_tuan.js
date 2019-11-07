// pages/add_tuan/add_tuan.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "2019-06-01",
    time: "12:01",
    files: [],
    goods: [{ "name": "萝卜", "desc": "这是一个萝卜", "imgs": [] }, { "name": "青菜", "desc": "这是一个青菜", "imgs": [] }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  chooseImage: function (e) {
    console.log(e)
    var index = parseInt(e.currentTarget.id)
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths)
        console.log(index)
        var goods = that.data.goods
        goods[index].imgs = goods[index].imgs.concat(res.tempFilePaths)
        that.setData({
          goods: goods
        });
        console.log(that.data.goods)
      }
    })
  },
  previewImage: function (e) {
    var index = parseInt(e.target.dataset.goodindex)
    console.log(e, index)
    wx.previewImage({
      current: e.target.id, // 当前显示图片的http链接
      urls: this.data.goods[index].imgs // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },


  add_good: function(e) {
    var goods = this.data.goods
    var new_one = { "name": "", "desc": "", "imgs": []}
    goods = goods.concat(new_one)
    
    var count = goods.length

    this.setData({
      goods: goods
    })
    
    wx.pageScrollTo({
      scrollTop: 1000,
    })

    wx.showToast({
      title: '商品' + count + ' 添加成功',
      icon: 'success',
      duration: 2000
    })
  },

  onsubmit: function() {
    var that = this
    //提交拼团信息
    wx.request({
      url: app.globalData.host + '',
      success(res)
      {
        if (res.statusCode != 200) {
          console.log("error", res)
          wx.showToast({
            title: '网络错误:' + res.statusCode,
          })
          return 
        }
        console.log("succ:", res)
        wx.showToast({
          title: res.data
          })
      },
      fail(res)
      {
        wx.showToast({
          title: "网络错误：" + res.data
        })
        console.log(res)
      }
    })
  },

  onreset: function() {

    this.setData({
      goods: [{ "name": "", "desc": "", "imgs": [] }]
    })
  },
  

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})