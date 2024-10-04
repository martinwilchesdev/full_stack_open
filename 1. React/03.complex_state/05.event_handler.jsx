import { useState } from 'react'

const App = () => {
    const [value, setValue] = useState(10)

    // Los controladores de eventos deben ser una funcion o una referencia a una funcion
    const handleReset = () => {
        setValue(0)
    }

    /**
     * La ejecucion de una llamada de funcion en particular cuando se hace clic en el boton se puede lograr con la siguiente sintaxis
     *      <button onclick={() => setValue(0)}></button>
     * De esta forma el controlador de eventos es una funcion definida con la sintaxis de funcion de flecha como valor de la propiedad onClick.
     * De esta forma el llamado de la funcion solo ocurre cuando se da clic en el boton y no cuando se renderiza la aplicacion.
    */

    return(
        <div>
            {value}
            <button onClick={handleReset}>reset to zero</button>
        </div>
    )
}