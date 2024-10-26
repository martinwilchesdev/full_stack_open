const { test, describe } = require('node:test')

/**
 * assert.equal(1, '1')                         // true // Valida la igualdad de 2 valores omitiendo los tipos
 * assert.strictEqual(1, '1')                   // false // Valida la igualdad de 2 valores incluido el tipo de estos
 * assert.deepEqual({a: '1'}, {a: 1})           // true // Similar a .equal. Se utiliza para validar la igualdad de objetos
 * assert.strictDepEqual({a: '1'}, {a: 1})      // false // Similar a strictEqual. Se utiliza para validar la igualdad de 2 objetos, incluyendo el tipo de sus valores
*/
describe('sum of', () => {
    test('2 plus 3', () => {
        const sum = 2 + 3

        assert.strictEqual(sum, 5)
    })
})