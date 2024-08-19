var express = require('express');
const mybatis = require('../../lib/mybatis');


var router = express.Router();

/* 클라이언트 멤버십 리스트 */
router.get('/client-membership/list', async function (req, res, next) {
   console.log("GET :: /client-membership/list");
   try {
       const result = {};

       const params = req.query;
       console.log("Received Params: ", params);

       const format = {language: 'sql', indent: '    '};

       const query = mybatis.mybatisMapper.getStatement('membership', 'clientMembershipList', params, format);
       const clientMembershipList = await mybatis.connection.promise().query(query);

       const secondQuery = mybatis.mybatisMapper.getStatement('membership', 'clientMembershipListCnt', params, format);
       const clientMembershipListCnt = await mybatis.connection.promise().query(secondQuery);

       result.data = clientMembershipList[0];
       result.recordsFiltered = (clientMembershipListCnt[0])[0].cnt;

       res.send(result);
   } catch (error) {
       console.log("error :: ", error);
       res.json(error.message);
   }
});


router.get('/client-membership/detail', async function (req, res, next) {
    console.log("GET :: /client-membership/detail");
    try {
        const result = {};

        const params = req.query;
        console.log("Received Params: ", params);

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('membership', 'ClientMembershipDetail', params, format);
        const clientMembershipDetail = await mybatis.connection.promise().query(query);

        const secondQuery = mybatis.mybatisMapper.getStatement('membership', 'selectMembershipReserve', params, format);
        const membershipReserveStatus = await mybatis.connection.promise().query(secondQuery);


        const historyQuery = mybatis.mybatisMapper.getStatement('membership', 'selectMembershipHistoryPromotion', params, format);
        const promotionHistoryCount = await mybatis.connection.promise().query(historyQuery);

        console.log('###',promotionHistoryCount);
        let convertData = clientMembershipDetail[0];

        for (let [key, value] of clientMembershipStatusCode) {
            if (convertData[0].status === key) {
                convertData[0].status = value;
            }
        }

        for (let [key, value] of membershipType) {
            if (convertData[0].membership_seq === key) {
                convertData[0].membership_seq = value;
            }
        }
        result.data = convertData;
        result.membershipReserve = membershipReserveStatus[0];
        result.promotionHistoryCount = promotionHistoryCount[0];
        res.status(200).json(result);
    } catch (error) {
        console.log("error :: ", error);
        res.status(500).json(error);
    }
});


router.get('/usages/list', async function (req, res, next) {
    console.log("GET :: /membership/usages/list");
    try {
        const result = {};

        const params = req.query;
        console.log("Received Params: ", params);

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('membership', 'serviceUsageInfoList', params, format);
        const serviceUsageInfoList = await mybatis.connection.promise().query(query);

        const secondQuery = mybatis.mybatisMapper.getStatement('membership', 'serviceUsageInfoListCnt', params, format);
        const serviceUsageInfoListCnt = await mybatis.connection.promise().query(secondQuery);

        let convertData = serviceUsageInfoList[0];
        for(let data of convertData) {
            for (let [key, value] of usageCode) {
                if ((data.usage_code === key)) {
                    let countMultiply = usageCode_count.get(key); // 사용 타입 별로 사용한 횟수에 곱해준다.
                    data.usage_code = value;
                    data.use_count = data.use_count * countMultiply;
                }
            }
        }

        result.data = convertData;
        result.recordsFiltered = (serviceUsageInfoListCnt[0])[0].cnt;

        res.send(result);
    } catch (error) {
        res.send(error);
    }
});


