var task1 = function(){
    console.log("task1 start...");
    var ret1="ret1";
    setTimeout(function(){
        console.log("task1 over...");
    },5000);
}

var task2 = function(data){
    console.log("task2 start..."+data);
    var ret1="ret2";
    setTimeout(function(){
        console.log("task2 over...");
    },5000);
}
//task2(task1());