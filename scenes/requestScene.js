const { Scenes } = require('telegraf');
const { saveRequest } = require('../helpers/api');
const { mainKeyboard, backKeyboard } = require('../helpers/keyboards');
const { validateEmail } = require('../helpers/validators')

const createRequestScene = new Scenes.BaseScene('REQUEST_SCENE')
    .enter(ctx => ctx.reply('Для начала напишите ваш email:', backKeyboard))
    .on('text', async (ctx) => {
        if (ctx.message.text === 'Назад') {
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
            await saveRequest(ctx.scene.state.email, ctx.message.text);
            await ctx.reply('✅ Ваше обращение успешно сохранено!');
        } catch (error) {
            await ctx.reply(`❌ Ошибка: ${error.message}`);
        }
        
        ctx.scene.leave();
        return ctx.reply('Выберите действие:', mainKeyboard);
    });

module.exports = createRequestScene;