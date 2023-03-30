const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Member = sequelize.define('Member', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    age:{
        type: DataTypes.INTEGER
    },
    role: {
        type: DataTypes.STRING
    }
});

module.exports = Member;