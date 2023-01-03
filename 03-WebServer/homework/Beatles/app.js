var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http
  .createServer((req, res) => {
    const { url } = req
    const splited = url.split("/").slice(1) // Divide la url por las "/" y después quita la primera que está vacía

    /* Método con if */
    /* if (splited[0] === "api") { // Chequeo si tengo api
      apiController(splited[1], res) // Llamo a apiController
    } else {
      viewsController(splited[0], res) // Si no hay api, llamo a viewsController y devuelve el nombre que recibe
    } */

    /* Método con if simplificado */
    splited[0] === "api" // if
      ? /* si se cumple... */ apiController(splited[1], res) 
      : /* si no se cumple... */ viewsController(splited[0], res)
  })
  .listen(3001, "localhost")

const apiController = (name, res) => {
  if (!name) { // Si no tengo name
    // res.writeHead(200, { "Content-Type": "application/json" }) // Agarra todo el archivo
    // res.end(JSON.stringify(beatles)) // Y lo devuelve como un JSON
    sendJson(200, beatles, res)
  } else {
    const fullName = name.replace("%20", " ") // Reemplaza el "%20" que devuelve la consola para interpretar espacios
    const beatle = beatles.find((b) => b.name == fullName) // Busca el Beatle con el nombre que recibe

    /*
    beatle // Chequea el Beatle pedido
      ? res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(beatle)) // Si existe, lo devuelve
      : res.writeHead(404, { "Content-Type": "application/json" }).end(JSON.stringify({ error: "Beatle not found" })) // Si noexiste, devuelve un error
    */

    beatle
      ? sendJson(200, beatle, res)
      : sendJson(404, { error: "Beatle not found" }, res)
    
  }
}

const viewsController = (name, res) => {
  if (!name) { // Si no hay name
    const html = fs.readFileSync("./index.html") // Lee y guarda el archivo index
    return res.writeHead(200, { "Content-Type": "text/html" }).end(html) // Devuelve el html
  } else if (name !== "favicon.ico") {
    const fullName = name.replace("%20", " ")
    const beatle = beatles.find((b) => b.name == fullName)
    let html = fs.readFileSync("./beatle.html", "utf-8") // Busca y lee a cada Beatle y reemplaza la info dependiendo de quién reciba
    html = html.replaceAll("{name}", beatle.name)
    html = html.replace("{birthdate}", beatle.birthdate)
    html = html.replace("{profilePic}", beatle.profilePic)
    res.writeHead(200, { "Content-Type": "text/html" }).end(html)
  }
}

const sendJson = (status, content, res) => { // Reemplaza al res.writeHead para cada caso
  res.writeHead(status, { "Content-Type": "application/json" })
  res.end(JSON.stringify(content))
}