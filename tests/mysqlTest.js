const sql = require('../mysql/sql');
const assert = require('assert').strict;


describe("test des requêtes sql", () => {
    it("doit rendre tous les résultats de la table users", () => {
        const bdd = new sql();
        bdd.getAllData().then(res => {
            assert.notStrictEqual(0, res.length);
        });
    })

    it("doit y avoir un résultat", () => {
        const bdd = new sql();
        bdd.getDataByName("bunny").then(res => {
            assert.strictEqual(1, res.length);
        });
    })

    it("ne devrait pas autoriser l'injection sql", () => {
        const bdd = new sql();
        bdd.getDataByName('ergfqsd" or "1"="1').then(res => {
            assert.strictEqual(0, res.length);
        })
    })

    it("devrait insérer une donnée", async () => {
        const bdd = new sql();
        const data = {
            nom: "grumpf",
            prenom: "grumpfe"
        }
        bdd.insertData(data).then(res => {
            assert.strictEqual(false, res);
        });
    })

    it("devrait supprimer une donnée", async () => {
        const bdd = new sql();
        const data = {
            nom: "grumpf",
            prenom: "grumpfe"
        }
        const check = bdd.deleteData(data);
        assert.strictEqual(false, check);
    })

    it("devrait supprimer une entrée", async() => {
        const bdd = new sql();
        const check = bdd.deleteDataById(1540)
        assert.strictEqual(false, check)
    })
})