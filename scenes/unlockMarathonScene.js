const { Scenes } = require('telegraf');
const { getMarathons, unlockMarathon } = require('../helpers/api');
const { mainKeyboard, backKeyboard } = require('../helpers/keyboards');
const { validateEmail } = require('../helpers/validators');

const createRequestScene = new Scenes.BaseScene('UNLOCK_MARATHON_SCENE')
    .enter(async (ctx) => {
        try {
            await ctx.reply('✅ Ищем марафоны...');
            const workouts = await getMarathons();
            const buttons = workouts.map(item => [item.title]);
            buttons.push(['Назад']);
            
            return await ctx.reply('Выберите марафон, который хотите открыть:', {
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

        if (!ctx.scene.state.marathonId) {
            const workouts = await getMarathons();
            const selected = workouts.find(item => item.title === ctx.message.text);

            if (!selected) {
                return ctx.reply(`❌ Выберите из нижеперечисленных вариантов`);
            }

            ctx.scene.state.marathonId = selected.id;
            return ctx.reply('Для поиска вашего аккаунта напишите ваш email: 🔎', backKeyboard);
        }

        if (!ctx.scene.state.email) {
            if (!validateEmail(ctx.message.text)) {
                return ctx.reply(`❌ Вы ввели некорректный email`);
            }

            ctx.scene.state.email = ctx.message.text;

            try {
                await unlockMarathon(ctx, ctx.scene.state.marathonId);
                await ctx.reply('✅ Открываем доступ, ждите!');
            } catch (error) {
                await ctx.reply(`❌ Ошибка: ${error.message}`);
            }

            ctx.scene.leave();
            return ctx.reply('Выберите действие:', mainKeyboard);
        }
    });

module.exports = createRequestScene;