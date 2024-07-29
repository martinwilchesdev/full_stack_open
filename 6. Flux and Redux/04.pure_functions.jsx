// Las funciones puras son aquellas que no causan ningun efecto secundario y siempre deben devolver la misma respuesta cuando se llaman con los mismos parametros
const noteReducer = (state = [], action) => {
    if (action.type === 'NEW_NOTE') {
        /**
         * El metodo concat crea un nuevo array que contiene todos los elementos del array anterior y el nuevo elemento.
         * Si hay un cambio en el estado el objeto antiguono se cambia sino que se reemplaza por un objeto nuevo modificado.
        */
        state.concat(action.payload)
        return state
    }

    return state
}

const App = () => {}

export default App