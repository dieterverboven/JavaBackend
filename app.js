var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

const beloningRoutes = require('./api/routes/Beloningen');
const gebruikerRoutes = require('./api/routes/Gebruikers');

//mongoose.connect("", { useNewUrlParser: true });

mongoose.connect('mongodb://localhost:27017/test');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/Beloningen', beloningRoutes);
app.use('/Gebruikers', gebruikerRoutes);


var db = mongoose.connection;

app.get('/', (req, res)=> {
   res.send('Hello World');
});

app.listen(3000, ()=>{
    console.log("Server is running");
});
