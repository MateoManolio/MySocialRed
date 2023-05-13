import mongoose from 'mongoose'

const dbName = 'mysocialapp';
const url = `mongodb://admin:password@database:27017/${dbName}?authSource=admin`

// create mongoose model and mongoose schema
// Modularizar
const models = {
  'news': ({
    id: Number,
    title: String,
    description: String,
    date: String,
    user: String,
    url: String,
    urlToImage: String,
    starts: Number
  }),
  'users': ({
    username: String,
    psw: String,
    name: String,
    surname: String,
    study: String,
    profession: String
  })
}

const connectDB = async () => {
  mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the Database.');
  })
  .catch(err => console.error(err));
}

export const searchDB = async (model, query = {}) => {
  // ver manejo de error
  connectDB();
  let out = {}

  console.log(model)
  const schema = mongoose.model(model, new mongoose.Schema(models[model]))

  if (schema) {
    out = await schema.find(query);

  }
  // ver manejo de modelos
  mongoose.connection.close()
  return out;
}

export const insertBD = async (model, data = {}) => {
  connectDB();

  const schema = mongoose.model(model, new mongoose.Schema(models[model]))

  schema
  .insertMany(data)
  .then(() => {
    console.log('Data insertted.');
  })
  .catch(err => console.error(err));

  mongoose.connection.close()
}

export const deleteBD = async (model, query = {}) => {
  connectDB();



  mongoose.connection.close()
}
