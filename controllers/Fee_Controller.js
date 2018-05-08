var dao = require('../models/FeeDao');
//---------------tb_tuition 学费汇总记录-------------
/**
 * 根据条件 获取学费列表信息
 * @param req
 * @param res
 * @param next
 */
exports.getTuitionList = function (req, res, next) {
    console.log(req.method + ' /tuition => getTuitionList, query: ' + JSON.stringify(req.query));
    //可以增加条件查询
    dao.getTuitionList().then(function(result){
        console.log(result);
        res.send(result);
    });
};
/**
 * 获取某个学员的学费详情,包括tb_tuition和tb_fee
 * @param req
 * @param res
 * @param next
 */
exports.getTuition = function (req, res, next) {
    console.log(req.method + ' /tuition/:order_id => create, query: ' + JSON.stringify(req.query) +
        ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    var conditions = req.params;//orderid:1
    dao.getTuitionList(conditions).then(function(result){
        console.log(result);
        if(result.length>0){
            var tuition = result[0];
            tuition.fees = [];
            dao.getFeeList({student_id:tuition.student_id}).then(function(list){
            //dao.getFeeList({order_id:tuition.order_id}).then(function(list){
                tuition.fees = list;
            }).then(function(){
                res.send(tuition);
            })
        }else{
            res.send({ret:0, msg:"no record"});
        }
    });
};
/**
 * 添加学员学费信息，同时创建tb_fee和tb_enroller_fee记录
 * @param req
 * @param res
 * @param next
 */
exports.addTuition = function (req, res, next) {
    console.log(req.method + ' addTuition, query: ' + JSON.stringify(req.query) +
        ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    console.log(req.body);
    var fees = req.body.fees;
    var student_id = req.body.student_id;
    var order_id = req.body.order_id;
    var tuition = req.body.tuition;
    console.log("fees: "+fees);
    console.log(JSON.stringify(fees));
    var ret = {};
    //
    // dao.addTuition(req.body).then(function (result) {
    //     console.log("addTuition result: " + result);
    //     //添加费用待缴记录
    //     dao.addFees(order_id,student_id,fees).then(function(result){
    //         res.send({ret:result.affectedRows,msg:"create ok"})
    //
    //
    //     },function(error){
    //         res.send({ret:0,msg:"addTuition2 failed"})
    //     })
    // },function(error){
    //     console.log("error: "+ error);
    //     if(error.toString().indexOf("Duplicate") >0)
    //         res.send({ret:0,msg:"addTuition1 failed"})
    //     else
    //         res.send({ret:0,msg:error})
    // });

    dao.addTuition(req.body).then(function (result) {
        console.log("addTuition result: " + result);
        //添加费用待缴记录
        ret.ret_tuition=result.affectedRows;
        return dao.addFees(order_id,student_id,fees);
    }).then(function(result){
        //tuition
        //根据student_id得到enroller_id，得到当前和

        ret.ret_fee=result.affectedRows;
        //根据enroller_id和学费
    }).then(function(result){

    })
};
//---------------tb_fee 待缴费明细-------------
/**
 * TODO: 添加某个学员的待缴费记录
 * @param req
 * @param res
 * @param next
 */
exports.addFee = function (req, res, next) {
    console.log(req.method + ' /enroller => create, query: ' + JSON.stringify(req.query) +
        ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    console.log(req.body);
    dao.addFee(req.body).then(function (result) {
        console.log("result: " + result);
        res.send({ret:result.affectedRows,msg:"create ok"})
    },function(error){
        console.log("error: "+ error);
        if(error.toString().indexOf("Duplicate") >0)
            res.send({ret:0,msg:"姓名重复"})
        else
            res.send({ret:0,msg:error})
    });
};

//---------------tb_fee_paid 实际缴费记录-------------
/**
 * 添加实际缴费记录，同时更改tb_fee和tb_tuition
 * @param req
 * @param res
 * @param next
 */
exports.addPaid = function (req, res, next) {
    console.log(req.method + ' /fee/tuition/order_id/paid => addPaid, query: ' + JSON.stringify(req.query) +
        ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    var paid = req.body;
    //TODO:添加实际缴费记录，同时更改tb_fee和tb_tuition
    var student_id = paid.student_id;
    var order_id = paid.order_id;
    var fee_id = paid.fee_id;
    var money = paid.money;
    var ret = {};
    dao.addPaid(paid).then(function (result) {
        console.log("result: " + result);
        ret.paid_ret = result.affectedRows;
        //更新已缴 未缴
        return dao.updateFee(fee_id, student_id, money);
    }).then(function(result) {
        ret.fee_ret = result.affectedRows;
        console.log(ret);
        //更新学费
        return dao.updateTuition(order_id, student_id, money);
    }).then(function (result) {
        ret.tuition_ret = result.affectedRows;
        console.log(ret);
        ret.ret = 1;
        ret.msg = "ok";
        res.send(ret);
    },function(error){
        console.log("error: "+ error);
        ret.ret = 0;
        ret.msg = error;
        res.send(ret);
    })
};
/**
 * 获取实际缴费记录 参数：student_id=   fee_id=   order_id=
 * @param req
 * @param res
 * @param next
 */
exports.getPaidList = function (req, res, next) {
    console.log(req.method + ' getPaidList, query: ' + JSON.stringify(req.query) +
        ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    var item = req.query;
    dao.getFeePaidList(item).then(function(result){
        console.log(result);
        res.send(result);
    });
};
