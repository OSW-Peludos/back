function generateError(msg){
  return new Error(msg)
}

module.exports = {
  errorGenerator: generateError,
}