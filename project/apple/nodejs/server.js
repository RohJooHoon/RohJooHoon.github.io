const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({express : true}));

app.listen(8080, function (){
    console.log('listening on 8080');
});

// 라우터
app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});
app.get('/write', function (req, res){
    res.sendFile(__dirname + '/write.html');
});

// form 데이터
app.post('/add', function (req, res) {
    // res.send('전송완료');
    console.log("req.body : ", req.body);
})

// 페이지에 텍스트 삽입
app.get('/dada', function (req, res){
    res.send("나는 다다 입니다.");
})

