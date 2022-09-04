/** START
 * Stanil Temelkov
 */

const pool = require('./dbpool').pool;

const getUserOrders = async (userId) => {
    const promisePool = pool.promise();
    const [orders] = await promisePool.query('SELECT id, order_date, pallets, price FROM `order` WHERE user_id = ?', [userId]);

    return orders;
}

const getOrderDetails = async (orderId) => {
    const promisePool = pool.promise();
    console.log(orderId);
    const [details] = await promisePool.query('SELECT p.name, o.amount, p.picture FROM order_detail o, product p WHERE o.product_id = p.id AND o.order_id = ?', [orderId]);
    console.log(details);

    return details;
}

const persistOrderDetails = async (order) => {
    const promisePool = pool.promise();
    await promisePool.query('START TRANSACTION');
    await promisePool.query('INSERT INTO `order`(user_id, pallets, price) VALUES(?, ?, ?)', [order.userId, order.pallets, order.price]);
    const maxId = await promisePool.query('SELECT max(id) FROM `order` WHERE user_id = ?',[order.userId]);
    const orderId = maxId[0][0]['max(id)'];

    await promisePool.query('INSERT INTO order_detail(order_id, product_id, amount) VALUES ?', [order.products.map((pr => [orderId, pr.id, pr.amount]))]);
    await promisePool.query('COMMIT');

    return orderId;
}

module.exports = {
    getUserOrders,
    persistOrderDetails,
    getOrderDetails,
};

/**
 * Stanil Temelkov
END */
