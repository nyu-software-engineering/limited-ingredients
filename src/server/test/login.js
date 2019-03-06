process.env.NODE_ENV = 'test';//is this neccesary? - casey note
var assert = require('assert');
var should = require('chai').should();

const validator = require('./../services/AuthenticationManager').validateRegisterInput;

let invalid_password_data = {name: "test", email: "valid@valid.com"};
let invalid_email_data = {name: "test2", email: "blahblah", password: "12345678"}
let long_password_data = {name: "test", email: "valid@email.com", password: "1234567891123456789012345678901"};

describe ('Basic Login Validator Testing', function () {
    it ('should return a short password error', function (){
        let error_object = validator(invalid_password_data);
        let expected_err = {password: "Password must be at least 6 characters"};
        error_object.should.have.property('isValid').equal(false);
				console.log(error_object);
        error_object.should.have.property('errors').deep.equal(expected_err);
    });

    it ('should return an invalid email error', function (){
        let error_object = validator(invalid_email_data);
        let expected_err = {email: "Email is invalid"};
        error_object.should.have.property('isValid').equal(false);
        error_object.should.have.property('errors').deep.equal(expected_err);
    });
  it ('should return a long password error', function (){
    let error_object = validator(long_password_data);
    let expected_err = { password: "Password must be at least 6 characters"}
    error_object.should.have.property('isValid').equal(false);
    error_object.should.have.property('errors').deep.equal(expected_err);
  });
});
