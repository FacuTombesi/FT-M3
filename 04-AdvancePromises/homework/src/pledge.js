'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) { // Recibe por parámetro executor, que es una función, que es la que va a decir si una promesa se resuelve o se rechaza
    // constructor () {} // Se debe usar constructor si se hace con constructor de clase
    
    if(typeof executor !== "function") { // Comprueba que executor sea una función
        throw TypeError("Executor must be a function")
    }

    this._state = "pending" // Defino el estado inicial
    this._value = undefined // Defino value en undefined para que los internal puedan modificarlo como fulfilled o rejected
    this._handlerGroups = [] // Array vacío para el .then y guardar los hanblers de successCb y errorCb

/* --------------------- VERSIÓN CON THIS (dentro del constructor de clase) --------------------- */

    this._internalResolve = (data) => { // internalResolve e internalReject pueden estar adentro de la clase con this o afuera con prototype
        if(this._state === "pending") { // Si el estado es pending, cambia el estado y el valor, de lo contrario no hace nada
            this._state = "fulfilled"
            this._value = data
            this._callHandlers() // Llama y ejecuta la función callHandlers
        }
    }

    this._internalReject = (reason) => {
        if(this._state === "pending") { // Idem internalResolve
            this._state = "rejected"
            this._value = reason
            this._callHandlers() // Llama y ejecuta la función callHandlers
        }
    }

    this._callHandlers = () => { // Llama a los handlers para ejecutarlos
        while(this._handlerGroups.length) { // Mientras que haya algo en handlerGroups...
            const group = this._handlerGroups.shift() // Guardo lo que saco del array en una variable

            /* -------------------------------- PREVIO AL CH.4 -------------------------------- */
            // if(this._state === "fulfilled" && group.successCb) { // Si el estado está resuelto y el Cb no es falso, ejecuto el handler de success
            //     group.successCb(this._value) // Y recibe como valor el valor que reciben los handlers por parámetro
            // }
            /* --------------------------------- PARA EL CH.4 --------------------------------- */
            if(this._state === "fulfilled") {
                if(group.successCb) { // Si tengo success handler
                    try { // try() resuelve todo lo que tiene dentro y si encuentra un error, salta directamente al catch()
                        const result = group.successCb(this._value) // Creo una constante que guarda el resultado del handler de success: otra promesa, un valor o un error

                        if(result instanceof $Promise) { // Si el resultado de result es una instancia de la clase promesa, devuelve una promesa
                            return result.then( // El result se convierte en una nueva promesa ya que .then devuelve una promesa
                                value => group.downstreamPromise._internalResolve(value), // Con su resolve
                                reason => group.downstreamPromise._internalReject(reason) // Y su reject
                            )
                        }
                        else { // Si en result hay un valor, devuelvo el valor
                            group.downstreamPromise._internalResolve(result) // Se resuelve al valor de result
                        }
                    }
                    catch(error) { // Si el resultado de group.successCb() es un error, entra al catch
                        group.downstreamPromise._internalReject(error) // Y se devuelve un error
                    }
                }
                else { // Si no tengo success handler
                    group.downstreamPromise._internalResolve(this._value) // La promesaB se resuelve al mismo valor
                }
            /* --------------------------------- PARA EL CH.4 --------------------------------- */
            } else if(this._state === "rejected") { // Lo mismo pero por el lado del reject (errorCb)
                if(group.errorCb) {
                    try { 
                        const result = group.errorCb(this._value)

                        if(result instanceof $Promise) {
                            return result.then( 
                                value => group.downstreamPromise._internalResolve(value),
                                reason => group.downstreamPromise._internalReject(reason) 
                            )
                        }
                        else { 
                            group.downstreamPromise._internalResolve(result)
                        }
                    }
                    catch(error) { 
                        group.downstreamPromise._internalReject(error) 
                    }
                }
                else {
                    group.downstreamPromise._internalReject(this._value)
                }
            }

            /* -------------------------------- PREVIO AL CH.4 -------------------------------- */
            // if(this._state === "rejected" && group.errorCb) { // Lo mismo pero con el handler de error
            //     group.errorCb(this._value)
            // }
        }
    }

    executor(this._internalResolve, this._internalReject) // Ejecuto el executor dentro de la promesa, pasándole un resolve y un reject

    /* Si internalResolve e internalReject están afuera con .prototype, hay que usar bind() */

    // executor(this._internalResolve.bind(this), this._internalReject.bind(this))

    this.then = (successCb, errorCb) => { // Creo el método .then
        const downstreamPromise = new $Promise(() => {}) // Guardo una nueva promesa ( se llama así porque así la llama el test)

        this._handlerGroups.push({ // Le pusheo a handlerGropus los Cb (handlers) de success y error
            successCb: typeof successCb === "function" ? successCb : false, 
            // successCb: if(typeof successCb === "function") {successCb = successCb} else {successCb = false}
            errorCb: typeof errorCb === "function" ? errorCb : false,
            downstreamPromise
        })

        if(this._state !== "pending") { // Si el estado terminó y ya no es pending, empieza a ejecutar lo que se guardó en el array de handlers
            this._callHandlers(this._value) // Llama y ejecuta la función callHandlers
        }

        return downstreamPromise // Retorno la promesa (promesaB)
    }

    this.catch = (errorCb) => { // .catch sólo recibe un errorCb y devuelve lo mismo que devuelve el .then (una promesa) que recibe sólo el errorCb
        return this.then(null, errorCb)
    }
}

