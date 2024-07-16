import ToggleButton from './components/ToggleButton'
import LoginForm from './components/LoginForm'

const App = () => {
    return(
        /**
         * En la terminologia de React LoginForm es un componente hijo de ToggableComponent.
         * Es posible agregar cualquier elemento de React entre las etiquetas de apertura y cierre de un componente padre.
        */
        <ToggleButton>
            <LoginForm />
        </ToggleButton>
    )
}

// ToggableButton.jsx
const ToggableButton = (props) => {
    return(
        <div>
            {/* props.children se utiliza para hacer referencia a los componentes hijos del componente */}
            { props.children }
            {/* Si un componente se define con una etiqueta de cierre automatico />, props.children sera un array vacio */}
        </div>
    )
}