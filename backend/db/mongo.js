import mongoose from 'mongoose'
import { schema } from './schema.js'

const dbName = 'mysocialapp';
const url = `mongodb://admin:password@database:27017/${dbName}?authSource=admin`

// Alejandro dijo de unir todo lo de schemas y conexiones
const connectDB = () => { 
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
    console.error('Error en la búsqueda de la base de datos:', error.message);

    // ver manejo de errores
    return error
  })
  .finally(() => {
    mongoose.connection.close();
  });
}

export const insertDB = async (model, data = {}) => {
  return connectDB()
    .then(() => {
      const schema = connectModel(model);

      return schema.create(data)
      // return data.forEach(async (obj) => model.create(obj));
      
    })
    .catch((error) => {
      console.error('Error al insertar el archivo:', error.message);

      throw error;
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
    console.error('Error al actualizar la base de datos: ', error.message);

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
    console.error('Error al eliminar en la base de datos:', error.message);
  })
  .finally(() => {
    mongoose.connection.close();
  });
}
