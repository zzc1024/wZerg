// pages/home/home.js

import {Home} from './home-model.js';
var home = new Home();

Page({

  /**
   * 页面的初始数据
   */
  data: 
  {
    
  },

  onLoad:function()
  {
    home.getBannerData((res) => { this.setData({ 'bannerArr': res });});
    home.getBestGoodsData((res) => { this.setData({ 'BestGoodsArr': res }); });
    home.getNewGoodsData((res) => { this.setData({ 'NewGoodsArr': res }); });
    home.getHotGoodsData((res) => { this.setData({ 'HotGoodsArr': res }); });
  }
  
})