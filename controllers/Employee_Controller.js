var dao = require('../models/EmployeeDao');

exports.list = function (req, res, next) {
    console.log(req.method + ' /employee => list, query: ' + JSON.stringify(req.query));
    var condition = req.query
    var count = condition.count
    var page = condition.page
    var ret = {}
    
    
    //求总数
    dao.getTotal().then(function (result) {
        console.log(result)
        ret.total = result[0].total
        // ret.abc=123
        console.log(ret)
        return dao.listByPage(page, count)
        
    }).then(function (result) {
        ret.ret=1
        ret.msg="ok"
        ret.employees=result
        res.send(ret)
    })
    
    
};
exports.getUserByName = function (req, res, next) {
    console.log(req.method + ' /login => update, query: ' + JSON.stringify(req.query) +
    ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    var condition=req.body
    if(req.method=="GET")
    condition=req.query
    var name = condition.name;
    var pwd = condition.pwd;
    console.log(name + ", " + pwd);
    dao.getUserByName(name, pwd).then(function (results) {
        console.log(results)
        if(results.length > 0){
            req.session.user=results[0]
            res.send({ret:1,msg:"login ok",user:results[0]});
            console.log("session"+JSON.stringify(req.session.user))
        }else{
            res.send({ret:0,msg:"账号或密码不正确"});
        }
        console.log(req.session.id)
    })
};
// exports.getUserByName = function (req, resp, next) {
//     console.log(req.method + ' /employee => list, query: ' + JSON.stringify(req.query));
//     // 参数
//     var condition = req.body;// post
//     if (req.method=='GET')
//         condition=req.query;// get

//     var name = condition.name;
//     var pwd = condition.pwd;
//     var ret = {};//{"ret":0|1,"msg":"login ok|failed","employee":{}}，ret用于保存请求回来的值
//     dao.getUserByName(name,pwd).then(function (results) {
//         console.log("result[0]=>", results);
//         if (results.length==1) {
//             ret.ret=1;
//             ret.msg="login ok";
//             ret.employee = results[0];

//             // 在session中保存登录用户信息
//             req.session.user = ret.employee; // user是key值，ret.employee是value值
//             console.log("session--->" + JSON.stringify(req.session.user));
//         }else{
//             ret.ret=0;
//             ret.msg="账号或密码错误";
//         } 
//         console.log(ret);      
//         resp.send(ret);
//     })
// };
