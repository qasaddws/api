var dao = require('../models/EnrollerDao');

exports.list = function (req, res, next) {
    console.log(req.method + ' /enroller => list, query: ' + JSON.stringify(req.query));
    dao.list().then(function(result){
        console.log(result);
        var ret={}
        ret.ret=1
        ret.msg="ok"
        ret.enrollers=result

        // res.render('enroller/index', {
        //     title: "招生老师列表",
        //     list : users
        // })
        res.send(ret);
    });
};
exports.get = function (req, res, next) {
    console.log(req.method + ' /enroller/:id => get, query: ' + JSON.stringify(req.query) +
        ', params: ' + JSON.stringify(req.params));
    var id = req.params.id;

    dao.getById(id).then(function(data){
        console.log(data);
        if(data.length > 0)
            res.send(data[0]);
        else
            res.send({});
    });
};
exports.create = function (req, res, next) {
    console.log(req.method + ' /enroller => create, query: ' + JSON.stringify(req.query) +
        ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    console.log(req.body);
    dao.create(req.body).then(function (result) {
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
exports.update = function (req, res, next) {
    console.log(req.method + ' /enroller/:id => update, query: ' + JSON.stringify(req.query) +
        ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    dao.update(req.body).then(function (result) {
        console.log(result);
        if(result.affectedRows==0)
            res.send({ret:result.affectedRows,msg:"update failed"})
        else
            res.send({ret:result.affectedRows,msg:"update ok."})
    },function(error){
        console.log(error);
        res.send({ret:0,msg:error.toString()})
    });
};
exports.delete = function (req, res, next) {
    console.log(req.method + ' /enroller/:id => delete, query: ' + JSON.stringify(req.query) +
        ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));

    var id = req.params.id;
    dao.deleteById(id).then(function (result) {
        console.log(result);
        res.send({ret:result.affectedRows,msg:"delete ok"})
    },function(error){
        console.log(error);
        res.send({ret:0,msg:error.toString()})
    });
};