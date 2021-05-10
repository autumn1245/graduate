// const moment = require('moment')
const Sequelize = require('sequelize');
const { sequelize} = require('../config/db')
const dataTypes = Sequelize.DataTypes;
const pictureTemp = sequelize.define(
    'picture',
    {
        // id sequelize 默认创建...
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        //图片的名称
        p_name: {
            type: dataTypes.STRING(50),
            allowNull: false,
            // unique: true
        },
        // 图片标题
        p_title: {
            type: dataTypes.STRING(50),
            allowNull: false,
            // unique: true
        },
        //user id
        p_uid: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            // unique: true
        },
        //分类 id
        p_sid: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            // comment: '通过 bcrypt 加密后的密码' // 仅限站内注册用户
        },
        p_size: {
            type: dataTypes.STRING(50),
            allowNull: false,
            // unique: true
        },
        p_des: {
            type: dataTypes.STRING(50),
            allowNull: false,
            // unique: true
        },
        p_url: {
            type: dataTypes.STRING(50),
            allowNull: false,
            // unique: true
        },

        // p_dis: {
        //     type: dataTypes.STRING(50),
        //     allowNull: false,
        //     // unique: true
        // },
    },
    {
        timestamps: true,
    },
);

module.exports = {
  Picture: pictureTemp,
};