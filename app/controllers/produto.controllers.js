module.exports.produto = function(req,res,next){
  if(req.method=='GET'){
      res.render("produto/"); 
  }
}