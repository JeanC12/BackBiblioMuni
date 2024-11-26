import { Model, DataTypes } from 'sequelize';
import db from '../db/connection';

// Define an interface for the Book attributes
interface BookAttributes {
    id?: number;
    title: string;
    author: string;
    stock: number;
    isbn?: string;
}

// Extend Model with the interface
class Book extends Model<BookAttributes> implements BookAttributes {
    public id!: number;
    public title!: string;
    public author!: string;
    public stock!: number;
    public isbn?: string;
}

Book.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: db,
    modelName: 'Book',
    createdAt: false,
    updatedAt: false,
    tableName: 'book'
});

export default Book;