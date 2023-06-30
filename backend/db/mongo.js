import mongoose from 'mongoose'
import { schema } from './schema.js'

const dbName = 'mysocialapp';
const url = `mongodb://admin:password@database:27017/${dbName}?authSource=admin`

// Alejandro dijo de unir todo lo de schemas y conexiones
const connectDB = async () => { 
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    throw error;
  });
};

const connectModel = (model) => {
  if ( mongoose.modelNames().includes(model)) return mongoose.model(model)
 
  return mongoose.model(model, new mongoose.Schema(schema[model]));
};

export const searchDB = async (model, query = {}) => {
  return connectDB()
  .then(() => {
    const schema = connectModel(model);
    return schema.find(query)
  })
  .catch((error) => {
    throw error.message;
  })
  .finally(() => {
    mongoose.connection.close();
  });
}

export const insertDB = async (model, data = {}) => {
  return connectDB()
    .then(() => {
      const schema = connectModel(model);

      return schema.create(data);
      // return data.forEach(async (obj) => model.create(obj));
    })
    .catch((error) => {
      throw ('Error al insertar el archivo:', error.message);
    })
    .finally(() => {
      console.log('Archivo insertado exitosamente en la base de datos');

      mongoose.connection.close();
    });
};

export const updateDB = async (model, filter = {}, update) => {
  return connectDB()  
  .then(() => {
    const schema = connectModel(model);
    return schema.findOneAndUpdate(filter, update, { new: true })
  })
  .catch((error) => {
    throw str('Error al actualizar la base de datos: ', error.message);

  })
  .finally(() => {
    mongoose.connection.close();
  });
}

export const deleteDB = async (model, query = {}) => {
  return connectDB()
  .then(() => {
    const schema = connectModel(model);

    return schema.deleteOne(query)
  })
  .catch((error) => {

    throw error;
  })
  .finally(() => {
    mongoose.connection.close();
  });
}
