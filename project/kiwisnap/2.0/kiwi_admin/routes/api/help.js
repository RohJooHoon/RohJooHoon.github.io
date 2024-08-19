var express = require('express');
var url = require('url');
const mybatis = require('../../lib/mybatis');

const router = express.Router();

router.get('/category/list', async function (req, res, next) {
    console.log("GET :: /help/category/list");
    try {
        const result = {};
        const params = req.query;

        console.log("Received Params :: ", params);

        let format = {language: 'sql', indent: '    '};
        let query = mybatis.mybatisMapper.getStatement('help', 'selectHelpCategoryList', params, format);
        let helpCategoryList = await mybatis.connection.promise().query(query);
        result.data = (helpCategoryList[0]);

        const secondQuery = mybatis.mybatisMapper.getStatement('help', 'selectHelpCategoryListCnt', params, format);
        let helpCategoryListCnt = await mybatis.connection.promise().query(secondQuery);
        result.recordsFiltered = (helpCategoryListCnt[0])[0].cnt;
        res.status(200).json(result);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

router.post('/category/create', async function (req, res, next) {
    console.log("POST :: /help/category/create");
    try {
        const resultObj = {};
        const params = req.body;

        console.log("Received Params :: ", params);

        mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};
        // 인서트 하기 전에 검사. 뎁스가 1이 아니어야함.
        if (params.depth != 1) {
            params.help_seq = params.parent_help_seq;
            const firstQuery = mybatis.mybatisMapper.getStatement('help', 'selectChildCategoryCnt', params, format);
            const resultQuery = await mybatis.connection.promise().query(firstQuery);
            const childCount = (resultQuery[0])[0].cnt;
            switch (parseInt(childCount)) {
                case 1 :
                    const secondQuery = mybatis.mybatisMapper.getStatement('help', 'selectChildDetail', params, format);
                    const resultSecondQuery = await mybatis.connection.promise().query(secondQuery);
                    const childType = (resultSecondQuery[0])[0].type;
                    if (childType == "CONTENT") {
                        throw new Error("본문 내용을 보유하고 있으면 새로운 하위 카테고리 생성이 불가능합니다.");
                    }
            }
        }
        const query = mybatis.mybatisMapper.getStatement('help', 'insertHelpCategory', params, format);
        const queryResult = await mybatis.connection.promise().query(query);

        resultObj.help_seq = queryResult[0].insertId;
        if (params.parent_help_seq) {
            resultObj.parent_help_seq = params.parent_help_seq; // 카테고리 수정 화면에서 등록 후 부모 seq를 자식 요소 html 코드에 넣어주기 위한 로직.
        }

        mybatis.connection.promise().commit();
        res.status(200).json(resultObj);
    } catch (error) {
        console.log("error :: ", error);
        mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }
});

router.get('/category/detail', async function (req, res, next) {
    console.log("GET :: /help/category/detail");
    try {
        const result = {};
        const params = req.query;

        console.log("Received Params :: ", params);

        let format = {language: 'sql', indent: '    '};
        let query = mybatis.mybatisMapper.getStatement('help', 'selectHelpCategoryList', params, format);
        let helpCategoryList = await mybatis.connection.promise().query(query);
        const allCategoryList = (helpCategoryList[0]);

        const depthArr = [];
        const oneDepthSeq = params.help_seq;

        allCategoryList.filter(item => {if(item.help_seq == oneDepthSeq) {depthArr.push(item)}}); // 1뎁스 리스트 추출

        allCategoryList.filter(item => {if(item.parent_help_seq == oneDepthSeq) {depthArr.push(item)}}); // 2뎁스 리스트 추출
        const twoDepthArr = allCategoryList.filter(item => {return item.parent_help_seq == oneDepthSeq});

        const threeDepthArr = [];
        for(let data of twoDepthArr) {
            allCategoryList.filter(item => {if(item.parent_help_seq == data.help_seq) {depthArr.push(item)}}); // 3뎁스 리스트 추출
            threeDepthArr.push(allCategoryList.filter(item => {return item.parent_help_seq == data.help_seq}));
        }

        for(let data of threeDepthArr) {
            for (let tempData of data) {
                allCategoryList.filter(item => {if(item.parent_help_seq == tempData.help_seq) {depthArr.push(item)}}); // 4뎁스 리스트 추출
            }
        }

        res.status(200).json(depthArr);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

router.post('/content/create', async function (req, res, next) {
    console.log("POST :: /help/content/create");
    try {
        const params = req.body;
        const result = {};
        console.log("Received Params :: ", params);

        mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('help', 'insertHelpContent', params, format);
        const queryResult = await mybatis.connection.promise().query(query);
        result.help_seq = queryResult[0].insertId;

        mybatis.connection.promise().commit();
        res.status(200).json(result);
    } catch (error) {
        console.log("error :: ", error);
        mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }
});

router.put('/update', async function (req, res, next) {
    console.log("PUT :: /help/update");
    try {
        const params = req.body;

        console.log("Received Params :: ", params);

        mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('help', 'updateHelp', params, format);
        await mybatis.connection.promise().query(query);

        mybatis.connection.promise().commit();
        res.status(200).json('success');
    } catch (error) {
        console.log("error :: ", error);
        mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }
});

router.delete('/delete', async function (req, res, next) {
    console.log("POST :: /help/category/delete");
    try {
        const params = req.body;
        const resultObj = {};
        console.log("Received Params :: ", params);

        mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};
        const firstQuery = mybatis.mybatisMapper.getStatement('help', 'selectChildCategoryCnt', params, format);
        const resultQuery = await mybatis.connection.promise().query(firstQuery);
        const childCount = (resultQuery[0])[0].cnt;

        if (parseInt(childCount) !== 0) {
            throw new Error("하위 카테고리가 존재할 경우 삭제가 불가능합니다.");
        }

        const secondQuery = mybatis.mybatisMapper.getStatement('help', 'deleteHelp', params, format);
        await mybatis.connection.promise().query(secondQuery);

        mybatis.connection.promise().commit();
        res.status(200).json('success');
    } catch (error) {
        console.log("error :: ", error);
        mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }
});

// 해당 카테고리를 부모로 가지는 하위 뎁스 요소들이 있는 지 검사.
router.get('/select/childInfo', async function (req, res, next) {
    console.log("GET :: /help");
    try {
        const params = req.query;
        const resultObj = {};
        console.log("Received Params :: ", params);

        const format = {language: 'sql', indent: '    '};
        const firstQuery = mybatis.mybatisMapper.getStatement('help', 'selectChildCategoryCnt', params, format);
        const resultQuery = await mybatis.connection.promise().query(firstQuery);
        const childCount = (resultQuery[0])[0].cnt;

        switch (parseInt(childCount)) {
            case 0 :
                res.status(200).json('success');
                break;
            case 1 :
                const secondQuery = mybatis.mybatisMapper.getStatement('help', 'selectChildDetail', params, format);
                const resultSecondQuery = await mybatis.connection.promise().query(secondQuery);
                const childType = (resultSecondQuery[0])[0].type;
                if (childType !== "CONTENT") {
                    throw new Error("이미 하위 카테고리가 존재합니다.");
                }
                resultObj.result = (resultSecondQuery[0])[0];
                res.status(200).json(resultObj);
                break;
            default :
                throw new Error("이미 하위 카테고리가 존재합니다.");
        }
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

module.exports = router;