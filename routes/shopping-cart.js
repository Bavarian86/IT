
/** START
 * Navneethsai Kozhipurath
  */

/*
 * Shopping cart router
 */
const express = require('express');
const winston = require("../config/winston");
const {calculateDistance} = require("../utils/distanceCalculator");
const {calculatePrice} = require("../utils/priceCalculator");
const {persistOrderDetails} = require("../db/order");
const router = express.Router();

/*
 * Generates shopping cart page using shopping-cart/list pug template and shopping cart content saved on user session
 */
router.get('/', (req, res) => {
    if (req.session.userId) {
        res.render('shopping-cart/list', {"list": req.session.shoppingCart});
    } else {
        res.redirect('/login');
    }
});

/*
 * Updates shopping cart product quantity
 */
router.post('/refresh', (req, res) => {
    if (req.session.userId) {
        const productsUpdate = req.body.products;

        req.session.shoppingCart.forEach((p) => {
            p.amount = productsUpdate[p.id];
        });

        res.json({"result": "SUCCESS"});
    } else {
        res.json({"result": "INVALID SESSION"});
    }
});

/*
 * Adds product to shopping cart. The shopping cart content stored on user session
 */
router.post('/item', (req, res) => {
    if (req.session.userId) {
        if (!req.session.shoppingCart) {
            req.session.shoppingCart = [];
        }
        req.session.shoppingCart.push({"id": req.body.id, "amount": req.body.amount, "name": req.body.name, "picture": req.body.picture, "maxProducts": req.body.maxProducts, "minOfPallets": req.body.minOfPallets});
        res.json({"result": "SUCCESS"});
    } else {
        res.json({"result": "INVALID SESSION"});
    }
});

router.post('/order', async (req, res) => {
    winston.info(`called order service with request: ${JSON.stringify(req.body)}`);
    if (req.session.userId) {
        const userId = req.session.userId;
        const distance = await calculateDistance(req.body.products[0], userId);
        calculatePrice(req.body.products, distance)
            .then((data) => {
                if (data[0] != req.body.pallets || data[1] != req.body.price) {
                    res.json({"result": "ERROR", "message": "The transportation price is outdated, please refresh to get accurate price..."});
                } else {
                    persistOrderDetails({"userId": userId, "pallets": req.body.pallets, "price": req.body.price, "products": req.body.products}).then((data) => {
                        req.session.shoppingCart = [];
                        res.json({"result": "SUCCESS", "message": `Order ${data} submitted successfully...`});
                    });
                }
            });
    } else {
        res.json({"result": "INVALID SESSION"});
    }
});

module.exports = router;


/** 
 * Navneethsai Kozhipurath
  END */