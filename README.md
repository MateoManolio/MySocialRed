# MySocialRed
Es un proyecto para el Taller de Desarrollo Web dictado en la Universidad del Centro de la Provincia de Buenos Aires. Este proyecto se trabajo con MEAN

# CRUDS
Para demostrar que funciona los métodos CRUDS hacemos las siguientes peticiones HTTP

## Create
Para ello creamos al siguiente usuario:
 - Username: 43097403
 - Contraseña: 1234
 - Nombre: Fernando
 - Apellido: Cotti
 - Estudia en: Exactas
 - Profesión: Técnico en Informática
Y este usuario se ve reflejado en el siguiente json:
```json
{
    "username":"43097403",
    "psw": "1234",
    "name": "Fernando",
    "surname": "Cotti",
    "study": "Exactas",
    "profession": " Técnico en Informática"
}
```
La petición la hicimos con el comando `curl -X POST -H "Content-Type: application/json" -d '{
    "username":"43097403",
    "psw": "1234",
    "name": "Fernando",
    "surname": "Cotti",
    "study": "Exactas",
    "profession": " Técnico en Informática"
}' http://localhost:3000/users` y el resultado fue el siguiente:
```json
{"message":"New user created!","data":{"username":"43097403","psw": "1234","name": "Fernando","surname": "Cotti","study": "Exactas","profession": " Técnico en Informática", "_id":"649eec64d409d5d7a4f994dd","__v":0}}(base)
```

## Read
En este caso se pidió que devuelva todos los usuarios en el que el identificador *42944803* con el siguiente comando `curl -X GET http://localhost:3000/users/42944803 -H "Accept: application/json"`
y el mensaje que recibimos fue este:


## Update
Para ello se hizo la prueba modificando el usuario con el identificador *43725116* para modificar su contraseña con el siguiente comando `curl -X PUT http://localhost:3000/users/42944803 -H "Content-Type: application/json" -d '{"username"psw": 45454}'` y el mensaje recibido fue el siguiente:

## Delete
En este caso se buscó eliminar el usuario con el identificador *43097403* con el siguiente comando `curl -X DELETE http://localhost:3000/users/42944803 -H "Accept: application/json"`
Y recibimos el siguiente mensaje:
