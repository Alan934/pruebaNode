const handleHttpError = (res, message = 'Algo salio mal', code = 403) => {
    res.status(code);
    res.send({ error: message, code });
};

module.exports = {handleHttpError};