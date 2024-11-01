// Mongoose se puede describir como un mapeador de objetos a documentos (ODM).
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

// En el siguiente ejemplo la contraseña para la conexion a la base de datos es proporcionada como tercer parametro al ejecutar el programa `$node mongo.js <password>`
const password = process.argv[2]
const databaseName = 'notesApp'

/**
 * La contraseña es añadida a la cadena de conexion `<username>:<password>`.
 * El nombre de la base de datos personalizada se añade la URI antes de la cadena `?retryWrites`.
 */
const url = `mongodb+srv://martindotdev:${password}@fullstackopencluster.asrmplj.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=FullStackOpenCluster` // URI proporcionada por MongoDB

// Esta configuracion se relaciona con la forma en que mongoose maneja las consultas que contienen campos no definidos en el esquema del modelo
mongoose.set('strictQuery', false)

// Definicion de la conexion a la base de datos proporcionaando la URI de la base de datos
mongoose.connect(url)

// Un esquema le indica a mongoose como se almacenaran los objetos en la base de datos
const noteSchema = mongoose.Schema({
    content: String,
    important: Boolean
})

/**
 * En la definicion del modelo, el primer parametro "Note" es el nombre singular del modelo.
 * Por convencion de mongoose se nombran las colecciones de forma automatica como el plural, eg (notes), cuando el esquema se refiere a ellas en singular.
 *      -| notesApp -> Base de datos
 *          -| notes -> Coleccion
 *              ...
 */
const Note = mongoose.model('Note', noteSchema)

// La idea de mongoose es que los datos almacenados en la base de datos reciban un esquema al nivel de la aplicacion que definan la forma de los documentos almacenados en una coleccion determinada.

/**
 * Los modelos son funciones contructoras que crean nuevos objetos JavaScript basados en los parametros proporcionados.
 * Dado que los objetos se crean con la funcion constructora del modelo, estos tienen acceso a todas sus propiedades, ademas de los metodos para guardar el objeto en la base de datos.
 */
const note = new Note({
    content: 'HTML is easy',
    important: true
})

/**
 * Los objetos se guardan en la base de datos a traves del metodo save().
 * Cuando el objeto se guarda en la base de datos, el controlador de eventos then() se invoca y posteriormente se cierra la conexion de la base de datos.
 */
note.save().then((result) => {
    console.log('note saved!')

    // Si la conexion con la base de datos no es cerrada el programa nunca termina su ejecucion
    mongoose.connection.close()
})

/**
 * El metodo find() permite obtener los objetos de la base de datos.
 * El parametro del metodo es un objeto que expresa condiciones de busqueda. Al ser un objeto vacio {}, se obtienen todos los objetos de la coleccion `notes`.
*/
Note.find({})
    .then(result => {
        console.log(result)
        mongoose.connection.close()
    })