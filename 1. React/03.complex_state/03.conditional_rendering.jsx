import { useState } from 'react'

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [total, setTotal] = useState(0)

    const handleLeft = () => {
        setLeft(left + 1)
        const updatedLeft = left + 1
        setTotal(right + updatedLeft)
    }

    const handleRight = () => {
        setRight(right + 1)
        const updatedRight = right + 1
        setTotal(left + updatedRight)
    }

    // Mediante el renderizado condicional es posible representar distintos elementos de React segun el estado de la aplicacion.
    if (total > 10) {
        return(
            <div>
                <p>Total is greater than 10: {total}</p>
            </div>
        )
    }

    return(
        <div>
            <button onClick={handleLeft}>Left++</button>
            <button onClick={handleRight}>Right++</button>
            <p>Total is less than 10: {total}</p>
        </div>
    )
}