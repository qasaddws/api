var lightGreen = function(){
    var p = new Promise(function(resolve,reject){
        console.log("绿灯亮...");
        setTimeout(function(){
            console.log("绿灯结束");
            if(true){
                resolve("[data1]");
            }else{
                reject("[err1]");
            }
        },5000);
    });
    return p;
}

var lightYellow = function() {
    var p = new Promise(function (callbackOK, callbackErr) {
        console.log("黄灯亮");
        setTimeout(function () {
            console.log("黄灯灭");
            if (true) {
                callbackOK("[data2]");
            } else {
                callbackErr("[err2]");
            }
        }, 3000);
    });
    return p;
}
var lightRed = function() {
    var p = new Promise(function (callbackOK, callbackErr) {
        console.log("红灯亮");
        setTimeout(function () {
            console.log("红灯灭");
            if (true) {
                callbackOK("[data2]");
            } else {
                callbackErr("[err2]");
            }
        }, 3000);
    });
    return p;
};
setInterval(function)
lightGreen().then(lightYellow).then(lightRed);