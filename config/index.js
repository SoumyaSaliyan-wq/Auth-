const Dotenv = require('dotenv');
Dotenv.config({ silent: true });
module.exports = {
    port:process.env.PORT,
    db: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT
	}
}