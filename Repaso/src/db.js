const { Sequelize } = require("sequelize")
const UserModel = require("./models/User")
const PostModel = require("./models/Post")

// Guardo mis datos en variables
// Esta forma no es segura, más adelante vemos una forma segura de guardar estos datos sensibles
const DB_USER = "postgres"
const DB_PASSWORD = "admin"
const DB_HOST = "localhost:5432"

// Creo la base de datos
/* el usuario de postgres : la contraseña de postgres @ el host local / el nombre del servidor con el que me quiero conectar */
const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/repaso`, { logging: false } /* limpia la consola */)

// Ejecuto los modelos pasándoles como parámetro la base de datos para definirlos
UserModel(database)
PostModel(database)

// Defino los modelos para poder usarlos (otra opción es exportarlos con module.exports para evitar definir cada modelo por separado)
// const { User, Post } = database.models


// Otra opción para definir los modelos, es exportarlos con spread operators con los modelos, sin importar cuántos sean
module.exports = { database, ...database.models }