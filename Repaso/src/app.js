const express = require("express")
const morgan = require("morgan")
const usersRouter = require("./routes/usersRouter")
const postsRouter = require("./routes/postsRouter")
// const pagesRouter = require("./routes/pagesRouter")

const app = express()

// MIDDLEWARES
app.use(morgan("dev")) // !!!
app.use(express.json()) // !!!

app.use("/users", usersRouter)
app.use("/posts", postsRouter)
// app.use("/pages", pagesRouter)

// ROUTE y CONTROLLER rápido sin modulizar
const { Page } = require("./db")
app.post("/pages", async(req, res) => {
    const { title, users } = req.body
    try {
        const newPage = await Page.create({ title })
        await newPage.addUsers(users /* Array de IDs de users */) // Sequelize crea un método con los modelos que tengo creados y me permite usar este método para agregarle los IDs del modelo que le pase, y se usa ".add{El nombre del modelo}()"
        res.status(201).json(newPage)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})


module.exports = app