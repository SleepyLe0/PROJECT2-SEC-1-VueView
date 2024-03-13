const url = 'http://localhost:168/userAccounts'

async function getUserById(id) {
    try {
        const data = await fetch(`${url}/${id}`)
        const user = await data.json()
        return user
    } catch (error) {
        console.log(`error: ${error}`)
    }
}

export { getUserById }