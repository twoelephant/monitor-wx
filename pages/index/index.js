import QNRTC from 'qnwxapp-rtc'
import QNPublishStatus from "qnwxapp-rtc"

// index.js
// 获取应用实例
const app = getApp()
const client = QNRTC.createClient()
Page({

  handleStateChange(e) {     //监听推流是否成功
    console.log('live-pusher code:', e.detail.code)
  },

  data: {
    localTracks: '',
    publishPath: '',
    subscribeList: [],
    // item:'',
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
    hasUserInfo: false,//是否获取到用户信息，默认为false
    loginOk: false,    //后台登录状态，默认为false
    enter: false,       //是否在店内


    displaygua: 'display: none',    //挂断button状态
    expireAt: '',
    roomName: '001',
    userId: 'ccc',
    roomToken: '',
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
    })
  },

  getpublishPath() {
    client.publish((status, data) => {
      console.log("callback: publish - 发布后回调", status, data);
      if (status === "READY") {
        console.log(data.url);
        this.setData({
          publishPath: data.url
        })
        console.log(this.data.publishPath);
      } else if (status === QNPublishStatus.COMPLETED) {
        this.setData({
          localTracks: data.tracks
        })
        console.log(this.data.localTracks);
      } else if (status === QNPublishStatus.ERROR) {
        console.log("发布失败")
      }
    })
    client.on('user-published', async (userID, tracks) => {
      const url = await client.subscribe({
        videoTrack: tracks.find(track => track.isVideo()),
        audioTrack: tracks.find(track => track.isAudio())
      })
      this.setData({
        subscribeList: [...this.data.subscribeList, url]
      })
    });
  },


  cancleCsao() {           //扫一扫
    console.log(QNRTC.VERSION)
    let date = new Date()
    let b = date.getTime()
    let c = b + 3600000
    let d = c.toString()
    let e = d.substring(0, 10)
    this.setData({
      loginOk: true,
      enter: true,
      expireAt: e,
    })
    const _this = this
    wx.request({
      url: 'http://81.68.73.220:8000/api/room/token',
      method: 'POST',
      header: {
        'contentType': 'application/json',
      },
      data: {
        roomName: _this.data.roomName,
        userId: _this.data.userId,
        expireAt: _this.data.expireAt
      },
      success(res) {
        _this.setData({
          roomToken: res.data.data
        })
        console.log(res);
        _this.getpublishPath()
      }
    })
  },

  

  cancleCall() {          //呼叫客服
    client.join(this.data.roomToken)

    this.setData({
      displaygua: 'display: '
    })

  },
  enterClick() { //开门进店
    console.log("开门进店")

  },
  cancleCgd() {             //挂断
    client.leave()
    this.setData({
      displaygua: 'display: none'
    })
  },
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          hasUserInfo: true, //给登录状态设置为真
          loginOk: true
        }),
          app.globalData.userInfo = res.userInfo
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
  },

  onShow() {
    this.initAnimation(this.data.text); //关掉广播
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