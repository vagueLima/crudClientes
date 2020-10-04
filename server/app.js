const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const app = express();
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/kaiji', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(morgan('tiny'))
app.use(bodyParser.json());



app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
    console.log('Server started on port ' + app.get('port'));
  });
  