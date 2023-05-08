import express from 'express'
import db from "./db/mongo.js";
const app = express()

app.get("/", async (req, res) => {
    let news = db.collection("news");
    let results = await news.find({})
      .limit(50)
      .toArray();
  
    res.send(results).status(200);
    await db.close();
  });

// mongoose.connection.close()

app.listen(3000, () => console.log('listening...'))