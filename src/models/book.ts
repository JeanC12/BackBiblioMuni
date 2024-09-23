import { DataTypes } from 'sequelize';
import db from '../db/connection';
const Book = db.define('Book', {
    title: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    },
    stock: {
        type: DataTypes.NUMBER
    }
},
    {
        createdAt: false,
        updatedAt: false,
        tableName: 'book'
    });

export default Book;