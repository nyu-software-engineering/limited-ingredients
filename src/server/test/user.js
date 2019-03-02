process.env.NODE_ENV = 'test';
let mongoose = require('mongoose');
let User = require('../models/User').User;


//require dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
chai.use(chaiHttp);

describe ('User',  () => {
    
    beforeEach((done) => {
      //empty the db before each test
        User.remove({}, (err) => {
            done();
        });  
    });
    
    /* Test the register route */
    describe('/POST api/users/register', () => {
        it ('should register a user account if the input is valid', (done) => {
            let user = {
                name: "test1",
                email: "email1@gmail.com",
                password: "password1"
            };
            chai.request(server)
                .post('/register')
                .send(user)
                .end ((err,res) => {
                    if (err){
                        done(err);
                        console.log("err: ", err);
                    }
                    else{
                        console.log("res: ", res);
                        res.should.have.status(200);
                        res.body.should.be.json;
                        res.body.should.have.property('_id');
                        res.body.should.have.propety('name');
                        res.body.should.have.property('email');
                        res.body.should.have.property('password');
                        done();    
                    }
                    
                });
                
        });

    });

});