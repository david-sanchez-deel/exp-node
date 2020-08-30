const userService = require('../services/user-service');

module.exports = async function login({ body }, reply) {
  const token = await userService.login(body);
  reply.code(200).header('Content-Type', 'application/jwt').send(token);
};
