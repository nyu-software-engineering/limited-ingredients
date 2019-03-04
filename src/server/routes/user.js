const userController = require('./../controllers/user.ctrl');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("./register");
const validateLoginInput = require("./login");

//Load User model
const User = require("../models/User").User;
  // @route POST api/users/register
  // @desc Register user
  // @access Public
  router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        console.log ("found user: ", user);
        return res.status(400).json({ email: "Email already exists" });
      } 
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, null, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
          });
        });
      });
    });

    // @route POST api/users/login
    // @desc Login user and return JWT token
    // @access Public
    router.post("/login", (req, res) => {
      // Form validation
      const { errors, isValid } = validateLoginInput(req.body);
      // Check validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const email = req.body.email;
      const password = req.body.password;
      // Find user by email
      User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
          return res.status(404).json({ emailnotfound: "Email not found" });
        }
        console.log ("found user!");

        // Check password
        bcrypt.compare(password, user.password, function (err, result){
          if (result){
            console.log("passwords matched!");
            const payload = {
              id: user.id,
              name: user.name
            };

            // Sign token
            jwt.sign(payload, keys.mongoURI.secretOrKey,{expiresIn: 31556926 },
              (err, token) => {
                if (err){
                  console.log(err);
                }
                else{
                  console.log("before sending response");
                  
                  return res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }  
              });
          }
          else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        });
          
       
       /* 
        {
          if (res){
            // User matched
            // Create JWT Payload
            console.log("passwords matched!");
            const payload = {
              id: user.id,
              name: user.name
            };
            // Sign token
            jwt.sign(payload, keys.mongoURI.secretOrKey,{expiresIn: 31556926 },
              (err, token) => {
                if (err){
                  console.log(err);
                }
                else{
                  console.log("before sending response");
                  //issue?
                  return res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }  
              });
          }
          //err, passwords dont match
          else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
          */
        
        }); 
      });
    module.exports = router;
  
    
		/**
    show user page
     *
    router
        .route('/user')
        .get(userController.editUserPage);
  
		router
        .route('/')
        .get(userController.helloWorld);
    */
