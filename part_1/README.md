# Introduccion a React

## Iniciar un proyecto de React

```sh
$ npm create vite@latest <project_name> -- --template react
```

## Componentes

El contenido que necesita ser renderizado es definido en componentes, los cuales se estructuran mediante funciones.

```javascript
const App = () => (
    <div>
        <p>Hello World</p>
    </div>
)
```

El componente anterior se renderiza como una elemento div que envuelve un elemento `<p>` que contiene el texto `Hello World`.

- Como la funcion consta de una sola expresion se ha abreviado omitiendo el uso de la palabra clave return de forma explicita.
- La funcion que define el componente puede contener cualquier tipo de codigo JavaScript.

El contenido dinamico que se renderiza en un componente de React es definido entre `{}`.

```javascript
const Greeting = () => {
    const name = 'Martin'
    return (
        <div>
            <p>Hello, my name is {name}</p>
        </div>
    )
}
```

## JSX

El diseño de los componentes de React se define usando la sintaxis JSX.

El JSX devuelto por los componentes de React se compila en JavaScript, mas alla de su similitud con el codigo HTML, no son el mismo lenguaje.

Todas las etiquetas JSX deben cerrarse, por ejemplo para definir un salto de linea se define un elemento `<br />` en lugar e `<br>` como se haria en HTML.

```javascript
const App = () => {
    <div>
        <p>Hello World</p>
    </div>
}
```

## Multiples componentes

Los componentes de React pueden ser utilizados multiples veces.

Una filosofia central de React es componer aplicaciones a partir de multiples componentes reutilizables.

```javascript
const App = () => {
    return (
        <div>
            <Greeting />
            <Greeting />
        </div>
    )
}
```

En el ejemplo anterior, el componente `<Greeting />` se renderizara 2 veces dentro del componente `<App />`.

## Props

Mediante props es posible realizar el envio de datos de un componente a otro.

```javascript
const App = () => {
    const name = 'Martin'

    return (
        <div>
            <Greeting name={name} />
        </div>
    )
}
```

Los valores de las props pueden ser strings incrustados en el codigo o resultados de expresiones JavaScript, en este ultimo caso estos deben ser envueltos entre `{}`.

El parametro `props` recibido por el componente hijo es un objeto cuyos campos corresponden a todos los props definidos por el componente padre.

```javascript
const Greeting = (props) => {
    <p>{props.name}</p>
}
```

## Funciones auxiliares

La logica para realizar una tarea especifica puede definirse en una funcion dentro del codigo del componente, por ejemplo en el siguiente ejemplo se define una funcion auxiliar llamada `bornYear()`.

```javascript
const App = () => {
    const age = 30
    const currentYear = 2024

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
```

## Desestructuracion

La desestructuracion permite asignar las props pasadas al componente hijo en variables individuales

```javascript
// Componente padre

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
```

```javascript
// Componente hijo

const Greeting = (props) => {
    const {name, age} = props

    return (
        <div>
            <p>Hello my name is {name}, and I'm {age} years old</p>
        </div>
    )
}
```

## Componentes con estado

Mediante el hook useState() es posible definir variables con estado y la funcion encargada de modificar dicho estado.

En el siguiente ejemplo se define una variable con estado llamada `counter` y una funcion que se encargara de modificar dicho estado, llamada `setCounter`.

```javascript
import { useState } from 'react'

const App = () => {
    // El valor de la variable con estado es inicializado en 0
    const {counter, setCounter} = useState(0)

    const handleCounter = () => {
        setCounter(counter++)
    }

    // React vuelve a renderizar un componente cuando existe una alteracion en el estado
    return (
        <div>
            <p>Counter: {counter}</p>
            <button onClick={handleCounter} >Increase by one</button>
        </div>
    )
}
```

## Pasando el estado a componentes hijos

Cuando varios componentes deben reflejar los mismos datos cambiantes, se debe elevar el estado compartido a su ancestro mas cercano.

```javascript
// Componente padre

import { useState } from 'react'

const App = () => {
    const { counter, setCounter } = useState(0)

    const handleCounter = () => {
        setCounter(counter++)
    }

    return (
        <div>
            {/* Una variable con estado puede ser pasada como prop a un componente hijo */}
            <Display counter={counter} />
            {/* Las funciones encargadas de alterar una variable con estado tambien pueden ser pasadas como props a componentes hijos */}
            <Button onClick={handleCounter} />
        </div>
    )
}
```

```javascript
// Componente hijo

const Display = (props) => {
    const {counter} = props

    return (
        <div>
            <p>Counter: {counter}</p>
        </div>
    )
}
```

