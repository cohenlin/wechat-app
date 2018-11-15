//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 登录获取openid
  inputName: function(e) {
    this.setData({
      inputName: e.detail.value
    })
  },
  template: function() {
    wx.navigateTo({
      url: '../template/template-view',
    })
  },
  submit: function() {
    var inputName = this.data.inputName;
    wx.request({
      url: 'https://wechatapp.ljczl.top/api/insertNickName',
      method: 'POST',
      data: {
        nickName:inputName
      },
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success(res) {
        
      }
    })
  },
  onLoad: function () {
    var userInfo = wx.getStorageSync("userInfo")
    this.setData({
      userInfo: userInfo
    });
  },
})