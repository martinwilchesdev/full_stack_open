import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
    /**
     * La aplicacion deberia ser capaz de manejar las situaciones que provoquen algun tipo de error.
     * Una promesa puede estar en 3 estados distintos, cuando falla una solicitud HTTP la promesa es rechazada.
     * El rechazo de una promesa se maneja proporcionando un segundo callback que se invoca cuando la promesa se rechaza.
     * La forma mas comun de agregar un controlador para las promesas rechazadas es usando el metodo catch().
    */
    useEffect(() => {
        axios
            .get('http://localhost:3001/notes')
            .then(response => {
                console.log(response.data)
            })
            .catch(error => {
                /**
                 * El metodo catch se utiliza a menudo conlocandolo mas profundamente en la cadena de promesas.
                 * El metodo catch se invoca cuando cualquier promesa de la cadena de promesas arroja un error y la promesa es rechazada.
                */
                console.log('fail: ', error)
            })
    }, [])
}

export default App