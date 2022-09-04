
/** START
 * Navneethsai Kozhipurath
  */
const express = require('express');
const router = express.Router();
const db_users = require('../db/users');
const db_orders = require('../db/order');

/* GET user account page */
router.get('/', async function(req, res) {
    const userId = req.session.userId;
    if (userId) {
        const user = await db_users.getUser(userId);
        const orders = await db_orders.getUserOrders(userId);

        for (const o of orders) {
            o.products = await db_orders.getOrderDetails(o.id);
        }

        console.log(user);
        console.log(orders);
        res.render('user/account', {user, orders});
    } else {
        res.redirect('/login');
    }
});

module.exports = router;


/** 
 * Navneethsai Kozhipurath
  END */