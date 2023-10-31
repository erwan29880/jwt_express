const sql = require('../mysql/injection');
const assert = require('assert').strict;


describe("test des injection sql", () => {

    it("doit retourner false pour pas d'injection sql pour bonjor", () => {
        const injection = new sql();
        const check = injection.checkPattern('bonjor');
        assert.strictEqual(false, check);
    })

    it("doit retourner false pour pas d'injection sql bonjor bonsoir", () => {
        const injection = new sql();
        const check = injection.checkPattern('bonjor bonsoir');
        assert.strictEqual(false, check);
    })

    it("doit retourner false pour pas d'injection sql edword de la-villardière", () => {
        const injection = new sql();
        const check = injection.checkPattern('edword de la-villardière');
        assert.strictEqual(false, check);
    })

    it("doit retourner true pour pattern type 1=1", () => {
        const injection = new sql();
        const check = injection.checkPattern('ergfqsd"or "1"="1');
        assert.strictEqual(true, check);
    })
})