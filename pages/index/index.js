import QNRTC from 'qnwxapp-rtc'
import QNPublishStatus from "qnwxapp-rtc"

// index.js
// 获取应用实例
const app = getApp()
let client
Page({

  handlePusherStateChange(e) { //监听推流状态码
    QNRTC.updatePusherStateChange(e);
    console.log("pusher state", e.detail.code, e.detail.message);
  },
  handlerPusherNetStatus(e) {
    QNRTC.updatePusherNetStatus(e);
    console.log(
      "pusher net status",
      "videoBitrate: ",
      e.detail.info.videoBitrate,
      "audioBitrate: ",
      e.detail.info.audioBitrate
    );
  },

  data: {
    camera: false,
    userList: [],
    // client: null,
    pushContext: null,
    localTracks: '',
    publishPath: '',
    subscribeList: [],
    item: '',
    shopName: "店铺名称",
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
    hasUserInfo: false, //是否获取到用户信息，默认为false
    loginOk: false, //后台登录状态，默认为false
    enter: false, //是否在店内

    hangUP: 'display: none', //挂断button状态
    showOther: 'display: ', //挂断button状态

    expireAt: '', //通话结束时间
    roomName: '001', //roomName
    userId: 'ccc', //userId
    roomToken: '',

    display: ''
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

  getpublishPath() { //获取发布地址
    console.log(client);
    client.publish((status, data) => {
      console.log("callback: publish - 发布后回调", status, data);
      if (status === "READY") {
        console.log(data);
        console.log(data.url);
        this.setData({
          publishPath: data.url
        })
        console.log(this.data.publishPath);
      } else if (status === QNPublishStatus.COMPLETED) {
        this.setData({
          localTracks: data.tracks
        })
      } else if (status === QNPublishStatus.ERROR) {
        console.log("发布失败")
      }
    })
  },


  cancleCsao() { //扫一扫
    client = QNRTC.createClient(); //创建新通讯项目
    let date = new Date()
    let b = date.getTime()
    let c = b + 3600000
    let d = c.toString()
    let e = d.substring(0, 10) //获得roomtoken的结束时间,在当前时间的1小时后
    console.log(e);
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
          roomToken: res.data.data,
        })
        console.log(res);
      }
    })
    client.on('user-published', async (userID, tracks) => { //获取订阅地址
      const url = await client.subscribe({
        videoTrack: tracks.find(track => track.isVideo()),
        audioTrack: tracks.find(track => track.isAudio())
      })
      this.setData({
        subscribeList: [...this.data.subscribeList, url]
      })
    });
  },


  async cancleCall() { //呼叫客服
    this.pushContext = wx.createLivePusherContext();
    this.setData({
      pushContext: this.pushContext
    });
    wx.showToast({
      title: "呼叫中",
      icon: "loading",
      mask: true,
      fail: (data) => console.log("fail", data),
    });
    await client.join(this.data.roomToken)
    this.getpublishPath()
    this.setData({
      hangUP: 'display: ',
      showOther: 'display: none'

    })

    console.log(client);
  },
  enterClick() { //开门进店
    console.log("开门进店")

  },
  cancleCgd() { //挂断
    client.leave()
    this.setData({
      hangUP: 'display: none',
      showOther: 'display:'
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
    this.data.duration = 30000 //调整字幕滚动速度
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