//app.js
App({
  onLaunch: function () {
    wx.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail() {
        // 登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              wx.request({
                url: 'https://wechatapp.ljczl.top/codeToSession',
                method: "POST",
                data: {
                  "code": res.code
                },
                header: {
                  "content-type": "application/x-www-form-urlencoded"
                },
                success(res) {
                  wx.setStorageSync("openid", res.data.openid)
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
      }
    })

    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              wx.setStorageSync("userInfo", res.userInfo)
            }
          })
        }
      }
    })

  }
})