module.exports = function (app){
  var rota = require("../controllers/compras.controllers")
  app.use("/compras/listar_compras.html",rota.listarCompras)
  app.use("/compras/detalhe_compras.html",rota.detalheCompras)
  app.use("/compras/nova_compras.html",rota.novaCompras)
  app.use("/compras/excluir_compras.html",rota.excluirCompras)
  app.use("/compras/editar_compras.html",rota.editarCompras)
  app.use("/compras/atribuirInteresse_compras.html",rota.atribuirInteresseCompras)
}
