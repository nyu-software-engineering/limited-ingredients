/** require dependencies */
const express = require("express");
const routes = require('./routes/');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const router = express.Router();
//const React = require('react');
//const ReactDOMServer = require('react-dom/server');

// require('../config/passport')(passport); // pass passport for configuration


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

/* set up routes  WHAT DOES THIS DO */
routes(router);
// routes ======================================================================
app.use(bodyParser.urlencoded({ extended: false }));
//require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
/** set up middlewares */
app.use(bodyParser.json());
//app.use('/static',express.static(path.join(__dirname,'static')))
app.use('/api', router);
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser);//get info from html forms
/*
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
*/
router.get('/', (req,res) => {
	res.json({message: 'Hello, world!'});
});
/** start server */
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});