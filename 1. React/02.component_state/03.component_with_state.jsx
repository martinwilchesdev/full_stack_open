// React vuelve a renderizar un componente cuando su estado es alterado
import { useState } from 'react'

const App = () => {
    /**
     * counter :: Variable con estado
     * setCounter :: Funcion que modifica el valor de la variable con estado
    */
    const {counter, setCounter} = useState(0) // El valor de la variable con estado es inicializado en 0

    const handleCounter = () => {
        setCounter(counter++)
    }

    return (
        <div>
            <p>Counter: {counter}</p>
            <button onClick={handleCounter} >Increase by one</button>
        </div>
    )
}