// index.js
// 获取应用实例
const app = getApp()

Page({
	data: {
		shopName: "店铺名称",
		// fit:false,
		menuHeight: 0,
		menuTop: 0,
		navBarHeight: 0,

		// 广播
		text: "1.【评分标准】页可以查看不同年龄段的评分标准，通过首页选择对应的性别、类别和年龄。2.【单项成绩】页包含了详细的单项打分情况及成绩雷达图，直观地看出自己的弱项和强项。",
		animation: null,
		timer: null,
		duration: 0,
		textWidth: 0,
		wrapWidth: 0,
	},


	onLoad() {
		this.setData({
			menuHeight: app.globalData.menuHeight,
			menuTop: app.globalData.menuTop,
			navBarHeight: app.globalData.navBarHeight
		})

		// wx.setNavigationBarTitle({
		// 	/* 动态设置NavigationBarTitle */
		// 	title: this.data.shopName,
		// })
	},


	onShow() {
		// this.initAnimation(this.data.text); //关掉广播
	},
	onHide() {
		//关掉广播
		this.destroyTimer();
		this.setData({
			timer: null
		})
	},
	onUnload() {
		//关掉广播
		this.destroyTimer()
		this.setData({
			timer: null
		})
	},
	//卸载定时器
	destroyTimer() {
		if (this.data.timer) {
			clearTimeout(this.data.timer);
		}
	},
	//开启公告字幕滚动动画
	initAnimation() {
		let that = this
		this.data.duration = 15000
		this.data.animation = wx.createAnimation({
			duration: this.data.duration,
			timingFunction: 'linear'
		})
		let query = wx.createSelectorQuery()
		query.select('.content-box').boundingClientRect()
		query.select('#text').boundingClientRect()
		query.exec((rect) => {
			that.setData({
				wrapWidth: rect[0].width,
				textWidth: rect[1].width
			}, () => {
				this.startAnimation()
			})
		})
	},
	// 定时器动画
	startAnimation() {
		const resetAnimation = this.data.animation.translateX(this.data.wrapWidth).step({
			duration: 0
		})
		this.setData({
			animationData: resetAnimation.export()
		})
		const animationData = this.data.animation.translateX(-this.data.textWidth).step({
			duration: this.data.duration
		})
		setTimeout(() => {
			this.setData({
				animationData: animationData.export()
			})
		}, 100)
		const timer = setTimeout(() => {
			this.startAnimation()
		}, this.data.duration)
		this.setData({
			timer
		})
	},



})