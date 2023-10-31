const express = require('express');
const router = express.Router();
const controlleur = require('../controlleur/controlleur');

router.get('/', controlleur.index);
router.get('/getdata', controlleur.getData);
router.post('/postdata', controlleur.postData);
router.delete('/deldata/:id', controlleur.deleteData);
router.post('/check', controlleur.checkPseudoAndPassword);  // envoi token jwt ou non
router.get('/secure', controlleur.checkJWT, controlleur.secure); // vérification token
router.get('/logout', controlleur.clearCookie, controlleur.index);
module.exports = router;