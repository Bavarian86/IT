const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 10,
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DB
});

module.exports = {
   pool
}