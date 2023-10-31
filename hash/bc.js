const bcrypt = require("bcryptjs");

/**
 * Cryptage du mot de passe pour entrée en base de données 
 * le salt est constant, enregistré dans .env, les mots de passe générés sont tout le temps les mêmes
 */
class Hash {

    #salt = process.env.secret;

    hash(pwdToHash) {
        return bcrypt.hashSync(pwdToHash, this.#salt);
    }

    compare(hashedPwd, pwdToCompare) {
        return bcrypt.compareSync(pwdToCompare, hashedPwd);
    }

}

module.exports = Hash;