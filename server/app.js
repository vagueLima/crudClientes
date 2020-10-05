const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const { createRandomUsers } = require('./randomUsers');
const Client = require('./models/Client');

mongoose.set('useCreateIndex', true);
mongoose.connect(
  'mongodb+srv://admin:admin2@pipedrivertobling.xtpd1.gcp.mongodb.net/clients?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(morgan('tiny'));
app.use(bodyParser.json());

createRandomUsers();
app.get('/client', function (req, res) {
  Client.find({})
    .then((clients) => {
      clients = clients.map((client) => {
        const totalDebt = client.debts.reduce((acc, debt) => {
          return acc + debt.value;
        }, 0);

        return {
          firstName: client.firstName,
          lastName: client.lastName,
          debts: client.debts,
          totalDebt,
        };
      });
      res.status(200).json({ clients });
    })
    .catch((err) => {
      res.status(500).send('Problem accessing db');
    });
});

app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), function () {
  console.log('Server started on port ' + app.get('port'));
});
