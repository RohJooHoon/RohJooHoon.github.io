var express = require('express');
var url = require('url');
var util = require('../../lib/util');
const mybatis = require('../../lib/mybatis');

let router = express.Router();

/* 도매와 매핑된 소매 리스트 조회. */
router.get('/retail/list', async function(req, res, next) {
    console.log('GET :: /api/wholesale/retail/list');
    try {
        const result = {};

        const params = req.query;

        console.log("Received Params :: ", params);

        let format = {language: 'sql', indent: '    '};
        let query = mybatis.mybatisMapper.getStatement('wholesale', 'selectRetailList', params, format);
        let retailList = await mybatis.connection.promise().query(query);
        result.data = (retailList[0]);

        query = mybatis.mybatisMapper.getStatement('wholesale', 'selectRetailListCount', params, format);
        let retailListCnt = await mybatis.connection.promise().query(query);
        result.recordsFiltered = (retailListCnt[0])[0].cnt;

        console.log("매핑 리스트 :: ", result);

        res.status(200).send(result);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

/* 도매 업체와 매핑된 소매업체 리스트 입력. */
router.post('/retail/create', async function (req, res, next) {
    console.log('POST :: /api/wholesale/retail/create');
    try {
        mybatis.connection.promise().beginTransaction();

        const params = req.body;

        console.log("Received Params :: ", params);

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('wholesale', 'insertMappingRetail', params, format);

        await mybatis.connection.promise().query(query);

        mybatis.connection.promise().commit();

        res.status(200).send("SUCCESS");
    } catch (error) {
        mybatis.connection.promise().rollback();
        console.log("error :: ", error);
        res.status(500).send({ error: error });
    }

});


/* 도매 상품 태그 데이터. */
router.get('/tagData/list', async function(req, res, next) {
    console.log('GET :: /api/wholesale/tagData/list');
    try {
        const result = {};

        const params = req.query;
        console.log("Received Params :: ", params);

        let format = {language: 'sql', indent: '    '};
        let query = mybatis.mybatisMapper.getStatement('wholesale', 'selectTagDataList', params, format);
        let list = await mybatis.connection.promise().query(query);
        result.data = (list[0]);

        result.recordsFiltered = list[0].length;

        console.log("매핑 리스트 :: ", result);

        res.status(200).send(result);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

/* 도매 태그 데이터. */
router.get('/filter/list', async function(req, res, next) {
    console.log('GET :: /api/wholesale/filter/list');
    try {
        let result = {};

        const params = req.query;
        console.log("Received Params :: ", params);

        let format = {language: 'sql', indent: '    '};
        let filterGroupQuery = mybatis.mybatisMapper.getStatement('wholesale', 'selectWholesaleFilterGroup', params, format);
        let filterGroupList = await mybatis.connection.promise().query(filterGroupQuery);

        let data = new Object();
        for (let idx in filterGroupList[0]) {
            let filterGroup = (filterGroupList[0])[idx];
            params.filter_type = filterGroup.filter_type;

            let filterListQuery = mybatis.mybatisMapper.getStatement('wholesale', 'selectWholesaleFilterList', params, format);
            let filterList = await mybatis.connection.promise().query(filterListQuery);

            data[filterGroup.filter_type] = (filterList[0]);
        }
        result.data = data;

        res.status(200).send(result);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

/* 도매 태그 데이터 수정 */
router.put('/filter', async function (req, res, next) {
    console.log('put :: /api/wholesale/filter');

    try{
        await mybatis.connection.promise().beginTransaction();

        let params = req.body;

        console.log("Received Params: ", params);

        let format = {language: 'sql', indent: '    '};

        let query = mybatis.mybatisMapper.getStatement('wholesale', 'deleteWholesaleFilterMapping', params, format);
        console.log('query :: ', query);
        let result = await mybatis.connection.promise().query(query);

        if(params.filterSeqList){
            let secondParam = {
                "filter_seq" : params.filterSeqList,
                "client_id" : params.client_id,
            }
            let secondQuery = mybatis.mybatisMapper.getStatement('wholesale', 'insertWholesaleFilterMapping', secondParam, format);
            console.log('secondQuery :: ', secondQuery);
            await mybatis.connection.promise().query(secondQuery);
        }

        console.log("result :: ", result);

        await mybatis.connection.promise().commit();
        res.send().status(200);
    }catch (error) {
        console.log('error', error);
        await mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }

});



/* 도매업체 리스트 조회. */
router.get('/company/list', async function(req, res, next) {
    console.log('GET :: /api/wholesale/company/list');
    try {
        const result = {};

        const params = req.query;

        console.log("Received Params :: ", params);

        let format = {language: 'sql', indent: '    '};
        let query = mybatis.mybatisMapper.getStatement('wholesale', 'selectWholesaleCompanyList', params, format);
        console.log('query :: ', query);
        let list = await mybatis.connection.promise().query(query);
        result.data = (list[0]);

        query = mybatis.mybatisMapper.getStatement('wholesale', 'selectWholesaleCompanyListCount', params, format);
        let listCnt = await mybatis.connection.promise().query(query);
        result.recordsFiltered = (listCnt[0])[0].cnt;

        console.log("매핑 리스트 :: ", result);

        res.status(200).send(result);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

/* 도매 업체 상세조회 */
router.get('/company/:seq', async function (req, res, next ) {
    console.log("/get :: /api/wholesale/company/:seq");

    try{
        const params = req.params;
        console.log("Received Params :: ", params);

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('wholesale', 'selectWholesaleCompany', params, format);
        const detail = await mybatis.connection.promise().query(query);

        const result = (detail[0])[0];

        res.json(result);
    }catch (error) {
        console.log('error');
        res.status(500).json(error.message);
    }

});

/* 도매 업체 등록 */
router.post('/company', async function (req, res, next) {
    console.log('post :: /api/wholesale/company');
    try{
        const params = req.body;
        console.log('Received Params: ', params);

        await mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('wholesale', 'insertWholesaleCompany', params, format);
        console.log('query :: ', query);
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

/* 수정 */
router.put('/company', async function (req, res, next) {
    console.log("/put :: /api/wholesale/company");

    try{
        const params = req.body;
        console.log('Received Params: ', params);

        await mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('wholesale', 'updateWholesaleCompany', params, format);
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