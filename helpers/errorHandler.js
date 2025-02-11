function errorHandler(error) {
    return error.response?.data?.error || 'Произошла неизвестная ошибка';
}

module.exports = { errorHandler };