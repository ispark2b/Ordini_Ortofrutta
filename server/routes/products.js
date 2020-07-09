var express = require('express');
var router = express.Router();
var products = require('../configuration').availableProducts;

//Get Products
router.get('/', function(req, res) {
    res.json(products);
});
module.exports = router;
