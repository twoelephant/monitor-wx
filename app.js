// app.js
App({
  globalData: {
    navBarHeight: 0,  //导航栏高度
    menuRight: 0,  //胶囊距右方间距（方保持左、右间距一致）
    menuTop: 0,  // 胶囊距顶部间距
    menuHeight:0,  // 胶囊高度（自定义内容可与胶囊高度保证一致）
    // userInfo: null
  },
  onLaunch() {
    const that = this;
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync(); 
    // 胶囊按钮位置信息 
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    console.log(systemInfo);
    console.log(menuButtonInfo);
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
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  
})
