const http = require('http');

class ExpressResponse extends http.ServerResponse {
  status(statusCode) {
    this.writeHead(statusCode);
    return this;
  }

  send(body) {
    if (body === undefined) {
      this.end();
      return;
    }
    this.end(JSON.stringify(body));
  }
}

module.exports = ExpressResponse;
