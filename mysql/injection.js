/**
 * vérifie certains patterns d'injection sql dans une chaîne de caractère
 */
class Injection {

    pattern = [
        /union/,
        /like/,
        /file/, 
        /=/
    ]

    checkPattern(st) {
        const checkSpaces = /\s/.test(st);
        if (checkSpaces) {
            for (let i = 0; i < this.pattern.length ; i++) {
                if (this.pattern[i].test(st.toLowerCase()) === true) return true;
            }
        }
        return false;
    }
}

module.exports = Injection;