/* --------------------- VERSIÓN CON PROTOTYPE (fuera del constructor de clase) --------------------- */

/*
$Promise.prototype._internalResolve = function(data) { // No se puede usar arrow function cuando está afuera de la clase
    if(this._state === "pending") {
        this._state = "fulfilled"
        this._value = data
        this._callHandlers()
    }
}

$Promise.prototype._internalReject = function(reason) {
    if(this._state === "pending") {
        this._state = "rejected"
        this._value = reason
        this._callHandlers()
    }
}

$Promise.prototype._callHandlers = function() {
    while(this._handlerGroups.length) { 
        const group = this._handlerGroups.shift() 

        if(this._state === "fulfilled") {
            if(group.successCb) { 
                try { 
                    const result = group.successCb(this._value) 

                    if(result instanceof $Promise) { 
                        return result.then( 
                            value => group.downstreamPromise._internalResolve(value), 
                            reason => group.downstreamPromise._internalReject(reason) 
                        )
                    }
                    else { 
                        group.downstreamPromise._internalResolve(result) 
                    }
                }
                catch(error) { 
                    group.downstreamPromise._internalReject(error) 
                }
            }
            else { 
                group.downstreamPromise._internalResolve(this._value) 
            }
        }
        if(this._state === "rejected" && group.errorCb) { 
            group.errorCb(this._value)
        } else if(this._state === "rejected") { 
            if(group.errorCb) {
                try { 
                    const result = group.errorCb(this._value)

                    if(result instanceof $Promise) {
                        return result.then( 
                            value => group.downstreamPromise._internalResolve(value),
                            reason => group.downstreamPromise._internalReject(reason) 
                        )
                    }
                    else { 
                        group.downstreamPromise._internalResolve(result)
                    }
                }
                catch(error) { 
                    group.downstreamPromise._internalReject(error) 
                }
            }
            else {
                group.downstreamPromise._internalReject(this._value)
            }
        }
    }
}

$Promise.prototype.then = function (successCb, errorCb) {
    const downstreamPromise = new $Promise(() => {})

    this._handlerGroups.push({
        successCb: typeof successCb === "function" ? successCb : false,
        errorCb: typeof errorCb === "function" ? errorCb : false,
        downstreamPromise
    })

    if(this._state !== "pending") { 
        this._callHandlers(this._value) 
    }

    return downstreamPromise
}

$Promise.prototype.catch = function (errorCb) {
    return this.then(null, errorCb)
}
*/

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
