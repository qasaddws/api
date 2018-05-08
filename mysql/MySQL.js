var mysql = require("mysql");
//npm install mysql --save
//http://blog.csdn.net/lym152898/article/details/78246230
var dbconf={
    host:"localhost",
    port:3306,
    database:"dongshi",
    user:"dongshi",
    password:"123456",
}
var conn = mysql.createConnection(dbconf);
conn.connect();
exports.query=function (sql,data) {
    var p = new Promise(function(resolve,reject){
        conn.query(sql,data,function(error,results){
            console.log(results);
            if(error){
                reject(error);
            }else {
                resolve(results);
            }
        });
    });
    return p;
};

exports.select=function (tableName,conditionObj,orderby) {
    var data=[]
    var conditions="";
    if(conditionObj != undefined){
        for (var key in conditionObj) {
            var value = conditionObj[key];
            if(value.length>0){
                conditions += conditions.length==0?"":" and " + key+"=?";
                data.push(value);
            }
        }
    }
    var sql = "select * from "+tableName;
    if(conditions.length > 0)
        sql = sql + " where " + conditions;
    if(orderby!=undefined && orderby.length > 0)
        sql = sql + orderby;
    console.log(conditionObj);
    console.log("sql:"+sql+", "+data);
    var p = new Promise(function(resolve,reject){
        conn.query(sql,data,function(error,results){
            console.log(results);
            if(error){
                reject(error);
            }else {
                resolve(results);
            }
        });
    });
    return p;
};



exports.insert=function (sqlString, value) {
    var p = new Promise(function(resolve,reject){
        conn.query(sqlString, value,function(error,results){
            console.log(results);
            if(error){
                reject(error);
            }else {
                resolve(results);
            }
        });
    });
    return p;
};
exports.insertObject=function (sql,obj) {
    //insert into tb_dept(name,pid) values(?,?)
    var cols = sql.substring(sql.indexOf("(")+1,sql.indexOf(")"));
    var szCol = cols.split(',');
    var data = [];
    for(var i in szCol){
        var key = szCol[i];
        data[i] = obj[key];
    }
    var p = new Promise(function(resolve,reject){
        conn.query(sql, data, function(error,results){
            console.log(results);
            if(error){
                reject(error);
            }else {
                resolve(results);
            }
        });
    });
    return p;
};
exports.update=function (sqlString, value) {
    var p = new Promise(function(resolve,reject){
        conn.query(sqlString, value,function(error,results){
            console.log(results);
            if(error){
                reject(error);
            }else {
                resolve(results);
            }
        });
    });
    return p;
};
// _insert: function (client, insertSQLString, value) {
//     client.query(insertSQLString, value, function (error, results) {
//         if (error) {
//             console.log("ClientReady Error:" + error.message);
//             client.end();
//             return;
//         } else {
//             console.log("Inserted:" + results.affectedRows + " row.");
//             console.log("Insert success...");
//         }
//     });
// },

