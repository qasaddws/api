var db = require('../mysql/MySQL');

exports.list=function () {
    var sql="select A.*,B.name as major_name from tb_claz A, tb_major B where A.major_id=B.id";
    return db.query(sql)
};
exports.getById=function (id) {
    var sql="select * from tb_claz where id="+id;
    console.log(sql);
    return db.query(sql);
};

exports.create=function (obj) {
    var sql="insert into tb_claz(name,major_id,major_month,start_date,end_date,teacher_id,status) " +
        " values(?,?,?,?,?,?,?)"
    console.log(sql);
    var teacherid = obj.teacherid==undefined?0:obj.teacherid;
    var status = obj.status==undefined?0:obj.status;
    var data = [
        obj.name,obj.major_id,obj.major_month,
        obj.start_date,obj.end_date,
        teacherid,status
    ];
    console.log(data);
    return db.insert(sql,data);
};
exports.update=function (obj) {
    var sql="update tb_claz set name=?,major_id=?,major_month=?,start_date=?,end_date=?,teacher_id=?,status=? where id=?";
    var teacherid = obj.teacherid==undefined?0:obj.teacherid;
    var status = obj.status==undefined?0:obj.status;
    var data = [
        obj.name,obj.major_id,obj.major_month,
        obj.start_date,obj.end_date,
        teacherid,status,
        obj.id
    ];
    console.log(data);
    return db.update(sql,data);
};
exports.deleteById=function (id) {
    var sql="delete from tb_claz where id="+id;
    console.log(sql);
    return db.query(sql);
};
