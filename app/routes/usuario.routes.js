module.exports = function (app) {
  var handlers = require("../controllers/usuario.controllers");
  app.use('/usuario.html', handlers.listarUsuarioHtml);
  app.use('/cadastro-usuario.html', handlers.cadastrarUsuarioHtml);
  app.use('/detalhes-usuario.html', handlers.detalhesUsuarioHtml);
  app.use('/usuario/exclui-usuario.html', handlers.removeUsuario);
  app.use('/usuario/editar.html', handlers.editaUsuario);
  app.use('/login.html',handlers.login);
  app.use('/logout.html',handlers.logout)
  app.route('/usuario')
    .post(handlers.novoUsuario)
    .get(handlers.listarUsuario);
  app.route('/usuario/:usuarioId')
    .get(handlers.detalhes)
    .put(handlers.editaUsuario)
    .delete(handlers.removeUsuario);

  app.param('usuarioId', handlers.usuarioPorId);

}
