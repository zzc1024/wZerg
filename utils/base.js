
import {Config} from './config.js';

class Base{
  constructor()
  {
    this.baseRequestUrl = Config.restUrl;
  }

  /*
   * 发送http请求模板
   */
  request(params)
  {
    var url = this.baseRequestUrl + params.url;
    if(!params.type)
      params.type = 'GET';
    

    wx.request
    ({
      url: url,
      data: params.data,
      header: 
      {
        'content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      method: params.type,
      success: function(res) 
      {
        params.sCallBack&&params.sCallBack(res.data);
      },
      fail: function(err) 
      {
        params.eCallBack && params.eCallBack(res.data);
      }
    })
  }

  /*
   * 获取元素上绑定的值
   */
  getDataSet(event,key){
    return event.currentTarget.dataset[key];
  }

}

export {Base};