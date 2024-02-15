let express = require('express');
let url = require('url');
let util = require('../../lib/util');
const mybatis = require('../../lib/mybatis');
const {HttpResponse} = require("aws-sdk");
let moment = require('moment');
let router = express.Router();

router.get('/connection/product/list', async function (req, res, next) {
  console.log('GET :: statistics/connection/product/list');
  try {
    const result = {};

    const params = req.query;

    console.log("Received params :: ", params);

    const format = {language: 'sql', indent: '    '};

    const query = mybatis.mybatisMapper.getStatement('statistics', 'selectConnectProductInfoList', params, format);
    const connectProductInfoList = await mybatis.connection.promise().query(query);

    const secondQuery = mybatis.mybatisMapper.getStatement('statistics', 'selectConnectProductInfoListCnt', params,
        format);
    const connectProductInfoListCnt = await mybatis.connection.promise().query(secondQuery);

    result.data = (connectProductInfoList)[0];
    result.recordsFiltered = (connectProductInfoListCnt[0])[0].cnt;

    res.status(200).send(result);
  } catch (error) {
    console.log("error :: ", error);
    res.status(500).json(error.message);
  }
});

router.get('/connection/client/list', async function (req, res, next) {
  console.log('GET :: statistics/connection/client/list');
  try {
    const result = {};

    const params = req.query;

    console.log("Received params :: ", params);

    const format = {language: 'sql', indent: '    '};

    const query = mybatis.mybatisMapper.getStatement('statistics', 'selectClientConnectProductInfoList', params,
        format);
    const connectClientInfoList = await mybatis.connection.promise().query(query);

    const secondQuery = mybatis.mybatisMapper.getStatement('statistics', 'selectClientConnectProductInfoListCnt',
        params, format);
    const connectClientInfoListCnt = await mybatis.connection.promise().query(secondQuery);

    result.data = (connectClientInfoList)[0];
    result.recordsFiltered = (connectClientInfoListCnt[0])[0].cnt;

    res.status(200).send(result);
  } catch (error) {
    console.log("error :: ", error);
    res.status(500).json(error.message);
  }
});

router.get('/connection/errors', async function (req, res, next) {
  try {
    const params = req.query;
    const format = {language: 'sql', indent: '    '};
    const query = mybatis.mybatisMapper.getStatement('statistics', 'selectConnectErrorList', params, format);
    const queryResult = await mybatis.connection.promise().query(query);
    const result = {};
    result.data = (queryResult)[0];
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/traffic', async function (req, res, next) {
  console.log('GET :: statistics/traffic');
  try {
    const result = {};

    const params = req.query;
    console.log("Received params :: ", params);
    const format = {language: 'sql', indent: '    '};

    let query = '';
    if (params.type == 'CLIENT') {
      query = mybatis.mybatisMapper.getStatement('statistics', 'selectTrafficStatClientId', params, format);
    } else if (params.type == 'MALL') {
      query = mybatis.mybatisMapper.getStatement('statistics', 'selectTrafficStatMallType', params, format);
    } else if (params.type == 'PRODUCT') {
      query = mybatis.mybatisMapper.getStatement('statistics', 'selectTrafficStatProduct', params, format);
    }
    const connectClientInfoList = await mybatis.connection.promise().query(query);

    result.data = (connectClientInfoList)[0];
    result.recordsFiltered = 50;

    console.log('result :: ', result);
    res.status(200).send(result);
  } catch (error) {
    console.log("error :: ", error);
    res.status(500).json(error.message);
  }
});

router.get('/selectPaymentCountByDaily', async function (req, res, next) {
  console.log('GET :: statistics/selectPaymentCountByDaily');
  try {
    const result = {};

    const params = req.query;
    console.log("Received params :: ", params);
    const format = {language: 'sql', indent: '    '};

    let query = mybatis.mybatisMapper.getStatement('statistics', 'selectPaymentCountByDaily', params, format);
    const list = (await mybatis.connection.promise().query(query))[0];

    let resultData = new Array();   //[{"date":"20220301","10":2,"20":3,"30":4,"40":6},{"date":"20220302","10":2,"20":3,"30":4,"40":6}]
    let startDay = moment(params.startDay, 'YYYYMMDD');
    let endDay = moment(params.endDay, 'YYYYMMDD');
    let diffDays = moment.duration(endDay.diff(startDay)).asDays();
    let date = startDay;

    let total10 = 0;
    let total20 = 0;
    let total30 = 0;
    let total40 = 0;
    for (let i = 0; i < diffDays + 1; i++) {
      let dateStr = date.format('YYYYMMDD');
      let object = new Object();
      object.date = dateStr;
      for (let idx in list) {
        let payment = list[idx];

        const find1 = list.find((element, index) => {
          if (element.date == dateStr && element.status == '10') {
            return element;
          }
        });
        if (find1 != undefined) {
          object[10] = find1.count;
        } else {
          object[10] = 0;
        }

        const find2 = list.find((element, index) => {
          if (element.date == dateStr && element.status == '20') {
            return element;
          }
        });
        if (find2 != undefined) {
          object[20] = find2.count;
        } else {
          object[20] = 0;
        }

        const find3 = list.find((element, index) => {
          if (element.date == dateStr && element.status == '30') {
            return element;
          }
        });
        if (find3 != undefined) {
          object[30] = find3.count;
        } else {
          object[30] = 0;
        }

        const find4 = list.find((element, index) => {
          if (element.date == dateStr && element.status == '40') {
            return element;
          }
        });
        if (find4 != undefined) {
          object[40] = find4.count;
        } else {
          object[40] = 0;
        }
      }
      resultData.push(object);

      total10 = total10 + object[10];
      total20 = total20 + object[20];
      total30 = total30 + object[30];
      total40 = total40 + object[40];

      date = date.add(1, 'days');
    }
    let total = new Object();
    total['date'] = 'TOTAL';
    total['10'] = total10;
    total['20'] = total20;
    total['30'] = total30;
    total['40'] = total40;
    resultData.push(total);

    result.data = resultData;
    result.recordsFiltered = 50;

    console.log('result :: ', result);
    res.status(200).send(result);
  } catch (error) {
    console.log("error :: ", error);
    res.status(500).json(error.message);
  }
});

module.exports = router;
