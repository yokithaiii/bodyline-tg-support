const { Markup } = require("telegraf");

const mainKeyboard = {
    reply_markup: {
        keyboard: [
            ['Открыть доступ к приложению 📱', 'Открыть доступ к марафону 🏆'],
            ['Ответы на вопросы ⁉️', 'Задать вопрос 📝'],
            [Markup.button.webApp('Открыть мини-приложение 🚀', 'https://support.bodylineapp.com/')]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
};

const backKeyboard = {
    reply_markup: {
        keyboard: [
            ['Назад']
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
};

module.exports = {
    mainKeyboard,
    backKeyboard
};