```javascript
// Componente hijo

const Button = (props) => {
    // Llamar a una funcion que cambia el estado hace que el componente padre se vuelva a renderizar
    <button onClick={props.onClick}>Increase by one</button>
}
```

En React es convencional usar nombres `onSomething` para props que representan eventos y `handleSomething` para las definiciones de funciones que controlan los eventos.

Por convencion las props de los controladores de eventos deberian iniciar con `on`, por ejemplo `onClick`.

## Estado complejo

En lugar de definir 2 estados por separado, un objeto puede encapsular multiples variables con estado en un unico estado.

```javascript
import { useState } from 'react'

const App = () => {
    // clicks es un objeto el cual se encarga de almacenar los estados left y right
    const [clicks, setClicks] = useState({
        left: 0,
        right: 0
    })
    const [allClicks, setAllClicks] = useState([])
    const [total, setTotal] = useState(0)

    const handleRight = () => {
        // Se concatena en el array allClicks el correspondiente evento de click ejecutado (Right)
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

        // Se modifica el valor de la propiedad left de la variable con estado clicks. El valor inicial de la propiedad right se mantiene intacto.
        setClicks({
            ...clicks,
            left: clicks.left++
        })
        handleTotal()
    }

    const handleTotal = () => {
        // La funcion setTotal le asigna a la variable con estado total la suma del total de eventos click realizados
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
```

> La actualizacion del estado en React ocurre de manera asincrona, es decir no inmediatamente al ejecutarse la funcion que modifica la variable con estado.

## Renderizado condicional

Mediante el renderizado condicional es posible representar distintos elementos de React segun el estado de la aplicacion, utilizando estructuras condicionales como por ejemplo `if {} else {}`.

```javascript
import { useState } from 'react'

const App = () => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [total, setTotal] = useState(0)

    const handleLeft = () => {
        setLeft(left + 1)
        const updatedLeft = left + 1
        setTotal(right + updatedLeft)
    }

    const handleRight = () => {
        setRight(right + 1)
        const updatedRight = right + 1
        setTotal(left + updatedRight)
    }

    // Si el valor de la variable con estado total es mayor a 10 se renderiza un bloque de codigo, en caso contrario se renderiza un bloque de codigo distinto
    if (total > 10) {
        return(
            <div>
                <p>Total is greater than 10: {total}</p>
            </div>
        )
    }

    return(
        <div>
            <button onClick={handleLeft}>Left++</button>
            <button onClick={handleRight}>Right++</button>
            <p>Total is less than 10: {total}</p>
        </div>
    )
}
```

## Reglas de los hooks

Los hooks `(useState, useEffect)` solo se pueden llamar desde el interior del cuerpo de la funcion que define un componente de React.

Los hooks nunca deben ser llamados desde dentro de estructuras condicionales o estructuras iterativas.

## Controladores de eventos

Los controladores de eventos deben ser una funcion o una referencia a una funcion.

La ejecucion de una llamada de funcion en particular cuando se hace clic en un boton puede lograr con la siguiente sintaxis

```javascript
<button onclick={() => setValue(0)}></button>
```

De esta forma el controlador de eventos es una funcion definida con la sintaxis de funcion de flecha como valor de la propiedad onClick.

```javascript
import { useState } from 'react'

const App = () => {
    const [value, setValue] = useState(10)

    const handleReset = () => {
        setValue(0)
    }
    return(
        <span>{value}</span><br/>
        <div>
            {/* El llamado de la funcion solo ocurre cuando se da clic en el boton y no cuando se renderiza la aplicacion, gracias al uso de un controlador de eventos. */}
            <button onClick={handleReset}>reset to zero</button>
        </div>
    )
}
```

## Pasando controladores de eventos a componentes hijos

Los componentes hijos pueden obtener la funcion del controlador de eventos a traves de una `prop` enviada desde el componente padre.

```javascript
// Componente padre

import { useState } from 'react'
import Button from './components/Button'

const App = () => {
    const [value, setValue] = useState(10)

    return(
        <>
            {value}
            <Button  handleClick={() => setValue(1000)} text="thousand" />
            <Button  handleClick={() => setValue(0)} text="reset" />
            <Button  handleClick={() => setValue(value + 1)} text="increment" />
        </>
    )
}
```

```javascript
// Componente hijo

const Button = (props) => {
    return(
        // El evento ejecutado desde el componente hijo actualiza el estado de la aplicacion en el componente padre
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}
```
