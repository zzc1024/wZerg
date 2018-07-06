
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
  getcartDataFromLocal(flag){
    var res = wx.getStorageSync(this._storageKeyName);
    if(!res){
      res = [];
    }

    if(flag){
      var newRes = [];
      for(let i=0;i<res.length;i++){
        if (res[i].selectStatus){
          newRes.push(res[i]);
        }
      }
      res = newRes;
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

  /*
   * 修改商品数目
   */
  _changeCounts(id,counts){
    var cartData = this.getcartDataFromLocal(),
        hasInfo = this._isHasThatOne(id,cartData);
    if(hasInfo.index != -1){
      if(hasInfo.data.counts >= 1){
        cartData[hasInfo.index].counts += counts;
      }
    }
    wx.setStorageSync(this._storageKeyName, cartData);
  }

  addCount(id){
    this._changeCounts(id,1);
  }

  cutCount(id){
    this._changeCounts(id,-1);
  }

  delete(ids){
    if(!(ids instanceof Array)){
      ids = [ids];
    }
    var cartData = this.getcartDataFromLocal();
    for (let i=0;i<ids.length;i++){
      var hasInfo = this._isHasThatOne(ids[i],cartData);
      if(hasInfo.index != -1){
        cartData.splice(hasInfo.index,1);
      }
    }
    wx.setStorageSync(this._storageKeyName, cartData);
  }

}


export {Cart};