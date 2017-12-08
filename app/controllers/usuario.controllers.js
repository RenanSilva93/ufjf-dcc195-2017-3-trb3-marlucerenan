var Usuario = require('mongoose').model('Usuario');

module.exports.novoUsuario = function(req, res, next) {
  var novo = new Usuario(req.body);
  novo.save().then(
  function(u){
    res.json(u);
  },
  function(err){
    return next(err);
  });
}
module.exports.listarUsuario = function(req, res, next){
  Usuario.find({}).then(
    function(usuarios){
      res.json(usuarios);
    },
    function(err){
      return next(err);
    });
};

module.exports.detalhes = function(req, res, next){
  res.json(req.usuario);
};

module.exports.usuarioPorId = function(req, res, next, id){
  Usuario.findOne(
    {"_id": id})
    .then(
    function(usuario) {
      req.usuario = usuario;
      next();
    },
    function (err){
      next(err);
    }
);
};

module.exports.editaUsuario = function(req, res, next){
	if(req.method=='GET'){
      Usuario.findOne(
      {"_id": req.query.id}).then(
        function(usuario) {
          res.render('usuario/editar', {'usuario': usuario,'usuarioLogado':req.session.usuarioLogado});
        },
        function (err){
          next(err);
        }
      );
    }else{
      Usuario.findByIdAndUpdate(
	  req.body.id, { 
	  $set: {nome: req.body.nome,email: req.body.email }}, { new: true }, function (err, usuario) {
        if (err) return handleError(err);
        res.redirect('/usuario.html')
      });
}

}

module.exports.removeUsuario = function(req, res, next){
  Usuario.findByIdAndRemove(
      req.body.id
    ).then(
      function(usuario){
        res.redirect("/usuario.html");
      },
      function(err){
        return next(err);
      }
)
}

module.exports.listarUsuarioHtml = function(req, res, next){
  Usuario.find({}).then(
    function(usuarios){
      
      res.render('usuario/listar',{usuarios: usuarios, 'usuarioLogado':req.session.usuarioLogado});
    
    },
    function(err){
      
      return next(err);
    });
};

module.exports.cadastrarUsuarioHtml = function(req, res, next){
  if(req.method == 'GET'){
    res.render('usuario/novo', {'usuarioLogado':req.session.usuarioLogado});
  }
  else if(req.method == 'POST'){
    var novo = new Usuario(req.body);
    novo.save().then(
    function(u){
      res.redirect("/usuario.html");
    },
    function(err){
      return next(err);
    });
  }
}

module.exports.detalhesUsuarioHtml = function(req, res, next){
  Usuario.findOne(
    {"_id": req.query.id})
    .then(
    function(usuario) {
      res.render('usuario/detalhes', {'usuario': usuario, 'usuarioLogado':req.session.usuarioLogado});
    },
		function (err){
		  next(err);
		}
	);
};

module.exports.login = function(req,res,next){
  if(req.query.id){
    Usuario.findOne(
    {"_id": req.query.id}).then(
      function(usuario) {
        req.session.usuarioLogado = usuario;
        res.redirect('/index.html');
      },
      function (err){
        next(err);
      }
    );
  }else{
    res.redirect('/index.html');
  }
}
module.exports.logout = function(req,res,next){
  req.session.usuarioLogado = null;
  res.redirect('/index.html');
}
