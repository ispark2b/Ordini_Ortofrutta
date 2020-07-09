var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema =  new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}

});

module.exports = mongoose.model('Order',orderSchema,'orders');

