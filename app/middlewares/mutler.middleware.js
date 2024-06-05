const responseHelper = require('../helpers/response.helper');
const multer = require('multer');

const validateImage = async (err,req, res, next) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).send({ error: "Unexpected field.Please user 'profile_picture' "});
            }
        }
        next(err);
};

module.exports = validateImage