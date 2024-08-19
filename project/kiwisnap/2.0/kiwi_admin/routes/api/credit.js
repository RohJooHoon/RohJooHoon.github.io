var express = require('express');
const mybatis = require('../../lib/mybatis');


var router = express.Router();

router.get('/client_credit/detail', async function (req, res, next) {
    console.log("GET :: /client_credit/detail");
    try {
        const result = {};

        const params = req.query;
        console.log("Received Params: ", params);

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('credit', 'selectClientCreditDetail', params, format);
        const clientCreditDetail = await mybatis.connection.promise().query(query);

        result.data = clientCreditDetail[0];

        res.send(result);
    } catch (error) {
        res.send(error);
    }
})

router.get('/client-credit/list', async function (req, res, next) {
    console.log("GET :: /credit/client-credit/list");
    try {
        const result = {};

        const params = req.query;
        console.log("Received Params: ", params);

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('credit', 'selectClientCreditHistoryList', params, format);
        const clientMembershipList = await mybatis.connection.promise().query(query);

        const secondQuery = mybatis.mybatisMapper.getStatement('credit', 'selectClientCreditHistoryListCnt', params, format);
        const clientMembershipListCnt = await mybatis.connection.promise().query(secondQuery);

        let convertData = clientMembershipList[0];

        for (let data of convertData) {
            for (let [key, value] of clientCreditStatus) {
                if (data.status === key) {
                    data.status = value;
                }
            }
        }

        result.data = convertData;
        result.recordsFiltered = (clientMembershipListCnt[0])[0].cnt;

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.put('/client_credit/update', async function (req, res, next) {
    console.log("PUT :: /credit/client_credit/update");
    try {
        const result = {};

        const params = req.body;
        console.log("Received Params: ", params);

        mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('credit', 'insertClientCredit', params, format);
        result.chargeBonusCredit = await mybatis.connection.promise().query(query);

        const secondQuery = mybatis.mybatisMapper.getStatement('credit', 'insertClientCreditHistory', params, format);
        result.insertClientCreditHisotry = await mybatis.connection.promise().query(secondQuery);

        mybatis.connection.promise().commit();

        res.send(result);
    } catch (error) {
        mybatis.connection.promise().rollback();
        console.log("error :: ", error);
        res.send(error);
    }
});


const clientCreditStatus = new Map();
clientCreditStatus.set("01", "정상");
clientCreditStatus.set("05", "에러");
clientCreditStatus.set("09", "만료");
clientCreditStatus.set("20", "관리자 충전");
clientCreditStatus.set("95", "환불");

module.exports = router;