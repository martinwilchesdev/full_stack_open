# Obteniendo datos del servidor

## Axios y promesas

Una promesa es un objeto que representa la eventual resolucion de una operacion asincrona.

Una promesa puede tener 3 estados distintos:
- pending
- fulfilled
- rejected

Para acceder al resultado de la operacion representada por una promesa, se debe registrar un controlador de eventos en la promesa, convencionalmente con los metodos `then/catch`.
- El metodo `then()` permite manejar el resultado exitoso de la promesa.
- El metodo `catch()` permite manejar el resultado fallido de la promesa.

```javascript
// La libreria axios se utiliza para la realizacion de peticiones HTTP
import axios from 'axios'

const App = () => {
    axios
        .get('http://localhost:3001/notes')
        .then(response => {
            // El objeto response contiene todos los datos esenciales relacionados con la respuesta de la solicitud HTTP (datos devueltos, codigo de estado, encabezados, etc).
            const notes = response.data
        })
        .catch(error => {
            console.log(error)
        })

    return (
        <div>
            {/* TODO */}
        </div>
    )
}
```

## useEffect()

El hook `useEffect` permite que un componente se conecte y se sincronice con sistemas externos.

`useEffect` es la herramienta adecuada para usar cuando se desean obtener datos de un servidor o de una API.

1. Primero se ejecuta el cuerpo de la funcion que define el componente y asi el componente se renderiza por primera vez.
2. En este punto los datos no se han obtenido del servidor.
3. La funcion `useEffect` se ejecuta inmediatamente despues de la renderizacion del componente.

De forma predeterminada `useEffect` se ejecuta despues de cada renderizado completo del componente, pero se puede elegir solo ejecutar cuando ciertos valores han cambiado.

La funcion `useEffect` recibe 2 parametros:
- Una funcion que se ejecuta despues de cada renderizado.
- El segundo parametro se usa para especificar la frecuencia con la que se ejecuta el efecto.

> Si el segundo parametro parametro es un arreglo vacio `[]`, el efecto solo se ejecuta justo despues de la primera renderizacion del componente.

```javascript
import axios from  'axios'
import { useState, useEffect } from 'react'

const App = () => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                const data = response.data
                setNotes(notes.concat(data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return(
        <div>
            {/* TODO */}
        </div>
    )
}
```

## error

Una aplicacion deberia ser capaz de manejar las situaciones que provoquen algun tipo de error.

Una promesa puede estar en 3 estados distintos, uno de ellos es cuando falla una solicitud HTTP, lo cual hace que el estao de la promesa sea rechazada.

El rechazo de una promesa se maneja proporcionando un segundo callback que se invoca cuando la promesa se rechaza, agregando comunmente un controlador para la promesa utilizando el metodo `catch()`.

```javascript
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
    useEffect(() => {
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log(response.data)
            })
            .catch(error => { // El metodo catch se utiliza a menudo conlocandolo mas profundamente en la cadena de promesas
                // El metodo catch se invoca cuando cualquier promesa de la cadena de promesas arroja un error y la promesa es rechazada
                console.log('fail: ', error)
            })
    }, [])
}
```

# Alterando datos en el servidor

## REST

En terminologia, `REST` hace referencia a objetos individuales.

    {
        "notes": [
            {
                "id": 1,
                ...
            },
            {
                "id": 2,
                ...
            }
        ]
    }

En el JSON anterior cada objeto se identifica como un **recurso**. Cada recurso tiene una direccion unica asociada a su URL.

```sh
http://localhost:3001/notes/187
```

La URL anterior permite acceder al recurso identificado con el id 187, el cual es encuentra en la ruta `http://localhost:3001/notes/`.

La creacion de un nuevo recurso para almacenar una nota en el servidor se realiza mediante una solicitud `HTTP POST` a la URL *notes* de acuerdo con la convencion REST.

### PUT y PATCH

El verbo PUT se utiliza para modificar un recurso completo en el servidor mientras que el metodo PATCH se utiliza para modificar solo algunas propiedades de un recurso.