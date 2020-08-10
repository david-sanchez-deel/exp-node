const express = require('./express-clone');
const bodyParser = require('./express-clone/body-parser');

const app = express();

// Example middlewares
app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.debug(`${req.method} - ${req.url}`);
  next();
});

// Set headers
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('custom-header', 'Custom - header');
  next();
});

// Example in memory data
const books = [
  { title: 'The Alchemist', author: 'Paulo Coelho', year: 1988 },
  { title: 'The Prophet', author: 'Kahlil Gibran', year: 1923 },
];

const authors = [
  { name: 'Paulo Coelho', countryOfBirth: 'Brazil', yearOfBirth: 1947 },
  { name: 'Kahlil Gibran', countryOfBirth: 'Lebanon', yearOfBirth: 1883 },
];

// Example routes
app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

app.get('/books', (req, res) => {
  res.status(200).send(books);
});

app.post('/books', (req, res) => {
  const book = req.body;
  books.push(book);

  res.status(200).send(books);
});

app.get('/authors', (req, res) => {
  res.status(200).send(authors);
});

app.post('/authors', (req, res) => {
  const author = req.body;
  authors.push(author);

  res.status(200).send(authors);
});

app.listen(8080, () => console.log('listening on 8080'));
