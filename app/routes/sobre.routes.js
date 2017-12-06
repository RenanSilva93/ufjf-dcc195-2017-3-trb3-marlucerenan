module.exports = function (app) {
  var rota = require("../controllers/sobre.controllers")
  app.use("/sobre.html",rota.sobre)
}
