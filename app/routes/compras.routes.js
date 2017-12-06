module.exports = function (app){
  var rota = require("../controllers/compras.controllers")
  app.use("/compras.html",rota.compras)
  app.use("/listar_compras.html",rota.listarCompras)
  app.use("/listar_compras.html",rota.listarCompras)
  app.use("/nova_compras.html",rota.novaCompras)
}
