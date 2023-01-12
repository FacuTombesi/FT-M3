const app = require("./src/app")
const { database } = require("./src/db")

const PORT = 3001

database
    .sync({ force: true }) // .sync() es un método que sincroniza el servidor con la base de datos y devuelve una promesa
    // force: true ==> Elimina todas las tablas de la base de datos y las vuelve a crear en base al modelo
    // alter: true ==> actualiza las tablas en base al modelo sin eliminarlas
    .then((res) => { 
        app.listen(PORT, () => { // Cuando se conecta, se pone a escuchar al servidor
            console.log(`Listening on port: ${PORT}`)
        })
    }) 
    .catch((err) => console.log(error)) // Pongo un catch para el caso en que se produzca un error 

// OTRA FORMA
// app.listen(PORT, () => {
//     console.log(`Listening on port: ${PORT}`)
//     databbase.sync({ force: true })
// })
