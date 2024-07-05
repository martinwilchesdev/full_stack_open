const Note = require('../models/notes')
const helper = require('./test_helper')

const { test } = require('node:test')

beforeEach(async() => {
    await Note.deleteMany({})

    const noteObjects = helper.initialNotes.map(note => new Note(note))
    const notesSaved = noteObjects.map(note => note.save())
    
    /**
     * Promise.all() recibe como parametro un arreglo de promesas, las cuales transforma en una unica promesa.
     * Si al menos una de las promesas del arreglo se rechaza, la unica promesa devuelta por Promise.all() sera una promesa rechazada.
    */
    await Promise.all(notesSaved)
})