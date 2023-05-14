import express from 'express';
import { searchDB, deleteBD, insertBD } from './db/mongo.js';
import fs from 'fs'

const app = express();
const data = JSON.parse(fs.readFileSync('./db/news.json'));

app.get('/', async (_req, res) => {
  res.send('Hello world!')
});

app.get('/user', (req, res) => {
  res.send('Usuario')
}); 

/* GET all mews. */
app.get('/news', async (req, res) => {
  const news = await searchDB('news')
  console.log(news)

  if (news) res.status(200).json(news);

});

app.get('/insert', async (req, res) => {
  console.log("inserting...")
  await insertBD('news', data)
  return res.send("ok")
});

app.listen(3000, () => console.log('listening...'));