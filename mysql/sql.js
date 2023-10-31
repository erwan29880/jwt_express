const escape = require('escape-html');
const conn = require('./pool');
const Injection = require('./injection');

class Requetes extends Injection{

    constructor() {
        super();
    }

    async getAllData() {
        const promise = new Promise((resolve) => {
            conn.execute("select * from users;", (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        });

        return promise.then(val => val);
    }

    
    async getDataByName(nom) {
        const newNom = this.checkPattern(nom) ? '' : escape(nom);
        const promise = new Promise((resolve) => {
            conn.query("select * from users where nom=?;", [newNom], (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        });
        return promise.then(val => val);
    }

    async getDataByNameAndPrename(obj) {
        const nom = this.checkPattern(obj.nom) ? '' : escape(obj.nom);
        const prenom = this.checkPattern(obj.prenom) ? '' : escape(obj.prenom);
        const promise = new Promise((resolve) => {
            conn.query("select * from users where nom=? and prenom=?;", [nom, prenom], (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        });
        return promise.then(val => val);
    }

    async insertData(obj) {
        const nom = this.checkPattern(obj.nom) ? '' : escape(obj.nom);
        const prenom = this.checkPattern(obj.prenom) ? '' : escape(obj.prenom);

        // vérifier si l'entrée existe avant insertion
        const check1 = await this.getDataByNameAndPrename(obj).then(res => {
            return (res.length !== 0) ? true : false;
        })
        if (check1) return true;
        
        
        const requete = "insert into users (nom, prenom) values (?, ?);";
        conn.query(requete, [nom, prenom], (err) => {
            if (err) return true;
        });
        return false;
    }

    deleteData(obj) {
        const requete = "delete from users where nom=? and prenom=?;";
        const nom = this.checkPattern(obj.nom) ? '' : escape(obj.nom);
        const prenom = this.checkPattern(obj.prenom) ? '' : escape(obj.prenom);
        conn.query(requete, [nom, prenom], (err) => {
            if (err) return true;
        });
        return false;
    }

    deleteDataById(id) {
        const requete = "delete from users where id=?;";
        conn.query(requete, [escape(id)], (err) => {
            if (err) return true;
        });
        return false;
    }
}

module.exports = Requetes;