const multer = require('multer');
const path = require('path');
const fs = require('fs');
const MAX_FILE_SIZE_BYTES=10 * 1024 * 1024//10mb
let storagePath;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folderPath='public/'
        if (file.fieldname == 'profile_picture') {
            if (!fs.existsSync(folderPath + 'profile_picture')) {
                fs.mkdirSync(folderPath + 'profile_picture');
            }
            storagePath = folderPath + 'profile_picture';
        }
        cb(null, storagePath)
    },
    filename: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
            console.log('Not valid image');
            req.isInvalid = true;
        }
        else if (!file) {
            req.file = null
        }
        if (file.size > MAX_FILE_SIZE_BYTES) {
            console.log('File size exceeds the limit');
            return cb(new Error('File size exceeds the limit'));
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
});
const uploadImage = multer({ storage: storage });
module.exports = uploadImage;