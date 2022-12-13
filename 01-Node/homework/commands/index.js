const fs = require("fs")
const request = require("request")
const write = (value) => { // Creo una función que reemplaza a process.stout.write()
    process.stdout.write(value + "\n")
    process.stdout.write("prompt > ")
}

module.exports = {
    pwd: () => {
        const dirname = process.cwd().split("\\").at(-1) // Guarda el resultado de process.pwd(), divite el directorio en un array y at(-1) me devuelve el nombre de la última carpeta del directorio
        write(dirname)
        // write(process.cwd().split("\\").at(-1)) // Otra alternativa en una línea
    },

    date: () => {
        write(Date()) // Devuelve la fecha actual
    },

    ls: () => {
        fs.readdir(".", (err, files) => { // err = errores y files = array de nombres de archivo
            if(err) throw err
            const text = files.join("\n") // Convierte el array de files en string en nuevas líneas
            write(text + "\n")
        })
    },

    echo: (text) => { // Devuelve texto
        write(text)
    },

    cat: (filename) => { // Devuelve todas las líneas del archivo
        fs.readFile("./" + filename, "utf-8" /* para que no muestre el buffer */, (err, file) => {
            write(file)
        })
    },

    head: (filename) => { // Devuelve las primeras líneas del archivo
        fs.readFile("./" + filename, "utf-8", (err, file) => {
            write(file.split("\n").slice(0, 5)/* slice arranca desde el principio hasta la 4° línea (5 - 1) */.join("\n"))
        })
    },

    tail: (filename) => { // Devuelve las últimas líneas del archivo
        fs.readFile("./" + filename, "utf-8", (err, file) => {
            write(file.split("\n").slice(-5).join("\n"))
        })
    },

    curl: (url) => { // Devuelve el código de la url pasada por argumento
        request(url, (err, res, body) => {
            write(body)
        })
    }
}