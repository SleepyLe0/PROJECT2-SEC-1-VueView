export default class Validations {
    static checkUsername(username) {
        return (/^[0-9A-Za-z_.]{6,16}$/i.test(username))
    }

    static minLength(username, minLength) {
        return username.length >= minLength
    }     
}