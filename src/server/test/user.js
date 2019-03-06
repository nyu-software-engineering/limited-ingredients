process.env.NODE_ENV = 'test';//is this neccesary? - casey note

let mongoose = require('mongoose');
let User = require('../models/User');
let logger = require ("mocha-logger");

//require dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);


let user = {
    name: "test1",
    email: "email1@gmail.com",
    password: "password1"
};

let user_login = {
    email: "email1@gmail.com",
    password: "password1"
}
let user_taken = new User();
user_taken.name = "Taken"; 
user_taken.email = "alreadytaken@gmail.com"; 
user_taken.password = "12345678";

describe ('User',  () => {
    
    beforeEach((done) => {
      //empty the db before each test
        User.remove({}, (err) => {
            done();
        });  
    });
    
    //Test the register route 
    describe('/POST api/users/register', () => {
        
        user_taken.save().then(
            function(err, result){
                if (err){
                    console.log(err);
                }
                else{
                    console.log("user saved succesfully!");
                }
        });
        it ('should not register an account whose email is already stored in the db', done => {
            chai.request(server)
                .post('/api/users/register')
                .send(user_taken)
                .end((err, result) => {
                    if (err){
                        done(err);
                    }
                    else{
                        res.should.have.status(400);
                        res.body.should.have.property('email').deep.equal({
                            "email": "Email already exists"
                        });
                    }
                    
                }).finally(done);
        });
        
        it ('should register and login a user if the input is valid', (done) => {
            
            chai.request(server)
                .post('/api/register')
                .send(user)
                .end ((err,res) => {
                    if (err){
                        done(err);
                        logger.log("err: ", err);
                    }
                    else{
                        logger.log("res name: ", res.body.name);
                        res.should.have.status(200);
                        res.body.should.be.object;
                        res.body.should.have.property('_id');
                        res.body.should.have.property('name');
                        res.body.should.have.property('email');
                        res.body.should.have.property('password');
                          
                        //follow up with login
                        chai.request(server)
                            .post('/api/login')
                            .send(user_login)
                            .end((err,res) => {
                                logger.log("login");
                                res.should.have.status(200);
                                res.body.should.have.property('token');
                                let token = res.body.token;
                                logger.log("token: ", token);
                                done();
                        }); 
                           
                    }                                     
                });    
        });
    });
});
