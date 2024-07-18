/**
 * -| App.jsx
*/
import { useRef } from 'react'

// El hook useRef se utiliza para crear una referencia
const App = () => {
    const noteFormRef = useRef()

    return(
        /**
         * noteFormRef se asigna al componente Toggable que contiene como componente hijo el formulario encargado de crear nuevas notas.
         * noteFormRef actua como una referencia al componente Toggable.
         * Este hook asegura que se mantenga la misma referencia en todas las re-renderizaciones del componente.
        */
        <Toggable ref={noteFormRef}>
            <NoteForm />
        </Toggable>
    )
}

/**
 * -| Toggable.jsx
*/
import { useState, forwardRef, useImperativeHandle } from 'react'

/**
 * La funcion que crea el componente esta envuelta dentro de una llamada a la funcion forwardRef().
 * forwardRef permite que el componente pueda acceder a la referencia que le fue asignada.
 */
const Toggable = forwardRef(({ props, refs }) => {
    const [visible, setVisible] = useState()

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    // El componente usa el hook useImperativeHandle para que la funcion toggleVisibility este disponible fuera del componente.
    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })
})

/**
 * Desde el componente donde se referencia el componente, en este caso App, se puede acceder a la funcion toggleVisibility() de la siguiente forma
 *      noteFormRef.current.toggleVisibility()
*/