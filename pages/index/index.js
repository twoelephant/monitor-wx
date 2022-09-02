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

		//用户信息
		avatar: '',
		nickName: '',
		hasUserInfo:false,//是否获取到用户信息，默认为false
		loginOk:false,    //后台登录状态，默认为false
		
		// hasUserInfo: true, //是否获取到用户信息，默认为false
		// loginOk: true, //后台登录状态，默认为false，登录ok后要显示  扫码进店页面
		// enter: false, //进门状态，false为未进入，true已经进入
		// goout: false, //是否出门
	},

	cancleClick() {
		//点击取消后给登录状态设置为真，让登录弹窗消失
		this.setData({
			hasUserInfo: true
		})
	},
	cancleClick1() {
		this.setData({
				loginOk: false,
				enter: false,
			})
	},

	enterClick() {
		this.setData({
			enter:true
		})

	},
	getUserProfile(e) {
		// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
		wx.getUserProfile({
			desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (res) => {
				// console.log(res)
				this.setData({
						hasUserInfo: true, //给登录状态设置为真
						loginOk: true
					}),
					app.globalData.userInfo = res.userInfo

				// console.log(app.globalData.userInfo)
			}
		})


	},




	onLoad() {
		const _this = this
		this.setData({
			menuHeight: app.globalData.menuHeight,
			menuTop: app.globalData.menuTop,
			navBarHeight: app.globalData.navBarHeight
		})

		// wx.getUserInfo({ 
		// 	不能用了
		// 	// lang: lang,
		// 	// withCredentials: true,
		// 	success: (result) => {
		// 		console.log(result)
		// 		_this.setData({
		// 			avatar:result.userInfo.avatarUrl
		// 		})
		// 	},
		//   })
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