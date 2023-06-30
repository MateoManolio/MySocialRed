import { searchDB, deleteDB, insertDB } from '../db/mongo.js';
const MODEL='news'


export const getAllNews = (req, res) => {
    searchDB(MODEL)
    .then((element) => {
        return res.json(element)
    })
    .catch((error) => {
        return res.status(500).json({status:"error", error: error});
    })
};

export const createNew = (req, res) => {
// curl -X POST -H "Content-Type: application/json" -d '{"username": "42944803", "psw": 123, "name":"gonza" , "surname":"dicosimo", "study" : "Ing. de Sistemas", "profession" : "MMO" }' http://localhost:3000/users

    searchDB(MODEL, { username : req.body.username})
    .then((element) => {
        if (element.length > 0) {
            res.status(400).send({status: "error", message: req.body.username + " is already exist"})        
        } else {
            insertDB(MODEL, req.body)
            .then( (element) => {
                res.status(201).json({ message: "New user created!", data: element})
            })
            .catch ( (error) => {
                return res.status(400).json({status:"error", error: error});
            })
        }
    })
    .catch((error) => {
        return res.status(400).json({status:"error", error: error});
    })
};

export const getNewById = (req, res) => {
    searchDB(MODEL, { username: req.params.id })
    .then((element) => {
        res.json(element)
    })
    .catch((error) => {
        res.status(500).json({status:"error", error: error});
    })
};


export const updateNew = (req, res) => {
    updateDB(MODEL, { username: req.params.id }, req.body)
    .then((element) =>
     {
        res.status(201).json({ message: "has been successfully update!", data: element})
    })
    .catch((error) => {
        res.status(400).json({status:"error", message: req.params.id + " does not exist"});
    })
};

export const deleteNew = (req, res) => {
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
};
