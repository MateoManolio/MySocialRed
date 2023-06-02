import express from 'express';
import { router as usersRouter } from './routes/users.model.js';
import { router as newsRouter }  from './routes/news.model.js';

const app = express();

app.use(express.json());

app.use('/users', usersRouter);
app.use('/news', newsRouter);

app.get('/', (req, res) => {
  res.status(400).send('Hello world')
})

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
