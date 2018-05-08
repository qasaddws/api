var db = require('../mysql/MySQL');
exports.list=function () {
    var sql="select * from tb_dept";
    return db.query(sql);
};
exports.get=function (id) {
    var sql = "select * from tb_dept where id="+id;
    //db.query(sql,callback);
    return db.query(sql);
};
exports.getName=function(name){
    var sql = "select * from tb_dept where name='"+name+"'";
    //db.query(sql,callback);
    return db.query(sql);
}
exports.create=function(obj){
    var sql="insert into tb_dept(name,pid) " +
    " values(?,?)"
    var data = [
        obj.name, obj.pid
    ];
    console.log(data);
    return db.insert(sql,data);
}
exports.deleteById=function (id) {
    var sql="delete from tb_dept where id="+id;
    console.log(sql);
    return db.query(sql);
};
exports.update=function (obj) {
    var sql="update tb_dept set name=?,pid=? where id=?";
    var data = [
        obj.name,obj.pid,obj.id
    ];
    console.log(sql);
    return db.update(sql,data);
};
