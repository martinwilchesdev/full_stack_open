// NodeJs es un entorno de ejecucion basado en JavaScript y en el motor V8 de Chrome
console.log('Hello World')

/**
 * El codigo de un archivo .js puede ser ejecutado en una linea de comandos utilizando el siguiente comando
 *      $ node <file_name>
 *
 * Un nuevo proyecto de NodeJs puede ser inicializado mediante el comando `$npm init`.
 * Este comando crea un archivo `package.json` en la raiz del proyecto con informacion relevante del mismo.
 *      "express": "^4.18.2"
 *
 * El modelo de control de versiones utilizado en npm se denomina control de versiones semantico.
 * - El signo ^ al frente de ^4.18.2 indica que cuando se actualizan las dependencias de un proyecto, la version de Express que se instalara sera al menos 4.18.2.
 * Sin embargo la version instalada de Express tambien puede ser una que tenga un numero de PATCH mas grande (el ultimo numero) o un numero MINOR (el numero del medio) mas grande.
 * La version principal de la libreria indicada por el primer numero MAJOR debe ser la misma.
 *
 * Las dependencias de un proyecto pueden ser actualizadas con el comando `$ npm update`.
 * Al iniciar a trabajar con un pryecto desde otro equipo, se pueden instalar todas las dependencias actualizadas definidas en el package.json con el comando `$ npm install`.
 *
 * Si la version del numero MAJOR las versiones nuevas deberian ser compatibles con versiones anteriores.
*/