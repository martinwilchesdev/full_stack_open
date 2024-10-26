/**
 * Node dispone de una libreria de pruebas integrada llamada `node:test`.
 * Se define el script en el package.json que permitira la ejecucion de los tests.
 * {
        "scripts": {
            "test": "node --test"
        }
    }
 * */

/**
 * La ejecucion de las pruebas se realiza mediante el comando `npm test`.
 * La libreria node:test espera que los archivos ubicados en el directorio /test contenga la palabra test en el nombre del mismo, por ejemplo `api.test.js`.
*/
const { test } = require('node:test') // Importacion de la libreria node:test
const assert = require('node:assert') // Importacion de la libreria node:assert

// La funcion a ser probada se asigna a la variable reverse
const reverse = require('../utils/for_testing').reverse

/**
 * La prueba se define con la palabra clave test, la libreria assert se utiliza para verificar los resultados de las funciones bajo prueba, en este caso `revert`.
 * El primer argumento de la funcion test es la descripcion de la prueba como una cadena de texto, la cual se mostrara por consola cuando la prueba sea ejecutada. El segundo argumento es una funcion que define la funcionalidad de la prueba a realizar.
*/
test('reverse of martin', () => {
    const result = reverse('martin') // La funcion reverse() retorna el string pasado como parametro con sus caracteres invertidos de izquierda a derecha

    /**
     * Mediante la libreria assert se verifica el resultado de la prueba.
     * El metodo strictEqual valida que el resultado obtenido sea exactamente igual al resultado esperado.
    */
    assert.strictEqual(result, 'nitram')
})