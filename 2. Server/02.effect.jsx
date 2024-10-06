import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
    const [notes, setNotes] = useState([])
    /**
     * El hook `useEffect` permite que un componente se conecte y se sincronice con sistemas externos.
     * `useEffect` es la herramienta adecuada para usar cuando se obtienen datos de un servidor o de una API.
     *
     * 1. Primero se ejecuta el cuerpo de la funcion que define el componente y asi el componente se renderiza por primera vez.
     * 2. En este punto los datos no se han obtenido del servidor.
     * 3. La funcion useEffect se ejecuta inmediatamente despues de la renderizacion del componente.
     *
     * De forma predeterminada `useEffect` se ejecuta despues de cada renderizado completo, pero se puede elegir solo ejecutar cuando ciertos valores han cambiado.
     * */
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

    /**
     * La funcion useEffect recibe 2 parametros:
     * - una funcion que se ejecuta despues de cada renderizado.
     * - El segundo parametro se usa para especificar la frecuencia con la que se ejecuta el efecto.
     * ** Si este parametro es un arreglo vacio [], el efecto solo se ejecuta justo despues de la renderizacion del componente.
    */

    return(
        <div>
            {/* TODO */}
        </div>
    )
}

export default App