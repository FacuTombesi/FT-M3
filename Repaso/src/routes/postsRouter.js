const { Router } = require("express")
const { getPosts, getPostById, deletePost } = require("../controllers/postsControllers")

const postsRouter = Router()

// POSTS
// GET /posts => trae todos los posts
// GET /posts/:id => trae un posts con un ID determinado
// POST /posts => crea un post nuevo que recibe title, contents y userId, y solo lo crea si el useId existe
// PUT /posts => modifica un post
// DELETE /posts/:id/delete => elimina un post por ID del post

postsRouter.get("/", (req, res) => {
    try {
        let posts = getPosts()
        res.status(200).json(posts)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})

postsRouter.get("/:id", (req, res) => {
    const { id } = req.params
    try {
        const post = getPostById(id)
        res.status(200).json(post)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})

postsRouter.post("/", (req, res) => {
    res.status(200).json({ message: "post" })
})

postsRouter.put("/", (req, res) => {
    res.status(200).json({ message: "put" })
})

postsRouter.delete("/:id/delete", (req, res) => {
    const { id } = req.params
    try {
        const deletedPost = deletePost(id)
        res.status(200).json(deletedPost)
    }   catch (error) {
        res.status(400).json({ error: error.message })
    }
})



module.exports = postsRouter