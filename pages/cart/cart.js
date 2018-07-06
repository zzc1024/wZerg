// pages/cart/cart.js

import {Cart} from './cart-model.js';

var cart = new Cart();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onLoad: function (options) {
  
  },

  onHide:function(){
    wx.setStorageSync('cart', this.data.cartData);
  },

  onShow: function () {
    var cartData = cart.getcartDataFromLocal();
    var cat = this._calcTotalAccountAndCounts(cartData);

    this.setData({
      selectedCounts: cat.selectedCounts, 
      selectedTypeCounts: cat.selectedTypeCounts, 
      account: cat.account, 
      cartData: cartData
    });
  },

  _calcTotalAccountAndCounts: function(data){
    var len = data.length,
        account = 0,
        selectedCounts = 0,
        selectedTypeCounts = 0;
    let multiple = 100;
    for(let i=0;i<len;i++){
      if(data[i].selectStatus){
        account += data[i].counts * multiple * Number(data[i].shop_price) * multiple;
        selectedCounts += data[i].counts;
        selectedTypeCounts++;
      }
    }
    return {
      selectedCounts: selectedCounts,
      selectedTypeCounts: selectedTypeCounts,
      account:account/(multiple * multiple)
    }
  },

  toggleSelect:function(event){
    var id = cart.getDataSet(event,'id'),
        status = cart.getDataSet(event,'status'),
        index = this._getProductIndexById(id);
    this.data.cartData[index].selectStatus = !status;
    this._resetCartData();
  },

  _resetCartData:function(){
    var newData = this._calcTotalAccountAndCounts(this.data.cartData);
    this.setData({
      selectedCounts: newData.selectedCounts,
      selectedTypeCounts: newData.selectedTypeCounts,
      account: newData.account,
      cartData: this.data.cartData
    });
  },

  toggleSelectAll:function(event){
    var status = cart.getDataSet(event,'status') == 'true';
    var data = this.data.cartData,
        len = data.length;
    for(let i=0;i<len;i++){
      data[i].selectStatus = !status;
    }
    this._resetCartData();
  },

  _getProductIndexById: function (id) {
    var data = this.data.cartData,
        len = data.length;
    for(let i=0;i<len;i++){
      if(data[i].id==id){
        return i;
      }
    }
  },

  changeCounts:function(event){
    var id =  cart.getDataSet(event,'id'),
        type = cart.getDataSet(event,'type'),
        index = this._getProductIndexById(id),
        counts = 1;
    if(type == 'add'){
      cart.addCount(id);
    }else{
      counts = -1;
      cart.cutCount(id);
    }

    this.data.cartData[index].counts += counts;

    this._resetCartData();
  },

  delete:function(event){
    var id = cart.getDataSet(event,'id'),
        index = this._getProductIndexById(id);
    this.data.cartData.splice(index,1);
    this._resetCartData();
    cart.delete(id);
  },

  onProductItemTap:function(event){
    var id = cart.getDataSet(event,'id');
    wx.navigateTo({
      url: '/pages/product/product?id='+id,
    })
  },

  submitOrder:function(event){
    wx.navigateTo({
      url: '/pages/order/order?account='+this.data.account+'&from=cart',
    })
  }

})