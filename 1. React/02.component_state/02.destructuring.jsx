const App = () => {
    const name = 'Arto Hellas'
    const age = 30

    return (
        <Greeting
            name={name}
            age={age}
        />
    )
}

// La desestructuracion permite asignar los valores de objetos y arreglos en variables individuales
const Greeting = (props) => {
    const {name, age} = props

    return (
        <div>
            <p>Hello my name is {name}, and I'm {age} years old</p>
        </div>
    )
}