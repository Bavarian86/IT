const bcrypt = require('bcrypt');
const pool = require('./dbpool').pool;

/** START
 * Stanil Temelkov
 */

/**
 * Gets user details by ID
 * @param id user's unique identifier
 * @returns user information if found or null
 */
const getUser = async (id) => {
    const promisePool = pool.promise();
    const [users] = await promisePool.query('SELECT u.first_name, u.last_name, u.email, ua.telephone, ua.mobile, ua.postal_code, ua.city, ua.address_line1, ua.address_line2 from `user` u, user_address ua  WHERE u.id = ua.user_id AND u.id = ?', [id]);

    return users.length > 0 ? users[0] : null;
}

const getUserPLZ = async (id) => {
    const promisePool = pool.promise();
    const [rows] = await promisePool.query('SELECT postal_code from user_address WHERE user_id = ?', [id]);
    return rows[0].postal_code;
}

/**
 * Authenticates user by email and password
 * @param email
 * @param password
 * @returns {string|*|null} userId if authenticated successfully or null otherwise
 */
const authenticate = async (email, password) => {
    const promisePool = pool.promise();
    const [users] = await promisePool.query('SELECT * FROM `user` WHERE `email` = ?', [email]);

    return (users && users.length && bcrypt.compareSync(password, users[0].password)) ? {id: users[0].id, name: users[0].first_name, email: email} : null;
}

/**
 * Function to register new user, generates user's hash password before storing it on DB
 * @param {object} user
 */
const register = async (user) => {
    const promisePool = pool.promise();
    await promisePool.query('START TRANSACTION');
    // userId
    await promisePool.query('INSERT INTO `user`(password, first_name, last_name, email, is_admin) VALUES(?, ?, ?, ?, ?)', [bcrypt.hashSync(user.password, 10), user.firstName, user.lastName, user.email, 0]);
    const userId = await promisePool.query('SELECT distinct id FROM `user` WHERE `email` = ?',[user.email]);
    await promisePool.query('INSERT INTO `user_address`(user_id, address_line1, address_line2, postal_code, city, telephone, mobile) VALUES(?, ?, ?, ?, ?, ?, ?)', [userId[0][0].id, user.address1, user.adress2, user.plz, user.city, user.telephone, user.mobile]);
    await promisePool.query('COMMIT');

    return {
        id: userId[0][0].id,
        name: user.firstName
    };
}

module.exports = {
    authenticate,
    getUser,
    getUserPLZ,
    register
};

/**
 * Stanil Temelkov
 END */
