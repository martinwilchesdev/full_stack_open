import { useState } from 'react'

const App = () => {
    const [clicks, setClicks] = useState({
        left: 0,
        right: 0
    })
    const [total, setTotal] = useState(0)

    const handleLeft = () => {
        setClicks({
            ...clicks,
            left: clicks.left + 1
        })
        /**
         * La actualizacion del estado en React ocurre de manera asincrona, es decir no inmediatamente sino en algun momento antes que el componente se renderice nuevamente.
         * Una forma de acceder al estado actualizado es asignandolo a una nueva variable que podra ser reutilizada nuevamente.
        */
        const updatedLeft = clicks.left + 1
        setTotal(clicks.right + updatedLeft)
    }

    return(
        <div>
            <button onClick={handleLeft}>Increase Left</button>
            <p>Total clicks: {total}</p>
        </div>
    )
}