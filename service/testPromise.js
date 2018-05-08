function task1(){
    var promise = new Promise(
        function handle(resolve,reject){
            console.log("task1 start...")
            setTimeout(function(){
                console.log("task1 end...")
                var data="hello,task1 over.";
                var err="sorry, task1 error.";
                if(true){
                    resolve(data);
                }else{
                    reject(err);
                }
            },3000);
        }
    );
    return promise;
}
function task2(data){
    var promise = new Promise(function(resolve,reject){
        console.log("task2 start..."+data)
        setTimeout(function(){
            console.log("task2 end...")
            var data2="hello,task2 over.";
            var err2="sorry, task2 error.";
            if(true){
                resolve(data2);
            }else{
                reject(err2);
            }
        },3000);

    });
    return promise;
}
function task3(data){
    var promise = new Promise(function(resolve,reject){
        //dosth...
        console.log("task3 start..."+data)
        setTimeout(function(){
            console.log("task3 end...")
            var data3="hello,task3 over.";
            var err3="sorry, task3 error.";
            if(true){
                resolve(data3);
            }else{
                reject(err3);
            }
        },3000);
    });
    return promise;
}
// task1().then(task2).then(task3);
task1().then(function(data){
    task2(data).then(function(data){
        task3(data);
    })
})

// task2().then(function(data){
//     console.log("task2.then..."+data);
// });