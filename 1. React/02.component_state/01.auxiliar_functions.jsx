const App = () => {
    const age = 30
    const currentYear = 2024

    // La logica para realizar una tarea especifica puede definirse en una funcion dentro del codigo del componente
    const bornYear = () => {
        return currentYear - age
    }

    return (
        <div>
            <p>Hello Arto Hellas, you are {age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}