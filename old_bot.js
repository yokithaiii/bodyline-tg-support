require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const axios = require('axios')
const token = process.env.TELEGRAM_BOT_TOKEN
const commands = require('./commands.json')

const bot = new TelegramBot(token, { polling: true })

const BOT_STATES = {
    MAIN_STATE: 'MAIN_STATE',
    FAQ_STATE: 'FAQ_STATE', 
    OPEN_SUB_STATE: 'OPEN_SUB_STATE',
    OPEN_MARATHON_STATE: 'OPEN_MARATHON_STATE',
    SAVE_REQUEST_EMAIL_STATE: 'SAVE_REQUEST_EMAIL_STATE',
    SAVE_REQUEST_STATE: 'SAVE_REQUEST_STATE',
}

bot.setMyCommands(commands)

const userState = {}
let tempEmail = null

const processMessages = [
    'Секунду...',
    'Ищем нужную информацию...',
    'Ищем ответ на ваш вопрос...',
    'Генерирую ответ...',
    'Шевелю шестеренками...',
    'Спрашиваю у своего хозяина...',
    'Тааак...'
]

const mainKeyboard = {
    reply_markup: {
        keyboard: [
            ['Открыть доступ к приложению 📱', 'Открыть доступ к марафону 🏆'],
            ['Ответы на вопросы ⁉️', 'Задать вопрос 📝'],
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function errorHandler(error) {
    return error.response.data.error;
}

// Получаем ответы на вопросы
async function getFAQ(chatId) {
    try {
        const response = await axios.get(`${process.env.BACKEND_API_URL}/get-faq`);
        return response.data;
    } catch (error) {
        await bot.sendMessage(chatId, `Ошибка: ${errorHandler(error)}`);
        await showMainMenu(chatId);
        return;
    }
}

// Получаем подписку пользователя
async function getSub(chatId, email) {
    try {
        const response = await axios.get(`${process.env.BACKEND_API_URL}/get-sub?email=${email}`);
        return response.data;
    } catch (error) {
        await bot.sendMessage(chatId, `Ошибка: ${errorHandler(error)}`);
        await showMainMenu(chatId);
        return;
    }
}

// Получаем купленный марафон пользователя
async function getMarathon(chatId, email, workoutId) {
    try {
        const response = await axios.get(`${process.env.BACKEND_API_URL}/get-workout?email=${email}&workout_id=${workoutId}`);
        return response.data;
    } catch (error) {
        await bot.sendMessage(chatId, `Ошибка: ${errorHandler(error)}`);
        await showMainMenu(chatId);
        return;
    }
}

async function saveRequest(chatId, request, email) {
    try {
        const response = await axios.post(`${process.env.BACKEND_API_URL}/request`, {
            email: email,
            request: request
        });
        return response.data;
    } catch (error) {
        await bot.sendMessage(chatId, `Ошибка: ${errorHandler(error)}`);
        await showMainMenu(chatId);
        return;
    }
}

// Показывем главную страницу
async function showMainMenu(chatId) {
    userState[chatId] = BOT_STATES.MAIN_STATE;

    bot.sendMessage(chatId, 'Выберите действие:', mainKeyboard);
}

// Показываем вопросы из FAQ
async function sendFAQ(chatId, firstRender) {
    userState[chatId] = BOT_STATES.FAQ_STATE;

    const faq = await getFAQ();

    if (!faq) {
        bot.sendMessage(chatId, 'Произошла ошибка при загрузке FAQ. Попробуйте позже.');
        await showMainMenu(chatId);
        return;
    }

    const questionButtons = faq.map((item) => [item.question]);
    questionButtons.push(['Назад']);

    let text = null;
    if (firstRender == true) {
        text = 'Какой вопрос Вас интересует, выберите из списка:';
    } else {
        text = 'Другие вопросы:';
    }

    bot.sendMessage(chatId, text, {
        reply_markup: {
            keyboard: questionButtons,
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
}

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name || 'незнакомец';

    bot.sendMessage(
        chatId,
        `Привет, ${userName}! 👋\nЯ чат-бот Bodyline-Support💪🏼. Выберите, пожалуйста, из меню, что вас интересует:`,
        mainKeyboard
    );

    userState[chatId] = BOT_STATES.MAIN_STATE;
})

// Обработка всех сообщений
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    const currentState = userState[chatId] || BOT_STATES.MAIN_STATE;

    switch (currentState) {

        case BOT_STATES.MAIN_STATE:
            if (text === 'Ответы на вопросы') {
                await sendFAQ(chatId, true);
            } else if (text === 'Открыть доступ к приложению') {
                userState[chatId] = BOT_STATES.OPEN_SUB_STATE;

                bot.sendMessage(chatId, 'Введите ваш email: ', {
                    reply_markup: {
                        keyboard: [['Назад']],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                });
            } else if (text === 'Открыть доступ к марафону') {
                userState[chatId] = BOT_STATES.OPEN_MARATHON_STATE;

                bot.sendMessage(chatId, 'Введите ваш email: ', {
                    reply_markup: {
                        keyboard: [['Назад']],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                });
            } else if (text === 'Создать обращение') {
                userState[chatId] = BOT_STATES.SAVE_REQUEST_EMAIL_STATE;

                bot.sendMessage(chatId, 'Для начала, напишите Ваш email: ', {
                    reply_markup: {
                        keyboard: [['Назад']],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                });
            } else if (text === '/start') {
            } else {
                bot.sendMessage(chatId, 'Выберите из предложенных вариантов');
            }
            break;

        case BOT_STATES.FAQ_STATE:
            if (text === 'Назад') {
                showMainMenu(chatId);
            } else {
                // bot.sendMessage(chatId, processMessages[randomIntFromInterval(1, 7)]); 
                const faq = await getFAQ();

                if (faq) {
                    const selectedFAQ = faq.find((item) => item.question === text);

                    if (selectedFAQ) {
                        await bot.sendMessage(chatId, selectedFAQ.answer);
                        await sendFAQ(chatId, false);
                    } else {
                        bot.sendMessage(chatId, 'Вопрос не найден. Пожалуйста, выберите вопрос из списка.');
                    }
                }
            }
            break;

        case BOT_STATES.OPEN_SUB_STATE:
            if (text === 'Назад') {
                showMainMenu(chatId);
            } else {
                bot.sendMessage(chatId, `Ищем пользователя по email: ${text}...`);
                
                const sub = await getSub(chatId, text);

                if (sub) {
                    bot.sendMessage(chatId, 'Нашли подписку, далее проверяем транзакции...');
                }
            }
            break;

        case BOT_STATES.OPEN_MARATHON_STATE:
            if (text === 'Назад') {
                showMainMenu(chatId);
            } else {
                bot.sendMessage(chatId, `Ищем пользователя по email: ${text}...`);

                const marathon = await getMarathon(chatId, text);

                if (marathon) {
                    bot.sendMessage(chatId, 'Нашли марафон, далее проверяем транзакции...');
                }
            }
            break;

        case BOT_STATES.SAVE_REQUEST_EMAIL_STATE:
            if (text === 'Назад') {
                showMainMenu(chatId);
            } else {
                if (!userState[chatId]) {
                    userState[chatId] = {};
                }

                tempEmail = text;
                userState[chatId] = BOT_STATES.SAVE_REQUEST_STATE;

                bot.sendMessage(chatId, 'Опишите вашу проблему: ', {
                    reply_markup: {
                        keyboard: [['Назад']],
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                });
            }
            break;

        case BOT_STATES.SAVE_REQUEST_STATE:
            if (text == 'Назад') {
                showMainMenu(chatId);
            } else {

                const request = await saveRequest(chatId, text, tempEmail);

                if (request) {
                    bot.sendMessage(chatId, 'Ваше обращение успешно сохранено!');
                    showMainMenu(chatId);
                }
            }
            break;

        default:
            showMainMenu(chatId);
    }
})

