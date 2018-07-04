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

  onShow: function () {
    var cartData = cart.getcartDataFromLocal();
    var cat = this._calcTotalAccountAndCounts(cartData);

    this.setData({
      selectedCounts: cat.selectedCounts, 
      selectedTypeCounts: cat.selectedTypeCounts, 
      account: cat.account, 
      cartData: cartData
    });
    console.log(this.data);
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

  },

  toggleSelectAll:function(event){
    
  }

})