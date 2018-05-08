var db = require('../mysql/MySQL');

// exports.getById=function (id) {
//     var sql="select * from tb_employee where id="+id;
//     console.log(sql);
//     return db.query(sql);
// };
// exports.getByUser=function (name) {
//     var sql="select * from tb_employee where name=?";
//     var data = [name];
//     console.log(sql+","+data);
//     return db.query(sql,data);
// };
exports.list=function () {
    var sql="select * from tb_employee";
    return db.query(sql)
};
exports.getTotal=function(){
    var sql="select count(*) as total from tb_employee";
    return db.query(sql)
}
exports.listByPage=function(page=1,count=5){
    var sql="select * from tb_employee limit "+(page-1)*count+","+count;
    return db.query(sql)
}
exports.getUserByName=function(name,pwd){
    var sql="select * from tb_employee where (name=? or phone=?) and pwd=? ";
    var data=[name,name,pwd]
    return db.query(sql,data)
}
//根据部门id查询
exports.getUsersByDeptId=function(dept_id){
    var sql="select * from tb_employee where dept_id="+dept_id;
    return db.query(sql)
}