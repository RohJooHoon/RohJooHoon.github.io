const express = require('express');
const util = require('../../lib/util');
const mybatis = require('../../lib/mybatis');

const router = express.Router();

router.get('/list', async function (req, res, next) {
    console.log("GET :: /api/template/list");

    try{
        const param = req.query;
        console.log("Received Params: ", param);

        const result = {};

        const format = {language: 'sql', indent: '    '};

        const firstQuery = mybatis.mybatisMapper.getStatement('template', 'selectTemplateList', param, format);

        const templateList = await mybatis.connection.promise().query(firstQuery);

        const secondQuery = mybatis.mybatisMapper.getStatement('template', 'selectTemplateCnt', param, format);

        const templateCnt = await mybatis.connection.promise().query(secondQuery);

        result.data = templateList[0];
        result.recordsFiltered = (templateCnt[0])[0].cnt;

        res.json(result);
    }catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }

});

router.get('/read/:template_seq', async function (req, res, next) {
    console.log("GET :: /api/template/read");
    try{
        let result = {};

        let template_seq = req.params.template_seq;

        let param = {
            'template_seq' : template_seq,
        }

        console.log("ReceivedParam :: ", param);

        const format = {language: 'sql', indent: '    '};

        let query = mybatis.mybatisMapper.getStatement('template', 'selectTemplateInfo', param, format);
        let templateDetail = await mybatis.connection.promise().query(query);

        query = mybatis.mybatisMapper.getStatement('template', 'selectMappedFilterList', param, format);
        let mappedSeqList = await mybatis.connection.promise().query(query);

        result.data = (templateDetail[0]);

        result.seqList = (mappedSeqList[0]);
        console.log('result :: ', result);
        res.json(result);
    }catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

router.post('/create', async function (req, res, next) {
    console.log("POST :: /api/template/create");
    try{
        await mybatis.connection.promise().beginTransaction();

        const param = req.body;
        console.log("ReceivedParam :: ", param);

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('template', 'insertTemplate', param, format);

        const result = await mybatis.connection.promise().query(query);

        console.log("result :: ", result);

        await mybatis.connection.promise().commit();
        res.json(result);
    }catch (error) {
        console.log("error :: ", error);
        mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }
});

router.put('/update', async function (req, res, next) {
    console.log("PUT :: /api/template/update");

    try{
        await mybatis.connection.promise().beginTransaction();

        let params = req.body;

        console.log("ReceivedParam :: ", params);

        params.temp_var_one = params.template_image;
        params.temp_var_two = params.template_type;
        params.temp_var_three = params.template_name;
        params.temp_var_four = params.template_photos_cnt;
        params.temp_var_five = params.template_category;
        //params.temp_var_six = params.template;
        params.temp_var_seven = params.status;

        const format = {language: 'sql', indent: '  '};
        // 템플릿 업데이트
        let query = mybatis.mybatisMapper.getStatement('template', 'updateTemplate', params, format);
        let result = await mybatis.connection.promise().query(query);

        console.log(query);
        console.log("template update ok~");

        // 클라이언트에서 넘어온 필터값이 있을 경우에만 매핑 테이블 update(delete&insert)
        if(params.filterSeqList) {
            let secondParam = {
                "filter_seq" : params.filterSeqList,
                "template_seq" : params.template_seq
            }

            console.log('secondParam = ' + secondParam.filter_seq + "\n" + secondParam.template_seq);

            query = mybatis.mybatisMapper.getStatement('template', 'deleteTemplateFilterMapping', params, format);
            await mybatis.connection.promise().query(query);
            console.log(query);

            let secondQuery = mybatis.mybatisMapper.getStatement('template', 'insertTemplateFilterMapping', secondParam, format);
            await mybatis.connection.promise().query(secondQuery);
            console.log(secondQuery);
            // 필터값이 없으면 매핑 테이블만 삭제
        } else {
            console.log('filter_seq No data.');
            query = mybatis.mybatisMapper.getStatement('template', 'deleteTemplateFilterMapping', params, format);
            await mybatis.connection.promise().query(query);
            console.log(query);
        }

        console.log("result :: ", result);

        await mybatis.connection.promise().commit();
        res.json(result);
    }catch (error) {
        console.log("error :: ", error);
        mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }

});

router.delete('/delete', async function (req, res, next) {
    console.log("DELETE :: /api/template/delete");
    try{
        await mybatis.connection.promise().beginTransaction();

        const params = req.body;
        console.log("Received Params : ", params);

        const format = {language : 'sql', indent: '    '}
        const query = mybatis.mybatisMapper.getStatement('template', 'deleteTemplate', params, format);

        const result = await mybatis.connection.promise().query(query);
        console.log("result : ", result);

        await mybatis.connection.promise().commit();
        res.json(result);
    }catch (error) {
        console.log("error : ", error);
        await mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }
})

/* 템플릿 필터 리스트 */
router.get('/filter/list', async function(req, res, next) {
    console.log('get :: /api/template/filter/list');
    try{
        let result = {};

        let params = req.query;

        console.log("Received Params :: ", params);

        let format = {language: 'sql', indent: '    '};
        let query = mybatis.mybatisMapper.getStatement('template', 'selectTemplateFilterList', params, format);
        let templateFilterList = await mybatis.connection.promise().query(query);
        result.data = (templateFilterList[0]);

        query = mybatis.mybatisMapper.getStatement('template', 'selectTemplateFilterListCnt', params, format);
        let templateFilterCnt = await mybatis.connection.promise().query(query);
        result.recordsFiltered = (templateFilterCnt[0])[0].cnt;

        console.log('result', result);
        res.json(result);
    }catch (err) {
        console.log('error');
        res.status(500).json(error.message);
    }
});

module.exports = router;


