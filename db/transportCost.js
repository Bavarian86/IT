/** START
 * Stanil Temelkov
 */

const pool = require('./dbpool').pool;

getTransportPrice = async(pallets, distance) => {
    const promisePool = pool.promise();
    const [rows] = await promisePool.query('SELECT price from transport_cost where pallet_count = ? and km = (select min(km) from transport_cost where km > ?)', [pallets, distance]);

    return rows[0].price;
}

getCoordinates = async(plz) => {
    const promisePool = pool.promise();
    const [rows] = await promisePool.query('select lat, lon from locations where plz = ?', [plz]);

    return [rows[0].lat, rows[0].lon];
}

module.exports = {
    getTransportPrice,
    getCoordinates,
};


/**
 * Stanil Temelkov
END */
