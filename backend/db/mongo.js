import mongoose, { connect } from 'mongoose'
import { models } from './models.js'

const dbName = 'mysocialapp';
const url = `mongodb://admin:password@database:27017/${dbName}?authSource=admin`

const connectDB = () => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const connectModel = (model) => {
  if (mongoose.models[model]) return mongoose.model(model)

  return mongoose.model(model, new mongoose.Schema(models[model]));
};


export const searchDB = async (model, query = {}) => {
  return connectDB()
  .then(() => {
    const schema = connectModel(model);

    return schema.find(query)
  })
  .catch((error) => {
    console.error('Error en la búsqueda de la base de datos:', error.message);

    return {}
  })
  .finally(() => {
    mongoose.connection.close();
  });
}

export const insertBD = async (model, data = {}) => {
  return connectDB()
    .then(() => {
      const schema = connectModel(model);

      // el dato a ingresar debe ser igual que el schema,
      // habria que iterar por cada uno o ver otra forma
      // esta no funciona
      return data.forEach(NodeData => {
        schema.create(NodeData)
      })
      
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

export const deleteBD = async (model, query = {}) => {
  return connectDB()
  .then(() => {
    const schema = connectModel(model);

    return schema.find(query)
  })
  .catch((error) => {
    console.error('Error al eliminar en la base de datos:', error.message);
  })
  .finally(() => {
    mongoose.connection.close();
  });
}
