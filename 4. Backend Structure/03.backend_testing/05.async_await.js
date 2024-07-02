const Note = require('../models/Note')
// La sintaxis async/await hace posible el uso de funciones asincronas que devuelven una promesa de una forma que hace parecer al codigo sincrono.

Note.find({})
    .then(notes => {
        console.log('operation returned the following notes', notes)
    })

/**
 * El metodo find() retorna una promesa, pudiendo acceder al resultado de esta registrando una funcion callback con el metodo then.
 * Todo el codigo que se quiere ejecutar una vez finalice la operacion asincrona esta escrito dentro de la funcion callback.
 * Si se quisieran realizar varias llamadas a funciones asincronas en secuencia, estas deberian realizarse en el callback, dando como resultado un infierno de callbacks.
 * El encadenamiento de promesas podria ayudar a evitar el infierno de callbacks mediante llamadas a metodos then().
*/
Note.find({})
    .then(notes => notes[0].remove())
    .then(response => {
        console.log('the first note is removed')
    })

/**
 * La ejecucion del codigo se detiene gracias a la palabra clave await y se espera a que se cumpla la promesa para continuar con la ejecucion del codigo.
 * El resultado de la operacion que devolvio la promesa se asigna a la variable notes.
*/
const main = async() => {
    // La palabra clave await no se puede ejecutar en cualquier parte del codigo JavaScript, ya que solo es posible su uso dentro de una funcion async
    const notes = await Note.find({})
    console.log('operation returned the following notes', notes)    
}