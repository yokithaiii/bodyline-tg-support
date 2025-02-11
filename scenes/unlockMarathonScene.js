const { Scenes } = require('telegraf');
const { getMarathon } = require('../helpers/api');
const { mainKeyboard, backKeyboard } = require('../helpers/keyboards');

const createRequestScene = new Scenes.BaseScene('UNLOCK_MARATHON_SCENE')
    .enter(ctx => ctx.reply('Для начала напишите ваш email:', backKeyboard))
    .on('text', async (ctx) => {
        if (ctx.message.text === 'Назад') {
            ctx.scene.leave();
            return ctx.reply('Выберите действие:', mainKeyboard);
        }

        try {
            await getMarathon(ctx.scene.state.email);
            await ctx.reply('✅ Ваше обращение успешно сохранено!');
        } catch (error) {
            await ctx.reply(`❌ Ошибка: ${error.message}`);
        }
        
        ctx.scene.leave();
        return ctx.reply('Выберите действие:', mainKeyboard);
    });

module.exports = createRequestScene;