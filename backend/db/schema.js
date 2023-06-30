import { Schema } from "mongoose"

  const SchemaNews = new Schema({
    id: Number,
    title: String,
    description: String,
    date: String,
    user: String,
    url: String,
    urlToImage: String,
    starts: Number
  })

  const Users = new Schema({
    username: String,
    psw: String,
    name: String,
    surname: String,
    study: String,
    profession: String
  })

  const News = new Schema({
      type: String,
      news: [SchemaNews]
  })

export const schema = {"users": Users, "news": News}
