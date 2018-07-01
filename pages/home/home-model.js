
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
}

export {Home};