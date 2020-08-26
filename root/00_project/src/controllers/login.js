const userService = require('../services/user-service');

module.exports = async function login({ body }) {
  return userService.login(body);
};
