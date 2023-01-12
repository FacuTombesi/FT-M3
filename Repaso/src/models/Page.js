const { DataTypes } = require("sequelize")

module.exports = (database) => {
    database.define("Page", {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false 
        }
    }, { timestamps: false })
}
