# Limited Ingredients
**Limited Ingredients** is a web-app that allow users to input the ingredients they have and recieve recipes based on these ingredients. These recipes are displayed with how closesly they match your ingredient specification. 

**Limited Ingredients** was first founded when a group of young an bright NYU Students all signed up for it during a DevOps course taught by Amos Bloomberg. We genuinly belived that by helping users solve the greatest problem at home (cooking with limited ingredients) we can help change the world one ingredient at a time. 

## How can you contribute?

- We are currently in the inital phase of planning the project. Any advice would be very helpful.

## How to build & test project?
Clone the project
``` 
git clone https://github.com/nyu-software-engineering/limited-ingredients.git
```
Install modules (in the server directory)
```js
cd src/server
npm init
npm install .
npm install --save bcrypt-nodejs body-parser concurrently config connect-flash cookie-parser cors express-session is-empty jsonwebtoken method-override mongoose
morgan nodemon passport passport-facebook passport-jwt react react-dom react-scripts
validator
```
Install modules (in the client directory)
```
cd src/client
npm install --save axios chai classnames enzyme enzyme-adapter-react-16 jwt-decode mocha react react-dom react-redux react-router-dom react-scripts redux redux-thunk sinon
```
Start project
```js
npm start
or 
node(mon) server.js
```
Test project (backend)
```
cd src/server
npm test 
or
npm run test-with-coverage
```




## Additional Links
[CONTRIBUTING.md](https://github.com/nyu-software-engineering/limited-ingredients/blob/master/CONTRIBUTING.md) 

[REQUIREMENTS.md](https://github.com/nyu-software-engineering/limited-ingredients/blob/master/REQUIREMENTS.md) 
