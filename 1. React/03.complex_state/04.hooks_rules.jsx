const App = () => {
    /**
     * Los hooks (useState, useEffect) solo se pueden llamar desde el interior de un cuerpo de la funcion que define un componente de React.
     * Los hooks nunca deben ser llamados desde dentro de estructuras condicionales o estructuras iterativas.
    */
    return(
        <div>
            <p>Hello World!</p>
        </div>
    )
}