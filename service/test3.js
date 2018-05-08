var p1 = new Promise(function(resolve,reject){
    console.log("task1 start...");
    setTimeout(function(){
        console.log("task1 over....");
        if(true){
            resolve("[data1]");
        }else{
            reject("[err1]");
        }
    },3000);
});
var p2 = new Promise(function(callbackOK,callbackErr){
    console.log("task2 start...");
    setTimeout(function(){
        console.log("task2 over....");
        if(true){
            callbackOK("[data2]");
        }else{
            callbackErr("[err2]");
        }
    },3000);
});
var task3=function(ret2){
    console.log("task3 start..."+ret2);
    var  data="";
    setTimeout(function(){
        console.log("task3 over....");
        data="[data3]";
    },3000);
}
p1.then(p2).then(task3);
 //Promise.all([p1,p2]).then(task3);