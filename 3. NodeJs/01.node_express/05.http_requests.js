/**
 * SEGURIDAD
 * En las solicitudes HTTP la seguridad hace referencia a que la peticion en ejecucion no debe causar ningun efecto secundario en el servidor.
 * El estandar HTTP define el tipo de solicitud HEAD, el cual funciona igual que el metodo GET pero unicamente devuelve el codigo de estado y las cabeceras de respuesta.
 *
 * IDEMPOTENCIA
 * Todas las solicitudes HTTP excepto POST deben ser idempotentes.
 * Si una solicitud tiene efectos secundarios, el resultado deberia ser el mismo independientemente de cuantas veces se envie la solicitud.
 *      Si se hace una peticion HTTP PUT a la url /api/notes/10 y con la solicitud se envian los datos {content: 'no side effects', important: 'true'} el resultado es el mismo
 * independientemente de cuantas veces se envie la solicitud.
 *
 * POST es el unico tipo de solicitud HTTP que no es seguro ni idempotente.
*/