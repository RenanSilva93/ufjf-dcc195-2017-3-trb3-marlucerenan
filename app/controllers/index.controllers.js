module.exports.principal = function(req,res,next){
  res.render('principal',{principal : [
    {rota:"HOME/",link :"/"},
    {rota:"index.html",link :"/index.html"},
    {rota:"Sobre",link :"/sobre.html"},
	{rota:"Usuario",link :"/usuario.html"},
	{rota:"Compras",link :"/compras/listar_compras.html"},
  ], 'usuarioLogado':req.session.usuarioLogado})
}
