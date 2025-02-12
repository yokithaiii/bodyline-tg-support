const { Scenes } = require('telegraf');
const { getSub } = require('../helpers/api');
const { mainKeyboard, backKeyboard } = require('../helpers/keyboards');
const { validateEmail } = require('../helpers/validators')

const createRequestScene = new Scenes.BaseScene('UNLOCK_APP_SCENE')
    .enter(ctx => ctx.reply('Для поиска вашего аккаунта напишите ваш email: 🔎', backKeyboard))
    .on('text', async (ctx) => {
        if (ctx.message.text === 'Назад') {
            ctx.scene.leave();
            return ctx.reply('Выберите действие:', mainKeyboard);
        }

        if (!validateEmail(ctx.message.text)) {
            return ctx.reply(`❌ Вы ввели некорректный email`);
        }

        try {
            await getSub(ctx);
        } catch (error) {
            await ctx.reply(`❌ Ошибка: ${error.message}`);
        }
        
        ctx.scene.leave();
        return ctx.reply('Выберите действие:', mainKeyboard);
    });

module.exports = createRequestScene;