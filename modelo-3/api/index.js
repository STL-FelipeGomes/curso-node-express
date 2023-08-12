const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send({ messagem: 'Hello World!' });
});

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
});

module.exports = app;
