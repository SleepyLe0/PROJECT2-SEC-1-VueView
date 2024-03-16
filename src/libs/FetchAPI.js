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

async function addUser(user) {
    try {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user })
        })
        const newUser = await response.json()
        return newUser
    } catch (error) {
        console.error(`Error adding user: ${error}`)
    }
}

async function updateUser(user) {
    try {
        const response = await fetch(`${url}/${user.username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user })
        })
        const updatedUser = await response.json()
        return updatedUser
    } catch (error) {
        console.error(`Error updating user: ${error}`)
    }
}

    async function deleteUser(id) {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE'
            })
            const deletedUser = await response.json()
            return deletedUser
        } catch (error) {
            console.error(`Error deleting user: ${error}`)
        }
    }

     
export { getAllUsers, getUserById, addUser, updateUser, deleteUser }