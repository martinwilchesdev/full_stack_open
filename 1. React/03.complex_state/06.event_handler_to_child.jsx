import { useState } from 'react'
import Button from './components/Button'

const App = () => {
    const [value, setValue] = useState(10)

    // Los componentes pueden obtener la funcion del controlador de eventos a traves de una prop
    return(
        <>
            {value}
            <Button  handleClick={() => setValue(1000)} text="thousand" />
            <Button  handleClick={() => setValue(0)} text="reset" />
            <Button  handleClick={() => setValue(value + 1)} text="increment" />
        </>
    )
}

const Button = (props) => {
    return(
        // El evento ejecutado desde el componente hijo actualiza el estado de la aplicacion en el componente padre
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}