var express = require('express');
var router = express.Router();
var $ = require('../controllers/Claz_Controller');

//restful   .post  .put  .get .delete   GET/POST/DELETE/PUT
router.route('/')
    .get($.list)
    .post($.create)
router.route('/:id')
    .get($.get)//获取某个班的学生列表
    .post($.update)//更新班级信息
    .delete($.delete);//删除班级信息

module.exports = router;