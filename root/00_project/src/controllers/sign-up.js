const userService = require('../services/user-service');

module.exports = async function signUp({ body }) {
  const user = await userService.create(body);
  return { name: user.name, _id: user._id };
};
