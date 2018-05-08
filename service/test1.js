var task1=function(callback){
    console.log("task1 start...");
    var  data="";
    setTimeout(function(){
        console.log("task1 over....");
        data="[data1]";
        task2(data);
    },3000);
}

var task2=function(ret1){
    console.log("task2 start..."+ret1);
    var  data="";
    setTimeout(function(){
        console.log("task2 over....");
        data="[data2]";
    },3000);
}