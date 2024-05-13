import { useState } from 'react'

const App = () => {
    // En lugar de definir 2 estados por separado, se utiliza un objeto objeto para encapsularlos en un unico estado `clicks`.
    const [clicks, setClicks] = useState({
        left: 0,
        right: 0
    })
    const [allClicks, setAllClicks] = useState([])
    const [total, setTotal] = useState(0)

    const handleRight = () => {
        setAllClicks(allClicks.concat('R'))
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
        </div>
    )
}