/*
 * envoy statistics script
 * powered by bmob JavaScript SDK
 * version 0.3.0
 * 
 * require: Sohu IP interface (https://pv.sohu.com/cityjson)
 *          Sina IP Service (https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js)
 *          Bmob SDK (https://docs.bmob.cn)
 * 
 * Copyright (c) envoy 2017
 * Released under the Apache-2.0 license.
 */

(function () {
  'use strict';

  // Application id and secret key for Bmob service is public
  // You can do whatever you want :-)
  var applicationId = '60a9daad038e3963a9dc0ed5c42b99c1';
  var restAPIKey = '55799ac3fcff183bdb7593c0ebf32344';

  // fetch ip address from Sohu IP interface
  if (!window.returnCitySN) {
    console.log('Failed to fetch ip address from Sohu ip service');
  }
  if (!window.remote_ip_info) {
    console.log('Failed to get ip info from Sina ip service');
  }
  var ip = window.returnCitySN.cip;
  var ipInfo = window.remote_ip_info || {};

  // init Bmob service
  Bmob.initialize(applicationId, restAPIKey);

  // send ip info to Bmob
  var ipInfo = {
    'ip': ip || '',
    'country': ipInfo.country || '',
    'province': ipInfo.province || '',
    'city': ipInfo.city || '',
    'district': ipInfo.district || '',
    'isp': ipInfo.isp || '',
    'type': ipInfo.type || '',
    'desc': ipInfo.desc || '',
    'url': window.location.href
  };

  // update DB
  var Visitors = Bmob.Object.extend('Visitors');
  var visitors = new Visitors();
  for (var key in ipInfo) {
    visitors.set(key, ipInfo[key]);
  }
  visitors.save(null, {
    success: function () {
      // do nothing
    },
    error: function () {
      console.log('Error occured when sending ip info to Bomb');
    }
  })

})();
