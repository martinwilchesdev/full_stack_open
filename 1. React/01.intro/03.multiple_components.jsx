/**
 * Los componentes de React pueden ser utilizados multiples veces
 * Una filosofia central de React es componer aplicaciones a partir de multiples componentes reutilzables
 * */
const App = () => {
    return (
        <div>
            <Greeting />
            <Greeting />
        </div>
    )
}

const Greeting = () => {
    <div>
        <p>Hello World</p>
    </div>
}