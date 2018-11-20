var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

app.use(cors());

const beloningRoutes = require('./api/routes/Beloningen');
const gebruikerRoutes = require('./api/routes/Gebruikers');
const opdrachtRoutes = require('./api/routes/Opdrachten');
const voltooideOpdrachtRoutes = require('./api/routes/voltooideOpdrachten');

mongoose.connect('mongodb://localhost:27017/test');

// app.use((req, res, next) => {
// //     res.header('Access-Control-Allow-Origin', '*');
// //     res.header('Access-Control-Allow-Headers','Origin, X-Requested-Width, Content-Type, Accept, Authorization');
// //     if (req.method === 'OPTIONS') {
// //         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET' );
// //         return res.status(200).json({})
// //     }
// // });
mongoose.connect('mongodb://localhost:27017/test');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/Beloningen', beloningRoutes);
app.use('/Gebruikers', gebruikerRoutes);
app.use('/Opdrachten', opdrachtRoutes);
app.use('/voltooideOpdrachten', voltooideOpdrachtRoutes);

var db = mongoose.connection;

app.get('/', (req, res)=> {
   res.send('Hello World');
});

app.listen(3000, ()=>{
    console.log("Server is running");
});