var db = require('../mysql/MySQL');

exports.list=function () {
    var sql="select * from tb_enroller";
    return db.query(sql)
};
exports.getById=function (id) {
    var sql="select * from tb_enroller where id="+id;
    console.log(sql);
    return db.query(sql);
};
exports.getByPid=function (pid) {
    var sql="select * from tb_enroller where pid="+pid;
    return db.query(sql);
};
exports.create=function (obj) {
    var sql="insert into tb_enroller(name,phone,idcard,level,pid,province, city,address,info,createtime) " +
        " values(?,?,?,?,?,?,?,?,now())"
    console.log(sql);
    var data = [
        obj.name,obj.phone,obj.idcard,
        obj.level,obj.pid,
        obj.province,obj.city,obj.address,obj.info
    ];
    console.log(data);
    return db.insert(sql,data);
};
exports.update=function (obj) {
    var sql="update tb_enroller set name=?,phone=?,idcard=?,level=?,pid=?,province=?,city=?,address=?,info=? where id=?";
    var data = [
        obj.name,obj.phone,obj.idcard,
        obj.level,obj.pid,
        obj.province,obj.city,obj.address,obj.info,
        obj.id
    ];
    console.log(sql);
    return db.update(sql,data);
};
exports.deleteById=function (id) {
    var sql="delete from tb_enroller where id="+id;
    console.log(sql);
    return db.query(sql);
};
exports.deleteByPid=function (pid) {
    var sql="delete from tb_enroller where pid="+pid;
    console.log(sql);
    return db.query(sql);
};