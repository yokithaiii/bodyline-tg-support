const { getFAQ, saveRequest, getSub, getMarathon } = require('./api');
const { mainKeyboard, backKeyboard } = require('./keyboards');
const errorHandler = require('./errorHandler');
const validators = require('./validators');

module.exports = {
    getFAQ,
    saveRequest,
    getSub,
    getMarathon,
    mainKeyboard,
    backKeyboard,
    errorHandler,
    validators
};