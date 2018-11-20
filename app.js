var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

const beloningRoutes = require('./api/routes/Beloningen');
const gebruikerRoutes = require('./api/routes/Gebruikers');

mongoose.connect('mongodb://admin:admin@reward-system-shard-00-00-guwav.mongodb.net:27017,reward-system-shard-00-01-guwav.mongodb.net:27017,reward-system-shard-00-02-guwav.mongodb.net:27017/test?ssl=true&replicaSet=reward-system-shard-0&authSource=admin&retryWrites=true');


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
