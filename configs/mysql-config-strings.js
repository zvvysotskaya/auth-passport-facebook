const dotenv =require('dotenv')

//require('dotenv').config();
dotenv.config()
const mysql = require('mysql');
const configStrings = {
    connectionLimit: 10,
    host: process.env.REACT_APP_HOST,
    user: process.env.REACT_APP_USER,
    password: process.env.REACT_APP_PASSWORD,
    database: process.env.REACT_APP_DATABASE

}
const connectTomysql = mysql.createPool(configStrings);
module.exports = connectTomysql;
