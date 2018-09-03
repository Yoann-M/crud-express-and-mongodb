const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://home:yoann-home-23@ds125368.mlab.com:25368/star-wars-quotes', {
  useNewUrlParser: true
}, (err, database) => {
  if (err) return console.log(err)
  db = database.db('star-wars-quotes') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engin', 'ejs')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray(function (err, results) {
    console.log(results)
    res.render('index.ejs', {
      quotes: results
    })
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/quotes', (req, res) => {
  db.collection('quotes').findOneAndUpdate({
    name: "Yoda"
  }, {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    }, {
      sort: { _id: -1 },
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({
    name: req.body.name
  },
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({ message: 'A darth vadar quote got deleted' })
    })
})