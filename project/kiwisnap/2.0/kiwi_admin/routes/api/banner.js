var express = require('express');
var url = require('url');
var util = require('../../lib/util');
const mybatis = require('../../lib/mybatis');

let router = express.Router();



/* 리스트 조회. */
router.get('/list', async function(req, res, next) {
    console.log('GET :: /api/banner/list');
    try {
        const result = {};

        const params = req.query;

        console.log("Received Params :: ", params);

        let format = {language: 'sql', indent: '    '};
        let query = mybatis.mybatisMapper.getStatement('banner', 'selectBannerList', params, format);
        console.log('query :: ', query);
        let list = await mybatis.connection.promise().query(query);
        result.data = (list[0]);

        query = mybatis.mybatisMapper.getStatement('banner', 'selectBannerListCount', params, format);
        let listCnt = await mybatis.connection.promise().query(query);
        result.recordsFiltered = (listCnt[0])[0].cnt;

        console.log("리스트 :: ", result);

        res.status(200).send(result);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

/* 상세조회 */
router.get('/:banner_seq', async function (req, res, next ) {
    console.log("/get :: /api/banner/:banner_seq");

    try{
        const params = req.params;
        console.log("Received Params :: ", params);

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('banner', 'selectBanner', params, format);
        const detail = await mybatis.connection.promise().query(query);

        const result = (detail[0])[0];

        res.json(result);
    }catch (error) {
        console.log('error');
        res.status(500).json(error.message);
    }

});

/*  등록 */
router.post('/', async function (req, res, next) {
    console.log('post :: /api/banner');
    try{
        const params = req.body;
        console.log('Received Params: ', params);

        await mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('banner', 'insertBanner', params, format);
        console.log('query :: ', query);
        const results = await mybatis.connection.promise().query(query);
        const result = results[0].insertId;

        console.log('results :: ', results);

        res.json(result);

        await mybatis.connection.promise().commit();
    }catch (error) {
        console.log('error', error);
        await mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }
});

/* 수정 */
router.put('/', async function (req, res, next) {
    console.log("/put :: /api/");

    try{
        const params = req.body;
        console.log('Received Params: ', params);

        await mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('banner', 'updateBanner', params, format);
        const results = await mybatis.connection.promise().query(query);

        const result = {
            'insertId' : results[0].insertId
        }

        res.json(result);

        await mybatis.connection.promise().commit();
    }catch (error) {
        console.log('error');
        await mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }

});
module.exports = router;