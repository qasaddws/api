var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session')

var index = require('./routes/index');
var finance = require('./routes/finance');
var enroller = require('./routes/enroller');//招生老师
var claz = require('./routes/claz');//班级
var student = require('./routes/student');//班级
var fee = require('./routes/fee');
var computer = require('./routes/computer');
var dormitory = require('./routes/dormitory');
var dept = require('./routes/dept');
var employee = require('./routes/employee');
var app = express();

//session-config
app.use(session({
  secret: '123456', //// 对session id 相关的cookie 进行签名
  name: 'session-id',   //这里的name值是cookie的name，默认cookie的name是：connect.sid
  cookie: { maxAge: 1000 * 60 * 30 },  //设置maxAge是30分钟，即30分钟后session和相应的cookie失效过期
  resave: false,
  saveUninitialized: true // 是否保存未初始化的会话
}));

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("*",function(req,resp,next){
  var user = req.session.user;
  console.log(user)
  if(user==undefined && req.baseUrl.indexOf("/login")<0 ){//非登录请求下，没有session
    resp.send({ret:0,msg:"login first"});
  }else{
    next();
  }
})

app.use('/', index);
app.use('/finance', finance);
app.use('/enroller', enroller);
app.use('/class', claz);
app.use('/student', student);
app.use('/fee', fee);
app.use('/computer', computer);
app.use('/dormitory', dormitory);
app.use('/dept', dept);
app.use('/employee', employee);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
