// Mediante el hook useState() es posible definir variables con estado y la funcion encargada de modificar su estado
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

    // React vuelve a renderizar un componente cuando el estado de este es alterado
    return (
        <div>
            <p>Counter: {counter}</p>
            <button onClick={handleCounter} >Increase by one</button>
        </div>
    )
}