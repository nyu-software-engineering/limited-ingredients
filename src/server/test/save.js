process.env.NODE_ENV = 'test';
var assert = require('assert');
let mongoose = require('mongoose');
let User = require('../models/User');

//require dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);
let logger = require ("mocha-logger");

let testUser = new User();
testUser.name = "savetest";
testUser.email = "savetest@gmail.com",
testUser.password = "12345678";

recipeId = "5ca660bb48b950aaa4769f01";
let newQuery = {};
newQuery.recipe = recipeId;
describe("Save and Delete Recipe Testing" , () => {
    beforeEach((done) => {
        //empty the db before each test
          User.remove({}, (err) => {
              done();
          });  
      });
    describe ('POST api/saveRecipe', () => {
        it ("should save a user, and then save a recipe in the user's data", function() {
            testUser.save().then (
                function (err, result){
                    if (err){
                        //done(err);
                        logger.log(err);
                    }
                    else{
                        logger.log("user saved!");
                        newQuery.userId = result["_id"];
                        it ("should save a recipe to the user's account", done => {
                            chai.request(server)
                                .post('api/saveRecipe')
                                .send(newQuery)
                                .end((err, res) => {
                                    if (err){
                                        logger.log(err);
                                    }
                                    else{
                                        logger.log(res);
                                        res.should.have.status(400);
                                        res.body.should.have.property('recipes').deep.equal({
                                            "recipes": [mongoose.Types.ObjectId(recipeId)]
                                        });    
                                    }
                                    done();
                                });
                        });
                    }
                })
            });
    });  
    /*
    describe ('POST api/deleteRecipe', () => {
        it ("should delete a recipe in the user's account", function () {                                        
            chai.request(server)
            .post("api/deleteRecipe")
            .send(newQuery)
            .end((err, res) => {
                if (err){
                    logger.log(err);
                }
                else{
                    logger.log("res after deleting recipe:");
                    logger.success(res);
                    res.should.have.status(400);
                    res.body.should.have.property('recipes').deep.equal({
                        "recipes": []
                    });
                }
                done();
            });
        });
    })
    */

});