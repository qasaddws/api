var db = require('../mysql/MySQL');
var utils = require('../utils/Utils');
// console.log(utils.getTime("yyyy-MM-dd HH:mm:ss"));

//TODO: 调整班级，费用

exports.getTuitionList=function (conditionObj) {
    return db.select("tb_tuition",conditionObj);
};
exports.getFeeList=function (conditionObj,orderby) {
    return db.select("tb_fee",conditionObj,orderby);
};
exports.getFeePaidList=function (conditionObj) {
    return db.select("tb_fee_paid",conditionObj);
};
exports.getTuitionBy=function (conditions,data) {
    var sql="select * from tb_tuition " + conditions;
    return db.query(sql,data);
};

exports.addTuition=function (obj) {
    var sql="insert into tb_tuition(order_id,student_id,total,unpaid," +
        "tuition,tuition_type," +//tuition_period,
        "pc_deposit,pc_rent,pc_buy," +
        "dormitory_type,dormitory_deposit,dormitory_mng,dormitory_rent," +//dormitory_period,
        "cloth,createtime) " +
        " values(?,?,?,?,  ?,?,  ?,?,?,  ?,?,?,?, ?,now())"
    console.log("sql:"+sql);
    var fees = obj['fee'];
    console.log("fees="+fees);

    var data = [
        obj.order_id,obj.student_id,obj.total,obj.total,
        obj.tuition,obj.tuition_type,
        obj.pc_deposit,obj.pc_rent,obj.pc_buy,
        obj.dormitory_type,obj.dormitory_deposit,obj.dormitory_mng,obj.dormitory_rent,
        obj.cloth,
    ];
    console.log(data);
    return db.insert(sql,data);
};
exports.updateFee=function (fee_id,student_id,money) {
    var sql="update tb_fee set unpaid=unpaid-?,paid=paid+?,uptime=now() where id=? and student_id=?";
    var data=[money,money,fee_id,student_id];
    console.log("updateFee:"+sql+", "+ data);
    return db.update(sql,data);
};
exports.updateTuition=function (order_id,student_id,money) {
    var sql="update tb_tuition set unpaid=unpaid-?,paid=paid+?,uptime=now() where order_id=? and student_id=?";
    var data=[money,money,order_id,student_id];
    console.log("updateTuition:"+sql+", "+ data);
    return db.update(sql,data);
};
exports.addFee=function (obj) {
    var sql="insert into tb_fee(order_id,student_id,fee_type," +
        "total,unpaid,deadline,createtime)" +
        " value(?,?,?,?,?,?,?)";
    console.log("addFee_sql:"+sql);
    console.log("addFee_obj:"+obj);
    obj.createtime = utils.getTime("yyyy-MM-dd HH:mm:ss");
    console.log(obj);
    return db.insertObject(sql,obj);
};
exports.addFees=function (order_id,student_id,arr) {
    var sql="insert into tb_fee(order_id,student_id,fee_type," +
        "total,unpaid,deadline,createtime)" +
        " values ?"
    console.log("addFee_sql:"+sql);
    console.log("addFee_data:"+arr);
    var data = [];
    var now = utils.getTime("yyyy-MM-dd HH:mm:ss");
    for(var i in arr){
        var item =[order_id,student_id,arr[i].fee_type,arr[i].money,arr[i].money,arr[i].deadline,now];
        data[i] = item;
    }
    console.log(data);
    return db.insert(sql,[data]);
};
exports.addPaid=function (obj) {
    var sql="insert into tb_fee_paid(fee_id,order_id,student_id,fee_type,money," +
        "pay_type,pay_time,createtime)" +
        " value(?,?,?,?,?,?,?,?)";
    console.log("addPaid_sql:"+sql);
    console.log("addPaid_obj:"+obj);
    obj.createtime = utils.getTime("yyyy-MM-dd HH:mm:ss");
    console.log(obj);
    return db.insertObject(sql,obj);
};
exports.addPaid=function (obj) {
    var sql="insert into tb_fee_paid(fee_id,order_id,student_id,fee_type,money," +
        "pay_type,pay_time,createtime)" +
        " value(?,?,?,?,?,?,?,?)";
    console.log("addPaid_sql:"+sql);
    console.log("addPaid_obj:"+obj);
    obj.createtime = utils.getTime("yyyy-MM-dd HH:mm:ss");
    console.log(obj);
    return db.insertObject(sql,obj);
};