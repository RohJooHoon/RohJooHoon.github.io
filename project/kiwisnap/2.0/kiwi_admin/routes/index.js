var cookie = require('cookie');

var express = require('express');
var util = require('../lib/util');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//console.log('url :: ', req.headers.host);
	//res.redirect('/view/product/list');

	let obj = new Object();
	obj.title = 'KIWISNAP';
	obj.layout = 'layouts/layout_no';
	res.render(`index`, obj);

});


router.get('/view/*/*/*', function(req,res, next){
	getProcess(req, res, next);
});

router.get('/view/*/*', function(req,res, next){
	getProcess(req, res, next);
});

router.get('/view/*', function(req,res, next){
	getProcess(req, res, next);
});


function getProcess(req, res, next){
	var path_list = new Array();
	for(idx in req.path.split('/')){
		if(idx >= 2){
			path_list.push(req.path.split('/')[idx]);
		}
	}

	var view_path = path_list.join('/');
	console.log('view_path', view_path);

	let obj = new Object();
	obj.title = 'KIWISNAP';


	Object.assign(obj, req.query);
	obj.view_path = view_path;
	if(req.session != undefined && req.session.TT != undefined){
		obj.api_token = req.session.TT;
		obj.client_id = req.session.client_id;
		obj.t_mem_no = req.session.t_mem_no;
		obj.t_mem_id = req.session.t_mem_id;
		obj.mall_type = req.session.mall_type;
		obj.mem_type = req.session.mem_type;
		obj.permission_level = req.session.permission_level;
	}

	const layoutNoList = ['login', 'appDetail', 'appDirect', 'cafe24Main', 'cafe24KiwiaidMain', 'agreement', 'terms', 'privacy', 'templateRegistUnit','templateModifyUnit'];
	let layoutNoCheck = false;
	layoutNoList.forEach(function (value) {
		if (view_path.indexOf(value) > -1) {
			layoutNoCheck = true;
		}
	})
	if(layoutNoCheck){
		obj.layout = 'layouts/layout_no';

		//cafe24 앱스토어에서 install로 넘어온경우.
		if(util.isEmpty(obj.mall_id) && util.isEmpty(obj.is_multi_shop)){
			obj.cafe24_install = false;
			obj.mall_id = '';
		}else{
			obj.cafe24_install = true;
		}
		res.render(`${view_path}`, obj);
	}else{
		res.render(`${view_path}`, obj);
	}
}


router.post('/view/*/*', function(req,res, next){
	postProcess(req, res, next);
});

router.post('/view/*/*/*', function(req,res, next){
	postProcess(req, res, next);
});

function postProcess(req, res, next){
	console.log("POST START === ", req.body);
	var path_list = new Array();
	for(idx in req.path.split('/')){
		if(idx >= 2){
			path_list.push(req.path.split('/')[idx]);
		}
	}

	var view_path = path_list.join('/');
	console.log('view_path', view_path);

	let obj = new Object();
	obj.title = 'KIWISNAP';
	Object.assign(obj, req.body);


	obj.layout = 'layouts/layout_no';
	res.render(`${view_path}`, obj);
	console.log("obj:", obj);
}

module.exports = router;
