let express = require('express');
let url = require('url');
let util = require('../../lib/util');
const mybatis = require('../../lib/mybatis');
const {HttpResponse} = require("aws-sdk");

let router = express.Router();

/* 상품 리스트 조회. */
router.get('/list', async function (req, res, next) {
    console.log('GET :: /product/list');
    try {
        const result = {};

        const params = req.query;

        console.log("Received params :: ", params);

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('product', 'selectProductList', params, format);
        const productList = await mybatis.connection.promise().query(query);

        const secondQuery = mybatis.mybatisMapper.getStatement('product', 'selectProductListCount', params, format);
        const productListCount = await mybatis.connection.promise().query(secondQuery);

        const convertData = productList[0];

        for (let data of convertData) { // 상품의 숫자 코드값을 문자 코드값으로 변환한다.

            for (let [key, value] of master_prod_statusMap) { // 마스터 상품 코드값 변환.
                if (data.prod_status === key) {
                    data.prod_status = value;
                }
            }

            const jsonArr = data.link_mall_info.split('|');
            const convertDataArr = [];

            let breakFlag = false;
            for(let i = 0; i < jsonArr.length; i++) { // 몰 연동 상태 코드값 변환.
                const obj = JSON.parse(jsonArr[i]);
                if (obj.mall_product_seq == null) {
                    breakFlag = true;
                    break;
                }
                for (let [key, value] of mall_prod_statusMap) {
                    if (obj.prod_status === key) {
                        obj.prod_status = value;
                    }
                }
                convertDataArr.push(obj);
            }
            if (breakFlag === true) {
                data.link_mall_info = null;
            } else {
                data.link_mall_info = convertDataArr;
            }
        }

        result.data = convertData;
        result.recordsFiltered = (productListCount[0])[0].cnt;

        res.send(result).status(200);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

// 상품 연동 상태값
const master_prod_statusMap = new Map();
master_prod_statusMap.set("10", "임시저장");
master_prod_statusMap.set("20", "저장완료");
master_prod_statusMap.set("99", "비활성");

const mall_prod_statusMap = new Map();
mall_prod_statusMap.set("10", "임시저장");
mall_prod_statusMap.set("20", "저장완료");
mall_prod_statusMap.set("25", "수정대기");
mall_prod_statusMap.set("26", "수정실패");
mall_prod_statusMap.set("29", "연동중");
mall_prod_statusMap.set("30", "연동완료");
mall_prod_statusMap.set("31", "연동실패");
mall_prod_statusMap.set("32", "승인대기");
mall_prod_statusMap.set("40", "쿠팡 승인대기");

/* 상품 리스트 조회. */
router.get('/mallProductlist', async function (req, res, next) {
    console.log('GET :: /product/mallProductlist');
    try {
        const result = {};

        const params = req.query;

        console.log("Received params :: ", params);

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('product', 'selectMallProductList', params, format);
        const productList = await mybatis.connection.promise().query(query);

        const secondQuery = mybatis.mybatisMapper.getStatement('product', 'selectMallProductCount', params, format);
        const productListCount = await mybatis.connection.promise().query(secondQuery);

        const convertData = productList[0];

        for (let data of convertData) { // 상품의 숫자 코드값을 문자 코드값으로 변환한다.
            for (let [key, value] of mall_prod_statusMap) { // 마스터 상품 코드값 변환.
                if (data.prod_status === key) {
                    data.prod_status = value;
                }
            }
        }

        result.data = convertData;
        result.recordsFiltered = (productListCount[0])[0].cnt;

        console.log(result.data);

        res.send(result).status(200);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});


/* error 리스트 조회. */
router.get('/linkErrorList', async function (req, res, next) {
    console.log('GET :: /product/linkErrorList');
    try {
        const result = {};

        const params = req.query;

        console.log("Received params :: ", params);

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('product', 'selectErrorMessage', params, format);
        const productList = await mybatis.connection.promise().query(query);

        const secondQuery = mybatis.mybatisMapper.getStatement('product', 'selectErrorMessageCount', params, format);
        const productListCount = await mybatis.connection.promise().query(secondQuery);

        const convertData = productList[0];

        for (let data of convertData) { // 상품의 숫자 코드값을 문자 코드값으로 변환한다.
            for (let [key, value] of mall_prod_statusMap) { // 마스터 상품 코드값 변환.
                if (data.prod_status === key) {
                    data.prod_status = value;
                }
            }
        }

        result.data = convertData;
        result.recordsFiltered = (productListCount[0])[0].cnt;

        console.log(result.data);

        res.send(result).status(200);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

router.post('/linkErrorMessage/insert', async function (req, res, next) {
    console.log("PUT :: /linkErrorMessage/insert");
    try {
        const result = {};

        const params = req.body;
        console.log("Received Params: ", params);

        mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('product', 'insertErrorMessage', params, format);
        result.data = await mybatis.connection.promise().query(query);


        mybatis.connection.promise().commit();

        res.send(result);
    } catch (error) {
        mybatis.connection.promise().rollback();
        console.log("error :: ", error);
        res.send(error);
    }
});

router.put('/linkErrorMessage/update', async function (req, res, next) {
    console.log("PUT :: /linkErrorMessage/update");
    try {
        const result = {};

        const params = req.body;
        console.log("Received Params: ", params);

        mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('product', 'updateErrorMessage', params, format);
        result.data = await mybatis.connection.promise().query(query);


        mybatis.connection.promise().commit();

        res.send(result);
    } catch (error) {
        mybatis.connection.promise().rollback();
        console.log("error :: ", error);
        res.send(error);
    }
});


router.delete('/linkErrorMessage/delete', async function (req, res, next) {
    console.log("DELETE :: /linkErrorMessage/delete");
    try {
        const result = {};

        const params = req.body;
        console.log("Received Params: ", params);

        mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('product', 'deleteErrorMessage', params, format);
        result.data = await mybatis.connection.promise().query(query);


        mybatis.connection.promise().commit();

        res.send(result);
    } catch (error) {
        mybatis.connection.promise().rollback();
        console.log("error :: ", error);
        res.send(error);
    }
});


module.exports = router;
