require('dotenv').config();
const { Telegraf, Scenes, session } = require('telegraf');
const scenes = require('./scenes');
const { mainKeyboard } = require('./helpers/keyboards');
const { START_MESSAGE, FUNCTION_IN_DEVELOPMENT } = require('./config/constants');

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new Telegraf(token);

const stage = new Scenes.Stage(scenes);
bot.use(session());
bot.use(stage.middleware());

bot.command('start', ctx => {
    const openTMAButton = {
        text: 'Открыть мини-приложение 🚀',
        web_app: { url: 'https://support.bodylineapp.com/' }
    };

    ctx.reply(START_MESSAGE(ctx.from.first_name), {
        reply_markup: {
            inline_keyboard: [[openTMAButton]]
        }
    });
});

// bot.command('start', ctx => 
//     ctx.reply(START_MESSAGE(ctx.from.first_name), mainKeyboard)
// );

// bot.hears('Часто задаваемые вопросы ⁉️', ctx => ctx.scene.enter('FAQ_SCENE'));
// bot.hears('Задать вопрос 📝', ctx => ctx.scene.enter('REQUEST_SCENE'));
// bot.hears('Открыть доступ к приложению 📱', ctx => ctx.scene.enter('UNLOCK_APP_SCENE'));
// bot.hears('Открыть доступ к марафону 🏆', ctx => ctx.scene.enter('UNLOCK_MARATHON_SCENE'));
// bot.hears('Открыть доступ к марафону 🏆', ctx => ctx.reply(FUNCTION_IN_DEVELOPMENT, mainKeyboard));

bot.launch();
console.log('Бот запущен!');

process.on('unhandledRejection', error => {
    console.error('Unhandled Rejection:', error);
});
