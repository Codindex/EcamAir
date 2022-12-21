var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'Ecamien',
    password: 'grblxq',
    database: 'ecam_air'
});

connection.connect(function(err) {if (err) console.log(err);});

module.exports = connection;