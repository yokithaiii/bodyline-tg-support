const { Scenes, Markup } = require('telegraf');
const { getSubscriptions, unlockSubscription } = require('../helpers/api');
const { mainKeyboard, backKeyboard } = require('../helpers/keyboards');
const { validateEmail } = require('../helpers/validators');

const createRequestScene = new Scenes.BaseScene('UNLOCK_APP_SCENE')
    .enter(async (ctx) => {
        await ctx.reply('Для поиска вашего аккаунта напишите ваш email: 🔎', backKeyboard);
    })
    .on('text', async (ctx) => {
        if (ctx.message.text === 'Назад' || ctx.message.text === '/start') {
            ctx.scene.leave();
            return ctx.reply('Выберите действие:', mainKeyboard);
        }

        if (!ctx.scene.state.email) {

            if (!validateEmail(ctx.message.text)) {
                return ctx.reply('❌ Вы ввели некорректный email. Попробуйте еще раз:', backKeyboard);
            }

            ctx.scene.state.email = ctx.message.text;

            try {
                await ctx.reply('✅ Ищем Ваш аккаунт...');
                const subscriptions = await getSubscriptions(ctx, ctx.scene.state.email);

                if (!subscriptions || subscriptions.length === 0) {
                    await ctx.reply('❌ Подписки не найдены.');
                    ctx.scene.leave();
                    return ctx.reply('Выберите действие:', mainKeyboard);
                }

                const buttons = subscriptions.map((item) => [item.firstname]);
                buttons.push(['Назад']);

                await ctx.reply('Выберите тренера, на которого хотите открыть доступ:', {
                    reply_markup: {
                        keyboard: buttons,
                        resize_keyboard: true,
                        one_time_keyboard: true,
                    },
                });
            } catch (error) {
                await ctx.reply(`❌ Ошибка: ${error.message}`);
                ctx.scene.leave();
                return ctx.reply('Выберите действие:', mainKeyboard);
            }
        } else {
            const subscriptions = await getSubscriptions(ctx, ctx.scene.state.email);
            const selectedSubscription = subscriptions.find(item => item.firstname === ctx.message.text);

            if (!selectedSubscription) {
                return ctx.reply('❌ Выберите из предложенных вариантов.');
            }

            try {
                await unlockSubscription(ctx, ctx.scene.state.email, selectedSubscription.id);
                await ctx.reply('✅ Доступ успешно открыт!');
            } catch (error) {
                await ctx.reply(`❌ Ошибка: ${error.message}`);
            }

            ctx.scene.leave();
            return ctx.reply('Выберите действие:', mainKeyboard);
        }
    });

module.exports = createRequestScene;