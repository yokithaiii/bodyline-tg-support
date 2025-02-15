const axios = require('axios');
const { errorHandler } = require('./errorHandler');

// get faq
async function getFAQ() {
    try {
        const response = await axios.get(`${process.env.BACKEND_API_URL}/get-faq`);
        return response.data;
    } catch (error) {
        throw new Error(errorHandler(error));
    }
}

// send question
async function sendQuestion(email, question, username) {
    try {
        const response = await axios.post(`${process.env.BACKEND_API_URL}/send-question`, {
            email,
            question,
            username
        });
        return response.data.message;
    } catch (error) {
        throw new Error(errorHandler(error));
    }
}

// get subscriptions
async function getSubscriptions(ctx, email) {
    try {
        const response = await axios.get(`${process.env.BACKEND_API_URL}/get-subscriptions?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(errorHandler(error));
    }
}

// unlock subscription
async function unlockSubscription(ctx, email, subscriptionId) {
    await ctx.reply('✅ Проверяем подписку и транзакции...');
    try {
        const response = await axios.post(`${process.env.BACKEND_API_URL}/unlock-subscription`, {
            email: email,
            subscription_id: subscriptionId,
        });
        return response.data;
    } catch (error) {
        throw new Error(errorHandler(error));
    }
}

// get marathons
async function getMarathons() {
    try {
        const response = await axios.get(`${process.env.BACKEND_API_URL}/get-workouts`);
        return response.data;
    } catch (error) {
        throw new Error(errorHandler(error));
    }
}

async function unlockMarathon(ctx, workoutId) {
    await ctx.reply('✅ Ищем Ваш аккаунт...');
    try {
        const response = await axios.post(`${process.env.BACKEND_API_URL}/unlock-workout`, {
            email: ctx.scene.state.email,
            workout_id: workoutId,
        });
        return response.data;
    } catch (error) {
        throw new Error(errorHandler(error));
    }
}

module.exports = {
    getFAQ,
    sendQuestion,
    getSubscriptions,
    getMarathons,
    unlockMarathon,
    unlockSubscription
};