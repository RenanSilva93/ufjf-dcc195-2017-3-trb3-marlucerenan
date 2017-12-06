module.exports = function (app){
  var rota = require("../controllers/compras.controllers")
  app.use("/compras/compras.html",rota.compras)
  app.use("/compras/listar_compras.html",rota.listarCompras)
//  app.use("/listar_compras.html",rota.listarCompras)
  app.use("/compras/nova_compras.html",rota.novaCompras)
}
