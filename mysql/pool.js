const mysql = require('mysql2');
let conn = undefined;

try {
    conn = mysql.createPool({
        "host": "localhost",
        "user": "node",
        "port": 3307,
        "password": "pwd",
        "database": "jwt",
        "waitForConnections": false,
        "connectionLimit": 100,
        "maxIdle": 10,
        "idleTimeout": 60000,
        "queueLimit": 0,
        "enableKeepAlive": true,
        "keepAliveInitialDelay": 0
    });
} catch (err) {
    console.log(err);
}

module.exports = conn