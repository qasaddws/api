var db = require('../mysql/MySQL');
//TODO: 调整班级，费用

exports.list=function () {
    var sql="select * from tb_student";
    return db.query(sql)
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
exports.create=function (obj) {
    var sql="insert into tb_student(regtime,name,phone,idcard,major_id,major_month,birthday" +
        ",school,school_level,school_major,class_id,enroller_id,consulter_id" +
        ",province,city,address,ecp_name,ecp_phone,img) " +
        " values(now(),?,?,?,?,?,?, ?,?,?,?,?,?, ?,?,?,?,?,?)"
    console.log(sql);
    var data = [
        obj.name,obj.phone,obj.idcard,obj.major_id,obj.major_month,obj.birthday,
        obj.school,obj.school_level,obj.school_major,obj.class_id,obj.enroller_id,obj.consulter_id,
        obj.province,obj.city,obj.address,obj.ecp_name,obj.ecp_phone,obj.img
    ];
    console.log(data);
    return db.insert(sql,data);
};
exports.update=function (obj) {
    var sql="update tb_student set name=?,phone=?,idcard=?,major_id=?,major_month=?,birthday=?," +
        " school=?,school_level=?,school_major=?,class_id=?,enroller_id=?,consulter_id=?" +
        " province=?,city=?,address=?,ecp_name=?,ecp_phone=?,img=? where id=?";
    var data = [
        obj.name,obj.phone,obj.idcard,obj.major_id,obj.major_month,obj.birthday,
        obj.school,obj.school_level,obj.school_major,obj.class_id,obj.enroller_id,obj.consulter_id,
        obj.province,obj.city,obj.address,obj.ecp_name,obj.ecp_phone,obj.img,
        obj.id
    ];
    console.log(sql);
    return db.update(sql,data);
};
exports.deleteById=function (id) {
    var sql="update tb_student set status=-1 where id="+id;
    console.log(sql);
    return db.query(sql);
};
