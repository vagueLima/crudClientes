const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express();
const Client = require('./models/Client');


mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/kaiji', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(morgan('tiny'))
app.use(bodyParser.json());

app.get("/clients", function(req,res){
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
  