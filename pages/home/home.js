// pages/home/home.js

import {Home} from './home-model.js';
var home = new Home();

Page({

  /**
   * 页面的初始数据
   */
  data: 
  {
    'data': [{
      'if':1,
      'title': '爆款推荐商品'
    },{
      'if': 2,
      'title': '最新商品'
    }, {
      'if': 3,
      'title': '热门商品'
      }]
  },

  onLoad:function()
  {
    this._loadData();
  },

  _loadData:function()
  {
    home.getBannerData((res) => { this.setData({ 'bannerArr': res }); });
    home.getBestGoodsData((res) => { this.setData({ 'BestGoodsArr': res }); });
    home.getNewGoodsData((res) => { this.setData({ 'NewGoodsArr': res }); });
    home.getHotGoodsData((res) => { this.setData({ 'HotGoodsArr': res }); });
  },

  onProductItemTap: function (event)
  {
    var id = home.getDataSet(event,'id');
    wx.navigateTo({
      url: '../product/product?id=' + id
    });
  }
  
})