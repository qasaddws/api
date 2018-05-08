var db = require('../mysql/MySQL');
//TODO: 调整班级，费用

exports.list=function (conditions,data) {
    var sql="select * from tb_student " + conditions;
    return db.query(sql,data);
};
exports.getByClassId=function (id) {
    var sql="select * from tb_student where class_id="+id;
    console.log(sql);
    return db.query(sql);
};
exports.getById=function (pid) {
    var sql="select * from tb_student where id="+pid;
    return db.query(sql);
};
exports.getByIdcard=function (idcard) {
    var sql="select * from tb_student where idcard='"+idcard+"'";
    return db.query(sql);
};
exports.create=function (obj) {
    var sql ="insert into tb_student(regdate,name,phone,idcard,specialty_id,specialty_month" +
        ",school,school_level,school_specialty,class_id,enroller_id,consulter_id" +
        ",province,city,address,contact_name,contact_phone,src) " +
        " values(now(),?,?,?,?,?,?, ?,?,?,?,?,?, ?,?,?,?,?)"
    console.log(sql);
    var data = [
        obj.name, obj.phone, obj.idcard, obj.specialty_id, obj.specialty_month,
        obj.school, obj.school_level, obj.school_specialty,obj.class_id,obj.enroller_id,obj.consulter_id,
        obj.province, obj.city, obj.address, obj.contact_name, obj.contact_phone,obj.src
    ];
    console.log(data);
    return db.insert(sql,data);
};
exports.update=function (obj) {
    var sql="update tb_student set phone=?,major_id=?,major_month=?," +
        " class_id=?,enroller_id=?,consulter_id=?" +
        " ecp_name=?,ecp_phone=? where id=?";
    var data = [
        obj.phone,obj.major_id,obj.major_month,
        obj.class_id,obj.enroller_id,obj.consulter_id,
        obj.ecp_name,obj.ecp_phone,obj.id
    ];
    console.log(sql);
    return db.update(sql,data);
};