router.get('/client-membership-history/list', async function (req, res, next) {
    console.log("GET :: /membership/client-membership-history/list");
    try {
        const result = {};

        const params = req.query;
        console.log("Received Params: ", params);

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('membership', 'clientMembershipHistoryList', params, format);
        const clientMembershipHistoryList = await mybatis.connection.promise().query(query);

        const secondQuery = mybatis.mybatisMapper.getStatement('membership', 'clientMembershipHistoryListCnt', params, format);
        const clientMembershipHistoryListCnt = await mybatis.connection.promise().query(secondQuery);

        let convertData = clientMembershipHistoryList[0];

        for (let data of convertData) {
            for (let [key, value] of clientMembershipStatusCode) {
                if (data.status === key) {
                    data.status = value;
                }
            }
            for (let [key, value] of membershipType) {
                if (data.membership_seq === key) {
                    data.membership_seq = value;
                }
            }
        }

        result.data = convertData;
        result.recordsFiltered = (clientMembershipHistoryListCnt[0])[0].cnt;

        res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.put('/client-membership-history/update', async function (req, res, next) {
    console.log("PUT :: membership/client-membership-history/update");
    try {
        const result = {};

        const params = req.body;
        console.log("Received Params :: ", params);

        await mybatis.connection.promise().beginTransaction();

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('membership', 'fillUpClientMembership', params, format);

        result.data = await mybatis.connection.promise().query(query);

        mybatis.connection.promise().commit();

        res.send(result);
    } catch (error) {
        await mybatis.connection.promise().rollback();
        console.log("error :: ", error);
        res.status(500).json(error);
    }
});

/* 클라이언트 멤버십 해지 리스트 */
router.get('/client-membership/termination/list', async function (req, res, next) {
    console.log("GET :: /client-membership/list");
    try {
        const result = {};

        const params = req.query;
        console.log("Received Params: ", params);

        const format = {language: 'sql', indent: '    '};

        const query = mybatis.mybatisMapper.getStatement('membership', 'selectMembershipTerminationList', params, format);
        const clientMembershipList = await mybatis.connection.promise().query(query);

        const secondQuery = mybatis.mybatisMapper.getStatement('membership', 'selectMembershipTerminationListCnt', params, format);
        const clientMembershipListCnt = await mybatis.connection.promise().query(secondQuery);

        result.data = clientMembershipList[0];

        for(let idx in result.data){
            result.data[idx].status_str = clientMembershipStatusCode.get(result.data[idx].status);
        }
        result.recordsFiltered = (clientMembershipListCnt[0])[0].cnt;

        res.send(result);
    } catch (error) {
        console.log("error :: ", error);
        res.json(error.message);
    }
});


// 멤버십 관련 코드와 상태값.
const clientMembershipStatusCode = new Map();
clientMembershipStatusCode.set("10", "신규등록(구매)");
clientMembershipStatusCode.set("11", "신규회원요금제(비지니스)");
clientMembershipStatusCode.set("12", "신규회원요금제(무료전환)");
clientMembershipStatusCode.set("13", "신규회원 추천인 이벤트");
clientMembershipStatusCode.set("20", "업그레이드");
clientMembershipStatusCode.set("30", "다운그레이드");
clientMembershipStatusCode.set("40", "배치정기결제");
clientMembershipStatusCode.set("50", "환불 후 무료 전환");
clientMembershipStatusCode.set("90", "기타(또는 관리자변경)");

const membershipType = new Map();
membershipType.set(1, "FREE");
membershipType.set(2, "BASIC");
membershipType.set(3, "BUSINESS");
membershipType.set(4, "ENTERPRISE");
membershipType.set(5, "FREE");
membershipType.set(6, "BASIC");
membershipType.set(7, "BUSINESS");

const usageCode = new Map();
usageCode.set("PRODUCT_REGISTER", "상품 등록");
usageCode.set("UPLOAD_VIDEO", "영상 업로드");
usageCode.set("UPLOAD_SPIN", "액션 gif");
usageCode.set("REMOVE_BG", "배경 제거");
usageCode.set("UPLOAD_GIF", "gif 업로드");

const usageCode_count = new Map();
usageCode_count.set("PRODUCT_REGISTER", 10);
usageCode_count.set("UPLOAD_VIDEO", 2);
usageCode_count.set("UPLOAD_SPIN", 1);
usageCode_count.set("REMOVE_BG", 1);
usageCode_count.set("UPLOAD_GIF", 1);


module.exports = router;
