// const { sumar, imprimirNombre } = require("./funciones");
const axios = require("axios");

// imprimirNombre("Jorge");
// imprimirNombre("Joaquín");
// imprimirNombre("Cris");

const fs = require("fs");

const texto = fs.readFileSync("./texto.txt", "utf8"); // detiene
console.log(texto);

console.log("Esto es un proceso importante para mi aplicación");

//***************************************** */

fs.readFile("./texto.txt", "utf-8", (err, data) => {
  console.log(data);
  console.log("leyendo el archivo");
});
// continúa

console.log("Esto es un proceso importante para mi aplicación");
