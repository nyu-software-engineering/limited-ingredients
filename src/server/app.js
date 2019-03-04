/** require dependencies */
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/user");
const app = express();

//const routes = require('./routes/');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');
//const session = require('express-session');
//const flash = require('connect-flash');

const router = express.Router();
//const React = require('react');
//const ReactDOMServer = require('react-dom/server');

//const url = process.env.MONGODB_URI || "mongodb://localhost:27017/limited_ingredients"

/* set up routes */
//routes(router);
// routes 
app.use(bodyParser.urlencoded({ extended: false }));
/** set up middlewares */
app.use(bodyParser.json());
//DB Config
//const db = require("./config/keys").mongoURI;
const config_keys = require("./config/keys");
const config = require("config");
console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));

//connect to MongoDB
/*
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));
*/
console.log("app.settings.env: ", app.settings.env);
mongoose.connect(config_keys.mongoURI[app.settings.env], function(err, res) {
    if(err) {
      console.log('Error connecting to the database. ' + err);
    } else {
      console.log('Connected to Database: ' + config_keys.mongoURI[app.settings.env]);
    }
  });
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

const port = 5000 || process.env.PORT;

//app.use('/static',express.static(path.join(__dirname,'static')))
app.use('/api', router);
//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}
//app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser);//get info from html forms

router.get('/', (req,res) => {
	res.json({message: 'Hello, world!'});
});
/** start server */
app.listen(port, () => {
    console.log(`Server up and running at port: ${port} !`);
});
module.exports = app; //for testing