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
/*
    curl -X POST -H "Content-Type: application/json" -d '  { 
    "type": "general", 
    "news": [{ 
    "title": "Suspensión de clases", 
    "description": "El día 18/5 no va a haber clases por un perfeccionamiento docente", 
    "date": "5/5/2023:9:39:0:0", 
    "user": "Mateo Manolio", 
    "url": "", 
    "urlToImage": "", 
    "stars": 0.0 
},{ 
    "title": "El comedior Subirá de precio", 
    "description": "A partir del mes que viene el precio del menú sube a $250", 
    "date": "15/5/2023:18:25:0:0", 
    "user": "Agus Sanchez", 
    "url": "", 
    "urlToImage": "", 
    "stars": 0.0 
},{ 
    "title": "Paro de colectivos", 
    "description": "El día 25/6 no va a haber colectivos circulando en Tandil, así que acurdense que las faltas de hoy no son consideradas", 
    "date": "1/6/2023:7:17:0:0", 
    "user": "Gonza Dicosimo", 
    "url": "", 
    "urlToImage": "", 
    "stars": 0.0 
},{ 
    "title": "Paro de colectivos", 
    "description": "El día 25/6 no va a haber colectivos circulando en Tandil, así que acurdense que las faltas de hoy no son consideradas", 
    "date": "1/6/2023:7:17:0:0", 
    "user": "Gonza Dicosimo", 
    "url": "", 
    "urlToImage": "", 
    "stars": 0.0 
}]} ' http://localhost:3000/news

curl -X POST -H "Content-Type: application/json" -d '  { 
"type" : "exactas",
"news": [{
    "title": "Semana de finales CON SUSPENSION de clases",
    "description": "El 27 y 28 de este mes no habrá clases por semana de finales",
    "date": "1/5/2023:8:54:0:0",
    "user": "Claudia Marineli",
    "url": "",
    "urlToImage": "",
    "stars": 0.0
},{
    "title": "Semana de finales CON SUSPENSION de clases",
    "description": "El 27 y 28 de este mes no habrá clases por semana de finales",
    "date": "1/5/2023:8:54:0:0",
    "user": "Claudia Marineli",
    "url": "",
    "urlToImage": "",
    "stars": 0.0
}]} ' http://localhost:3000/news

*/

    searchDB(MODEL, { type : req.body.type})
    .then((element) => {
        if (element.length > 0) {
            res.status(400).send({status: "error", message: req.body.type + " is already exist"})        
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
    searchDB(MODEL, { type: req.params.id })
    .then((element) => {
        res.json(element)
    })
    .catch((error) => {
        res.status(500).json({status:"error", error: error});
    })
};


export const updateNew = (req, res) => {
    updateDB(MODEL, { type: req.params.id }, req.body)
    .then((element) =>
     {
        res.status(201).json({ message: "has been successfully update!", data: element})
    })
    .catch((error) => {
        res.status(400).json({status:"error", message: req.params.id + " does not exist"});
    })
};

export const deleteNew = (req, res) => {
    // curl -X DELETE http://localhost:3000/news -H "Accept: application/json"

    searchDB(MODEL, { type: req.params.id})
    .then((element) => {
        if (Object.keys(element).length > 0) {
            deleteDB(MODEL, {type: req.params.id})
            .then((element) => {
                res.status(201).json({ message: "has been successfully deleted!", data: element})
            })
            .catch ((error) => {
                res.status(400).json({status:"error", error: error});
            })
        } else {
            res.status(400).send({
                status: "error",
                message: req.body.type + " does not exist"
            })    
        }
    })
    .catch((error) => {
        res.status(500).json({status:"error", error: error});
    })
};
