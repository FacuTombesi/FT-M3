const { DataTypes } = require("sequelize")

module.exports = (database) => { // Exporto una función que define el modelo que voy a usar (estas NO son los modelos) y recibe database como parámetro
    database.define("User", { // .define() recibe el nombre de los elementos de la base de datos y los elementos que contiene cada uno
        id: { // Desestructuro cada elemento para definir su tipo, su incremento, su tipo de contenido, su tipo de dato, etc
            type: DataTypes.INTEGER, // DataTypes se importa y encarga de definir el tipo de dato de cada elemento
            autoIncrement: true, // autoIncrement hace que el valor se incremente solo
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false // Equivale al NOT NULL de SQL
        },
        email: {
            type: DataTypes.STRING,
            unique: true // Reemplaza al tipo de dato UNIQUE de SQL
        },
        phone: {
            type: DataTypes.STRING
        },
        gender: {
            type: DataTypes.ENUM("Male", "Female") // ENUM() permite dar opciones
        }
    })
}
