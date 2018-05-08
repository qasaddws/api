var dao = require('../models/DeptDao');
var employeeDao = require('../models/EmployeeDao');
//req.query  get参数
//req.body   post参数
//req.params 路由参数
exports.list = function (req, resp, next) {
    console.log(req.method + ',getParam:' + JSON.stringify(req.query) + ',postParam:' + JSON.stringify(req.body))
    var ret = {}
    console.log("session"+JSON.stringify(req.session.user))
    dao.list().then(function (result) {
        ret.ret = 1
        ret.msg = "ok"
        ret.depts = result
        resp.jsonp(ret)
    })
}
exports.create = function (req, resp, next) {
    console.log(req.method + ',getParam:' + JSON.stringify(req.query) + ',postParam:' + JSON.stringify(req.body))
    var dept = req.body
    var ret = {}
    dao.create(dept).then(function (result) {
        console.log(result)
        ret.ret = 1
        ret.msg = "create ok"
        ret.dept=dept
        dept.id=result.insertId
    },function(error){
        ret.ret = 0
        ret.msg = "create error"
        ret.error=error
    }).then(function (results) {
        resp.send(ret)
    })
}
exports.get = function (req, resp, next) {
    console.log(req.method + ',getParam:' + JSON.stringify(req.params) + ',postParam:' + JSON.stringify(req.body))
    var id = req.params.id
    var ret = {}
    dao.get(id).then(function (result) {
        if (result.length == 0) {
            ret.ret = 0
            ret.msg = "dept not exist"
            return
        } else {

            ret.ret = 1
            ret.msg = "ok"
            ret.depts = result[0]
            return employeeDao.getUsersByDeptId(id)
        }

    }, function (error) {
        console.log(error)
        ret.ret = 0
        ret.msg = "dept error" + JSON.stringify(error)
    }).then(function (results) {
        if (ret.ret == 1) {
            ret.depts.employees = results
        }
        resp.send(ret)
    })
}
exports.update = function (req, resp, next) {
    console.log(req.method + ',getParam:' + JSON.stringify(req.query) + ',postParam:' + JSON.stringify(req.body))
    var dept = req.body
    var ret = {}
    dao.update(dept).then(function (result) {
        console.log(result)
        if(result.affectedRows==1){
            ret.ret = 1
            ret.msg = "update ok"
            ret.update=dept
        }else{
            ret.ret =0
            ret.msg = "id is not exist"
        }
    },function(error){
        ret.ret = 0
        ret.msg = "create error"
        ret.error=error
    }).then(function (results) {
        resp.send(ret)
    })
}
exports.delete = function (req, resp, next) {
    console.log(req.method + ',getParam:' + JSON.stringify(req.params) + ',postParam:' + JSON.stringify(req.body))
    
    var ret = {}
    dao.get(req.params.id).then(function(result){
        ret.delete=result[0]
        return dao.deleteById(req.params.id)
    }).then(function(result){
        ret.ret=1
        ret.msg="ok"
        resp.send(ret)
    })
    
}