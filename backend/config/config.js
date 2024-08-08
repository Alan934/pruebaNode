// config/config.js
const { Sequelize } = require('sequelize');

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const port = process.env.MYSQL_PORT;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: port,
  dialect: 'mysql',
  dialectModule: require('mysql2')
});

const dbConnectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected");

    await sequelize.sync({ alter: true }); // Usar { force: true } {alter: true} para eliminar y recrear las tablas

    // console.log('All models were synchronized successfully.');
  } catch (e) {
    console.log('MySQL ERROR connected', e);
  }
};

module.exports = { sequelize, dbConnectMySQL };
