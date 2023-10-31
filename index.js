"use strict";
require('dotenv').config()
const express = require('express');
const app = express();
const favicon = require('serve-favicon')
const path = require('path');
const helmet = require("helmet");

app.use(helmet());
app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(express.static('static'));
app.engine('.ejs', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.json())
app.use(require('./router/router'));


app.listen(process.env.PORT, () => {
    console.log(`serveur en route sur le port ${process.env.PORT}`);
})