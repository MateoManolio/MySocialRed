import { searchDB, deleteDB, insertDB } from '../db/mongo.js';
const MODEL='News'


const getAllNews = (req, res) => {
    res.send(searchDB(MODEL));
};

const createNew = (req, res) => {
    try{
    insertDB(MODEL);
    }catch(err){
        res.status(500).json({ err: 'Error en el servidor' });
    }
};

const getNewById = (req, res) => {
    const filter = req.params;
    res.send(searchDB(MODEL, filter = filter));
};


const updateNew = (req, res) => {
    const condition = req.params;

};

const deleteNew = (req, res) => {
    const query = req.params;
    deleteDB(MODEL, query);
};

export { getAllNews, createNew, getNewById, updateNew, deleteNew };