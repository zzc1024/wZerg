
import {Base} from '../../utils/base.js';

class Category extends Base{
  constructor(){
    super();
  }

  getCategoryType(callback){
    var param = {
      url:"category/all",
      sCallBack:function(data){
        callback && callback(data);
      }
    }
    this.request(param);
  }

  getProductsByCategory(id,callback) {
    var param = {
      url: "product/category/" + id,
      sCallBack: function (data) {
        callback && callback(data);
      }
    }
    this.request(param);
  }

}

export {Category};