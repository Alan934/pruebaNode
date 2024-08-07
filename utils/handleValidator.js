const { validationResult } = require('express-validator');

const ValidateResults = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() });
    }
    next();
};

module.exports = ValidateResults;
