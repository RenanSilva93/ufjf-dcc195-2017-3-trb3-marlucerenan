module.exports = function(app){
	
  var rota = require("../controllers/usuario.controllers")
  app.use("/usuario.html",rota.usuario)
  app.use("/novo.html",rota.novo)
}
