/** require dependencies */
const express = require("express");//framework
const mongoose = require('mongoose');//connect to mongodb
const cors = require('cors');//too allow api hits from external sites - post 5000 and 3000 are different
const bodyParser = require('body-parser');//to get body of post requests
//const passport = require('passport');//neccesary for user auth
const morgan = require('morgan');//show all api reqs and res
const cookieParser = require('cookie-parser');//neccesary to keep session info. 'Remember me?'

const url = "mongodb://localhost:27017/limitedIngredients";//hardcoded for now, add parameters.json


/** connect to MongoDB datastore */
try {
    mongoose.connect(url, {
      useNewUrlParser: true
    });
} catch (error) {
    console.log(error);
}

const app = express();

/* Middle Ware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(passport.initialize());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(morgan('dev')); // if dev, every request to the console
//app.use(morgan('combined'));// if production, add parameter.json

/** set up routes **/
const router = express.Router();
const routes = require('./routes/');//paths of our site
routes(router);
app.use('/api', router);//this is root of the server

const port = 5000; //hardcoded for now, add parameters.json
 
//app.use('/static',express.static(path.join(__dirname,'static'))) // If we want static resources in server

/** start server */
app.listen(port, () => {
    console.log(`SERVER ON PORT: ${port}`);
});
module.exports = app; //for testing