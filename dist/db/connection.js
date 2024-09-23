"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = (_a = process.env.DATABASE) !== null && _a !== void 0 ? _a : 'library';
const username = (_b = process.env.DBUSERNAME) !== null && _b !== void 0 ? _b : 'root';
const password = (_c = process.env.DBPASSWORD) !== null && _c !== void 0 ? _c : '';
const host = (_d = process.env.DBHOST) !== null && _d !== void 0 ? _d : 'localhost';
const port = (_f = parseInt((_e = process.env.DBPORT) !== null && _e !== void 0 ? _e : '3306')) !== null && _f !== void 0 ? _f : 3306;
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    port: port,
    dialect: 'mysql',
});
exports.default = sequelize;
