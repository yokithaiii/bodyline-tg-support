const { Scenes } = require('telegraf');
const { sendQuestion } = require('../helpers/api');
const { mainKeyboard, backKeyboard } = require('../helpers/keyboards');
const { validateEmail } = require('../helpers/validators')

const createRequestScene = new Scenes.BaseScene('REQUEST_SCENE')
    .enter(ctx => ctx.reply('Для начала напишите ваш email:', backKeyboard))
    .on('text', async (ctx) => {
        if (ctx.message.text === 'Назад' || ctx.message.text === '/start') {
            ctx.scene.leave();
            return ctx.reply('Выберите действие:', mainKeyboard);
        }

        if (!ctx.scene.state.email) {

            if (!validateEmail(ctx.message.text)) {
                return ctx.reply(`❌ Вы ввели некорректный email`);
            }

            ctx.scene.state.email = ctx.message.text;
            return ctx.reply('Теперь опишите вашу проблему:', backKeyboard);
        }

        try {
            const message = await sendQuestion(ctx.scene.state.email, ctx.message.text, ctx.message.from.username);
            await ctx.reply('✅ ' + message);
        } catch (error) {
            await ctx.reply(`❌ Ошибка: ${error.message}`);
        }
        
        ctx.scene.leave();
        return ctx.reply('Выберите действие:', mainKeyboard);
    });

module.exports = createRequestScene;