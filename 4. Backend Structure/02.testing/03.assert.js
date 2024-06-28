const { test, describe } = require('node:test')

/**
 * assert.equal(1, '1')                         // true
 * assert.strictEqual(1, '1')                   // false
 * assert.deepEqual({a: '1'}, {a: 1})           // true
 * assert.strictDepEqual({a: '1'}, {a: 1})      // false
*/
describe('sum of', () => {
    test('2 plus 3', () => {
        const sum = 2 + 3

        assert.strictEqual(sum, 5)
    })
})