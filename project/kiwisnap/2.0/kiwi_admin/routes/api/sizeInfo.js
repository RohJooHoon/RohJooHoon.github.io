var express = require('express');
var url = require('url');
var util = require('../../lib/util');
const mybatis = require('../../lib/mybatis');

var router = express.Router();

router.get('/list', async function (req, res, next) {
    console.log('get :: /api/size_info/list');
    try{
        const result = {};

        const params = req.query;
        console.log("Received Params: ", params);

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('sizeInfo', 'commonSizeInfoList', params, format);
        const sizeInfoList = await mybatis.connection.promise().query(query);

        const secondQuery = mybatis.mybatisMapper.getStatement('sizeInfo', 'commonSizeInfoCnt', params, format);
        const sizeInfoCnt = await mybatis.connection.promise().query(secondQuery);

        result.data = sizeInfoList[0];
        result.recordsFiltered = (sizeInfoCnt[0])[0].cnt;

        res.json(result);
    }catch (error) {
        res.status(500).json(error.message);
    }
});

router.post('/create', async function (req, res, next) {
    console.log("post :: /api/size_info/create");
    try{
        await mybatis.connection.promise().beginTransaction();

        const params = req.body;

        console.log("Received Params : ", params);

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('sizeInfo', 'insertCommonSizeInfo', params, format);

        const result = await mybatis.connection.promise().query(query);

        await mybatis.connection.promise().commit();
        res.json(result);
    }catch (error) {
        console.log('error :: ', error);
        await mybatis.connection.promise().rollback();
        res.json(error);
        res.status(500).json(error.message);
    }
});

router.get('/:code_seq', async function (req, res, next) {
    console.log('get :: /api/size_info/:code_seq');
    try{

        const params = req.params;
        console.log("Received Params : ", params);

        const format = {language : 'sql', indent: '    '}
        const query = mybatis.mybatisMapper.getStatement('sizeInfo', 'selectCommonSizeInfo', params, format);

        const commonSizeInfo = await mybatis.connection.promise().query(query);
        const result = commonSizeInfo[0];

        res.json(result);
    }catch (error) {
        console.log("error : ", error);
        res.status(500).json(error.message);
    }
});

router.put('/update', async function (req, res, next){
    console.log("put :: /api/size_info/update");
    try{
        await mybatis.connection.promise().beginTransaction();

        const result = {};

        const params = req.body;
        console.log("Received Params : ", params);

        const format = {language:'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('sizeInfo', 'updateCommonSizeInfo', params, format);
        console.log("query : ", query);

        result.data = await mybatis.connection.promise().query(query);
        console.log("result.data : ", result.data);

        await mybatis.connection.promise().commit();
        res.json(result.data);
    }catch (error) {
        console.log("error : ", error);
        await mybatis.connection.promise().rollback();
        res.json(error);
        res.status(500).json(error.message);
    }
});

router.delete('/delete', async function (req, res, next) {
   console.log('delete :: /api/size_info/delete');
   try{
       await mybatis.connection.promise().beginTransaction();

       const params = req.body;
       console.log("Received Params : ", params);

       const format = {language : 'sql', indent: '    '}
       const query = mybatis.mybatisMapper.getStatement('sizeInfo', 'deleteCommonSizeInfo', params, format);

       const result = await mybatis.connection.promise().query(query);
       console.log("result : ", result);

       await mybatis.connection.promise().commit();
       res.json(result);
   }catch (error) {
       console.log("error : ", error);
       await mybatis.connection.promise().rollback();
       res.status(500).json(error.message);
   }
});

module.exports = router;