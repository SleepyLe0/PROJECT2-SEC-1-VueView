import Validations from './Validations'
import { getAllUsers } from '../libs/fetchapi'

export default class SignUpValidations {
    constructor(username, password, confirmPassword) {
        this.username = username
        this.password = password
        this.confirmPassword = confirmPassword
    }
    async checkValidations() {
        try {
            const users = await getAllUsers()
            const errors = { username: '', password: '', confirm: '' }
            const sameUsername = users.find(user => user.username === this.username)
            if (!Validations.checkUsername(this.username) || sameUsername !== undefined) {
                errors.username = 'Invalid username'
            }
            if (!Validations.minLength(this.password, 6)) {
                errors.password = 'Password length should be at least 6 characters'
            }
            if (this.password !== this.confirmPassword) {
                errors.confirm = 'Password does not match'
            }
            return errors
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }
}