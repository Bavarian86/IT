
/** START
 * Navneethsai Kozhipurath
  */
const express = require('express');
const db_products = require("../db/products");
const router = express.Router();

router.get('/', (req, res) => {
    db_products.getAllProducts().then((list) => {
        res.render('catalog/list', {list});
    });
});

router.get('/item', (req, res) => {
    db_products.getProductDetails(req.query.id).then((item) => {
        res.json(item);
    });
});

module.exports = router;


/** 
 * Navneethsai Kozhipurath
  END*/