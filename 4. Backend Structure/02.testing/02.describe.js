const { test, describe } = require('node:test')
const assert = require('node:assert')

const average = require('../utils/for_testing').average

/**
 * Se pueden usar bloques de descripcion para agrupar pruebas en colecciones logicas.
 * La salida de la prueba tambien usa el nombre del bloque describe.
*/
describe('average', () => {
    test('of one value is the value itself', () => {
        assert.strictEqual(average([1]), 1)
    })

    test('of many is calculated right', () => {
        assert.strictEqual(average([1,2,3,4,5,6]), 3.5)
    })

    test('of empty array is zero', () => {
        assert.strictEqual(average([]), 0)
    })
})