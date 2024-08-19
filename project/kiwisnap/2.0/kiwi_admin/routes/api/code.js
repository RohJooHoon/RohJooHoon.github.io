const express = require('express');
const mybatis = require('../../lib/mybatis');

const router = express.Router();

/**
 * code 테이블의 데이터를 group_code Path_Variable을 통해서 조회한다.
 */
router.get("/:group_code", async function (req, res, next) {

  let group_code = req.params.group_code;

  let param = {
    'group_code': group_code,
  }

  let format = {language: 'sql', indent: '    '};

  let query = mybatis.mybatisMapper.getStatement('code',
      'selectCodeListByGroupCode', param, format);

  let queryResult = await mybatis.connection.promise().query(query);
  let result = queryResult[0];

  res.status(200).json(result);
});

/**
 * code 테이블 업데이트.
 */
router.put("", async function (req, res, next) {

  try {
    let reqBody = req.body;

    await mybatis.connection.promise().beginTransaction();

    let params = {
      "codeValue": reqBody.code_value,
      "code" : reqBody.code
    }

    let format = {language: 'sql', indent: '    '};

    let query = mybatis.mybatisMapper.getStatement('code',
        'updateCodeByCode', params, format);

    await mybatis.connection.promise().query(query);

    await mybatis.connection.promise().commit();

    res.status(200).json("success");
  } catch (error) {

    await mybatis.connection.promise().rollback();
    res.status(500).json(error.message);
  }
});

module.exports = router;