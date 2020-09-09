import * as _ from 'lodash';

export class ServiceMock {
  public static instanceOf(...factories: any[]): any {
    const instance = new ServiceMock();
    
    const properties = _.flatMapDeep(factories, (factory) => [Object.keys(factory.prototype), Object.getOwnPropertyNames(factory.prototype)]);
    for (const property of properties) {
      instance[property] = jest.fn();
    }
    return instance;
  }
}
