import { MongoClient } from "mongodb";
import data from './news.json' assert {type: 'json'};

const dbName = 'mysocialapp';
const uri = 'mongodb://admin:password@database:27017/mysocialapp?authSource=admin'

const client = new MongoClient(uri);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
} 

let db = conn.db(dbName)

export default db;