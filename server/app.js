var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var bodyparser = require('body-parser');

dotenv.config();




const mongoURI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0-kdrae.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
global.conn = mongoose.createConnection(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true});

mongoose.connect(mongoURI,{useNewUrlParser:true,useUnifiedTopology:true});

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var ordersRouter = require('./routes/orders');
var productsRouter = require('./routes/products');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(function(req,res,next){
    //Requests from where I want to allow
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods I want to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers I want to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
   next();
});


app.use('/', indexRouter);
app.use('/api/', apiRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/products',productsRouter);

//Handle not found routes
app.use('/*',function(req,res){
   res.json({message:`Invalid route.`});
});


module.exports = app;
