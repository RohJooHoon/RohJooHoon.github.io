var express = require('express');
var url = require('url');
var util = require('../../lib/util');
const mybatis = require('../../lib/mybatis');

let router = express.Router();

router.get('/form/detail', async function (req, res, next) {
    console.log("GET :: /api/message/form/detail");
    try {
        const result = {};

        const params = req.query;

        console.log("Received Params :: ", params);

        let format = {language: 'sql', indent: '    '};
        let query = mybatis.mybatisMapper.getStatement('message', 'selectMessageForm', params, format);
        let messageForm = await mybatis.connection.promise().query(query);
        result.data = (messageForm[0]);

        res.status(200).send(result);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error.message);
    }
});

router.post('/create', async function (req, res, next) {
    console.log("POST :: /api/message/create");
    try {
        const params = req.body;

        console.log("Received Params :: ", params);

        mybatis.connection.promise().beginTransaction();
        let format = {language: 'sql', indent: '    '};
        let query = mybatis.mybatisMapper.getStatement('message', 'insertMessage', params, format);

        await mybatis.connection.promise().query(query);
        mybatis.connection.promise().commit();

        res.status(200).send("success");
    } catch (error) {
        console.log("error :: ", error);
        mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }
});

module.exports = router;