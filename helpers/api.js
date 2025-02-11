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

async function getSub(email) {
    try {
        const response = await axios.get(`${process.env.BACKEND_API_URL}/get-sub?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error(errorHandler(error));
    }
}

async function getMarathon(email) {
    try {
        const response = await axios.get(`${process.env.BACKEND_API_URL}/get-workout?email=${email}`);
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