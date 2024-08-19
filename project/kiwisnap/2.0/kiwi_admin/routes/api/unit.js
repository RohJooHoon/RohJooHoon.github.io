var express = require('express');
var url = require('url');
var util = require('../../lib/util');
const mybatis = require('../../lib/mybatis');
var multipart = require('connect-multiparty');
const {HttpResponse} = require("aws-sdk");
var multipartMiddleware = multipart();

var router = express.Router();

/* 유닛 필터 리스트 */
router.get('/filter/list', async function (req, res, next) {
  try {
    let result = {};

    let params = req.query;

    let format = {language: 'sql', indent: '    '};
    let query = mybatis.mybatisMapper.getStatement('unit',
        'selectUnitFilterList', params, format);
    let unitFilterList = await mybatis.connection.promise().query(query);
    result.data = (unitFilterList[0]);

    query = mybatis.mybatisMapper.getStatement('unit',
        'selectUnitFilterListCnt', params, format);
    let unitFilterCnt = await mybatis.connection.promise().query(query);
    result.recordsFiltered = (unitFilterCnt[0])[0].cnt;

    res.json(result);
  } catch (err) {
    console.log('error');
    res.status(500).json(error.message);
  }
});

/* 유닛 필터 상세조회 */
router.get('/filter/:filter_seq', async function (req, res, next) {
  try {
    let result = {};
    result.draw = res.draw;

    let filter_seq = parseInt(req.params.filter_seq);

    let param = {
      'filter_seq': filter_seq,
    }

    let format = {language: 'sql', indent: '    '};
    let query = mybatis.mybatisMapper.getStatement('unit',
        'selectUnitFilterDetail', param, format);
    let unitFilterDetail = await mybatis.connection.promise().query(query);

    result.data = (unitFilterDetail[0]);

    res.json(result);
  } catch (error) {
    console.log("error :: ", error);
    res.status(500).json(error.message);
  }
});

/* 유닛 필터 등록 */
router.post('/filter/create', async function (req, res, next) {
  try {
    const params = req.body;

    await mybatis.connection.promise().beginTransaction();

    let format = {language: 'sql', indent: '    '};
    let query = mybatis.mybatisMapper.getStatement('unit', 'insertUnitFilter',
        params, format);
    let results = await mybatis.connection.promise().query(query);
    const filter_seq = results[0].insertId;

    // const childCategoryList = params.childCategoryList;
    // if (childCategoryList) {
    //     for (let i = 0; i < childCategoryList.length; i++) {
    //         childCategoryList[i].parent_filter_seq = filter_seq;
    //     }
    //     const childList = {
    //         "childCategoryList" : childCategoryList
    //     };
    //     const secondQuery = mybatis.mybatisMapper.getStatement('unit', 'insertChildCategory', childList, format);
    //     await mybatis.connection.promise().query(secondQuery);
    // }

    await mybatis.connection.promise().commit();
    res.status(200).json("success");
  } catch (error) {
    console.log('error :: ', error);
    await mybatis.connection.promise().rollback();
    res.status(500).json(error.message);
  }
});

/* 유닛 필터 수정 */
router.put('/filter/update', async function (req, res, next) {
  try {
    let params = req.body;

    await mybatis.connection.promise().beginTransaction();

    let format = {language: 'sql', indent: '    '};
    let query = mybatis.mybatisMapper.getStatement('unit', 'updateUnitFilter',
        params, format);
    let results = await mybatis.connection.promise().query(query);

    let result = {
      'filter_seq': results[0].insertId
    }

    insertFilterKeyword(params.filter_seq, params.filter_keyword);

    res.json(result);

    await mybatis.connection.promise().commit();

  } catch (err) {
    console.log('error');
    await mybatis.connection.promise().rollback();
    res.status(500).json(error.message);
  }
});

/* 유닛템플릿 리스트 */
router.get('/list', async function (req, res, next) {
  try {
    let result = {};

    result.draw = res.draw;

    let params = req.query

    let format = {language: 'sql', indent: '    '};
    let query = mybatis.mybatisMapper.getStatement('unit',
        'selectUnitTemplateList', params, format);
    let unitList = await mybatis.connection.promise().query(query);

    result.data = (unitList[0]);

    query = mybatis.mybatisMapper.getStatement('unit',
        'selectUnitTemplateListCnt', params, format);

    let unitListCnt = await mybatis.connection.promise().query(query);

    result.recordsFiltered = (unitListCnt[0])[0].cnt;

    res.json(result);
  } catch (err) {
    console.log('error');
    res.status(500).json(error.message);
  }
});

