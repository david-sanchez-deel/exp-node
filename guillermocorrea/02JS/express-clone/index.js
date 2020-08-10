const http = require('http');
const ExpressResponse = require('./response');

const Application = () => {
  const routeHandlers = new Map();
  const middlewares = [];

  const setHandler = (url, handler) => {
    if (typeof url !== 'string') {
      throw new Error('url should be a string');
    }
    if (typeof handler !== 'function') {
      throw new Error('handler should be a function');
    }
    routeHandlers.set(url, handler);
  };

  /**
   * Adds a new GET route handler
   * @param {string} url
   * @param {(req: Request, res: ExpressResponse) => void} handler
   */
  const get = (url, handler) => {
    setHandler(`GET-${url}`, handler);
  };

  /**
   * Adds a new POST route handler
   * @param {string} url
   * @param {(req: Request, res: ExpressResponse) => void} handler
   */
  const post = (url, handler) => {
    setHandler(`POST-${url}`, handler);
  };

  /**
   * Adds a new PUT route handler
   * @param {string} url
   * @param {(req: Request, res: ExpressResponse) => void} handler
   */
  const put = (url, handler) => {
    setHandler(`PUT-${url}`, handler);
  };

  /**
   * Adds a new DELETE route handler
   * @param {string} url
   * @param {(req: Request, res: ExpressResponse) => void} handler
   */
  const del = (url, handler) => {
    setHandler(`DELETE-${url}`, handler);
  };

  /**
   * Add a middleware
   * @param {(req: Request, res: ExpressResponse, next: () => {})} middleware
   */
  const use = (middleware) => {
    if (typeof middleware !== 'function') {
      throw new Error('use() requires a middleware function');
    }
    middlewares.push(middleware);
  };

  /**
   * Get the main request handler
   */
  const getMainHandler = () => {
    return (req, res) => {
      const key = `${req.method}-${req.url}`;
      if (!routeHandlers.has(key)) {
        res.writeHead(404);
        res.end();
        return;
      }

      runMiddlewares(0, req, res, routeHandlers.get(key));
    };
  };

  /**
   * Recursively execute all the middlewares and lastly call the route handler.
   * The middlewares are executed in FIFO (First In, First Out) order.
   * @param {number} index The index of the middleware to run.
   * @param {Request} req
   * @param {ExpressResponse} res
   * @param {(req: Request, res: ExpressResponse) => void} routeHandler
   */
  const runMiddlewares = (index, req, res, routeHandler) => {
    if (index < middlewares.length) {
      middlewares[index](req, res, () =>
        runMiddlewares(index + 1, req, res, routeHandler)
      );
    } else {
      routeHandler(req, res);
    }
  };

  const listen = (port, callback) => {
    const server = http.createServer(getMainHandler());
    server.listen(port, callback);
    return server;
  };

  // Set the prototype of the response object
  use((req, res, next) => {
    Object.setPrototypeOf(res, ExpressResponse.prototype);
    next();
  });

  return {
    get,
    post,
    put,
    delete: del,
    use,
    listen,
  };
};

module.exports = () => Application();
