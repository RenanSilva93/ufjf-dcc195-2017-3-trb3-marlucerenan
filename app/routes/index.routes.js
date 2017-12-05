module.exports = function (app){
  var rota = require("../controllers/index.controllers")
  app.use("/",rota.principal)
  app.use("/index.html",rota.principal)
}
