
/**
 * START Stanil Temelkov
 */

const pool = require('./dbpool').pool;

const getAllProducts = async () => {
    const promisePool = pool.promise();
    const [products] = await promisePool.query('SELECT p.id, p.name, p.description, c.colour, c.size, p.picture from product p, category c where p.category_id = c.id');
    return products;
}

const getProductDetails = async (id) => {
    const promisePool = pool.promise();
    const [products] = await promisePool.query('SELECT p.id, p.name, p.description, c.colour, c.size, p.picture, c.maxProducts, c.minOfPallets from product p, category c where p.id = ? and p.category_id = c.id', [id]);
    return products[0];
}

const getSupplierPLZ = async (product) => {
    const promisePool = pool.promise();
    const [rows] = await promisePool.query('select s.plz from product p, supplier s where p.supplier_id = s.id and p.id = ?;', [product.id]);
    return rows[0].plz;
}

module.exports = {
    getAllProducts,
    getProductDetails,
    getSupplierPLZ,
};

/**
 * Stanil Temelkov
END */
