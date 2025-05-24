const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Ganti jika pakai password
    database: 'spk_app'
});

module.exports = pool;