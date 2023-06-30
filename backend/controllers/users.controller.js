import { searchDB, deleteDB, insertDB, updateDB } from '../db/mongo.js';

// Constants
const MODEL='users'

export const getAllUsers = (req, res) => {
    searchDB(MODEL)
    .then((element) => {
        res.json(element)
    })
    .catch((error) => {
        res.status(500).json({status:"error", error: error});
    })
};

export const createUser = (req, res) => {
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
                res.status(400).json({status:"error", error: error});
            })
        }
    })
    .catch((error) => {
        res.status(400).json({status:"error", error: error});
    })
};

export const getUserById = (req, res) => {
    // curl -X GET http://localhost:3000/users/42944803 -H "Accept: application/json"
    searchDB(MODEL, { username: req.params.id })
    .then((element) => {
        res.json(element)
    })
    .catch((error) => {
        res.status(500).json({status:"error", error: error});
    })
};

export const updateUser = (req, res) => {
    // curl -X PUT http://localhost:3000/users/42944803 -H "Content-Type: application/json" -d '{"username"psw": 45454}'

    updateDB(MODEL, { username: req.params.id }, req.body)
    .then((element) =>
     {
        res.status(201).json({ message: "has been successfully update!", data: element})
    })
    .catch((error) => {
        res.status(400).json({status:"error", message: req.params.id + " does not exist"});
    })
};

export const deleteUser = (req, res) => {
    // curl -X DELETE http://localhost:3000/users/42944803 -H "Accept: application/json"

    // Tengo en cuenta que el username es el id
    searchDB(MODEL, { username: req.params.id})
    .then((element) => {
        if (Object.keys(element).length > 0) {
            deleteDB(MODEL, {username: req.params.id})
            .then((element) => {
                res.status(201).json({ message: "has been successfully deleted!", data: element})
            })
            .catch ((error) => {
                res.status(400).json({status:"error", error: error});
            })
        } else {
            res.status(400).send({
                status: "error",
                message: req.body.username + " does not exist"
            })    
        }
    })
    .catch((error) => {
        res.status(500).json({status:"error", error: error});
    })
};
