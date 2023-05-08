import express from "express"
import {searchDB, insertDB} from "./database.js"

//const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send(`La variable de entorno es: ${process.env.ATLAS_URI}`)
})

app.get('/insert', (req, res) => {
    insertDB();
    res.send("Se insertó");
})

app.get('/find',async (req, res) => {
    let news = await searchDB("news");
    let users = await searchDB("users");
    //res.send(news);
    //res.send("---");
    res.send(users);
})

app.get('/users', (req, res) => {
    const user = {
        firstName: 'Mateo',
        lastName: 'Manolio'
    }
    res.send(user)
})

app.listen(port, () => console.log(`server started at port ${port}`))

/// Conection with mongodb
/*
const connectionString = 'mongodb://admin:password@database:27017/mysocialapp?authSource=admin';
const dbName = 'users'
const client = new MongoClient(connectionString);

let conn;
async function run(){
try {
    const database = client.db(dbName);
    const users = database.collection("users");
    const query = {};
    const options = {};

    const index = await users.findOne(query);
    console.log(index)
  } catch(e) {
    console.error(e);
  }
}

//run().catch(console.dir);
*/