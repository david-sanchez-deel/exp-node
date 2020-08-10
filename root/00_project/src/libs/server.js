const http = require("http");

class Response {
  #res;
  constructor(res) {
    this.#res = res;

  }

  send(status, data) {
    this.#res.statusCode = status || 200;
    switch (typeof data) {
      case "object":
        this.#res.setHeader("content-type", "application/json");
        this.#res.write(JSON.stringify(data));
        break;
      case "string":
        this.#res.write(data ?? "");
        break;
      default:
        console.warn("Response data type is not valid");
        break;
    }
    this.#res.end();
  }

  notFound(data) {
    this.send(404, data ?? { status: 404, code: "not-found" });
  }

  setHeader(key, value) {
    this.#res.setHeader(key, value);
    return this;
  }

  created(data) {
    this.send(201, data ?? { status: 201, code: "created" });
  }

  ok(data) {
    this.send(200, data ?? { status: 200, code: "ok" });
  }
}

class App {
  #server;
  #listeners = {};
  #middleware = [];

  constructor() {
    this.#server = http.createServer(this.#listener.bind(this));
  }

  async #listener(req, res) {
    const response = this.#createRes(res);
    for (const middleware of this.#middleware) {
      if (!await middleware(req, response)) {
        return;
      }
    }
    const route = `${req.method} ${req.url}`;

    const listener = this.#listeners[route];
    if (listener) {
      listener(req, response);
    } else {
      if (req.method === 'OPTIONS') {
        return response.ok();
      }
      response.notFound();
    }
  }

  #createRes(res) {
    return new Response(res);
  }

  get(route, cb) {
    this.#listeners[`GET ${route}`] = cb;
  }

  post(route, cb) {
    this.#listeners[`POST ${route}`] = cb;
  }

  use(cb) {
    this.#middleware.push(cb);
  }

  listen(port) {
    const portToUse = Number(port) || 3000;
    this.#server.listen(portToUse, "0.0.0.0");
    return Promise.resolve({ port: portToUse });
  }
}

module.exports = () => new App();
