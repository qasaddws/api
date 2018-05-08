var task1=function(){
    var p = new Promise(function(resolve,reject){
        console.log("task1 start...");
        setTimeout(function(){
            console.log("task1 over....");
            if(true){
                resolve("[data1]");
            }else{
                reject("[err1]");
            }
        },3000);
    })
    return p;
}

var task2=function(ret1){
    var p = new Promise(function(callbackOK,callbackErr){
        console.log("task2 start..."+ret1);
        setTimeout(function(){
            console.log("task2 over....");
            if(true){
                callbackOK("[data2]");
            }else{
                callbackErr("[err2]");
            }
        },3000);
    });
    return p;
}

var task3=function(ret2){
    console.log("task3 start..."+ret2);
    var  data="";
    setTimeout(function(){
        console.log("task3 over....");
        data="[data3]";
    },3000);
}
task1().then(task2).then(task3);