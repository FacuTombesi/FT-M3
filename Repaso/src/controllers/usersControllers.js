// let { users } = require("../data")
const { User } = require("../db") // Ahora User es el modelo que está en db 

// let id = 6

// TODOS LOS CONTROLADORES DE USUARIOS
const getUsers = async () => {
    const user = await User.findAll() // .findAll() busca y devuelve todo
    return user
}

// const findUsers = (name) => { // Creo un filtro para buscar usuarios por nombre
//     const results = users.filter((user) => user.name === name)
//     if (!results.length) throw Error(`No users found with name: ${name}`)
//     return results
// }

const getUserById = async (id) => {
    // const user = users.find((user) => user.id == id) // Se usa == y no === porque uno es un string y el otro es un número
    // if (!user) throw Error(`User ${id} does not exist`)
    // return user

    const user = await User.findByPk(id) // Busca por primary key
    return user
}

const createUser = async (name, email, phone, gender) => {
    // Método sin models
    // if (!name || !email || !phone || !gender) throw Error("Missing data")
    // const newUser = {
    //     id: id++, // Pone el id actual y lo aumenta para el próximo user que se cree
    //     name,
    //     email,
    //     phone,
    //     gender
    // }
    // users.push(newUser)
    // return newUser

    const newUser = await User.create({ name, email, phone, gender }) // Ahora sequelize devuelve una promesa
    return newUser
}

// const updateUser = (id, name, email, phone, gender) => {
//     if (!id || !name || !email || !phone || !gender) throw Error("Missing data")
//     const user = users.find((user) => user.id == id)
//     if (!user) throw Error(`User ${id} does not exist`)
//     user.name = name
//     user.email = email
//     user.phone = phone
//     user.gender = gender
//     return user
// }

// const deleteUser = (id) => {
//     const user = users.find((user) => user.id == id) // Busco si existe un usuario con el id recibido
//     if (!user) throw Error(`User ${id} does not exist`)
//     users = users.filter((user) => user.id != id) // Filtro el array de users y me devuelve un array nuevo sin el user con el id que busqué 
//     return user
// }



module.exports = { 
    getUsers, 
    // findUsers, 
    getUserById, 
    createUser, 
    // updateUser,
    // deleteUser 
}