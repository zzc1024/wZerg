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
    home.getBannerData(this.callBack);
  },

  callBack:function(res)
  {
     this.setData({'bannerArr':res});
  }
  
})