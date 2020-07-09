var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var orders = require('../models/order');

const ObjectID = mongoose.Types.ObjectId;

//Get orders from database
router.get('/',async function(req, res) {
  await orders.find({},async function(err,entries){
      res.json(entries);
  });
});
//Get order by ID
router.get('/:id',function(req,res){
    orders.findOne({
        _id:ObjectID(req.params.id)
    },async function(err,order){
        if(err){
            console.error(err);
            return res.json({message:`Ops, something went wrong: ${err}`,success:false});
        }else if(!order){
            return res.json({message:`Order doesn't exist`,success:false});
        }else{
            return res.json(order);
        }
    })
});
//Add new order
router.post('/',async function (req,res){
    console.log(req.body);
    if(!req.body.name || !req.body.price || !req.body.quantity){
        var missing = [];
        if(!req.body.name)
            missing.push('name');
        if(!req.body.price)
            missing.push('price');
        if(!req.body.quantity)
            missing.push('quantity');

        return res.json({message:`Please insert ${missing.toString()}`,success:false});
    }else if(!isNaN(req.body.name)){
        return res.json({message:`Name cannot be a number.`,success:false});
    }else{
        let newOrder = new orders({
            name:req.body.name,
            price:req.body.price,
            quantity:req.body.quantity
        });
        await newOrder.save(err=>{
            if(err){
                console.error(err);
                res.json({message:`Ops, something went wrong: ${err}`,success:false});
            }else{
                res.json({
                    message:'Order added successfully',success:true
                });
            }
        });
    }

});

//Update order
router.put('/update/:id',async function (req,res){
    orders.findOne({
        _id:ObjectID(req.params.id)
    },{
        name:req.body.name,
        price:req.body.price,
        quantity:req.body.quantity
    },function(err,order){
        if(err){
            console.error(err);
            return res.json({message:`Ops, something went wrong: ${err}`,success:false});
        }else if(!order){
            return res.json({message:`Order doesn't exist !`,success:false});
        }else{
            return res.json({message:`Order with id: ${req.params.id} was updated successfully !`,order:order,success:true});
        }
    })
});
//Delete order
router.delete('/delete/:id',async function(req,res){
   await orders.deleteOne({
       _id:req.params.id
   },function(err){
        if(err){
            console.error(err);
            return res.json({message: `Ops, something went wrong: ${err}`,success:false});
        }else{
            return res.json({message: `Order with id: ${req.params.id} was deleted successfully !`,success:true});
        }
   });
});




module.exports = router;
