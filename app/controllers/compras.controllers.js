var Compras = require('mongoose').model('Compras')

module.exports.listarCompras = function(req,res,next){
  Compras.find({}).then(

   function(compras){
	   atualizarPrecos();
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
       atualizarPrecos()
       res.redirect("/compras/listar_compras.html");
   },
   function(err){
     return next(err);
   });
 }
}

function atualizarPrecos(){
  Compras.find({}).then(
   function(compras){
     var maiorInteresse = compras[0];
     var menorInteresse = compras[0];
	 
     for(var i in compras){ //objeto com maior interesse
       var compra = compras[i]
       if(compra.somaInteresse > maiorInteresse.somaInteresse){
         maiorInteresse = compra;
       }
       if(compra.somaInteresse < menorInteresse.somaInteresse){
         menorInteresse = compra;
       }
     }

     if(maiorInteresse.somaInteresse > 0){ 
       for(var i in compras){
         var compra = compras[i]
           compra.preco = (1 + (compra.somaInteresse-menorInteresse.somaInteresse)/(maiorInteresse.somaInteresse-menorInteresse.somaInteresse)) * compra.preco_base;
           salvarCompras(compra)
       }
     }else{
       for(var i in Compras){ //se for tudo 0, permanece como ta
         var compra = Compras[i]
         if(compra.preco == 0){
           compra.preco = compra.preco_base
           salvarCompras(compra)
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

module.exports.atribuirInteresseCompras = function(req,res,next){

    if(req.method=="GET"){
      Compras.findOne(
      {"_id": req.query.id}).then(
        function(compras) {
          req.session.compras = compras;
          res.render('compras/interesseCompras', {'compras': compras,'usuarioLogado':req.session.usuarioLogado});
        },
        function (err){
          next(err);
        }
      );
    }else{
        var interesse = req.body.interesse;
        var valor = 0;
        if(interesse == 1){
          valor = 1
        }else if(interesse == 2){
			valor = 2
		  }else if(interesse == 3){
			  valor = 3;
			}
					
        var compra = req.session.compras;
		Compras.findOne( 
		{"_id": compra._id}).then(
		function(compras) {
			var soma = compras.somaInteresse + valor;
			//trouxe o produto
			//fazer update da soma
			Compras.findByIdAndUpdate(
			compras._id, { 
			$set: {somaInteresse: soma}}, { new: true }, function (err, compras) {
			//if (err) return handleError(err);
				atualizarPrecos();
				res.redirect("/compras/listar.html")
			});
		},
		function (err){
			next(err);
			}
		);
	}
}
