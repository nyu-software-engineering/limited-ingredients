process.env.NODE_ENV = 'test';
var assert = require('assert');
var should = require('chai').should();

let validator = require('../routes/register')
let invalid_email_data = {name: "test", email: "asdfg", password: "12345678"};
let short_password_data = {name: "test", email: "valid@email.com", password: "12345"};
let long_password_data = {name: "test", email: "valid@email.com", password: "1234567891123456789012345678901"};

describe ('Basic Register Validator Testing', function () {
    it ('should return invalid email error', function (){
        let error_object = validator(invalid_email_data);
        let expected_err = {email: "Email is invalid"}
        error_object.should.have.property('isValid').equal(false);
        error_object.should.have.property('errors').deep.equal(expected_err);
    });

    it ('should return a short password error', function (){
        let error_object = validator(short_password_data);
        let expected_err = { password: "Password must be at least 6 characters"}
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
