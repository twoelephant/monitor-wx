// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',
    timeNow: '2020-01-01',
    timePast: '',
    // year: '',
    // month: '',


  },
  bindDateChange(e) {
    /* 改变日期 */
    // console.log(e)
    this.setData({
      timeNow: e.detail.value,

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var today = new Date()
    // console.log(today)
    let year = today.getFullYear()
    let month = today.getMonth()
    let date = today.getDate()
    this.setData({
      timeNow: year + "-" + "0" + (month + 1),
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})