const User = require('../schemas/user');
const { hashPassword } = require('./password-service');
const ForbiddenError = require('../errors/forbidden-error');
const jwtService = require('./jwt-service');
const assert = require('assert').strict;

const userService = {
  create({ name, password }) {
    assert.ok(name !== undefined && name.length);
    assert.ok(password !== undefined && password.length);
    const newPassword = hashPassword(password);
    return User.create({
      name,
      password: newPassword.password,
      salt: newPassword.salt,
    });
  },
  async login({ name, password }) {
    const user = await User.findOne({
      name,
    });
    if (!user) {
      console.warn('Error, user not found');
      throw new ForbiddenError();
    }
    const newPassword = hashPassword(password, user.salt);
    if (user.password !== newPassword.password) {
      console.warn('Error, password miss match');
      throw new ForbiddenError();
    }

    const token = jwtService.sign({ name });
    return token;
  },
  getByName(name) {
    return User.findOne({
      name,
    });
  }
};

module.exports = userService;
