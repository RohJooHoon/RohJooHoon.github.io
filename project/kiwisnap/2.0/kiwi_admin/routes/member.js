var express = require('express');
var url  = require('url');
var qs = require('querystring');
var http = require('http');
var https = require('https');
var sanitizeHtml = require('sanitize-html');
const session = require('express-session');
const mybatis = require('../lib/mybatis');

var router = express.Router();


/* login porcess */
router.get('/login_process', function(req, res, next) {
    var params = url.parse(req.url, true).query;

    // HTTPRequest의 옵션 설
    var options = {
        host: req.config.info.api_server_host,
        port: req.config.info.api_server_port,
        path: `/member/login?${qs.stringify(params)}`,
        method: 'GET'
    };

    // 콜백 함수로 Response를 받아온다
    var callback = function(response){
        // response 이벤트가 감지되면 데이터를 body에 받아온다
        var body = '';
        response.on('data', function(data) {
            body += data;
        });

        // end 이벤트가 감지되면 데이터 수신을 종료하고 내용을 출력한다
        response.on('end', function() {
            // 데이저 수신 완료

            var objResult = JSON.parse(body);
            if(objResult.error_code === undefined){
                
                req.session.TT = objResult.token;
                req.session.t_mem_no = objResult.mem_no;
                req.session.t_mem_id = objResult.mem_id;
                req.session.client_id = objResult.client_id;
                req.session.mall_type = objResult.mall_type;
                req.session.lang = objResult.lang;
                req.session.mem_type = objResult.mem_type;
                req.session.permission_level = objResult.permission_level;
                
                req.session.save();

                console.log('here2', req.session);
            }

            res.send(objResult);
        });

        response.on('error', function(e){
            console.log(e);
        });
    }

    // 서버에 HTTP Request 를 날린다.
    var request;
    if(req.config.info.api_server_port === '443'){
        request = https.request(options, callback);
    }else{
        request = http.request(options, callback);
    }

    request.end();

});

/* login porcess */
router.get('/logout', function(req, res, next) {
    console.log(`/member/logout`);

    //쿠키 삭제
    let cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }
        res.cookie(prop, '', {expires: new Date(0)});
    }

    //세션 삭제
    req.session.destroy();

    res.redirect('/');
});

/* 회원 리스트 불러오기. */
router.get('/list', async function (req, res, next) {
    console.log('get :: /member/list');
    try{
        const params = req.query;
        console.log("Received Params: ", params);

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('member', 'memberList', params, format);
        const memberList = await mybatis.connection.promise().query(query);

        console.log(query);

        const result = {};
        result.data = memberList[0];

        const secondQuery = mybatis.mybatisMapper.getStatement('member', 'memberListCnt', params, format);

        const memberListCnt = await mybatis.connection.promise().query(secondQuery);
        result.recordsFiltered = (memberListCnt[0])[0].cnt;

        res.json(result);
    }catch (error) {
        console.log(error);
        throw error;
    }
});

/* 해당 클라이언트의 정보를 조회한다. */
router.get('/info', async function (req, res, next) {
    console.log('GET :: /member/info');
    try {
        const result = {};

        const params = req.query;
        console.log("Received Params: ", params);

        const format = {language: 'sql', indent: '    '};
        const query = mybatis.mybatisMapper.getStatement('member', 'selectMemberInfo', params, format);

        const memberInfo = await mybatis.connection.promise().query(query);

        result.data = (memberInfo[0])[0];

        res.send(result);
    } catch (error) {
        console.log("error :: ", error);
        res.send(error);
    }
});

/* 회원정보 수정 (member & client_setting */
router.put('/:mem_no', async function(req, res, next) {
    console.log('put :: /api/member/:mem_no');
    try{

        let mem_no = req.params.mem_no;
        console.log("mem_no :: ", mem_no);

        const params = req.body;
        params.mem_no = mem_no;
        console.log("Received Params: ", params);
        await mybatis.connection.promise().beginTransaction();
        let format = {language: 'sql', indent: '    '};

        //member update
        const query = mybatis.mybatisMapper.getStatement('member', 'updateMember', params, format);
        await mybatis.connection.promise().query(query);
console.log('query :: ', query);
        //client_setting update
        let query2 = mybatis.mybatisMapper.getStatement('member', 'updateClientSetting', params, format);
        let results = await mybatis.connection.promise().query(query2);
console.log('query2 :: ', query2);
        console.log("results :: ", results);

        await mybatis.connection.promise().commit();
        res.json(results);
    }catch (error) {
        console.log('error', error);
        await mybatis.connection.promise().rollback();
        res.status(500).json(error.message);
    }
});


router.get('/getMemberToken', async function (req,res, next) {
    console.log('GET :: /member/getMemberToken');
    try {
        const params = req.query;
        console.log("Received Params: ", params);

        // HTTPRequest 옵션 설정
        const options = {
            host: req.config.info.api_server_host,
            port: req.config.info.api_server_port,
            path: `/member/login?${qs.stringify(params)}`,
            method: 'GET'
        };

        // 콜백 함수로 "Response"를 받아온다
        const callback = function(response){
            // response 이벤트가 감지되면 데이터를 "body"에 받아온다
            let body = '';
            response.on('data', function(data) {
                body += data;
            });

            // end 이벤트가 감지되면 데이터 수신을 종료하고 내용을 출력한다
            response.on('end', function() {
                // 데이터 수신 완료
                const objResult = JSON.parse(body);

                res.send(objResult);
            });

            response.on('error', function(error){
                console.log("response error :: ", error);
                res.send(error);
            });
        }

        // 서버에 HTTP Request 전송.
        let request;
        if(req.config.info.api_server_port === '443'){
            request = https.request(options, callback);
        }else{
            request = http.request(options, callback);
        }

        request.end();
    } catch (error) {
        console.log("error :: ", error);
        res.send(error);
    }
});


/* selectMember & session porcess */
router.get('', function(req, res, next) {
    var params = url.parse(req.url, true).query;

    var headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : ` Bearer ${params.token}`
    };

    // HTTPRequest의 옵션 설
    var options = {
        headers: headers,
        host: req.config.info.api_server_host,
        port: req.config.info.api_server_port,
        path: `/member`,
        method: 'GET'
    };

    // 콜백 함수로 Response를 받아온다
    var callback = function(response){
        // response 이벤트가 감지되면 데이터를 body에 받아온다
        var body = '';
        response.on('data', function(data) {
            body += data;
        });

        // end 이벤트가 감지되면 데이터 수신을 종료하고 내용을 출력한다
        response.on('end', function() {
            // 데이저 수신 완료
            console.log(body);
            var objResult = JSON.parse(body);

            if(objResult.error_code === undefined){
                req.session.TT = params.token;
                req.session.t_mem_no = objResult.mem_no;
                req.session.t_mem_id = objResult.mem_id;
                req.session.client_id = objResult.client_id;
                req.session.mall_type = objResult.mall_type;
                req.session.lang = objResult.lang;
                req.session.mem_type = objResult.mem_type;
                req.session.permission_level = objResult.permission_level;
                
                req.session.save();
            }

            res.send(objResult);
        });

        response.on('error', function(e){
            console.log(e);
        });
    }

    // 서버에 HTTP Request 를 날린다.
    var request;
    if(req.config.info.api_server_port === '443'){
        request = https.request(options, callback);
    }else{
        request = http.request(options, callback);
    }

    request.end();

});

module.exports = router;