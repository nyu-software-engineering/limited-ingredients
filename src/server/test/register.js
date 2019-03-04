process.env.NODE_ENV = 'test';
var assert = require('assert');
var should = require('chai').should();

let validator = require('../routes/register')
let invalid_email_data = {name: "test", email: "asdfg", password: "12345"};

describe ('Basic Register Validator Testing', function () {
    it ('should return invalid email and short password error', function (){
        let error_object = validator(invalid_email_data);
        let expected_err = {email: "Email is invalid", password: "Password must be at least 6 characters"}
        error_object.should.have.property('isValid').equal(false);
        error_object.should.have.property('errors').deep.equal(expected_err);
    })
});
