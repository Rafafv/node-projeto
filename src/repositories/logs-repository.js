const logs = require('../app/models/logs');

exports.logs = async (data)=>{
   const log = new logs(data);
   await log.save(); 
};