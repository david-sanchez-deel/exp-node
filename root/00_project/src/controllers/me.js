const userService = require('../services/user-service');
const jwtService = require('../services/jwt-service');

module.exports = async function me({ headers }) {
  const authorization = headers.authorization || '';
  const { name } = jwtService.verify(authorization.split(' ')[1])
  return { data: await userService.getByName(name) };
};
