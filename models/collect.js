// const moment = require('moment')
const Sequelize = require('sequelize');
const { sequelize} = require('../config/db')
const dataTypes = Sequelize.DataTypes;
const collectTemp = sequelize.define(
    'collect',
    {
        // id sequelize 默认创建...
        c_id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        //用户的id
        c_uid: {
            type: dataTypes.STRING(50),
            allowNull: false,
            // unique: true
        },
        // 收藏的图片的id
        c_pid: {
            type: dataTypes.STRING(50),
            allowNull: false,
            // unique: true
        },
        
    },
    {
        timestamps: true,
    },
);

module.exports = {
  Collect: collectTemp,
};