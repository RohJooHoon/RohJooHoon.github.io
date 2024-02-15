var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookie = require('cookie');
var cors = require('cors');

const session = require('express-session');
var mySQLStore = require('express-mysql-session')(session);

//라우터 설정
var indexRouter = require('./routes/index');
var memberRouter = require('./routes/member');

var unitRouter = require('./routes/api/unit');
var noticeRouter = require('./routes/api/notice');
var sizeInfoRouter = require('./routes/api/sizeInfo');
var templateRouter = require('./routes/api/template');
var paymentRouter = require('./routes/api/payment');
var membershipRouter = require('./routes/api/membership');
var creditRouter = require('./routes/api/credit');
var productRouter = require('./routes/api/product');
var wholesaleRouter = require('./routes/api/wholesale');
var messageRouter = require('./routes/api/message');
var helpRouter = require('./routes/api/help');
var permissionRouter = require('./routes/api/permission');
var settingRouter = require('./routes/api/setting');
var vddmRouter = require('./routes/api/vddm');
var statisticsRouter = require('./routes/api/statistics');
let codeRouter = require('./routes/api/code');
let bannerRouter = require('./routes/api/banner');
let partnersRouter = require('./routes/api/partners');


var bodyParser = require('body-parser');

var i18n = require('./i18n');

var app = express();

var env = process.env.NODE_ENV || 'local';
var config_json = require(path.join(__dirname, '.', 'config', 'config.json'))[env];

var expire_time = (1000 * 60 * 60) * 12; // 연결 만료시간 12시간 설정.

var mysqlOptions = {
    host: config_json.host,
    port: 3306,
    user: config_json.username,
    password: config_json.password,
    database: config_json.database,
    expiration: expire_time
};

var sessionStore = new mySQLStore(mysqlOptions);


app.use(
    session({
        key: "kiwisnapadmin",
        secret:"**kiwisnap**",
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    })
)
// var connection = mysql.createConnection(mysqlOptions); // or mysql.createPool(options);
// var sessionStore = new mySQLStore({} /* session store options */, connection);


// 에디터로 부터 넘어오는 이미지 사이트 때문에 추가.
app.use(bodyParser.json({ limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.raw({limit: '100mb', parameterLimit: 100000000 }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('layout', 'layouts/layout');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(i18n);


// CORS 설정
app.use(cors());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});



//환경별 셋팅.
app.use(function (req, res, next){
    let config;
    let is_real = false;

    console.log("============ENV ["+process.env.NODE_ENV+"]");

    if(!process.env.NODE_ENV){
        config = require('./config/local');
        is_real = false;
    }else if(process.env.NODE_ENV == 'dev'){
        config = require('./config/dev');
        is_real = false;
    }else if(process.env.NODE_ENV == 'real'){
        config = require('./config/real');
        is_real = true;
    }else if(process.env.NODE_ENV == 'real1'){
        config = require('./config/real1');
        is_real = true;
    }else if(process.env.NODE_ENV == 'real2'){
        config = require('./config/real2');
        is_real = true;
    }

    req.config = config;
    res.locals.config = config;
    global.is_real = is_real;


    //cafe24 코드
    global.code='';
    next();
});





// 로그인이 필요한 부분 체크하는 미들웨어
// TODO. 추후 다른 파일로 분리.
app.use(function (req, res, next){
    var not_login_path_list = [
        '/',
        '/view/member/login',
        '/view/member/passwordReset',
        '/member/login_process',
        '/member'  //회원정보 조회
    ];

    //cookie 로 로그인 여부 체크하여 response 에 설정함.
    let is_login = false;
    // if(req.headers.cookie !== undefined && cookie.parse(req.headers.cookie).TT !== undefined){
    //   is_login = true;
    // }

    // console.log('session check :: ', req.session);
    if(req.session !== undefined && req.session.TT !== undefined){
        is_login = true;
    }

    req.is_login = is_login;
    res.locals.is_login = is_login;

    //로그인 여부에 따라 처리
    if(not_login_path_list.indexOf(req.path) > -1){
        console.log('login check pass');
        next();
    }else{
        if(is_login){
            next();
        }else{
            if(req.xhr){
                var result = {'error_code' : 999010,'error_msg' : '로그인이 필요합니다.'};
                var d = {'result': result};

                res.json(d);
            }else{
                res.redirect('/view/member/login');
            }

        }
    }
});





app.use('/', indexRouter);
app.use('/member', memberRouter);
app.use('/api/unit', unitRouter);
app.use('/api/notice', noticeRouter);
app.use('/api/template', templateRouter);
app.use('/api/sizeInfo', sizeInfoRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/membership', membershipRouter);
app.use('/api/credit', creditRouter);
app.use('/api/product', productRouter);
app.use('/api/wholesale', wholesaleRouter);
app.use('/api/message', messageRouter);
app.use('/api/help', helpRouter);
app.use('/api/permission',permissionRouter);
app.use('/api/setting',settingRouter);
app.use('/api/vddm',vddmRouter);
app.use('/api/statistics',statisticsRouter);
app.use('/api/code', codeRouter);
app.use('/api/banner', bannerRouter);
app.use('/api/partners', partnersRouter);


// 등록되지 않은 path로 요청이 왔으면 404 페이지를 만들어야함.
// http-errors 모듈로 error 객체 생성 후 에러 처리 핸들러로 넘김
app.use(function(req, res, next) {
    // error 생성 후 next
    next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    let obj = new Object();
    obj.title = 'KIWISNAP';
    obj.layout = 'layouts/layout_no';

    // render the error page
    res.status(err.status || 500);
    res.render('error', obj);
});




module.exports = app;
