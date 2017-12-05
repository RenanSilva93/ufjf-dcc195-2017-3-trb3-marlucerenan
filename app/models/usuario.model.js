var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UsuarioSchema = new Schema({
  nome: String,
  email: String,
})
mongoose.model('Usuario',UsuarioSchema)