const sql = require('../mysql/sql');
const assert = require('assert').strict;


describe("test des requêtes sql", () => {
    it("ne doit rendre aucun résultat", () => {
        const bdd = new sql();
        bdd.getAllData().then(res => {
            assert.strictEqual(0, res.length);
        });
    })


    it("doit crypter le mot de passe", () => {
        const bdd = new sql();
        const newHash = bdd.hash("pseudo");
        assert.notStrictEqual("pseudo", newHash)
    })



})