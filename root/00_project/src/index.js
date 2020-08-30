// Require the framework and instantiate it
const environment = require('./environment');
const status = require('./controllers/status');
const signUp = require('./controllers/sign-up');
const fastify = require('fastify');
const mongoose = require('mongoose');
const ForbiddenError = require('./errors/forbidden-error');
const login = require('./controllers/login');
const me = require('./controllers/me');
const Logger = require('./logger');

const server = fastify({
  logger: false,
});

server.get('/api/v1/status', status);
server.post('/api/v1/sign-up', signUp);
server.post('/api/v1/login', login);
server.get('/api/v1/me', me);

server.setErrorHandler(function (error, _, reply) {
  if (error.code === 'ERR_ASSERTION') {
    return reply.send({ status: '400', message: 'BadRequest'})
  }
  if (error instanceof ForbiddenError) {
    return reply.send({ status: '403', message: error.message })
  }
  if (error.name === 'MongoError' && error.code === 11000) {
    return reply.send({ status: '400', message: 'BadRequest', code: 'key-error' })
  }
  console.error('Error', JSON.stringify(error));
  reply.send({ status: '500', message: 'Server Error'});
});
const logger = new Logger('Application');
(async () => {
  logger.info('Starting');
  await mongoose.connect(environment.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  server.listen(environment.port, '0.0.0.0', (err) => {
    if (err) throw err;
    logger.info(`Listening at ${environment.port}`);
  });
})();
