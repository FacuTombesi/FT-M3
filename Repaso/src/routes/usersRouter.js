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
usersRouter.get("/", async (req, res) => { // Al estar trabajando directamente en users, no es necesario aclarar "/users"
    // Si tengo query name, quiero buscar, si no, mando todo
    const { name } = req.query // Tomo lo que necesito
    let users // Lo declaro vacío primero para que luego tome un valor u otro
    try {
        if (name) /* Busco user */ users = await findUsers(name)
        else /* Mando todo */ users = await getUsers()
        res.status(200).json(users)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// GET /users/:id
usersRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const user = await getUserById(id)
        res.status(200).json(user)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// POST /users
usersRouter.post("/", async (req, res) => {
    try {
        const { name, email, phone, gender } = req.body
        const newUser = await createUser(name, email, phone, gender)
        res.status(200).json(newUser)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// PUT /users
usersRouter.put("/", async (req, res) => {
    const { id, name, email, phone, gender } = req.body
    try {
        const updatedUser = await updateUser(id, name, email, phone, gender)
        res.status(200).json(updatedUser)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// DELETE /users/:id/delete
usersRouter.delete("/:id/delete", async (req, res) => {
    const { id } = req.params
    try {
        const deletedUser = await deleteUser(id)
        res.status(200).json(deletedUser)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})



module.exports = usersRouter