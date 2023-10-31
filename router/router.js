const express = require('express');
const router = express.Router();
const controlleur = require('../controlleur/controlleur');

router.get('/', controlleur.index);
router.get('/getdata', controlleur.getData);
router.post('/postdata', controlleur.postData);
router.delete('/deldata/:id', controlleur.deleteData);
module.exports = router;