"use strict";
require('dotenv').config()
const express = require('express');
const sql = require("./mysql/sql");
const app = express();
const favicon = require('serve-favicon')
const path = require('path');
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(express.static('static'));
app.engine('.ejs', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.json())
app.use(require('./router/router'));

// insert one data in database
if (sql.increment === 0) {
    sql.increment++;
    try {
        const bdd = new sql();
        bdd.insertData({
            pseudo : "pseudo",
            password : "pseudo"
        })
    } catch (err) {
        console.log(err);
    }
}

app.listen(process.env.PORT, () => {
    console.log(`serveur en route sur le port ${process.env.PORT}`);
})