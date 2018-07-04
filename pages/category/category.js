// pages/category/category.js

import {Category} from './category-model.js';

var category = new Category();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentMenuIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData:function(){
    category.getCategoryType((categoryData)=>{
      this.setData({categoryTypeArr:categoryData});

      category.getProductsByCategory(categoryData[0].id,(data)=>{
        this.setData({categoryProducts:data});
      });
    });
  },

  changeCategory:function(event){
    var index = category.getDataSet(event, 'index'),
        id = category.getDataSet(event, 'id');
    
    category.getProductsByCategory(id, (data) => {
      this.setData({ categoryProducts: data, currentMenuIndex: index });
    });
  },

  onProductsItemTap:function(event){
    var id = category.getDataSet(event,'id');
    wx.navigateTo({
      url: '../product/product?id=' + id
    });
  }
  
})