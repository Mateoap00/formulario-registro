# Formulario de Registro

Realizado por: Pablo Astudillo

Proyecto desarrollado en la materia Interacción Hombre Máquina de Ingeniería de Software en la Universidad Católica de Cuenca. Consiste en una aplicación CRUD para un registro de personas.

## Tecnologías utilizadas

- Front-end: HTML, CSS, JavaScript y Bootstrap.
- Back-end: Laragon, MySQL y PHP.

## Configuración de la base de datos

Los scripts de la base de datos se encuentran en el archivo `store-mysql-commands.txt`. Asegúrese de ejecutar estos scripts en su servidor MySQL para crear la estructura de la base de datos necesaria para la aplicación.

## Configuración del servidor PHP

Para montar el servidor PHP se requiere tener Laragon instalado y configurado correctamente. Luego desde la terminal `Cmder`:

1. Navegue hasta el directorio `./formulario-registro/back-end`.
2. Ejecute el siguiente comando: `php -S localhost:9001`.

Esto iniciará el servidor PHP en `localhost` en el puerto `9001`.

## Uso de la aplicación

Una vez que el servidor PHP esté en funcionamiento y la base de datos esté configurada, puede acceder a la aplicación a través de su navegador web (archivo `./index.html`). La aplicación permite desde la pagina principal registrar una persona y ver la lista de personas registradas, y en la pagina secundaria (archivo `./users.html`) se puede actualizar y eliminar personas de la lista.