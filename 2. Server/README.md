# Alterando datos en el servidor

## REST

En terminologia REST hace referencia a objetos individuales.

    {
        "notes": [
            {
                "id": 1,
                ...
            },
            {
                "id": 2,
                ...
            }
        ]
    }

En el JSON anterior cada objeto se identifica como un recurso. Cada recurso tiene una direccion unica asociada a su URL.

    http://localhost:3001/notes/1

La creacion de un nuevo recurso para almacenar una nota en el servidor se realiza mediante una solicitud `HTTP POST` a la URL *notes* de acuerdo con la convencion REST.

### PUT y PATCH

El verbo PUT se utiliza para modificar un recurso completo en el servidor mientras que el metodo PATCH se utiliza para modificar solo algunas propiedades del recurso.