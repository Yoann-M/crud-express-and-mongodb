const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
app.set('view engin', 'ejs')
app.use(bodyParser.urlencoded({
  extended: true
}))

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


app.get('/', (req, res) => {
  db.collection('quotes').find().toArray(function(err,results) {
    console.log(results)
    res.render('index.ejs', {quotes: results})
  })
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})