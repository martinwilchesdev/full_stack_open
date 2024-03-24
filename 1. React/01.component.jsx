// El contenido que necesita ser renderizado es generalmente definido como componentes de React
const App = () => {
    <div>
        <p>Hello World</p>
    </div>
}

/**
 * El componente anterior se renderiza como una etiqueta div que envuelve una etiqueta p que contiene el texto Hello World
 * Como la funcion consta de una sola expresion se ha abreviado omitiendo el uso de la palabra clave return
 * La funcion que define el componente puede contener cualquier tipo de codigo JavaScript
 * El contenido dinamico que se renderiza en un componente de React es definido entre {}
*/
const Greeting = () => {
    const name = 'Martin'
    return (
        <div>
            <p>Hello, my name is {name}</p>
        </div>
    )
}

// Exportar el componente para que pueda ser accedido desde otras ubicaciones del proyecto
export default App