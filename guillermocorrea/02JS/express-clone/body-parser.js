const json = () => (req, res, next) => {
  let data = [];
  req.on('data', (chunk) => data.push(chunk));
  req.on('end', () => {
    if (data.length) {
      const body = JSON.parse(data);
      req.body = body;
    }
    next();
  });
};

module.exports = { json };
