const { body, param } = require('express-validator');
const { validatorMessage } = require('../utils/errorMessage');

const create = function() {
    return [
        body('login', validatorMessage('Login')).exists().bail().isString(), //bail serve para agrupar os erros
        body('password', validatorMessage('Password')).exists().bail().isString()
    ]
}

const findById = function() {
    return [
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}

const updateUser = function() {
    return [
        body('password', validatorMessage('Password')).exists().bail().isInt(),
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}

const deleteUser = function() {
    return [
        param('id', validatorMessage('Id')).exists().bail().isInt()
    ]
}

const login = function() {
    return [
        body('login', validatorMessage('Login')).exists().bail().isString(), //bail serve para agrupar os erros
        body('password', validatorMessage('Password')).exists().bail().isString()
    ]
}

module.exports = {
    create,
    findById,
    updateUser,
    deleteUser,
    login
}