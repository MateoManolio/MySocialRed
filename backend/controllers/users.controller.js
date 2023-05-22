import { searchDB, deleteDB, insertDB } from '../db/mongo.js';
const MODEL='users'

const getAllUsers = (req, res) => {
    searchDB(MODEL, {})
    .then((element) => {
        return res.json(element)
    })
    .catch((error) => {
        return res.status(400).json({status:"error", error: error});
    })
};

const createUser = (req, res) => {
    // curl -X POST -H "Content-Type: application/json" -d '{"nombre": "Ejemplo", "edad": 25}' http://localhost:3000/users
    // console.log(req.body.nombre)
    
    searchDB(MODEL, req.body.firstName )
    .then((element) => {
        if (element && element.length > 0) {
            res.status(400).send({
                status: "error",
                message: req.body.firstName + " is already exist"
            })        
        } else {
            insertDB(MODEL, req.body.mobile.trim())
            .then( (element) => {
                res.status(201).json({ message: "New contact created!", data: element})
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

const getUserById = (req, res) => {
        console.log(req.body.id)
        searchDB(MODEL, { _id: req.params.id })
        .then( (element) => {
            res.json(element)
        })
        .catch((error) => {
            res.send("A")
            return res.status(500).json({status:"error", error: error});
        })
};

const updateUser = (req, res) => {

};

const deleteUser = (req, res) => {

};

export { getAllUsers, createUser, getUserById, updateUser, deleteUser };