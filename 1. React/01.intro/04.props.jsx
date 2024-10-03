// Mediante props es posible realizar el envio de datos de un componente a otro.
const App = () => {
    const name = 'Martin'

    return (
        <div>
            <Greeting name={name} />
        </div>
    )
}

/**
 * El parametro props recibido por el componente hijo es un objeto cuyos campos corresponden a todos los props que el usuario del componente padre define.
 * Los valores de las props pueden ser strings incrustados en el codigo o resultados de expresiones JavaScript, en este ultimo caso estos deben ser envueltos entre {}.
*/
const Greeting = (props) => {
    <p>{props.name}</p>
}