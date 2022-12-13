const commands = require("./commands/index.js")

process.stdout.write("prompt > ") // Inicia una línea para empezar a escribir

process.stdin.on("data", (data) => { // Recibe data + una callback que recibe data como argumento
  const input = data.toString().trim().split(" ") // Convierte lo escrito pasado por data en string y le quita espacios innecesarios
  const cmd = input.shift() // Quita la primera palabra y la pasa como comando
  const args = input.join(" ") // Devuelve el resto de input como string
  // process.stdout.write("You typed: " + cmd + "\n") // Devuelve lo que escribí
  
  // if(cmd === "pwd") commands.pwd()
  // if(cmd === "date") commands.date()

  /* Switch sirve para pocos métodos pero no es eficiente con muchos */
  // switch(cmd) { // Si cmd es pwd o data, devuelve pwd o date (importados de index.js)
  //   case "pwd":
  //     commands.pwd()
  //     break
  //   case "date":
  //     commands.date()
  //     break
  // }

  // if(commands.hasOwnProperty(cmd)) commands[cmd]() // Commands ejecuta los comandos importados de index con lo recibido por cmd
  // else process.stdout.write("El comando no existe") // Si el comando no existe, devuelve un error
 
  /* El if y el else en una línea. "?" = if, ":" = else */
  // commands.hasOwnProperty(cmd))?commands[cmd]():process.stdout.write("El comando no existe")
  /* o... */
  commands[cmd]
    ?commands[cmd](args)
    :process.stdout.write("El comando no existe")

  /* El último \nprompt ya no sirve ya que lo usa en la constante write de index */
  // process.stdout.write("\nprompt > ") // Crea una nueva línea después de escribir para volver a ingresar comandos
});
