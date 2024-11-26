import { DataTypes } from 'sequelize';
import db from '../db/connection';
const User = db.define('User', {
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
},
    {
        createdAt: false,
        updatedAt: false,
        tableName: 'user'
    });

export default User;