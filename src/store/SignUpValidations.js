import Validations from "./validations";

export default class SignupValidations {
    constructor(username,password,confirmPassword) {
        this.username = username
        this.password = password
        this.confirmPassword = confirmPassword

    }
    checkValidations(){
        let errors = [];
        if(!Validations.checkUsername(this.username)){
            errors['username'] = 'Invalid username';
        }

        if(!Validations.minLength(this.password, 6)){
            errors['password'] = 'Password length should be at least 6 characters';
        }
        if(this.password !== this.confirmPassword){
            errors['confirmPassword'] = 'Password does not match';
        }

        return errors;


    }
}