const sql = require('../mysql/sql')

exports.index = (req, res) => {
    res.render("../views/index.ejs");
}

exports.getData = (req, res) => {
    const Db = new sql();
    try {
        Db.getAllData().then(resu => res.status(200).send(resu));
    } catch {
        res.status(403).send({message : "erreur serveur"})
    }
}


exports.postData = (req, res) => {
    const Db = new sql();
    try {
        Db.insertData(req.body).then(resu => {
            if (resu) res.status(201).send({message : "vérifiez nom et prénom"})
            else res.status(201).send({message : "ressource créée"})
        });
    } catch {
        res.status(403).send({message : "erreur serveur"})
    }
}


exports.deleteData = (req, res) => {
    const Db = new sql();
    try {
        const check = Db.deleteDataById(req.params.id)
        if (check) res.status(201).send({message : "probleme de suppression"})
        else res.status(201).send({message : "entrée supprimée"})
    } catch {
        res.status(403).send({message : "erreur serveur"})
    }
}