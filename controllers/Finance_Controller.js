var dao = require('../models/FinanceDao');
exports.list = function (req, res, next) {
    console.log(req.method + ' /claz => list, query: ' + JSON.stringify(req.query));
    dao.list().then(function(result){
        console.log(result);
        res.send(result);
    });
};
exports.get = function (req, res, next) {
    console.log(req.method + ' /claz/:id => get, query: ' + JSON.stringify(req.query) +
        ', params: ' + JSON.stringify(req.params));
    var id = req.params.id;

    dao.getById(id).then(function(result){
        console.log(result);
        var claz = result[0];
        if(claz==undefined)
            res.send({ret:0,msg:"claz not found."})
        else
            daoStu.getByClassId(id).then(function(studentlist){
            claz['studentlist']=studentlist;
            res.send(claz);
        })
    });
};
exports.create = function (req, res, next) {
    console.log(req.method + ' /claz => create, query: ' + JSON.stringify(req.query) +
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
    console.log(req.method + ' /claz/:id => update, query: ' + JSON.stringify(req.query) +
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
    console.log(req.method + ' /claz/:id => delete, query: ' + JSON.stringify(req.query) +
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