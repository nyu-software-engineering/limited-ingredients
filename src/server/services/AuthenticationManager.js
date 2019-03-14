const Validator = require("validator");
const isEmpty = require("is-empty");
const User = require('./../models/User');
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");


/*
	Validate Form Data For Login/Registration
*/
function validateRegisterInput(data){
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Should we add name? - casey note

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }else if (!Validator.isLength(data.password, { min: 6, max: 30})) {
    errors.password = "Password must be at least 6 characters and less than 30 characters";
  }/*
  if (!Validator.isLength(data.password, {max: 30 })) {
    errors.password = "Password must not exceed 30 characters";
  }*/

  return { errors, isValid: isEmpty(errors) };
}

/*
	Register user action
*/
function registerUser(req, res) {
  const data = req.body;
  console.log("request: ", req);
  // Form validation
  console.log("form validation")
  const {errors, isValid} = validateRegisterInput(data);
  
  // Check validation
  if (!isValid) {
//      return res.status(400).json(errors);
    return {status: 400, json: errors};
  }
  console.log("looking if user exists");
  User.findOne({email: data.email}).then(user => {
    if (user) {
      console.log("found user: ", user);
      return res.status(400).json({ email: "Email already exists" });
    }
    console.log("registering user");
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password
    });
    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, null, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
            .save()
            .then(user => {
              res.json(user);
            })
            .catch(err => {
              res.status(400).json(err);
            });
      });
    });
  });
}


/*
	Login the user
*/
function loginUser(req, res) {
  const data = req.body;

  // Form validation
  const {errors, isValid} = validateRegisterInput(data);
  // Check validation
  if (!isValid) {
//        return res.status(400).json(errors);
    return {status: 400, json: errors};
  }
  const email = data.email;
  const password = data.password;
  // Find user by email
  User.findOne({email}).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // console.log ("found user!");

    // Check password
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        console.log("passwords matched!");
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token- Why need the token? Can we use passport instead. Much easier tool to use if its possible - Casey Note
        jwt.sign(payload, "secret", {expiresIn: 31556926},
            (err, token) => {
              if (err) {
                console.log(err);
              }
              else {
                console.log("Log in valid - returning token");
                return res.json({success: true, token: "Bearer " + token});
              }
            });
      } else {
        return res.status(400).json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
}

module.exports = {
  validateRegisterInput: validateRegisterInput,
  registerUser: registerUser,
  loginUser: loginUser,
};


