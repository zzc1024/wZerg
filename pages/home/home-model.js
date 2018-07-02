
import {Base} from '../../utils/base.js';

class Home extends Base
{
  constructor()
  {
    super();
  }

  getBannerData(callBack)
  {
    var params = {
      url:'banner',
      sCallBack:function(res)
      {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  getBestGoodsData(callBack) {
    var params = {
      url: 'show/1',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  getNewGoodsData(callBack) {
    var params = {
      url: 'show/2',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }

  getHotGoodsData(callBack) {
    var params = {
      url: 'show/3',
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
}

export {Home};