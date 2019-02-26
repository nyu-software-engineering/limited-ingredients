/** require dependencies */
const express = require("express");
const routes = require('./routes/');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();
const React = require('react');
const ReactDOMServer = require('react-dom/server');

//const url = process.env.MONGODB_URI || "mongodb://localhost:27017/limited_ingredients"

/** connect to MongoDB datastore */
//try {
//    mongoose.connect(url, {
//        //useMongoClient: true
//			useNewUrlParser: true,
//    })    
//} catch (error) {
//    
//}

let port = 5000 || process.env.PORT;

/** set up routes */
routes(router);

/** set up middlewares */
app.use(bodyParser.json());
//app.use('/static',express.static(path.join(__dirname,'static')))

app.use('/api', router);

/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});