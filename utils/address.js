

import {Base} from './base.js';
import {Config} from './config.js';

class Address extends Base {
  constructor(){
    super();
  }

  setAddressInfo(res){
    var province = res.provinceName || res.province,
        city = res.cityName || res.city,
        country = res.countyName || res.country,
        detail = res.detailInfo || res.detail;
    var totalDetail = city + country + detail;

    if (!this.isCenterCity(province)) {
      totalDetail = province + totalDetail;
    };
    return totalDetail;
  }

  isCenterCity(name) {
    var centerCitys = ['北京市', '天津市', '上海市', '重庆市'],
      flag = centerCitys.indexOf(name) >= 0;
    return flag;
  }

  /*保存地址*/
  _setUpAddress(res, callback) {
    var formData = {
      name: res.userName,
      phone: res.telNumber,
      prov: res.provinceName,
      city: res.cityName,
      dist: res.countyName,
      address: res.detailInfo
    };
    return formData;
  }

  /*更新保存地址*/
  submitAddress(data, callback) {
    data = this._setUpAddress(data);
    var param = {
      url: 'address',
      type: 'post',
      data: data,
      sCallBack: function (res) {
        callback && callback(true, res);
      }, 
      eCallBack(res) {
        callback && callback(false, res);
      }
    };
    this.request(param);
  }
}

export {Address};