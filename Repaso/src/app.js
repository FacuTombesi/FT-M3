const express = require("express")
const morgan = require("morgan")
const usersRouter = require("./routes/usersRouter")
const postsRouter = require("./routes/postsRouter")

const app = express()

// MIDDLEWARES
app.use(morgan("dev")) // !!!
app.use(express.json()) // !!!

app.use("/users", usersRouter)
app.use("/posts", postsRouter)



module.exports = app