function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function createRandomUsers() {
  Client.find({})
    .then(async (clients) => {
      const random = require('random-name');
      if (clients.length === 0) {
        for (let i = 0; i < 10; i++) {
          const numberOfDebts = getRandomInt(1, 10);
          const firstName = random.first();
          const lastName = random.last();
          let debts = [];
          let latest = new Date(2002, 0, 1);
          for (let i = 0; i < numberOfDebts; i++) {
            const debtDate = randomDate(latest, new Date());
            debts.push({
              description: `Inadimplencia gerada para testes ${i}`,
              value: getRandomInt(10, 8000),
              date: debtDate,
            });
            latest = debtDate;
          }
          let newClient = new Client({ firstName, lastName, debts });
          await newClient.save();
        }
      }
    })
    .catch((err) => {
      console.log('err');
    });
}

module.exports = { createRandomUsers };
