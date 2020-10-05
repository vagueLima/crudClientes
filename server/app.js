const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const Client = require('./models/Client');

mongoose.set('useCreateIndex', true);
mongoose.connect(
  'mongodb+srv://admin:admin@pipedrivertobling.xtpd1.gcp.mongodb.net/clients?retryWrites=true&w=majority',
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
Client.find({})
  .then(async (clients) => {
    const random = require('random-name');
    if (clients.length === 0) {
      for (let i = 0; i < 10; i++) {
        const numberOfDebts = getRandomInt(1, 10);
        const firstName = random.first();
        const lastName = random.last();
        let debts = [];
        for (let i = 0; i < numberOfDebts; i++) {
          debts.push({
            description: `Inadimplencia gerada automaticamente para testes ${i}`,
            value: getRandomInt(10, 8000),
            date: randomDate(new Date(2012, 0, 1), new Date()),
          });
        }
        let newClient = new Client({ firstName, lastName, debts });
        await newClient.save();
      }
    }
  })
  .catch((err) => {
    console.log('err');
  });
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
