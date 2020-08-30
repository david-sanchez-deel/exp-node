const assert = require('assert').strict;
const jwt = require('jsonwebtoken');
const environment = require('../environment');

const jwtService = {
  sign({ name }) {
    return jwt.sign({ name }, environment.jwtKey, { expiresIn: '1h', audience: 'exp', issuer: 'exp' });
  },
  verify(token) {
    return jwt.verify(token, environment.jwtKey, { audience: 'exp', issuer: 'exp' });
  }
};

module.exports = jwtService;
