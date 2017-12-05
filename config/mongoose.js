var config = require('./config');
var mongoose = require('mongoose');

module.exports = function(){
  mongoose.connect(config.db, {useMongoClient: true});
  mongoose.Promise = global.Promise;
  require("../app/models/produto.model");
  require("../app/models/usuario.model");
  require("../app/models/interesse.model");
  return mongoose;
}