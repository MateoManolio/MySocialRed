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
  // curl -X POST -H "Content-Type: application/json" -d '{"study" : "General", "title": "Suspensión de clases", "description": "El día 18/5 no va a haber clases por un perfeccionamiento docente", "date": "5/5/2023:9:39:0:0", "user": "Mateo Manolio", "url": "", "urlToImage": "", "stars": 0.0 }' http://localhost:3000/news
    
  searchDB(MODEL, { username : req.body.title})
    .then((element) => {
        if (element.length > 0) {
            res.status(400).send({status: "error", message: req.body.title + " is already exist"})        
        } else {
            insertDB(MODEL, req.body)
            .then( (element) => {
                res.status(201).json({ message: "New news created!", data: element})
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
    const title = req.params.id || '';

    searchDB(MODEL, { title: title})
    .then((element) => {
        if (Object.keys(element).length > 0) {
            deleteDB(MODEL, {title: title})
            .then((element) => {
                res.status(201).json({ message: `${title} has been successfully deleted!`, data: element})
            })
            .catch ((error) => {
                res.status(400).json({status:"error", error: error});
            })
        } else {
            res.status(400).send({
                status: "error",
                message: title + " does not exist"
            })    
        }
    })
    .catch((error) => {
        res.status(500).json({status:"error", error: error});
    })
};
