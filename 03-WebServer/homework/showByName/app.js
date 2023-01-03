var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http
    .createServer((req, res) => { // Crea un servidor con un requirement y una response
        const { url } = req

        /* Método con switch (sirve para pocos casos) */
        /* switch (url) {
            case "/arcoiris":
                const img = fs.readFileSync(__dirname + "/images/arcoiris_doge.jpg")
                res.writeHead(200, { "Content-Type": "image/jpeg" })
                res.end(img)
                break;
            // ... más casos
            default:
                break;
        } */

        /* Método con try */
        const name = url.slice(1) // Agarra el /name sin el "/"

        try {
            const img = fs.readFileSync(__dirname + `/images/${name}_doge.jpg`) // Guarda en una variable lo que haya en la dirección con el nombre pedido
            res.writeHead(200, { "Content-Type": "image/jpeg" }) // La respuesta recibe el tipo de contenido que hay en la dirección
            res.end(img) // Devuelve la imagen
        }   catch (error) {
            res.writeHead(404, { "Content-Type": "text/plain" }) // En caso que no exista, devuelve un texto
            res.end(`No existe el doge ${name}`)
        }
    })
    .listen(3001, "127.0.0.1") // Defino el puerto donde se va a montar