/* 유닛템플릿 등록 */
router.post('/create', multipartMiddleware, async function (req, res, next) {
  try {
    await mybatis.connection.promise().beginTransaction();

    let params = req.body;

    params.image_url = "https://nextdop.s3.ap-northeast-2.amazonaws.com/product/unit/"
        + params.image_url;

    let insertUnitTemplateQuery = createQuery('unit', 'insertUnitTemplate',
        params);

    let results = await mybatis.connection.promise().query(
        insertUnitTemplateQuery);

    params.unit_seq = results[0].insertId;

    if (params.filterSeqList) {
      let insertUnitFilterMappingQuery = createQuery('unit',
          'insertUnitFilterMapping', params);

      await mybatis.connection.promise().query(insertUnitFilterMappingQuery);
    }

    await inputKeywordProcess(params.unit_seq, params.keyword_list);

    await mybatis.connection.promise().commit();
    res.send().status(200);
  } catch
      (error) {
    console.log('error :: ', error);
    await mybatis.connection.promise().rollback();
    res.status(500).json(error.message);
  }
});

/* 유닛템플릿 상세조회 */
router.get('/:unit_seq', async function (req, res, next) {
  try {
    let result = {};

    let unit_seq = req.params.unit_seq;

    let params = {
      'unit_seq': unit_seq,
    }

    let format = {language: 'sql', indent: '    '};
    let query = mybatis.mybatisMapper.getStatement('unit', 'selectUnitTemplate',
        params, format);
    let unitTemplateDetail = await mybatis.connection.promise().query(query);

    query = mybatis.mybatisMapper.getStatement('unit', 'selectMappedList',
        params, format);
    let mappedSeqList = await mybatis.connection.promise().query(query);

    result.data = (unitTemplateDetail[0]);
    result.seqList = (mappedSeqList[0]);

    res.json(result);
  } catch (error) {
    console.log("error :: ", error);
    res.status(500).json(error.message);
  }
});

/* 유닛템플릿 수정 */
router.put('/update', async function (req, res, next) {
  try {
    await mybatis.connection.promise().beginTransaction();

    let params = req.body;

    if (params.image_url) {
      params.image_url = "https://nextdop.s3.ap-northeast-2.amazonaws.com/product/unit/"
          + params.image_url;
    }

    let updateUnitTemplateQuery = createQuery('unit', 'updateUnitTemplate',
        params);

    await mybatis.connection.promise().query(updateUnitTemplateQuery);

    let deleteUnitFilterMappingQuery = createQuery('unit',
        'deleteUnitFilterMapping', params);

    if (params.filterSeqList) {

      let insertUnitFilterMappingQuery = createQuery('unit',
          'insertUnitFilterMapping', params);

      await mybatis.connection.promise().query(deleteUnitFilterMappingQuery);
      await mybatis.connection.promise().query(insertUnitFilterMappingQuery);
    } else {

      await mybatis.connection.promise().query(deleteUnitFilterMappingQuery);
    }

    await deleteUnitKeywordMapping(params.unit_seq);
    await inputKeywordProcess(params.unit_seq, params.keyword_list);

    await mybatis.connection.promise().commit();
    res.send().status(200);
  } catch (error) {
    console.log('error', error);
    await mybatis.connection.promise().rollback();
    res.status(500).json(error.message);
  }

});

/* 유닛템플릿 상태 변경 */
router.put('/update/status', async function (req, res, next) {
  try {
    const params = req.body;

    await mybatis.connection.promise().beginTransaction();

    let format = {language: 'sql', indent: '    '};
    let query = mybatis.mybatisMapper.getStatement('unit',
        'updateUnitActiveStatus', params, format);
    let results = await mybatis.connection.promise().query(query);

    res.json(results);
    await mybatis.connection.promise().commit();
  } catch (err) {
    console.log('error');
    await mybatis.connection.promise().rollback();
    res.status(500).json(error.message);
  }
});

/**
 * 유닛 필터와 매핑된 유닛 리스트 조회.
 */
