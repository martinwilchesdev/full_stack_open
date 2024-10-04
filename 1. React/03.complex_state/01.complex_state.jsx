import { useState } from 'react'

const App = () => {
    // En lugar de definir 2 estados por separado, un objeto puede encapsular multiples variables con estado en un unico estado. eg, `clicks`.
    const [clicks, setClicks] = useState({
        left: 0,
        right: 0
    })
    const [allClicks, setAllClicks] = useState([])
    const [total, setTotal] = useState(0)

    const handleRight = () => {
        // Se concatenan en el array `allClicks` el correspondiente evento de click ejecutado (Right)
        setAllClicks(allClicks.concat('R'))

        // Se modifica el valor de la propiedad right de la variable con estado clicks. El valor inicial de la propiedad left se mantiene intacto.
        setClicks({
            ...clicks,
            right: clicks.right++
        })
        handleTotal()
    }

    const handleLeft = () => {
        setAllClicks(allClicks.concat('L'))
        setClicks({
            ...clicks,
            left: clicks.left++
        })
        handleTotal()
    }

    const handleTotal = () => {
        // La funcion `setTotal` le asigna a la variable con estado total la suma del total de eventos click realizados
        setTotal(clicks.left + clicks.right)
    }

    return(
        <div>
            <div>
                <p>Increase Right {clicks.right}</p>
                <button onClick={handleRight}></button>
            </div>
            <div>
                <p>Increase Left {clicks.left}</p>
                <button onClick={handleLeft}></button>
            </div>
            <div>
                Total: {total}
            </div>
        </div>
    )
}