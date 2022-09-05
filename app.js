// app.js
App({
  globalData: {
    navBarHeight: 0, //导航栏高度  ,用了
    menuRight: 0, //胶囊距右方间距（方保持左、右间距一致）,暂时无用
    menuTop: 0, // 胶囊距顶部间距   ,用了
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致） ,用了
    userInfo: null, //通过微信获取到的用户头像和用户名等信息
    code: '', //通过wx.login获得的临时登录凭证，用来传给后台获取用户手机号
  },
  onLaunch() {

    const that = this;
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息 
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // console.log(systemInfo);
    // console.log(menuButtonInfo);
    // 导航栏高度 = 状态栏高度 + 44(所有机型都适用)
    that.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    that.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    that.globalData.menuTop = menuButtonInfo.top;
    that.globalData.menuHeight = menuButtonInfo.height;

    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log(res)
        that.globalData.code = res.code
        // console.log(that.globalData.code)

        /* 做一个请求传递code到后台获取用户手机号 */
        // wx.request({
        //   url: '',
        //   method: 'post',
        //   success(res) {
        //     console.log(res)
        //     this.setData({
        //       loginOk: true
        //     })
        //   }
        // })

        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

})