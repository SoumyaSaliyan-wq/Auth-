const Sequelize = require('sequelize');
const config = require('config');

const database = process.env.DB_NAME
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
console.log(database,username,password);
const db={}
const sequelize = new Sequelize(database, username, password, {
	host:  process.env.DB_HOST,
	dialect: 'mysql',
	port: 3306,
   logging: console.log,
   pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});


sequelize.authenticate().then(() => {
   db.connection=true
   console.log('Connection has been established successfully.');
}).catch((error) => {
   db.connection=false
   console.error('Unable to connect to the database: ', error);
});

// sequelize.sync().then(() => {
//    console.log('Table created successfully!');
// }).catch((error) => {
//    console.error('Unable to create table : ', error);
// });
db.sequelize=sequelize
module.exports = db;
