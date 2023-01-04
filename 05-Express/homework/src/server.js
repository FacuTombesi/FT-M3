// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json()); // Middleware NECESARIO

let index = 0

/* --------------------------- Controllers / Handlers --------------------------- */
const createPost = (author, title, contents) => { // Handler o controller encargado de crear el nuevo post
    if (!author || !title || !contents) throw Error("No se recibieron los parámetros necesarios para crear el Post") // Creo un condicional que de un error si falta alguno de los campos

    const newPost = { // Nuevo post con los campos requeridos + un id
        id: index++,
        author,
        title,
        contents
    }

    posts.push(newPost) // Pushea el nuevo post
    return newPost
}

const getPosts = (term) => {
    if (term) { // Si tengo term...
        return posts.filter((post) => post.title.includes(term) || post.contents.includes(term)) // Si term está en title o en contents, lo retorno
    }   else {
        return posts // De lo contratio retorno posts como está
    }
}

const getAuthorPosts = (author) => {
    const results = posts.filter((post) => post.author === author)

    if (results.length) { // Si tengo resultados, retorno los resultados
        return results
    }   else { // Si no, arrojo un error
        throw Error("No existe ningun post del autor indicado")
    }
}

const getAuthorPostsTitle = (author, title) => {
    const results = posts.filter((post) => post.title === title && post.author === author) // Hago un filtro por el el author y el title del post

    if (results.length) {
        return results 
    }   else {
        throw Error("No existe ningun post con dicho titulo y autor indicado")
    }
}

const updatePost = (id, title, contents) => {
    if (!id || !title || !contents) throw Error("No se recibieron los parámetros necesarios para modificar el Post")

    const postToUpdate = posts.find((post) => post.id == id) // Busco si hay un post con el id recibido

    if (!postToUpdate) throw Error("Un mensaje adecuado")

    // Guardo el nuevo title y el nuevo content en el post a actualizar y lo retorno
    postToUpdate.title = title
    postToUpdate.contents = contents
    return postToUpdate
}

const deletePost = (id) => {
    if (!id) throw Error("No tengo ID")
    
    const postToDelete = posts.find((post) => post.id == id)

    if (!postToDelete) throw Error("El post no existe")

    posts = posts.filter((post) => post.id != id) // Filtro los post para que solo pasen los posts que NO deben ser borrados
}

const deleteAuthor = (author) => {
    if (!author) throw Error("No tengo autor")

    const authorPosts = posts.filter((post) => post.author == author) // Filtro todos los posts del author recibido

    if (!authorPosts.length) throw Error("No existe el autor indicado")

    posts = posts.filter((post) => post.author != author)
    return authorPosts
}

/* ----------------------------------- Routes ----------------------------------- */
server.post("/posts", (req, res) => {
    const { author, title, contents } = req.body // Creo un body con los campos requeridos

    try {
        const newPost = createPost(author, title, contents) // Llamo a createPost (línea 17)
        res.status(200).json(newPost) // Da una respuesta 200 ("OK") y el nuevo post
    }   catch (error) { // Pero si falta alguno de los campos, respondo con el mensaje de error definido en el controlador
        res.status(STATUS_USER_ERROR).json({ error: error.message })
    }
})

server.post("/posts/author/:author", (req, res) => {
    const { title, contents } = req.body
    const { author } = req.params

    try {
        const newPost = createPost(author, title, contents) 
        res.status(200).json(newPost) 
    }   catch (error) { 
        res.status(STATUS_USER_ERROR).json({ error: error.message })
    }
})

server.get("/posts", (req, res) => {
    const { term } = req.query
    const results = getPosts(term) // Línea 31
    res.status(200).json(results)
})

server.get("/posts/:author", (req, res) => {
    const { author } = req.params

    try {
        const results = getAuthorPosts(author) // Línea 39
        res.status(200).json(results)
    }   catch (error) {
        res.status(STATUS_USER_ERROR).json({ error: error.message })
    }
})

server.get("/posts/:author/:title", (req, res) => {
    const { author, title } = req.params

    try {
        const results = getAuthorPostsTitle(author, title) // Línea 49
        res.status(200).json(results)
    }   catch (error) {
        res.status(STATUS_USER_ERROR).json({ error: error.message })
    }
})

server.put("/posts", (req, res) => {
    const { id, title, contents } = req.body

    try {
        const updatedPost = updatePost(id, title, contents) // Línea 59
        res.status(200).json(updatedPost)
    }   catch (error) {
        res.status(STATUS_USER_ERROR).json({ error: error.message })
    }
})

server.delete("/posts", (req, res) => {
    const { id } = req.body

    try {
        deletePost(id) // Línea 72
        res.status(200).json({ success: true })
    }   catch (error) {
        res.status(STATUS_USER_ERROR).json({ error: error.message })
    }
})

server.delete("/author", (req, res) => {
    const { author } = req.body

    try {
        const deletedPosts = deleteAuthor(author) // Línea 82
        res.status(200).json(deletedPosts)
    }   catch (error) {
        res.status(STATUS_USER_ERROR).json({ error: error.message })
    }
})

// TODO: your code to handle requests


module.exports = { posts, server };
