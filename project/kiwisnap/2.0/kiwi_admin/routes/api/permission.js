var express = require('express');
var url = require('url');
var util = require('../../lib/util');
const session = require('express-session');
var http = require('http');
var https = require('https');
var router = express.Router();

router.get('/menu/level',function (req, res, next) {
    console.log('get :: /permission/menu/level');
    try{
        if(util.isEmpty(req.session.permissionMenu)){
            var headers = {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : ` Bearer ${req.session.TT}`
            };

            // HTTPRequest의 옵션 설
            var options = {
                headers: headers,
                host: req.config.info.api_server_host,
                port: req.config.info.api_server_port,
                path: `/permission/menu/mapping/level/${req.session.permission_level}`,
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
                        req.session.permissionMenu = objResult;
                        req.session.save();
                    }
                    // for (const objResultElement of objResult) {
                    //     console.log("childNode: : ", objResultElement.childNode)
                    // }
                    res.send(objResult);
                });

                response.on('error', function(e){
                    console.log(e);
                });
            }

            var request;
            if(req.config.info.api_server_port === '443'){
                request = https.request(options, callback);
            }else{
                request = http.request(options, callback);
            }
            request.end();
        }else{
            console.log("return session menuData")
            res.send(req.session.permissionMenu);
        }
    }catch (error) {
        console.log("error : ", error);
    }


});


module.exports = router;