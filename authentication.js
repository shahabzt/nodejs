function authLogger(req,res,next){
    console.log("authentication....")
    next()
}

module.exports = authLogger