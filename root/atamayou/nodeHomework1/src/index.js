const server = require("./libs/server");
const environment = require("./environment");
var multer = require("multer");
var upload = multer();
var promisify = require("util").promisify;
const { google } = require('googleapis');
const OAuth2Data = require('./google_secret.json')
const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
const url = require('url');
const path = require('path');
var authed = false;

const app = server();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
  }  
});   
upload = multer({ storage: storage});    

app.get("/status", (req, res) => res.ok("OK"));

app.get('/login/google', (req, res) => {
  if (!authed) {
      // Generate an OAuth URL and redirect there
      const url = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: 'https://www.googleapis.com/auth/gmail.readonly'
      });
      console.log(url)
      res.redirect(url);
  } else {
      const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
      gmail.users.labels.list({
          userId: 'me',
      }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          const labels = res.data.labels;
          if (labels.length) {
              console.log('Labels:');
              labels.forEach((label) => {
                  console.log(`- ${label.name}`);
              });
          } else {
              console.log('No labels found.');
          }
      });
      res.send('Logged in')
  }
})

app.get('/auth/google/callback', function (req, res) {
  const code = url.parse(req.url,true).query.code;
  if (code) {
      // Get an access token based on our OAuth code
      oAuth2Client.getToken(code, function (err, tokens) {
          if (err) {
              console.log('Error authenticating')
              console.log(err);
          } else {
              console.log('Successfully authenticated');
              oAuth2Client.setCredentials(tokens);
              authed = true;
              res.redirect('/status')
          }
      });
  }
});

app.get("/v1/me/ticket", function (req, res) {
  const html = '<form method="POST" enctype="multipart/form-data"><input type="file" name="ticket"/> <input type="submit"/></form>';
  res.writeHead(200, {"Content-Type": "text/html"});  
  res.write(html);
  });

app.post("/v1/me/ticket", async (req, res) => { 
  await promisify(upload.single("ticket"))(req, res);
  console.log("File", req.file);
  console.log("Body", req.body);
  res.ok("Upload completed!");
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
