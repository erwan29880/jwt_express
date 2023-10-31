const escape = require('escape-html');
const conn = require('./pool');
const HashClass = require('../hash/bc');

/**
 * requêtes sql
 */
class Requetes extends HashClass{

    static increment = 0;

    constructor() {
        super();
    }

    async getAllData() {
        try {
            const promise = new Promise((resolve) => {
                conn.execute("select * from users;", (err, result) => {
                    if (err) throw err;
                    resolve(result);
                })
            });
            return promise.then(val => val);
        } catch (err) {
            console.log(err);
        }
    }

    
    async getDataByPseudo(pseudo) {
        try {
            const promise = new Promise((resolve) => {
                conn.query("select * from users where pseudo=?;", [pseudo], (err, result) => {
                    if (err) throw err;
                    resolve(result);
                })
            });
            return promise.then(val => val);
        } catch (err) {
            console.log(err);
        }
    }

    async getDataByPseudoAndPassword(obj) {
        try {
            const { pseudo, password } = obj;
            const promise = new Promise((resolve) => {
                conn.query("select * from users where pseudo=? and password=? limit 1;", [pseudo, this.hash(password)], (err, result) => {
                    if (err) throw err;
                    resolve(result);
                })
            });
            return promise.then(val => val);
        } catch (err) {
            console.log(err);
        } 
    }

    async comparePwd(obj) {
        try {
            const { password } = obj;
            const b = await this.getDataByPseudoAndPassword(obj).then(resu => {
                if (resu.length === 0) return false;
                return (resu[0].password === this.hash(password));
            })
            console.log(b)
            return b;
        } catch (err) {
            console.log(err);
        }
    }
    

    async insertData(obj) {
        try {
            const { pseudo, password } = obj;
    
            // vérifier si l'entrée existe avant insertion
            const check1 = await this.getDataByPseudoAndPassword(obj).then(res => {
                return (res.length !== 0) ? true : false;
            })
            if (check1) return true;
            
            const requete = "insert into users (pseudo, password) values (?, ?);";
            conn.query(requete, [pseudo, this.hash(password)], (err) => {
                if (err) return true;
            });
            return false;
        } catch (err) {
            console.log(err);
        }
    }

    deleteData(obj) {
        try {
            const { pseudo, password } = obj;
            const requete = "delete from users where pseudo=? and password=?;";
            conn.query(requete, [pseudo, this.hash(password)], (err) => {
                if (err) return true;
            });
            return false;
        } catch (err) {
            console.log(err);
        }
    }

    deleteDataById(id) {
        try {
            const requete = "delete from users where id=?;";
            conn.query(requete, [id], (err) => {
                if (err) return true;
            });
            return false;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Requetes;