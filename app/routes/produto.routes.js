module.exports = function(app){
  var rota = require("../controllers/produto.controllers")
  app.use("/produto.html",rota.produto)
}
