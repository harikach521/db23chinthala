var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy; 
var mongoose = require('mongoose');
var Costume = require("./models/costume"); 

const connectionString =  
process.env.MONGO_CON 
mongoose = require('mongoose'); 
mongoose.connect(connectionString,  
{useNewUrlParser: true, 
useUnifiedTopology: true}); 

//Get the default connection 
var db = mongoose.connection;  
//Bind connection to error event  
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
db.once("open", function(){ 
 console.log("Connection to DB succeeded")});

 // We can seed the collection if needed on 
async function recreateDB(){ 
  // Delete everything 
  await Costume.deleteMany();  
  let instance1 = new 
Costume({costume_type:"ghost",  size:'small', 
cost:26.4});
let instance2 = new 
Costume({costume_type:"anf",  size:'large', 
cost:87.4});
let instance3 = new 
Costume({costume_type:"nhg",  size:'medium', 
cost:98.4}); 
  instance1.save( function(err,doc) { 
      if(err) return console.error(err); 
      console.log("First object saved") 
  }); 
  instance2.save( function(err,doc) { 
    if(err) return console.error(err); 
    console.log("Second object saved") 
}); 
instance3.save( function(err,doc) { 
  if(err) return console.error(err); 
  console.log("Third object saved") 
}); 
}
let reseed=true;
if(reseed){recreateDB();}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var omletRouter = require('./routes/omlet');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var bullet=require("./routes/bullet");
var resource=require("./routes/resource");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({ 
    secret: 'keyboard cat', 
    resave: false, 
    saveUninitialized: false 
  })); 
app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy( 
  function(username, password, done) { 
    Account.findOne({ username: username }, function (err, user) { 
      if (err) { return done(err); } 
      if (!user) { 
        return done(null, false, { message: 'Incorrect username.' }); 
      } 
      if (!user.validPassword(password)) { 
        return done(null, false, { message: 'Incorrect password.' }); 
      } 
      return done(null, user); 
    }); 
  } ));

  // passport config 
// Use the existing connection 
// The Account model  
var Account =require('./models/account'); 
passport.use(new LocalStrategy(Account.authenticate())); 
passport.serializeUser(Account.serializeUser()); 
passport.deserializeUser(Account.deserializeUser()); 

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/omlet', omletRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/costumes',bullet);
app.use('/resource',resource);

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
