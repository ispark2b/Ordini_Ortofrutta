var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var order = require('/models/order');

var userSchema =  new Schema({
    name:{type:String,required:true},
    lastName:{type:Number,required:true},
    orders:[{type:ObjectId,ref:order,required:false}],
    addresses:[{type:String,required:false}],




});

module.exports = mongoose.model('User',userSchema,'users');

