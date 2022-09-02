// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nbFrontColor: '#000000',
      nbBackgroundColor: '#ffffff',
      imglist:[
        {src:'../image/优惠券.png',text:'领券中心'},
        {src:'../image/权益.png',text:'权益卡'},
        {src:'../image/自助充值.png',text:'自动充值'},
        {src:'../image/无人自助.png',text:'无人自助'},
        {src:'../image/收货地址.png',text:'收货地址'},
        {src:'../image/分销员.png',text:'分销员'},
        {src:'../image/线下密码.png',text:'线下密码'},
        {src:'../image/附近.png',text:'附近门店'}
      ]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    this.setData({
      nbTitle: '我的',  
     
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