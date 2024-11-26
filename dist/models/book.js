"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
// Extend Model with the interface
class Book extends sequelize_1.Model {
}
Book.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true // Agrega esta propiedad para el autoincremento
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isbn: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: connection_1.default,
    modelName: 'Book',
    createdAt: false,
    updatedAt: false,
    tableName: 'book'
});
exports.default = Book;
