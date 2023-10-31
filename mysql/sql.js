const escape = require('escape-html');
const conn = require('./pool');
const Injection = require('./injection');
const HashClass = require('../hash/bc');

class Requetes extends HashClass{

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

    
    async getDataByPseudo(pseudo) {
        const promise = new Promise((resolve) => {
            conn.query("select * from users where pseudo=?;", [pseudo], (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        });
        return promise.then(val => val);
    }

    async getDataByPseudoAndPassword(obj) {
        const { pseudo, password } = obj;
        const promise = new Promise((resolve) => {
            conn.query("select * from users where pseudo=? and password=?;", [pseudo, this.hash(password)], (err, result) => {
                if (err) throw err;
                resolve(result);
            })
        });
        return promise.then(val => val);
    }

    async insertData(obj) {
        const { pseudo, password } = obj;
        console.log(`pseudo : ${pseudo} - pwd : ${password}`);

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
    }

    deleteData(obj) {
        const { pseudo, password } = obj;
        const requete = "delete from users where pseudo=? and password=?;";
        conn.query(requete, [pseudo, this.hash(password)], (err) => {
            if (err) return true;
        });
        return false;
    }

    deleteDataById(id) {
        const requete = "delete from users where id=?;";
        conn.query(requete, [id], (err) => {
            if (err) return true;
        });
        return false;
    }
}

module.exports = Requetes;