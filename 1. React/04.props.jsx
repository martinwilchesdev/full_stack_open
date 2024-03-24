// Mediante props es posible pasar datos entre componentes
const App = () => {
    const name = 'Martin'

    return (
        <div>
            <Greeting name={name} />
        </div>
    )
}

/**
 * El parametro props es un objeto que tiene campos correspondientes a todos los props que el usuario del componente define
 * Los valores de las props pueden ser strings incrustados en el codigo o resultados de expresiones JavaScript, en este ultimo caso estos deben ser envueltos entre {}
*/
const Greeting = (props) => {
    <p>{props.name}</p>
}