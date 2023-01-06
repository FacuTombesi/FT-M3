const { Router } = require("express")
const { getUsers, findUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/usersControllers")

const usersRouter = Router()

// USUARIOS
// GET /users => me devuelve todos los users
// GET /users/:id => me devuelve un usuario con id específico
// GET /users?name= => me trae todos los que tengan ese nombre
// POST /users => crea un usuario nuevo
// PUT /users => modificar un usuario específico
// DELETE /users/:id/delete => eliminar un usuario específico

// HANDLERS
// GET /users y GET /users?name=
usersRouter.get("/", (req, res) => { // Al estar trabajando directamente en users, no es necesario aclarar "/users"
    // Si tengo query name, quiero buscar, si no, mando todo
    const { name } = req.query // Tomo lo que necesito
    let users // Lo declaro vacío primero para que luego tome un valor u otro
    try {
        if (name) /* Busco user */ users = findUsers(name)
        else /* Mando todo */ users = getUsers()
        res.status(200).json(users)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// GET /users/:id
usersRouter.get("/:id", (req, res) => {
    const { id } = req.params
    try {
        const user = getUserById(id)
        res.status(200).json(user)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// POST /users
usersRouter.post("/", (req, res) => {
    try {
        const { name, lastname, email } = req.body
        const newUser = createUser(name, lastname, email)
        res.status(200).json(newUser)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// PUT /users
usersRouter.put("/", (req, res) => {
    const { id, name, lastname, email } = req.body
    try {
        const updatedUser = updateUser(id, name, lastname, email)
        res.status(200).json(updatedUser)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// DELETE /users/:id/delete
usersRouter.delete("/:id/delete", (req, res) => {
    const { id } = req.params
    try {
        const deletedUser = deleteUser(id)
        res.status(200).json(deletedUser)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})



module.exports = usersRouter