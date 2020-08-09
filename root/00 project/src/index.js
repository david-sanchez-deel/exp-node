const server = require("./libs/server");
const environment = require("./environment");
var multer = require("multer");
var upload = multer();
var promisify = require("util").promisify;

const app = server();

app.get("/status", (req, res) => res.ok("OK"));

app.post("/login/google", (req, res) => {
  res.created();
});

app.post("/v1/me/ticket", async (req, res) => {
  await promisify(upload.single("ticket"))(req, res);
  console.log("File", req.file);
  console.log("Body", req.body);
  res.created();
});

app.use((_, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  return true;
});

app.listen(environment.port).then((config) => {
  console.log("Listening at", config.port);
});
