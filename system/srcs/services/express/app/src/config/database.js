const Sequelize = require("sequelize");

const db_name = process.env.MARIADB_DATABASE;
const db_user = process.env.MARIADB_USER
const db_pwd = process.env.MARIADB_PASSWORD
const db_host = process.env.DB_HOST;

const sequelize = new Sequelize(
  db_name,
  db_user,
  db_pwd,
  {
    host: db_host,
    dialect: 'mariadb'
  }
);

module.exports = sequelize;