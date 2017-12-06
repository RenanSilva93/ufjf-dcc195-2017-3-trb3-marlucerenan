
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ComprasSchema = new Schema({
  nome: String,
  preco_base: Number,
  preco: Number,
  somaInteresse: Number,
  numeroInteresse :Number,
})
mongoose.model('Compras',ComprasSchema)
