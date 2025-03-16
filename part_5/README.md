# Probando aplicaciones React

## props.children y proptypes

En la terminologia de React `<LoginForm />` es un componente hijo de `<ToggableComponent>`.

Es posible agregar cualquier elemento de React entre las etiquetas de apertura y cierre de un componente padre.

```javascript
import ToggleButton from './components/ToggleButtonmport'
import LoginForm from './components/LoginForm'

const App = () => {
    return(
        <ToggleButton>
            <LoginForm /> {/* Componente hijo */}
        </ToggleButton>
    )
}

// Componente ToggableButton.jsx
const ToggableButton = (props) => {
    return(
        <div>
            {/* props.children se utiliza para hacer referencia a los componentes hijos del componente */}
            { props.children }
        </div>
    )
}
```

A diferencia de las `props` convencionales, React agrega automaticamente `children` y siempre existe. Si un componente padre se define con una etiqueta de cierre automatico `/>`, props.children sera un array vacio.

## Estado de los formularios

A veces se requiere que el estado de los componentes cambie siempre al mismo tiempo, para hacerlo se debe eliminar el estado utilizado en 2 o mas componentes y moverlo al componente padre mas cercano que tengan en comun.