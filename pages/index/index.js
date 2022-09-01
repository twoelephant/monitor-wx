// index.js
// 获取应用实例
const app = getApp()

Page({
	data: {
		shopName: "店铺名称",
		fit:false
	},

	/* 判断是否是刘海屏 */
	isIphoneX() {
		let res = wx.getSystemInfoSync();
		var safeBottom = res.screenHeight - res.safeArea.bottom
		//根据安全高度判断
		return  safeBottom === 34 ?true:false
	   },
	

	onLoad() {
		this.setData({
			fit:this.isIphoneX()
		}),
		// console.log(this.data.fit)
		wx.setNavigationBarTitle({
			/* 动态设置NavigationBarTitle */
			title: this.data.shopName,
		})
		// console.log(this.isIphoneX())
		

	},


})