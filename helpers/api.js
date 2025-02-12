const axios = require('axios');
const { errorHandler } = require('./errorHandler');

async function getFAQ() {
    try {
        const response = await axios.get(`${process.env.BACKEND_API_URL}/get-faq`);
        return response.data;
    } catch (error) {
        throw new Error(errorHandler(error));
    }
}

async function saveRequest(email, request) {
    try {
        const response = await axios.post(`${process.env.BACKEND_API_URL}/request`, {
            email,
            request
        });
        return response.data;
    } catch (error) {
        throw new Error(errorHandler(error));
    }
}

async function getSub(ctx) {
    await ctx.reply('✅ Ищем Ваш аккаунт...');
    try {
        const response = await axios.get(`${process.env.BACKEND_API_URL}/get-sub?email=${ctx.message.text}`);
        return response.data;
    } catch (error) {
        throw new Error(errorHandler(error));
    }
}

async function getMarathon(ctx) {
    await ctx.reply('✅ Ищем Ваш аккаунт...');
    try {
        const response = await axios.get(`${process.env.BACKEND_API_URL}/get-workout?email=${ctx.message.text}`);
        return response.data;
    } catch (error) {
        throw new Error(errorHandler(error));
    }
}

module.exports = {
    getFAQ,
    saveRequest,
    getSub,
    getMarathon,
};