import { data } from "autoprefixer"

const url = 'http://localhost:168/userAccounts'

async function getAllUsers() {
    try {
        const data = await fetch(`${url}`)
        const users = await data.json()
        return users
    } catch (error) {
        console.log(`error: ${error}`)
    }
} 

async function getUserById(id) {
    try {
        const data = await fetch(`${url}/${id}`)
        const user = await data.json()
        return user
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

async function addUser(id) {
    try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...id})
        });
        const newUser = await response.json();
        return newUser;
    } catch (error) {
        console.error(`Error adding user: ${error}`);
    }
}



export { getAllUsers, getUserById , addUser}