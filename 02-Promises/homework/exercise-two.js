'use strict';

var Promise = require('bluebird'),
    async = require('async'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loggea el poema dos stanza uno y stanza dos en cualquier orden
   *    pero loggea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   *
   */

  // callback version
  // async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- A. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- A. callback version done --');
  //   }
  // );

  // promise version
  // ???

  Promise.all([ // Promise.all() recibe varias promesas por array y ejecuta un success handler cuando todas hayan terminado y un error handler con una de ellas haya sido rechazada
    promisifiedReadFile("poem-two/stanza-01.txt"), 
    promisifiedReadFile("poem-two/stanza-02.txt")
  ])
  .then((stanzas) /* stanzas devuelve un array ya que .all recibe un array de promesas */ => {
    // Esta solución sólo es eficiente con pocas promesas
    blue(stanzas[0])
    blue(stanzas[1])
    console.log("done")
  })
}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea todas las stanzas en poema dos, en cualquier orden y loggea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // callback version
  // async.each(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- B. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- B. callback version done --');
  //   }
  // );

  // promise version
  // ???

  const promises = filenames.map(file => promisifiedReadFile(file)) // Hago un array de todos los archivos y los guardo a cada uno en una promesa

  Promise.all(promises /* le paso el array que cree con las promesas */)
  .then((stanzas) => {
    // Para varias promesas de usa el forEach() para pasarle todos los handlers
    stanzas.forEach((stanza) => blue(stanza))
    console.log("done")
  })
}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Lee y loggea todas las stanzas en el poema dos, *en orden* y
   *    loggea 'done cuando hayan terminado todas
   *    (ignorá errores)
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- C. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- C. callback version done --');
  //   }
  // );

  // promise version
  // ???

  // const promises = filenames.map(file => promisifiedReadFile(file))

  for(let i = 1, promesa = promisifiedReadFile(filenames[0]); i <= filenames.length; i++) {
    promesa = promesa.then(stanza => { // promesa pasa a ser el resultado de promesa.then, lo cual es una nueva promesa
      blue(stanza)
      if(i === filenames.length) { // El if() impide que el for siga luego de realizar todas las promesas
        console.log("done")
      }
      else {
        return promisifiedReadFile(filenames[i])
      }
    })
  }
}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea todas las stanzas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  var randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';

  // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- D. callback version --');
  //       if (err) return eachDone(err);
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     if (err) magenta(new Error(err));
  //     console.log('-- D. callback version done --');
  //   }
  // );

  // promise version
  // ???

  // for(let i = 1, promesa = promisifiedReadFile(filenames[0]); i <= filenames.length; i++) {
  //   promesa = promesa.then(stanza => { 
  //     blue(stanza)
  //     if(i !== filenames.length) { 
  //       return promisifiedReadFile(filenames[i])
  //     }
  //   })
  //   .catch((error) => {
  //     magenta(new Error(error))
  //   })
  // }
  // console.log("done")

  for(let i = 1, promesa = promisifiedReadFile(filenames[0]); i <= filenames.length; i++) {
    promesa = promesa.then((stanza) => { // SUCCESS HANDLER
      blue(stanza)
      if(i === filenames.length) {
        console.log("done")
      }
      else {
        return promisifiedReadFile(filenames[i])
      }
    })
    if(i === filenames.length) {
      promesa.catch((error) => { // ERROR HANDLER
        magenta(new Error(error))
        console.log("done")
      })
    }
  }
}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Haz una versión promisificada de fs.writeFile
   *
   */

  var fs = require('fs');
  function promisifiedWriteFile (filename, str) {
    // tu código aquí
  }
}
