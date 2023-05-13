import express from 'express'
import mongoose from 'mongoose'
import {searchDB, deleteBD, insertBD} from './db/mongo.js'
import data from './db/news.json' assert {type: 'json'};

const app = express()


app.get('/', async (_req, res) => {
  
  res.send('Hello world!')
})

app.get('/user', (req, res) => {
  res.send('Usuario')
});

/* GET all mews. */
app.get('/news', (req, res) => {
  const news = searchDB('news')
  console.log('anda?')

  if (news) res.status(200).json(news);

});

app.get('/insert', (req, res) => {
  console.log("inserting...")
  console.log(data)
  insertBD('news', data)
  return res.send("ok")
});


app.listen(3000, () => console.log('listening...'))