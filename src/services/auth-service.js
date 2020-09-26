const jwt = require('jsonwebtoken');

exports.generateToken = async(data) =>{

    return jwt.sign(data, global.SALT_KEY, {expiresIn: "1d"});
};

exports.decodeToken = async(token) =>{

    const data = await jwt.verify(token, global.SALT_KEY);
    return data;
};

//funcao de Middleware
exports.authorize = async(req,res,next) =>{
   //buscar o token no body, no query string ou no headers
   const token = req.body.token || req.query.token || req.headers["x-access-token"];

   //não encontrou o token
   if(!token){
    res.status(401).json({
       message: "Acesso negado"
    });
   }
   else{
       //se encontrou verifica
       jwt.verify(token,global.SALT_KEY, function(error,decode){
            if(error){
                res.status(401).json({
                    message: "Token inválido", error:error
                 });
            }
            else{
                //token valido, continua 
                next(); //chama o controller(chama alguma funcao)
            }
       });
   }

};