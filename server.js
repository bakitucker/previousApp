const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://bakitucker8:VIwTdREZ9k0yLJIC@bakitucker1.gvx0z4s.mongodb.net/?retryWrites=true&w=majority";
const dbName = "personalOne";

app.listen(1010, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('addresses').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('addresses').insertOne({name: req.body.name, number: req.body.number, makeFav:"",address: req.body.address, email: req.body.email}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/addresses', (req, res) => {
  db.collection('addresses')
  .findOneAndUpdate({name: req.body.name, number: req.body.number}, {
    $set: {
      makeFav:'★★'
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.put('/addresses/unFav', (req, res) => {
  db.collection('addresses')
  .findOneAndUpdate({name: req.body.name, number: req.body.number}, {
    $set: {
      makeFav:''
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})




app.delete('/addresses', (req, res) => {
  db.collection('addresses').findOneAndDelete({name: req.body.name, number: req.body.number}, (err, result) => {
    
    if (err) return res.send(500, err)

    res.send('Message deleted!')
  })
})
