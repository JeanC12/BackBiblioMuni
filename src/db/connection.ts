import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
const database = process.env.DATABASE ?? 'library';
const username = process.env.DBUSERNAME ?? 'root';
const password = process.env.DBPASSWORD ?? '';
const host = process.env.DBHOST ?? 'localhost';
const port = parseInt(process.env.DBPORT ?? '3306') ?? 3306;
const sequelize = new Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'mysql',
});
export default sequelize;