router.get("/list/mapping", async function (req, res, next) {
  try {
    let result = {};

    let params = req.query;

    let format = {language: 'sql', indent: '    '};

    let query = mybatis.mybatisMapper.getStatement('unit',
        'selectUnitMappingList', params, format);

    let unitList = await mybatis.connection.promise().query(query);
    result.data = (unitList[0]);

    query = mybatis.mybatisMapper.getStatement('unit',
        'selectUnitMappingListCnt', params, format);

    let unitListCnt = await mybatis.connection.promise().query(query);
    result.recordsFiltered = (unitListCnt[0])[0].cnt;

    res.json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

/**
 * 유닛과 유닛 필터 매핑 삭제.
 */
router.delete("/mapping", async function (req, res, next) {
  try {
    let params = req.body

    await mybatis.connection.promise().beginTransaction();

    let format = {language: 'sql', indent: '    '};

    let query = mybatis.mybatisMapper.getStatement('unit',
        'deleteUnitFilterMappingByFilterSeqAndUnitSeq', params, format);

    await mybatis.connection.promise().query(query);

    await mybatis.connection.promise().commit();

    res.status(200).json("delete success");
  } catch (error) {

    await mybatis.connection.promise().rollback();
    res.status(500).json(error.message);
  }
});

//sql 쿼리 생성 함수.
function createQuery(namespace, sql, params) {

  const format = {language: 'sql', indent: '    '};

  return mybatis.mybatisMapper.getStatement(namespace, sql, params, format);
}

/**
 * 키워드 입력 및 유닛과 매핑.
 * @param unitSeq 유닛 시퀀스 번호.
 * @param keywordList
 */
async function inputKeywordProcess(unitSeq, keywordList) {

  if (!keywordList) {
    return false;
  }

  const params = {}

  const keywordListArr = [];

  for (const data of keywordList.split(',')) {
    keywordListArr.push(data.trim());
  }

  params.keywordList = keywordListArr;
  params.unit_seq = unitSeq;

  // 1. 중복된 키워드를 제거하기 위해서 디비에서 키워드 리스트를 조회한다.
  const selectUnitKeywordByKeyword = createQuery('unit', 'selectUnitKeywordByKeyword', params);

  const unitKeywordList = await mybatis.connection.promise().query(selectUnitKeywordByKeyword);

  const originUnitKeywords = [];
  for (const data of unitKeywordList[0]) {
    originUnitKeywords.push(data.keyword);
  }

  params.keywordList = params.keywordList.filter(x => !originUnitKeywords.includes(x));

  //2. 중복 키워드 제거 후 새로운 키워드는 디비에 입력한다.
  if (params.keywordList.length > 0) {

    const insertUnitKeyword = createQuery('unit', 'insertUnitKeyword', params);

    await mybatis.connection.promise().query(insertUnitKeyword);
  }

  const unitKeywordSeqs = [];
  params.keywordList = keywordListArr; // 파라미터로 넘겨 받은 키워드 리스트를 다시 대입한다.

  //3. 디비에 있는 키워드 리스트를 조회 후 해당 unit_keyword_seq 값을 추출하여 유닛과 매핑한다.
  const selectUnitKeywordSeqs = createQuery('unit', 'selectUnitKeywordByKeyword', params);

  const unitKeywordSeqList = await mybatis.connection.promise().query(selectUnitKeywordSeqs);

  for (const data of unitKeywordSeqList[0]) {
    unitKeywordSeqs.push(data.unit_keyword_seq);
  }

  if (unitKeywordSeqs.length > 0) {

    params.unitKeywordSeqs = unitKeywordSeqs;

    const insertUnitKeywordMapping = createQuery('unit', 'insertUnitKeywordMapping', params);

    await mybatis.connection.promise().query(insertUnitKeywordMapping);
  }
}

/**
 * 유닛과 매핑된 키워드 정보 삭제.
 * @param unitSeq
 */
async function deleteUnitKeywordMapping(unitSeq) {

  const params = {
    "unit_seq": unitSeq
  }

  const deleteUnitKeywordMapping = createQuery('unit', 'deleteUnitKeywordMapping', params);

  await mybatis.connection.promise().query(deleteUnitKeywordMapping);
}

async function insertFilterKeyword(filterSeq, keywordList){
  const params = {}


  const keywordListArr = [];

  for (const data of keywordList.split(',')) {
    keywordListArr.push(data.trim());
  }

  params.filter_seq = filterSeq;
  params.filter_keyword_list = keywordListArr;

  const deleteFilterKeyword = createQuery('unit', 'deleteFilterKeyword', params);

  const insertFilterKeyword = createQuery('unit', 'insertFilterKeyword', params);



  console.log(params);
  console.log(keywordList);
  console.log(keywordListArr);
  await mybatis.connection.promise().query(deleteFilterKeyword);
  await mybatis.connection.promise().query(insertFilterKeyword);
}

module.exports = router;