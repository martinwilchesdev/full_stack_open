// Varios componentes deben reflejar los mismos datos cambiantes, por lo cual se debe elevar el estado compartido a su ancestro mas cercano

import { useState } from 'react'

const App = () => {
    const { counter, setCounter } = useState(0)

    const handleCounter = () => {
        setCounter(counter++)
    }

    return (
        <div>
            <Display counter={counter} />
            <Button onClick={handleCounter} />
        </div>
    )
}

const Display = (props) => {
    const {counter} = props

    return (
        <div>
            <p>Counter: {counter}</p>
        </div>
    )
}

const Button = (props) => {
    <button onClick={props.onClick}>Increase by one</button>
}

// En React es convencional usar nombres onSomething para props que representan eventos y handleSomething para las definiciones de funciones que controlan los eventos