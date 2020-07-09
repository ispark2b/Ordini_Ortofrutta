var express = require('express');
var router = express.Router();
var testList = require('../test');
var mongoose = require('mongoose');
var orders = require('../models/order');

//Get API page
router.get('/', function(req, res) {
  res.json({message:"API is functional",usage:`Go to '/' for more details`});
});
//Fill database with test orders
router.get('/fill', function(req,res){
    console.info("Filling database with test orders..");
    console.log(testList);
    const length = orders.find({},function(err,list){
      return list.length;
    });
    if(length!==0){
      console.info(`Added test orders !`);
      return res.json({message:`Test orders added succesfully !`});
    }else{
      orders.collection.insertMany(testList,function(err,list){
        if(err){
          console.error(err);
          return res.json({message:`Ops, something went wrong: ${err}`});
        }else if(list.length==0){
          console.error(`Ops, something went wrong: 'Nothing got added!'`);
          return res.json({message:`Ops, something went wrong: 'Nothing got added'`});
        }else{
          console.info(`Added test orders !`);
          return res.json({message:`Test orders added succesfully !`});
        }
      });
    }


});
//Delete all orders
router.get('/del',function(req,res){
  orders.deleteMany({},async function(err,data){
    if(err){
      console.error(err);
      return res.json({
        message:`Ops, something went wrong: ${err}`
      });
    }else{
      return res.json({
        message:'All orders deleted !'
      })
    }

  })
});

module.exports = router;
