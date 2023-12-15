# MySocialRed

Este proyecto es parte del Taller de Desarrollo Web ofrecido en la Universidad del Centro de la Provincia de Buenos Aires (UNICEN). Está construido utilizando la pila MEAN, que abarca las siguientes tecnologías:

- **M**ongoDB: Base de datos
- **E**xpress: Framework web
- **A**ngular: Framework de frontend
- **N**ode.js: Servidor web

## Backend

### CRUDs

Para demostrar el funcionamiento de los métodos CRUD, realizamos las siguientes peticiones HTTP.

#### Create

Creamos un usuario con la siguiente información:

- Username: 43097403
- Contraseña: 1234
- Nombre: Fernando
- Apellido: Cotti
- Estudia en: Exactas
- Profesión: Técnico en Informática

La petición se realizó con el comando:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
    "username":"43097403",
    "psw": "1234",
    "name": "Fernando",
    "surname": "Cotti",
    "study": "Exactas",
    "profession": " Técnico en Informática"
}' http://localhost:3000/users
```

Y el resultado fue:

```json
{"message":"New user created!","data":{"username":"43097403","psw": "1234","name": "Fernando","surname": "Cotti","study": "Exactas","profession": " Técnico en Informática", "_id":"649eec64d409d5d7a4f994dd","__v":0}}
```

#### Read

Solicitamos todos los usuarios con el identificador _42944803_:

```bash
curl -X GET http://localhost:3000/users/42944803 -H "Accept: application/json"
```

#### Update

Modificamos la contraseña del usuario con el identificador _43725116_:

```bash
curl -X PUT http://localhost:3000/users/42944803 -H "Content-Type: application/json" -d '{"username"psw": 45454}'
```

#### Delete

Eliminamos el usuario con el identificador _43097403_:

```bash
curl -X DELETE http://localhost:3000/users/42944803 -H "Accept: application/json"
```

## Frontend

Para el frontend, utilizamos el framework Angular. Generamos componentes de inicio de sesión y registro, permitiendo que los usuarios accedan a su portal respectivo según su facultad.

## Docker

Utilizamos Docker para gestionar las conexiones entre el backend y el frontend.

### Modo Producción

Para ejecutar la aplicación en modo de producción, utiliza el siguiente comando:

```bash
docker-compose -f compose.yml up
```

### Modo Desarrollo

Para ejecutar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```bash
docker-compose -f compose-dev.yml up
```

En este modo, puedes modificar todos los archivos y ver los cambios en tiempo real sin necesidad de recompilar. El backend se encuentra en el puerto 3000, y el frontend en el puerto 4200. Puedes acceder a ellos a través de `localhost:3000` y `localhost:4200`, respectivamente.