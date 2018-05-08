var dao = require('../models/DeptDao');

exports.getDepts=function(req,res){

    var ret;
    //得到科室
    dao.getDepts().then(function(deptlist){
        dao.getDoctors().then(function(doctorlist){
            for(var i=0; i<deptlist.length; i++)
            {
                deptlist[i].doctorlist = getDoctorlist(deptlist[i].id,doctorlist);
                console.log(deptlist[i]);
            }
            res.send(deptlist);
        });
    });
}
function getDoctorlist(deptid,doctorlist)
{
    var arr=[];
    for(var j=0; j<doctorlist.length; j++)
    {
        if(deptid==doctorlist[j].deptid)
        {
            arr.push(doctorlist[j]);
        }
    }
    return arr;
}
exports.getDoctor=function(req,res)
{
    var id = req.param.id;
    dao.getDoctor(id,function(data){
       res.send(data);
    });
}