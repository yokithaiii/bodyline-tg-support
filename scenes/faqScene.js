const { Scenes } = require('telegraf');
const { getFAQ } = require('../helpers/api');
const { mainKeyboard, backKeyboard } = require('../helpers/keyboards');

const faqScene = new Scenes.BaseScene('FAQ_SCENE')
    .enter(async (ctx) => {
        try {
            const faq = await getFAQ();
            const buttons = faq.map(item => [item.question]);
            buttons.push(['Назад']);
            
            await ctx.reply('Выберите вопрос:', {
                reply_markup: {
                    keyboard: buttons,
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            });
        } catch (error) {
            await ctx.reply(`❌ ${error.message}`);
            ctx.scene.leave();
        }
    })
    .on('text', async (ctx) => {
        if (ctx.message.text === 'Назад') {
            ctx.scene.leave();
            return ctx.reply('Выберите действие:', mainKeyboard);
        }

        try {
            const faq = await getFAQ();
            const selected = faq.find(item => item.question === ctx.message.text);

            const buttons = faq.map(item => [item.question]);
            buttons.push(['Назад']);
            
            if (selected) {
                await ctx.reply(selected.answer);
                return await ctx.reply('Есть ещё вопросы?', {
                    reply_markup: {
                        keyboard: buttons,
                        resize_keyboard: true,
                        one_time_keyboard: true
                    }
                });
            }
            
            return await ctx.reply('❌ Вопрос не найден, выберите из списка', {
                reply_markup: {
                    keyboard: buttons,
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            });
        } catch (error) {
            await ctx.reply(`❌ ${error.message}`, backKeyboard);
        }
    });

module.exports = faqScene;