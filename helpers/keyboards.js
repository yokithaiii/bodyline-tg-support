const mainKeyboard = {
    reply_markup: {
        keyboard: [
            ['Открыть доступ к приложению 📱', 'Открыть доступ к марафону 🏆'],
            ['Ответы на вопросы ⁉️', 'Задать вопрос 📝'],
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
};

const backKeyboard = {
    reply_markup: {
        keyboard: [['Назад']],
        resize_keyboard: true,
        one_time_keyboard: true
    }
};

module.exports = {
    mainKeyboard,
    backKeyboard
};