const jwtService = require('./jwt-service');

const assert = require('assert').strict;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const environment = require('../environment');

describe('JwtService', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  describe('sign', () => {
    it('should sign the token', () => {
      // assert.equal(jwtService.sign({ name: 'david' }), 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGF2aWQiLCJpYXQiOjE1OTg5MDg2ODgsImV4cCI6MTU5ODkxMjI4OCwiYXVkIjoiZXhwIiwiaXNzIjoiZXhwIn0.rDh5dZDOJVJMnskgJiAR2Rp9S3D3IYmolbjREh8AFpk');
      // V2
      const sign = sandbox.stub(jwt, 'sign').returns('token');

      const token = jwtService.sign({ name: 'david' });
      sinon.assert.calledWith(sign, { name: 'david' }, environment.jwtKey, { expiresIn: '1h', audience: 'exp', issuer: 'exp' });
      assert.equal(token, 'token');
    });
  });

  describe('verify', () => {
    it('should verify the token', () => {
      const verify = sandbox.stub(jwt, 'verify').returns('token');

      const token = jwtService.verify({ name: 'david' });
      sinon.assert.calledWith(verify, { name: 'david' }, environment.jwtKey, { audience: 'exp', issuer: 'exp' });
      assert.equal(token, 'token');
    });
  });

  afterEach(() => {
    sandbox.restore();
  })
});
