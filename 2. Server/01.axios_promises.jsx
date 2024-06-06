import axios from 'axios'

const App = () => {
    /**
     * axios.get retorna una promesa.
     * Una promesa es un objeto que representa la eventual resolucion de una operacion asincrona.
     * Una promesa puede tener 3 estados distintos:
     * - pending
     * - fulfilled
     * - rejected
     * 
     * Para acceder al resultado de la operacion representada por una promesa, se debe registrar un controlador de eventos en la promesa.
     * El metodo then() permite manejar el resultado exitoso de la promesa.
     * El metodo catch() permite manejar el resultado fallido de la promesa.
     * El objeto response contiene todos los datos esenciales relacionados con la respuesta de la solicitud HTTP (datos devueltos, codigo de estado, encabezados).
     */
    axios
        .get('http://localhost:3001/notes')
        .then(response => {
            const notes = response.data
            console.log(notes)
        })
        .catch(error => {
            console.log(error)
        })

    return (
        <div></div>
    )
}

export default App