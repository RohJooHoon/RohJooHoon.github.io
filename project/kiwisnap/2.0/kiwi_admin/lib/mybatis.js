var path = require('path');
const mysql2  = require('mysql2');
const mybatisMapper = require('mybatis-mapper');


var env = process.env.NODE_ENV || 'local';
var config_json = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

// create the connection to database
const connection = mysql2.createConnection({
    host: config_json.host,
    user: config_json.username,
    database : config_json.database,
    password : config_json.password,
    timezone: 'Z',
});



// create the myBatisMapper from xml file
mybatisMapper.createMapper([ './sql/unit.xml', './sql/notice.xml', './sql/member.xml', './sql/sizeInfo.xml', './sql/template.xml', './sql/membership.xml', './sql/credit.xml'
    , './sql/product.xml', './sql/wholesale.xml', './sql/message.xml', './sql/help.xml', './sql/setting.xml', './sql/statistics.xml', './sql/code.xml', './sql/banner.xml'
    , './sql/partners.xml'
]);

module.exports = {mybatisMapper, connection};