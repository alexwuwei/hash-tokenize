'use strict';

let jwt = require('jsonwebtoken');
let User = require('../models/user');
let bodyParser = require('body-parser');


module.exports = (router) => {
  router.post('/login', (req, res) => {
    console.log(req.headers.authorization);
    let authArray = req.headers.authorization.split(' ');
    console.log('authArray is ' + authArray);
    let method = authArray[0];
    console.log('method is ', method);
    let base64ed = authArray[1];
    let authBuffer = new Buffer(base64ed, 'base64').toString().split(':');
    console.log('auth buffer is ', authBuffer);
    let name = authBuffer[0];
    let password = authBuffer[1];
    console.log('method, name and pass are: ', method, name, password);

    User.find({name: name}, (err, user) => {
      console.log('user is ' + user);
      let valid = user.compareHash(password)
      if (!valid) {
        return res.json({status: 'fail!!!'})
      }
      res.json({token: user.generateToken()});
    });
  });
  router.post('/users', (req, res) => {
    console.log('POST route hit for /users');
    console.log(req.body);
    var newUser = new User(req.body);
    newUser.save((err, user) => {
      res.json(user);
    });
  });
  router.get('/users', (req, res) => {
    console.log('GET route hit for /users');
    User.find({}, (err, users) => {
      console.log('users are: ' + users);
      res.json({data: users});
      // res.end();
    });
  });
}
