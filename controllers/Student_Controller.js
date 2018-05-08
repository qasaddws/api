var dao = require('../models/StudentDao');

exports.list = function (req, res, next) {
    console.log(req.method + ' /student=> list, query: ' + JSON.stringify(req.query) +
    ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    var conditions = ""
    var keys=[]
    for (var key in req.query) {
        var value = req.query[key];
        if(value.length>0){
            conditions += (conditions.length>0?" and ":"") + key+"=?";
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
exports.create = function (req, res, next) {
    console.log(req.method + ' /student=> creat, query: ' + JSON.stringify(req.query) +
    ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    
    var student= req.body;
    var ret={};
    dao.create(student).then(function(result){
        console.log(result)
        ret.ret=1
        ret.msg="create ok"
        return dao.getByIdcard(student.idcard);
        
    }).then(function(result){
        ret.student=result[0]
        res.send(ret)
    })
    // res.send({ret:1,msg:"create ok"})
    // var conditions = ""
    // var keys=[]
    // for (var key in req.query) {
    //     var value = req.query[key];
    //     if(value.length>0){
    //         conditions += (conditions.length>0?" and ":"") + key+"=?";
    //         keys.push(value);
    //     }
    // }
    // if(conditions.length > 0)
    //     conditions = " where "+ conditions;
    // console.log("conditions:"+conditions+", "+keys);
    // dao.list(conditions,keys).then(function(result){
    //     console.log(result);
    //     var ret={}
    //     ret.ret=1
    //     ret.msg="create ok"
    //     res.send(ret);
    // },function(err){
    //     res.send({ret:-1,msg:"query error. ",error:err});
    // });
};
