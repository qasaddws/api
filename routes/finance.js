var express = require('express');
var router = express.Router();
var $ = require('../controllers/Finance_Controller');

//restful   .post  .put  .get .delete   GET/POST/DELETE/PUT
router.route('/tution')
    .get($.list)//获取学费列表
    .post($.create)//更新学费列表
router.route('/tution/:id')
    .get($.get)//获取某个费用列表
    .post($.update)//更新某个费用列表
    .delete($.delete);//删除某个费用列表

module.exports = router;