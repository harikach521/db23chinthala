var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Part --3 (1)
const connectionString= process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, {useNewUrlPaper: true, useUnifiedTopology: true});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var omletRouter = require('./routes/omlet');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var omlet=require("./models/omlet");

//Part -3 (10)
//we can seed the collection if needed on server start
async function recreatDB(){
  //Deleting everything
  await omlet.deleteMany();

  let instance1 = new 
  omlet({omlet_type : "Bread Omlet", size:'large', cost:12});
  instance1.save(function(err,doc){
    if(err) return console.error(err);
    console.log("First Object Saved")
  });

  let instance2 = new 
  omlet({omlet_type : "French Omlet", size:'large', cost:9});
  instance2.save(function(err,doc){
    if(err) return console.error(err);
    console.log("Second Object Saved")
  });

  let instance3 = new 
  omlet({omlet_type : "Spinach Omlet", size:'large', cost:10});
  instance3.save(function(err,doc){
    if(err) return console.error(err);
    console.log("Third Object Saved")
  });
}

let reseed = true;
if(reseed) { recreateDB();}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/omlet', omletRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/omlet',omlet);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


//Part 3 (3)
//Get the default connection
var db=mongoose.connection;

//Bind connection to error event
db.on('error',console.error.bind(console, 'MongoDB Connection Error!'));
db.once("open",function(){ console.log("Connection to DB Succeeded.")});