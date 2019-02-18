const STATUS = require('http-status');


function generateError(msg){
  return new Error(msg)
}

function errorSender(response, error){
  console.log(error)
  response.statusCode = error.code || STATUS.INTERNAL_SERVER_ERROR;
  response.send({error: error.error})
}

module.exports = {
  errorGenerator: generateError,
  errorSender,
}