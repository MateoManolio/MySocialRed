export const schema = {
    'news': ({
      id: Number,
      title: String,
      description: String,
      date: String,
      user: String,
      url: String,
      urlToImage: String,
      starts: Number
    }),
    'users': ({
      username: String,
      psw: String,
      name: String,
      surname: String,
      study: String,
      profession: String,
      role: {
          type: String,
          default: 'regular'
      }
    })
  }