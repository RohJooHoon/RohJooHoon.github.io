var express = require('express');
var url = require('url');
var util = require('../../lib/util');
const mybatis = require('../../lib/mybatis');

var router = express.Router();

/* 글 등록 */
router.post('/create', async function (req, res, next) {
    console.log('post :: /api/notice/create');
    try{
        const params = req.body;
        console.log('Received Params: ', params);

        await mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('notice', 'insertNotice', params, format);
        const results = await mybatis.connection.promise().query(query);
        const result = results[0].insertId;

        console.log('results :: ', results);

        res.json(result);

        await mybatis.connection.promise().commit();
    }catch (error) {
        console.log('error');
        await mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }
});

/* 글 리스트 조회 */
router.get('/list', async function(req, res, next) {
    console.log('get :: /api/notice/list');
    try{
        const params = req.query;
        console.log('Received Params: ', params);

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('notice', 'selectNoticeList', params, format);
        const noticeList = await mybatis.connection.promise().query(query);

        const secondQuery = mybatis.mybatisMapper.getStatement('notice', 'selectNoticeListCnt', params, format);

        const noticeListCnt = await mybatis.connection.promise().query(secondQuery);

        const result = {};
        result.data = (noticeList[0]);
        result.recordsFiltered =  (noticeListCnt[0])[0].cnt;

        res.json(result);

    }catch (error) {
        console.log('error');
        res.status(500).json(error.message);
    }
});

/* 글 상세조회 */
router.get('/:notice_seq', async function (req, res, next ) {
    console.log("/get :: /api/notice/:notice_seq");

    try{
        const params = req.params;
        console.log("Received Params :: ", params);

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('notice', 'selectNotice', params, format);
        const noticeDetail = await mybatis.connection.promise().query(query);

        const result = noticeDetail[0];

        res.json(result);
    }catch (error) {
        console.log('error');
        res.status(500).json(error.message);
    }

});

/* 글 수정 */
router.put('/update', async function (req, res, next) {
    console.log("/put :: /api/notice/update");

    try{

        const params = req.body;
        console.log('Received Params: ', params);

        await mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('notice', 'updateNotice', params, format);
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