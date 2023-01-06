let { users } = require("../data")

let id = 6

// TODOS LOS CONTROLADORES DE USUARIOS
const getUsers = () => {
    return users
}

const findUsers = (name) => { // Creo un filtro para buscar usuarios por nombre
    const results = users.filter((user) => user.name === name)
    if (!results.length) throw Error(`No users found with name: ${name}`)
    return results
}

const getUserById = (id) => {
    const user = users.find((user) => user.id == id) // Se usa == y no === porque uno es un string y el otro es un número
    if (!user) throw Error(`User ${id} does not exist`)
    return user
}

const createUser = (name, lastname, email) => {
    if (!name || !lastname || !email) throw Error("Missing data")
    const newUser = {
        id: id++, // Pone el id actual y lo aumenta para el próximo user que se cree
        name,
        lastname,
        email
    }
    users.push(newUser)
    return newUser
}

const updateUser = (id, name, lastname, email) => {
    if (!id || !name || !lastname || !email) throw Error("Missing data")
    const user = users.find((user) => user.id == id)
    if (!user) throw Error(`User ${id} does not exist`)
    user.name = name
    user.lastname = lastname
    user.email = email
    return user
}

const deleteUser = (id) => {
    const user = users.find((user) => user.id == id) // Busco si existe un usuario con el id recibido
    if (!user) throw Error(`User ${id} does not exist`)
    users = users.filter((user) => user.id != id) // Filtro el array de users y me devuelve un array nuevo sin el user con el id que busqué 
    return user
}



module.exports = { 
    getUsers, 
    findUsers, 
    getUserById, 
    createUser, 
    updateUser,
    deleteUser 
}