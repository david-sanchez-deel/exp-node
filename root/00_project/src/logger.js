const environment = require('./environment');

const logger = require('pino')({
  prettyPrint: environment.env === 'local',
})


class Logger {
  #child;

  constructor(context) {
    this.#child = logger.child({ context })
  }

  info(message) {
    this.#child.info(message);
  }
}
module.exports = Logger;
