export default class Validations {
    static checkUsername(username) {
        if(/^[0-9A-Za-z-.]{6,16}$/i.test(username,)){
            return true
        }
        return false
    }

    static minLength(username, minLength) {
        if(username.length >= minLength ){
            return true 
        }
        return false
    }
}