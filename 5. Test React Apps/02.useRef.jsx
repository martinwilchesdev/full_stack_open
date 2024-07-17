import { useRef } from 'react'

// El hook useRef se utiliza para crear una referencia
const App = () => {
    const noteFormRef = useRef()

    const noteForm = () => {
        /**
         * noteFormRef se asigna al componente Toggable que contiene el formulario para crear la nota.
         * La variable noteFormRef actua como una referencia al componente. Este hook asegura que se mantenga la misma referencia en todas las re-renderizaciones del componente.
        */
        <Toggable ref={noteFormRef}>
            <NoteForm />
        </Toggable>
    }
}

import { useState, forwardRef, useImperativeHandle } from 'react'

/**
 * La funcion que crea el componente esta envuelta dentro de una llamada a la funcion forwardRef. De esta manera el componente puede acceder a la referencia que le fue asignada.
 * El componente usa el hook useImperative para que la funcion toggleVisibility este disponible fuera del componente.
*/
const Toggable = forwardRef(({ props, refs }) => {
    const [visible, setVisible] = useState()

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(() => {
        return {
            toggleVisibility
        }
    })
})