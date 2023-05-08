import { MongoClient } from "mongodb";
import news from "./database/news.json" assert {type:'json'};
import users from "./database/users.json" assert {type:'json'};

const connectionString = 'mongodb://admin:password@database:27017/mysocialapp?authSource=admin';
const dbName = 'mysocialapp';
const CollectionUsers = 'users';
const CollectionNew = 'news';
const client = new MongoClient(connectionString);


export async function insertDB(){
    const database = client.db(dbName);
    const usuario = database.collection(CollectionUsers);
    const noticia = database.collection(CollectionNew);

    console.log(users);
    console.log(news);
    usuario.insertOne(users);
    noticia.insertOne(news);
    
}

export async function searchDB(find, query = {}, options = {}){
    const database = client.db(dbName);
    let index;
    if (find == CollectionUsers) {
        const usuario = database.collection(CollectionUsers);
        index = await usuario.findOne(query);
    } else if (find == CollectionNew) {
        const noticia = database.collection(CollectionNew);
        index = await noticia.findOne(query);
    }
    return index;
}

async function deleteDB(){

}



