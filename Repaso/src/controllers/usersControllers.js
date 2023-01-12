// let { users } = require("../data")
const { Op } = require("sequelize") // Importo Op para usar sus métodos
const { User, Page } = require("../db") // Ahora User es el modelo que está en db 

// let id = 6

// TODOS LOS CONTROLADORES DE USUARIOS
const getUsers = async () => {
    const user = await User.findAll({
        include: { // include es como un JOIN que agrega el modelo Page al modelo User. Sequelize ya sabe que usuario sigue a cada página por la relación de Many-To-Many a través de sus IDs
            // De la tabla con la que se relaciona User (osea, Page), traeme...
            model: Page,
            attributes: ["title"], // attributes trae sólo el atributo que le especifique
            // Y de la tabla intermedia...
            through: { // through trae los atributos que yo le especifique
                attributes: [] // Si le paso un array vacío, no me trae ninguno
            }
        }
    }) // .findAll() busca y devuelve todo
    return user
}

const findUsers = async (name) => { // Creo un filtro para buscar usuarios por nombre
    // const results = users.filter((user) => user.name === name)
    // if (!results.length) throw Error(`No users found with name: ${name}`)
    // return results

    const results = await User.findAll({ where: { 
        name: { [Op.iLike]: `%${name}%` } // [Op.iLike] funciona como LIKE en PostgresSQL donde se le para un atributo con % para buscar si hay propiedades que contengan ese atributo
    } })
    if (!results) throw Error(`No users found with name: ${name}`)
    return results
}

const getUserById = async (id) => {
    // const user = users.find((user) => user.id == id) // Se usa == y no === porque uno es un string y el otro es un número
    // if (!user) throw Error(`User ${id} does not exist`)
    // return user

    const user = await User.findByPk(id) // Busca por primary key
    return user
    // Si quiero buscar uno sólo por parámetro...
    // const user = await User.findOne({ where: { id: "1" } })

    // Si quiero buscar, o crear si no existe (MUY condicional)...
    // const [user, created] = await User.findOrCreate({
    //     where: { name: "Facu" },
    //     defaults: {
    //         gender: "Male",
    //         email: "ftombesi@gmail.com"
    //     }
    // })
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
    // await newUser.destroy() => Elimina la entrada de la tabla
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

const deleteUser = async (id) => {
    // const user = users.find((user) => user.id == id) // Busco si existe un usuario con el id recibido
    // if (!user) throw Error(`User ${id} does not exist`)
    // users = users.filter((user) => user.id != id) // Filtro el array de users y me devuelve un array nuevo sin el user con el id que busqué 
    // return user

    const userToDelete = await User.findByPk(id) // Guardo el usuario que quiero borrar buscándolo por su PK
    if (!userToDelete) throw Error(`User ${id} does not exist`)
    await userToDelete.destroy() // Destruyo el usuario requerido y lo devuelvo
    return userToDelete
}


module.exports = { 
    getUsers, 
    findUsers, 
    getUserById, 
    createUser, 
    // updateUser,
    deleteUser 
}