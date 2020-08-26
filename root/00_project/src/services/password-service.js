const crypto = require('crypto');

const genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex')
          .slice(0,length);
};
const sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
};

function hashPassword(userPassword, salt = genRandomString(16)) {
  const password = sha512(userPassword, salt);
  return { password, salt };
}

module.exports = {
  hashPassword
}
