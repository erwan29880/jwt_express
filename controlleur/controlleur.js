const sql = require('../mysql/sql');
const jwt = require('jsonwebtoken');
const EXPIRE = 24*60*60;

// -- views  

exports.index = (req, res) => {
    return res.render("../views/index.ejs", {err : false});
}

exports.secure = (req, res) => {
    return res.render("../views/secure.ejs");
}


// -- crud

exports.getData = (req, res) => {
    const Db = new sql();
    try {
        Db.getAllData().then(resu => res.status(200).send(resu));
    } catch {
        return res.status(403).send({message : "erreur serveur"});
    }
}


exports.postData = (req, res) => {
    const Db = new sql();
    try {
        Db.insertData(req.body).then(resu => {
            if (resu) return res.status(201).send({message : "vérifiez pseudo et mot de passe"});
            else return res.status(201).send({message : "ressource créée"});
        });
    } catch {
        return res.status(403).send({message : "erreur serveur"});
    }
}

exports.checkPseudoAndPassword = async (req, res, next) => {
    const Db = new sql();
    const check = await Db.comparePwd(req.body);
    if (check) {
        const token = jwt.sign(
            {user: req.body.pseudo},
            process.env.JWT,
            {expiresIn : EXPIRE}
        );
        res.header('Authorization', 'Bearer ' + token); // pas obligatoire
        res.cookie("jwt",token , {maxAge: EXPIRE * 1000});
    }
    return res.status(200).send({message : check});
}

exports.deleteData = (req, res) => {
    const Db = new sql();
    try {
        const check = Db.deleteDataById(req.params.id)
        if (check) return res.status(201).send({message : "probleme de suppression"});
        else return res.status(201).send({message : "entrée supprimée"});
    } catch {
        return res.status(403).send({message : "erreur serveur"});
    }
}


// -- middlewares

exports.checkJWT = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT, (err, decoded) => {
            if (err) return res.render("../views/index.ejs", {err : "bad credentials"});
            else next(); 
        });
    } else {
        return res.render("../views/index.ejs", {err : "bad credentials"});
    }
}

exports.clearCookie = (req, res, next) => {
    res.clearCookie('jwt');
    next();
}