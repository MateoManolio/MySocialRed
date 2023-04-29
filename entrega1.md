# Creación de la Base de Datos

```mongodb
use mydb

```

# Create
```json
db.user.insertMany([
{
    username:"42944803",
    psw: "1234",
    name: "Gonza",
    surname: "Dico",
    study: "Exactas",
    profession: "Maestro Mayor de Obras"
},
{
    username:"40668809",
    psw: "1234",
    name: "Agus",
    surname: "Sanchez",
    study: "Exactas",
    profession: "Maestro Automotor"
},
{
    username: "43725116",
    psw: "1234",
    name: "Mateo",
    surname: "Manolio",
    study: "Exactas",
    profession: "Analista en Sistemas"
}])

db.user.insertOne(
{
    username: "prueba",
    psw: "4321",
    study: "Humanas"
})

```
A lo que la base de datos respondió:
 ```json
 {
  acknowledged: true,
  insertedIds: {
    '0': ObjectId("6442c7d8cfdc7dd4774a10c9"),
    '1': ObjectId("6442c7d8cfdc7dd4774a10ca"),
    '2': ObjectId("6442c7d8cfdc7dd4774a10cb")
  }
}

{
  acknowledged: true,
  insertedId: ObjectId("6442c864cfdc7dd4774a10cc")
}

```

# Read
```mongo
db.user.find()
```
Esto devuelve todas las tuplas el siguiente resultado:
```json
[
  {
    _id: ObjectId("6442c7d8cfdc7dd4774a10c9"),
    username: '42944803',
    psw: '1234',
    name: 'Gonza',
    surname: 'Dico',
    study: 'Exactas',
    profession: 'Maestro Mayor de Obras'
  },
  {
    _id: ObjectId("6442c7d8cfdc7dd4774a10ca"),
    username: '40668809',
    psw: '1234',
    name: 'Agus',
    surname: 'Sanchez',
    study: 'Exactas',
    profession: 'Maestro Automotor'
  },
  {
    _id: ObjectId("6442c7d8cfdc7dd4774a10cb"),
    username: '43725116',
    psw: '1234',
    name: 'Mateo',
    surname: 'Manolio',
    study: 'Exactas',
    profession: 'Analista en Sistemas'
  },
  {
    _id: ObjectId("6442c864cfdc7dd4774a10cc"),
    username: 'prueba',
    psw: '4321',
    study: 'Humanas'
  }
]
```
Devolviendo todas las tuplas.  
Otra consulta posible sería la siguiente:
```mongodb
db.user.find({profession: {$regex: "Maestro"}})
```
Y devuelve:
```json
[
  {
    _id: ObjectId("6442c7d8cfdc7dd4774a10c9"),
    username: '42944803',
    psw: '1234',
    name: 'Gonza',
    surname: 'Dico',
    study: 'Exactas',
    profession: 'Maestro Mayor de Obras',
    estudio: 23
  },
  {
    _id: ObjectId("6442c7d8cfdc7dd4774a10ca"),
    username: '40668809',
    psw: '1234',
    name: 'Agus',
    surname: 'Sanchez',
    study: 'Exactas',
    profession: 'Maestro Automotor'
  }
]

```
# Update

``` 
db.user.updateOne(
   { name: "Gonza" },
   {
     $inc: { estudio: 23 },
     $set: {
       estudio: "Ciencias Exactas"
       }
     }
   
)
```

# Delete

```
db.user.deleteOne({$or: [{username:"prueba"}, {study: "Humanas"}]})
```
A lo que la base respondió:
```
{ acknowledged: true, deletedCount: 1 }
```