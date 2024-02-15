let express = require('express');
const mybatis = require('../../lib/mybatis');
let util = require('../../lib/util');

let router = express.Router();

/* 클라이언트 정보 조회 */
router.get("/client/detail", async function (req, res, next) {
    console.log('GET :: /client/info');
    try {
        const params = req.query;
        console.log("Received Params: ", params);

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('setting', 'selectClientSettingInfo', params, format);
        const clientInfo = await mybatis.connection.promise().query(query);

        const result = clientInfo[0][0];

        res.send(result);
    } catch (error) {
        console.log("error : ", error);
        res.status(500).json(error);
    }
});

/* 클라이언트 정보 수정 */
router.put("/client/update", async function (req, res, next) {
    console.log('PUT :: /client/update');
    try {
        const params = req.body;
        console.log("Received Params: ", params);

        mybatis.connection.promise().beginTransaction()

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('setting', 'updateClientSetting', params, format);
        console.log('query :: ', query);
        await mybatis.connection.promise().query(query);

        if (!util.isEmpty(params.phone)) {
            const params2 = {
                'client_id': params.client_id,
                'phone': params.phone,
            }
            const query2 = mybatis.mybatisMapper.getStatement('member', 'updateMember', params2, format);
            console.log('query2 :: ', query2);
            await mybatis.connection.promise().query(query2);
        }

        mybatis.connection.promise().commit();

        res.status(200).send("success");
    } catch (error) {
        console.log("error : ", error);
        mybatis.connection.promise().rollback();
        res.status(500).json(error);
    }
});

/* 클라이언트 회원 탈퇴 */
router.put("/client/out", async function (req, res, next) {
    console.log('PUT :: /client/out');
    try {
        const params = req.body;
        console.log("Received Params: ", params);

        mybatis.connection.promise().beginTransaction()

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('member', 'insertOutMembers', params, format);
        await mybatis.connection.promise().query(query);

        const query1 = mybatis.mybatisMapper.getStatement('member', 'insertOutClientMall', params, format);
        await mybatis.connection.promise().query(query1);

        const deleteCSQuery = mybatis.mybatisMapper.getStatement('member', 'deleteClientMall', params, format);
        await mybatis.connection.promise().query(deleteCSQuery);

        const deleteMemberQuery = mybatis.mybatisMapper.getStatement('member', 'deleteMember', params, format);
        await mybatis.connection.promise().query(deleteMemberQuery);

        mybatis.connection.promise().commit();

        res.status(200).send("success");
    } catch (error) {
        console.log("error : ", error);
        mybatis.connection.promise().rollback();
        res.status(500).json(error);
    }
});


/* 연동몰 정보 조회 */
router.get("/client/mall/list", async function (req, res, next) {
    console.log('GET :: /client/mall/list');
    try {
        const params = req.query;
        console.log("Received Params: ", params);

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('member', 'selectClientMall', params, format);
        const clientInfo = await mybatis.connection.promise().query(query);

        const result = clientInfo[0];

        res.send(result);
    } catch (error) {
        console.log("error : ", error);
        res.status(500).json(error);
    }
});

/* 연동몰 삭제 */
router.put("/client/mall/delete", async function (req, res, next) {
    console.log('PUT :: /client/mall/delete');
    try {
        const params = req.body;
        console.log("Received Params: ", params);

        mybatis.connection.promise().beginTransaction()

        const format = {language: 'sql', indent: '    '};

        //delete client_mall
        const deleteMemberQuery = mybatis.mybatisMapper.getStatement('member', 'deleteClientMallBySeq', params, format);
        await mybatis.connection.promise().query(deleteMemberQuery);

        // //backup before delete mall_product
        // const backupMallProductQuery = mybatis.mybatisMapper.getStatement('product', 'insertDeleteMallProductBackup', params, format);
        // await mybatis.connection.promise().query(backupMallProductQuery);



        //delete mall_product
        const deleteMallProductQuery = mybatis.mybatisMapper.getStatement('product', 'deleteMallProductByClientMallSeq', params, format);
        await mybatis.connection.promise().query(deleteMallProductQuery);

        mybatis.connection.promise().commit();

        res.status(200).send("success");
    } catch (error) {
        console.log("error : ", error);
        mybatis.connection.promise().rollback();
        res.status(500).json(error);
    }
});

module.exports = router;
