
import {Base} from '../../utils/base.js';

class Cart extends Base{
  constructor(){
    super();
    this._storageKeyName = 'cart';
  }

  /*
   * 添加购物车
   * @item 商品对象
   * @counts 商品数目
   */
  add(item,counts){
    var cartData = this.getcartDataFromLocal();
    var isHasInfo = this._isHasThatOne(item.id,cartData);
    if(isHasInfo.index==-1){
      item.counts = counts;
      item.selectStatus = true;
      cartData.push(item);
    }else{
      cartData[isHasInfo.index].counts += counts;
    }
    wx.setStorageSync(this._storageKeyName, cartData); 
  }

  /*
   * 获取小程序缓存购物车数据
   */
  getcartDataFromLocal(){
    var res = wx.getStorageSync(this._storageKeyName);
    if(!res){
      res = [];
    }
    return res;
  }

  /*
   * 计算购物车商品数量
   */
  getCartTotalCounts(flag){
    var data = this.getcartDataFromLocal();
    var counts = 0;
    for(let i=0;i<data.length;i++){
      if(flag){
        if(data[i].selectStatus){
          counts += data[i].counts;
        }
      }else{
        counts += data[i].counts;
      }
      
    }
    return counts;
  }

  /*
   * 判断缓存里是否有商品
   */
  _isHasThatOne(id,arr){
    var item,
        result = {index:-1};
    for(let i=0; i<arr.length; i++){
      item = arr[i];
      if(item.id==id){
        result = {index:i,data:item};
        break;
      }
    }
    return result;
  } 

}


export {Cart};