/* pages/cart/cart.js */
// 扫一扫后商品存放全局，从全局获取数据
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    buylist: [],
    total: 0,
    slideButtons: [{
      text: '删除',
      type: 'warn',
      extClass: 'deleteicon',
      src: '/image/del.png'
    }]
  },

  /**
   * 生命周期函数--监听页面加载,在页面加载时要获取扫面商品信息
   */
  onLoad(options) {
   
    //获取购物车信息
    this.setData({
      goods:app.globalData.goods
    })
    this.zong()
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  /**
   * 总金额
   */
  zong() {
    let newtotal = 0;
    this.data.goods.map((item) => {
      let a = parseFloat(item.price) * parseInt(item.num)
      newtotal += a
    })
    this.setData(
      { total: newtotal }
    )
  },
  /**
   * 商品数量,添加或减少
   */
  up(e) {
    let nowid = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.goods.length; i++) {
      if (this.data.goods[i].id === nowid) {
        let ab = 'goods[' + i + '].num'
        let s = parseInt(this.data.goods[i].num)
        ++s
        this.setData({
          [ab]: s
        })
        this.zong()
      }
    }
  },
  down(e) {
    let nowid = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.goods.length; i++) {
      if (this.data.goods[i].id === nowid) {
        let ab = 'goods[' + i + '].num'
        let s = parseInt(this.data.goods[i].num)
        --s
        this.setData({
          [ab]: s
        })
        this.zong()
      }
    }
  },
  /**
   * 删除商品
   */
  slideButtonTap(e) {
    let nowid = e.currentTarget.dataset.id
    for (let i = 0; i < this.data.goods.length; i++) {
      if (this.data.goods[i].id === nowid) {
        let newgoods = this.data.goods
        newgoods.splice(i, 1)
        this.setData({
          goods: newgoods
        })
        app.globalData.goods=newgoods
        wx.setTabBarBadge({ /* 获取购物车数量显示在购物车右上角 */
          index: 1,
          text: String(newgoods.length),
        })

        this.zong()
      }
    }

  },

  /**
  * 结算
  */
  jiesuan() {

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