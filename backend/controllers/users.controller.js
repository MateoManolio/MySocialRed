import { searchDB, deleteDB, insertDB } from '../db/mongo.js';
const MODEL='users'

const getAllUsers = (req, res) => {
    searchDB(MODEL)
    .then((element) => {
        return res.json(element)
    })
    .catch((error) => {
        return res.status(500).json({status:"error", error: error});
    })
};

const createUser = (req, res) => {
    // curl -X POST -H "Content-Type: application/json" -d '{"username": "42944803", "psw": 123, "name":"gonza" , "surname":"dicosimo", "study" : "Ing. de Sistemas", "profession" : "MMO" }' http://localhost:3000/users

    searchDB(MODEL, {"username":req.body.username})
    .then((element) => {
        if (element && element.length > 0) {
            res.status(400).send({
                status: "error",
                message: req.body.username + " is already exist"
            })        
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
    // Tengo en cuenta que el username es el id
    searchDB(MODEL, {"username":req.body.username})
    .then((element) => {
        if (element && element.length > 0) {
            insertDB(MODEL, req.body)
            .then((element) => {
                res.status(201).json({ message: "New user created!", data: element})
            })
            .catch ((error) => {
                return res.status(400).json({status:"error", error: error});
            })
        } else {
            res.status(400).send({
                status: "error",
                message: req.body.username + "does not exist"
            })    
        }
    })
    .catch((error) => {
        return res.status(400).json({status:"error", error: error});
    })
};

export { getAllUsers, createUser, getUserById, updateUser, deleteUser };