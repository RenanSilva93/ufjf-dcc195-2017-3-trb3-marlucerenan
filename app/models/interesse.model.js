var mongoose = require('mongoose')
var Schema = mongoose.Schema

var InteresseSchema = new Schema({
  produto: String,
  usuario: String,
  interesse: Number;
})
mongoose.model('Interesse', InteresseSchema)