let { posts, users } = require("../data")

let id = 3

const getPosts = () => {
    if (!posts.length) throw Error("There are no posts yet")
    return posts
}

const getPostById = (id) => {
    const post = posts.find((post) => post.id == id)
    if (!post) throw Error(`Post ${id} does not exist`)
    return post
}

const deletePost = (id) => {
    const post = posts.find((post) => post.id == id) 
    if (!post) throw Error(`Post ${id} does not exist`)
    posts = posts.filter((post) => post.id != id) 
    return post
}



module.exports = {
    getPosts,
    getPostById,
    deletePost
}