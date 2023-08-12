const bodyParser = require('body-parser');
const pessoas = require('./pessoasRoutes.js');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(pessoas);
};
