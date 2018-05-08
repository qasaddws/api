var task1 = function(){
    var p = new Promise(function(callbackOK,callbackErr){
        console.log("task1 start...");
        setTimeout(function(){
            var data = "[data1]";
            if(true){
                callbackOK(data);
            }else{
                callbackErr("[err1]");
            }
        },3000);
    })
    return p;
}

var task2 = function(data){
    var p = new Promise(function(callbackOK,callbackErr) {
        console.log("task2 start..." + data);
        if (true) {
            callbackOK("[data2]");
        } else {
            callbackErr("[err2]");
        }
    });
    return p;
}
task1().then(function(data){
    task2(data);
})
//task2(task1());