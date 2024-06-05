const Joi = require('joi');
const createHttpError = require('http-errors');
const responseHelper = require('../helpers/response.helper');


module.exports.validateBody = (schema, property) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            console.log(details)

            const message = details.map(i => i.message).join(',');

            return responseHelper.badRequestError(res, message);
        }
    }
}

module.exports.validateParam = (schema, property) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            return responseHelper.badRequestError(res, message);
        }
    }
}
module.exports.validateQuery = (schema, property) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.query);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            console.log(details)
            const message = details.map(i => i.message).join(',');

            return responseHelper.badRequestError(res, message);
        }
    }
}

