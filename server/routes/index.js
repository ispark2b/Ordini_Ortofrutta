var express = require('express');
var router = express.Router();

//Get API Schema
router.get('/', function(req, res) {
    res.json({
        API_Schema:{
            orders_get:{
                description:"Get all orders",
                url:"/api/orders",
                method:'GET'
            },order_put:{
                description:"Add an order",
                    url:"/api/orders",
                    method:'POST'
            },order_update:{
                description:"Update an order",
                    url:'/api/orders/update/:id',
                    method:'POST'
            },order_delete:{
                description:"Delete an order",
                    url:'/api/orders/delete/:id',
                    method:'POST'
            }
        },API_TESTING:{
            orders_fill:{
                description:"Fill database with testing orders",
                url:'/api/fill',
                method:'GET'
            },orders_del:{
                description:"Delete all orders from database",
                url: '/api/del',
                method:'GET'
            }
        },NOTE:`Current version of API doesn't offer any form of authentication`});
});

module.exports = router;
