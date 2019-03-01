/** require dependencies */
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require("./routes/user");
const app = express();

const routes = require('./routes/');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

const router = express.Router();
//const React = require('react');
//const ReactDOMServer = require('react-dom/server');

// require('../config/passport')(passport); // pass passport for configuration


//const url = process.env.MONGODB_URI || "mongodb://localhost:27017/limited_ingredients"

/* set up routes */
//routes(router);
// routes 
app.use(bodyParser.urlencoded({ extended: false }));
/** set up middlewares */
app.use(bodyParser.json());
//DB Config
const db = require("./config/keys").mongoURI;
//connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

const port = 5000 || process.env.PORT;

//app.use('/static',express.static(path.join(__dirname,'static')))
app.use('/api', router);
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser);//get info from html forms

router.get('/', (req,res) => {
	res.json({message: 'Hello, world!'});
});
/** start server */
app.listen(port, () => {
    console.log(`Server up and running at port: ${port} !`);
});