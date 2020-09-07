import { constants } from "@exp/constants"

export function Get(path) {
  return (target, property) => {
    const name = target.constructor.name
    constants.routes[name] = constants.routes[name] || { paths: {}, url: '', target: null };
    constants.routes[name].paths[path] = { property, method: 'GET' };
  }
}
