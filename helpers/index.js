const { getFAQ, saveRequest, getSub, getMarathon, unlockMarathon } = require('./api');
const { mainKeyboard, backKeyboard } = require('./keyboards');
const errorHandler = require('./errorHandler');
const validators = require('./validators');

module.exports = {
    getFAQ,
    saveRequest,
    getSub,
    getMarathon,
    unlockMarathon,
    mainKeyboard,
    backKeyboard,
    errorHandler,
    validators,
};