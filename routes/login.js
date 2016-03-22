'use strict';

let jwt = require('jsonwebtoken');
let User = require('../models/user');

module.exports = (router) => {
  router.post('/login', (req, res) => {
    console.log(req.headers.authorization);
    let authArray = req.headers.authorization.split(' ');
    let method = authArray[0];
    let base64ed = authArray[1];
    let authBuffer = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authBuffer[0];
    let password = authBuffer[1];
    console.log(method, name, password);

    User.find({name: name}, user => {
      let valid = user.compareHash(password)
      if (!valid) {
        return res.json({status: 'fail!!!'})
      }
      res.json({token: user.generateToken()});
    })
  })
}
