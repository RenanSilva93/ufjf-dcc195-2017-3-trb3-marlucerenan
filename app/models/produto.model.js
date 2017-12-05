var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ProdutoSchema = new Schema({
  nome: String,
  precoBase: Number,
  preco: Number,
})
mongoose.model('Produto',ProdutoSchema)
