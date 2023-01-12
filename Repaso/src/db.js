const { Sequelize } = require("sequelize")
const UserModel = require("./models/User")
const PostModel = require("./models/Post")
const PageModel = require("./models/Page")

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
PageModel(database)

// Defino los modelos para poder usarlos (otra opción es exportarlos con module.exports para evitar definir cada modelo por separado)
// También se usa para relacionar tablas
const { User, Post } = database.models

// Relación de One-To-One (1:1)
// User.hasOne(Post)
// Post.belongsTo(User)

// Relación de One-To-Many (1:N)
User.hasMany(Post)
Post.belongsTo(User) // Este método crea en la tabla automáticamente una columna llamada UserId para referenciar al ID de User al que le corresponde el Post

// Relación de Many-To-Many (N:N)
User.belongsToMany(Page, { through: "UserPage" }) // Sequelize crea automáticamente la tabla intermedia entre los dos modelos donde se guardan los UserId y PageId
Page.belongsToMany(User, { through: "UserPage" })


// Otra opción para definir los modelos, es exportarlos con spread operators con los modelos, sin importar cuántos sean
module.exports = { database, ...database.models }