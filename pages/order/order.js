// pages/order/order.js

import {Cart} from '../cart/cart-model.js';
import {Address} from '../../utils/address.js';

var cart = new Cart();
var address = new Address();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var productsArr;
    this.data.account = options.account;

    productsArr = cart.getcartDataFromLocal(true);
    
    this.setData({
      productsArr:productsArr,
      account:options.account,
      orderStatus:0
    });
  },

  editAddress:function(event){
    var that = this;
    wx.chooseAddress({
      success:function(res){
        var addressInfo = {
          name: res.userName,
          mobile: res.telNumber,
          tatalDetail: address.setAddressInfo(res)
        };
        that._bindAddressInfo(addressInfo);

        address.submitAddress(res,(flag)=>{
          if(!flag){
            that.showTips('操作提示','地址信息更新失败！');
          }
        })
      }
    })
  },

  showTips:function(title,content,flag){
    wx.showModal({
      title: title,
      content: content,
      showCancel:false,
      success:function(res){
        if(flag){
          wx.switchTab({
            url: '/pages/my/my',
          })
        }
      }
    })
  },

  _bindAddressInfo:function(addressInfo){
    this.setData({
      addressInfo:addressInfo
    });
  },

})