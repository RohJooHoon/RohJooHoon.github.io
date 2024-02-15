const express = require('express');
const mybatis = require('../../lib/mybatis');

const router = express.Router();

router.put("/license/update", async function (req, res, next) {
    try {
        const params = req.body;

        mybatis.connection.promise().beginTransaction();
        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('setting', 'updateClientSetting', params, format);
        await mybatis.connection.promise().query(query);

        let messageParam;
        if (params.business_license_certification == "COMPLETE") {
            messageParam = {"msg_form" : "AT_V_BUSINESS_LICENSE_COMPLETE"}
        } else {
            messageParam = {"msg_form" : "AT_V_BUSINESS_LICENSE_FAIL"}
        }

        const secondQuery = mybatis.mybatisMapper.getStatement('message', 'selectMessageForm', messageParam, format);
        const messageFormResult = await mybatis.connection.promise().query(secondQuery);
        const message_form = (messageFormResult[0])[0];

        const thirdQuery = mybatis.mybatisMapper.getStatement('member', 'selectMemberInfo', params, format);
        const memberList = await mybatis.connection.promise().query(thirdQuery);
        const member = memberList[0][0];

        const jsonObj = {
            "phone" : member.phone,
            "sender_key" : message_form.sender_key,
            "template_code" : message_form.template_code,
            "content" : message_form.msg_content.replace(/\n/g, "\\n")
        }

        let data = JSON.stringify(jsonObj, null, 2);

        const messageObj = {
            "msg_receiver_no" : params.mem_no,
            "msg_title" : message_form.msg_subject,
            "msg_type" : "AT",
            "msg_data" : data
        }

        const fourthQuery = mybatis.mybatisMapper.getStatement('message', 'insertMessage', messageObj, format);
        await mybatis.connection.promise().query(fourthQuery);

        mybatis.connection.promise().commit();

        res.status(200).send("success");
    } catch (error) {
        console.log("error :: ", error);
        mybatis.connection.promise().rollback();
        res.status(500).json(error);
    }
});

function jsonEscape(str)  {
    return str.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}

module.exports = router;