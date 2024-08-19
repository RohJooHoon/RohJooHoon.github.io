var express = require('express');
var url = require('url');
var util = require('../../lib/util');
const mybatis = require('../../lib/mybatis');

let router = express.Router();



/* 리스트 조회. */
router.get('/product/list', async function(req, res, next) {
    console.log('GET :: /api/partners/product/list');
    try {
        const result = {};

        const params = req.query;

        console.log("Received Params :: ", params);

        let format = {language: 'sql', indent: '    '};
        let query = mybatis.mybatisMapper.getStatement('partners', 'selectPartnersProductList', params, format);
        console.log('query :: ', query);
        let list = await mybatis.connection.promise().query(query);
        result.data = (list[0]);

        query = mybatis.mybatisMapper.getStatement('partners', 'selectPartnersProductListCount', params, format);
        let listCnt = await mybatis.connection.promise().query(query);
        result.recordsFiltered = (listCnt[0])[0].cnt;

        console.log("리스트 :: ", result);

        res.status(200).send(result);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

module.exports = router;