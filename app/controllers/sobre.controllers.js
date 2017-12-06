module.exports.sobre = function (req, res, next){
  res.render('sobre/sobre',
  {nome1: "Renan Costa da Silva",
	curso: "Sistemas de Informação", 
	matricula1: "201276048",
	email1: "renan.costas@hotmail.com",
	nome2: "Marluce Aparecida Vitor",
	matricula2: "201276026",
	email2: "marlucecancio@gmail.com"})
}
