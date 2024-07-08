## Administracion de usuarios

### Relacion uno a varios

Un unico usuario puede crear multiples registros


    USER |-< NOTE

En las bases de datos de documentos como MongoDB, se pueden usar ID de objetos para referenciar a documentos de otras colecciones, de forma similar al uso de claves externas en bases de datos relacionales.

### Referencias entre columnas

Cuando se trabaja con bases de datos relacionales, la nota contendria una clave de referencia para el usuario que la creo.

En las bases de datos de documentos se puede hacer lo mismo.

    [
        {
            username: 'milukas',
            _id: 123456
        },
        {
            username: 'hellas',
            _id: 654321
        }
    ]

En el ejemplo anterior la coleccion users contiene 2 usuarios.

    [
        {
            content: 'HTML is easy',
            important: false,
            _id: 221222,
            user: 123456
        },
        {
            content: 'A proper dinosaur codes with Java',
            important: true,
            _id: 221223,
            user: 654321
        }
    ]

La coleccion notes contiene 2 notas que contienen un campo user, el cual hace referencia a un usuario en la coleccion users.

Las bases de datos de documentos ofrecen una forma diferente de organizar datos, por ejemplo anidando todo el conjunto de notas como parte de los documentos en la coleccion de usuarios.

    [
        {
            username: 'milukas',
            _id: 123456,
            notes: [
                {
                    content: 'HTML is easy',
                    important: false
                },
                {
                    content: 'JavaScript is great',
                    important: true
                }
            ]
        },
        {
            username: 'hellas',
            _id: 654321,
            notes: [
                {
                    content: 'A proper dinosaur codes with Java',
                    important: true
                }
            ]
        }
    ]

En el esquema anterior las notas estarian estrechamente anidadas debajo de los usuarios y la base de datos no generaria identificadores unicos para dichas notas.