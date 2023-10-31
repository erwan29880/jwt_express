const bcrypt = require("bcryptjs");

class Hash {

    #salt = process.env.secret;

    hash(pwdToHash) {
        console.log(this.#salt);
        return bcrypt.hashSync(pwdToHash, this.#salt);
    }

    compare(hashedPwd, pwdToCompare) {
        return bcrypt.compareSync(pwdToCompare, hashedPwd);
    }

}

module.exports = Hash;