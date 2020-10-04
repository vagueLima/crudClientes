const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express();
const Client = require('./models/Client');


mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://admin:admin@pipedrivertobling.xtpd1.gcp.mongodb.net/clients?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(morgan('tiny'))
app.use(bodyParser.json());
Client.find({}).then(async clients=>{
    const random = require('random-name')
    if(clients.length === 0){
        for(let i=0; i<10; i++){
            let newClient = new Client({firstName:random.first(), lastName: random.last()})
            await newClient.save()
        }
    }
}).catch(err=>{
    console.log("err")
})
app.get("/client", function(req,res){
    Client.find({}).then(clients=>{
        res.status(200).json({clients})
    }).catch(err=>{
        res.status(500).send("Problem accessing db")
    })
})

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {

    console.log('Server started on port ' + app.get('port'));
  });
  