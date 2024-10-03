/**
 * Los componentes de React pueden ser utilizados multiples veces.
 * Una filosofia central de React es componer aplicaciones a partir de multiples componentes reutilzables.
 * */
const App = () => {
    return (
        <div>
            <Greeting />
            <Greeting />
        </div>
    )
}

// El componente `Greeting` se renderizara 2 veces dentro del componente `App`
const Greeting = () => {
    <div>
        <p>Hello World</p>
    </div>
}