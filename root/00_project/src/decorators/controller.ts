import { constants } from "@exp/constants"
import * as Logger from '../logger';
import { injectable } from 'tsyringe';

const logger = new Logger('Router');

export function Controller(url) {
  return (target) => {
    const name = target.name;
    constants.routes[name].url= url;
    constants.routes[name].target = target;
    Object.entries(constants.routes[name].paths).forEach(([key, value]) => {
      logger.info(`Map ${name}:: controller: ${value.method} ${url}/${key}`)
    });
    injectable()(target);
  };
}
