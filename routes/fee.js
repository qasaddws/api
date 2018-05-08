//缴费 & 费用类型

var express = require('express');
var router = express.Router();
var $ = require('../controllers/Fee_Controller');

router.route('/tuition')
    .get($.getTuitionList)//查询所有学费记录
    .post($.addTuition);//添加学费记录，创建tb_tuition和tb_fee

router.route('/tuition/:order_id')//查询某个学费记录，可以带上详细的记录
    .get($.getTuition)//查询tb_tuition和tb_fee
router.route('/tuition/:order_id/paid')//查询某个学费记录，可以带上详细的记录
    .post($.addPaid);//财务：添加实际缴费记录
router.route('/paid')
    .get($.getPaidList);
module.exports = router;