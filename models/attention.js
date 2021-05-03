// // const moment = require('moment')
// const Sequelize = require('sequelize');
// const { sequelize} = require('../config/db')
// const dataTypes = Sequelize.DataTypes;
// const attenTionTemp = sequelize.define(
//     'Attention',
//     {
//         // id sequelize 默认创建...
//         id: {
//             type: dataTypes.INTEGER(11),
//             primaryKey: true,
//             autoIncrement: true,
//         },

//         a_id: {
//             type: dataTypes.STRING(50),
//             allowNull: false,
//             // unique: true
//         },

//         a_uid: {
//             type: dataTypes.STRING,
//             // comment: '通过 bcrypt 加密后的密码' // 仅限站内注册用户
//         },
//         u_euid: {
//             type: dataTypes.STRING(50),
//             allowNull: false,
//             // unique: true
//         },
//     },
//     {
//         timestamps: true,
//     },
// );

// module.exports = {
//   // User.associate = models => {
//   //     User.hasMany(models.comment)
//   //     User.hasMany(models.reply)
//   //     User.hasMany(models.ip)
//   // }
//   Attention: attenTionTemp,
// };
