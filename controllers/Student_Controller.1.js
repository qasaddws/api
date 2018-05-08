var dao = require('../models/StudentDao');

exports.list = function (req, res, next) {
    console.log(req.method + ' /enroller => create, query: ' + JSON.stringify(req.query) +
        ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    var conditions = ""
    var keys=[]
    for (var key in req.query) {
        var value = req.query[key];
        if(value.length>0){
            conditions += conditions.length>0?" and ":"" + key+"=?";
            keys.push(value);
        }
    }
    if(conditions.length > 0)
        conditions = " where "+ conditions;
    console.log("conditions:"+conditions+", "+keys);
    dao.list(conditions,keys).then(function(result){
        console.log(result);
        res.send(result);
    },function(err){
        res.send({ret:-1,msg:"query error. ",error:err});
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

exports.updateStudent = function (req, res, next) {
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