var Compras = require('mongoose').model('Compras')
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

module.exports.listarCompras = function(req,res,next){
  Compras.find({}).then(

   function(compras){
    console.log(compras);
     res.render('compras/listarCompras',
	 {'compras': compras,'usuarioLogado':req.session.usuarioLogado});
   },
   function(err){
     return next(err);
   });
}

module.exports.novaCompras = function(req, res, next) {
  if(req.method=='GET'){
   res.render('compras/novaCompras',{'usuarioLogado':req.session.usuarioLogado});
 }else {
   var novo = new Compras(req.body);
   novo.save().then(
   function(Compras){
       calculaPrecos()
       res.redirect("/compras/listar_compras.html");
   },
   function(err){
     return next(err);
   });
 }
}

function calculaPrecos(){
  Compras.find({}).then(
   function(Compras){
     var maiorInteresse = Compras[0];
     for(var i in Compras){
       var compras = Compras[i]
       if(compras.somaInteresse>maiorInteresse.somaInteresse){
         maiorInteresse = compras;
       }
     }
     if(maiorInteresse.soma_interesse > 0){
       for(var i in Compras){
         var compras = Compras[i]
         if(compras.somaInteresse > 0){
           compras.preco = compras.preco_base + compras.preco_base*(compras.somaInteresse/maiorInteresse.somaInteresse);
           salvarCompras(compras)
         }else if(compras.somaInteresse == 0&& compras.preco == 0){
               compras.preco = compras.preco_base;
               salvarCompras(compras)
         }
       }
     }else{
       for(var i in Compras){
         var compras = Compras[i]
         if(compras.preco == 0){
           compras.preco = compras.preco_base
           salvarCompras(compras)
         }
       }
     }
   },
   function(err){
     return next(err);
   });
}

function salvarCompras(compras){
  Compras.findByIdAndUpdate(
    compras._id,
    compras,
    {new: true}
  ).then(
    function (compras){},
    function(err) {
      return next(err);
    }
  );
}

module.exports.detalheCompras = function(req,res,next){
    Compras.findOne(
    {"_id": req.query.id}).then(
      function(compras) {
        res.render('compras/detalheCompras', {'compras': compras,'usuarioLogado':req.session.usuarioLogado});
      },
      function (err){
        next(err);
      }
);
}

module.exports.excluirCompras = function(req,res,next){
    Compras.findByIdAndRemove(
      req.body.id
    ).then(
      function(compras){
        res.redirect("/compras/listar_compras.html");
      },
      function(err){
        return next(err);
      }
    )
}

module.exports.editarCompras = function(req,res,next){
    if(req.method=='GET'){
      Compras.findOne(
      {"_id": req.query.id}).then(
        function(compras) {
          res.render('compras/editarCompras', {'compras': compras,'usuarioLogado':req.session.usuarioLogado});
        },
        function (err){
          next(err);
        }
      );
    }else{
      Compras.findByIdAndUpdate(req.body.id, { $set: {nome: req.body.nome,preco_base: req.body.preco_base }}, { new: true }, function (err, produto) {
        if (err) return handleError(err);
        res.redirect('/compras/listar_compras.html')
      });
    }


}
