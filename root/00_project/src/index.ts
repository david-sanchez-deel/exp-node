// Require the framework and instantiate it
import "reflect-metadata";
import * as environment from './environment';
import fastify from 'fastify';
import * as Logger from './logger';
import '@exp/controllers';
import { constants } from './constants';
import { container } from 'tsyringe';
import * as mongoose from 'mongoose';

const server = fastify({
  logger: false,
});

// Load Controllers
for (const [,controller] of Object.entries(constants.routes)) {
  const controllerInstance = container.resolve(controller.target as any);
  for (const [path, data] of Object.entries(controller.paths)) {
    server[data.method.toLowerCase()](`${controller.url}/${path}`, controllerInstance[data.property].bind(controllerInstance))
  }
}

const logger = new Logger('Application');

mongoose.connect(environment.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
server.listen(environment.port, '0.0.0.0', (err) => {
  if (err) throw err;
  logger.info(`Listening at ${environment.port}`);
});
