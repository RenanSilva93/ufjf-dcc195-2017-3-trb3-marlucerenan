var Compras  = require('mongoose').model('Compras') 
module.exports.compras = function(req,res,next){
  if(req.method=='GET'){
      res.render('compras/compras', {principal : [
    {rota:"HOME/",link :"/"},
    {rota:"index.html",link :"/index.html"},
    {rota:"Sobre",link :"/sobre.html"},
	{rota:"Usuario",link :"/usuario.html"},
	{rota:"Compras",link :"/compras.html"},
  ]});
  }
}
