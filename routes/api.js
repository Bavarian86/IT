/** START
 * Navneethsai Kozhipurath
 */

const express = require('express');
const { calculatePrice } = require('../utils/priceCalculator');
const { calculateDistance } = require('../utils/distanceCalculator')
const router = express.Router();
const winston = require('../config/winston');

// curl -X POST http://localhost:3000/api/tprice -d '{"products":[{"amount": 15, "id": 1},{"amount": 25, "id": 2},{"amount": 1, "id": 3}]}' -H 'Content-Type: application/json'
router.post('/tprice', async (req, res) => {
    winston.info(`called tprice service with request: ${JSON.stringify(req.body)}`);
    const userId = req.session.userId;
    const distance = await calculateDistance(req.body.products[0], userId);
    calculatePrice(req.body.products, distance)
        .then((data) => res.json(data));
});

module.exports = router;

/** 
 * Navneethsai Kozhipurath
 END  */