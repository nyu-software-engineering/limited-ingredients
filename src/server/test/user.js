process.env.NODE_ENV = 'test';
let mongoose = require('mongoose');
let User = require('../models/User').User;


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
describe ('User',  () => {
    
    beforeEach((done) => {
      //empty the db before each test
        User.remove({}, (err) => {
            done();
        });  
    });
    
    /* Test the register route */
    describe('/POST api/users/register', () => {
        it ('should register and login a user if the input is valid', (done) => {
            
            chai.request(server)
                .post('/api/users/register')
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

                        //follow up with login
                        chai.request(server)
                            .post('/api/users/login')
                            .send(user_login)
                            .end((err,res) => {
                                console.log("login");
                                res.should.have.status(200);
                                res.body.should.have.property('token');
                                let token = res.body.token;
                                console.log("token: ", token);
                                done();
                            });
                           
                    }
                                        
                });
           
                
        });

    });


});