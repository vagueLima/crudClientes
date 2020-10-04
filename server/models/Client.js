let mongoose = require('mongoose');

let clientSchema = mongoose.Schema({
  firstName: { type: String},
  lastName: { type: String, required: true },
  debts: { type : Array , "default" : [] }
});


const client = mongoose.model('Client', clientSchema);
module.exports = client;
