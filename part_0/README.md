## HTTP GET

El servidor web y el navegador web se comunican entre si mediante el protocolo HTTP.

El navegador realiza peticiones HTTP GET para obtener algun tipo de informacion del servidor.

La solicitud y la respuesta del servidor tienen varias cabeceras `(headers)`. Las cabeceras de respuesta indican por ejemplo, el tamaño y la hora de la respuesta.

La cabecera `Content-Type` indica el tipo de archivo recibido en la respuesta.

## DOM

El modelo de objetos del documento, mejor conocido como `DOM`, es una estructura de arbol que permite modificar mediante codigo los elementos que componen una pagina web.

```javascript
const list = document.createElement('ul')
```

En el ejemplo anterior se utiliza el DOM-API para la creacion de un elemento de lito lista `<ul></ul>`.

## CSS

Las hojas de estilo en cascada o `CSS`, es un lenguaje de hojas de estilo utilizado para determinar la apariencia de las paginas web mediante diferentes estilos.

```css
.container {
    padding: 10px;
    border: 1px;
}
```

En el ejemplo anterior se define una clase css llamada `container`, la cual contiene 2 reglas de estilo. Las clases se utilizan para aplicar estilos a multiples elementos de forma simultanea.

```html
<div class="container"></div>
<div class="container"></div>
```

### HTTP POST

El navegador realiza peticiones HTTP POST cuando se va a realizar la creación de un nuevo recurso en el servidor.

## Aplicaciones de una sola pagina (SPA)

Los sitios web de estilo SPA no obtienen todos sus paginas por separado, sino que se comprenden de una sola pagina HTML obtenida del servidor, cuyo contenido se manipula con JavaScript que se ejecuta en el navegador.

[Ejercicios 0.1.-0.6.](https://github.com/martinwilchesdev/full_stack_open/tree/main/1.part_0/exercises)