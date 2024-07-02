/**
 * Node dispone de una libreria de pruebas integrada `node:test`
 * Se definir el script en el package.json que permitira la ejecucion de los tests
 * {
        "scripts": {
            "test": "node --test"
        }
    }
 * */

/**
 * La ejecucion de las pruebas se realiza mediante el comando `npm test`.
 * La libreria node:test espera que los archivos ubicados en el directorio /test contenga la palabra test en el nombre del mismo api.test.js.
*/
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