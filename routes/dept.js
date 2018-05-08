var express = require('express');
var router = express.Router();
var $ = require('../controllers/Dept_Controller');

//restful   .post  .put  .get .delete   GET/POST/DELETE/PUT
router.route('/')
    .get($.list)
    .post($.create)
router.route('/:id')
    .get($.get)//获取该部门所有员工
    .post($.update)//更新部门
    .delete($.delete);//删除部门

module.exports = router;