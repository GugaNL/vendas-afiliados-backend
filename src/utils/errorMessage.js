const validatorMessage = function (field) {
  return `A propriedade ${field} é inválida`;
};

const notExists = function (field) {
  return `${field} não existe`;
};

module.exports = {
    validatorMessage,
    notExists
}