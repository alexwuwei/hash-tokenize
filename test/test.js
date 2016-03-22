'use strict';

var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var request = chai.request;
var http = require('http');
// require('../server.js');
var User = require('../models/user');

describe('testing /users route', () => {
  it('should hit a GET route for /users', (done) => {
    request('localhost:3000')
    .get('/public/users')
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      done();
    });
  });
  it('should hit a POST route for /users', (done) => {
    request('localhost:3000')
    .post('/public/users')
    .send({"name":"testPerson", "group":"hr", "password":"password"})
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('name');
      done();
    });
  });
});

describe('testing /login route', () => {
  it('should hit a POST route for /login with a correct user/pass', (done) => {
    request('localhost:3000')
    .post('/public/login')
    .auth('testPerson', 'password')
    // .send({"name":"testPerson", "password":"password"})
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
      done();
    });
  });
  it('should hit a POST route for /login with an incorrect user/pass', (done) => {
    request('localhost:3000')
    .post('/public/login')
    .send({"name":"testPerswfweweon", "group":"hr", "password":"passwordsfdafewd"})
    .end((err, res) => {
      expect(err).to.not.equal(null);
      done();
    });
  });
})
