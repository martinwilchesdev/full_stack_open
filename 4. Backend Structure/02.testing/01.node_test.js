/**
 * Node dispone de una libreria de pruebas integrada `node:test`
 * Se definir el script en el package.json que permitira la ejecucion de los tests
 * {
        "scripts": {
            "test": "node --test"
        }
    }
 * */

// tests/reverse.test.js // La libreria node:test espera por defecto que los nombres de los archivos de prueba contengan .test.

const { test } = require('node:test')
const assert = require('node:assert')

// La funcion a ser probada se asigna a la variable reverse
const reverse = require('../utils/for_testing').reverse

/**
 * La prueba define la palabra clave test y la libreria assert, la cual se utiliza para verificar los resultados de las funciones bajo prueba
 * El primer argumento de la funcion test es la descripcion de la prueba como una cadena de texto. El segndo argumento es una funcion que define la funcionalidad de la prueba.
*/
test('reverse of martin', () => {
    const result = reverse('martin')

    // Mediante la libreria assert se verifica el resultado de la prueba
    assert.strictEqual(result, 'nitram')
})