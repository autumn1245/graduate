// // const moment = require('moment')
// const Sequelize = require('sequelize');
// const { sequelize} = require('../config/db')
// const dataTypes = Sequelize.DataTypes;
// const UserTemp = sequelize.define(
//     'pic',
//     {
//         // id sequelize 默认创建...
//         id: {
//             type: dataTypes.INTEGER(11),
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         u_name: {
//             type: dataTypes.STRING(50),
//             allowNull: false,
//             // unique: true
//         },
//         u_password: {
//             type: dataTypes.STRING,
//             // comment: '通过 bcrypt 加密后的密码' // 仅限站内注册用户
//         },
//         u_sex: {
//             type: dataTypes.STRING(50),
//             allowNull: false,
//             // unique: true
//         },
//         u_nickname: {
//             type: dataTypes.STRING(50),
//             allowNull: false,
//             // unique: true
//         },
//         u_dis: {
//             type: dataTypes.STRING(50),
//             allowNull: false,
//             // unique: true
//         },
//         u_area: {
//             type: dataTypes.STRING(50),
//             allowNull: false,
//             // unique: true
//         },

//         // u_state: {
//         //     type: dataTypes.STRING(50),
//         //     allowNull: false,
//         // },
//         //用户的标识（0，普通用户，1：管理员）
//         u_key: {
//             type: dataTypes.STRING(10),
//             allowNull: false,
//             unique: true
//         },
//         // email: {
//         //   type: dataTypes.STRING(50),
//         // },
//         // notice: {
//         //   type: dataTypes.BOOLEAN, // 是否开启邮件通知
//         //   defaultValue: true,
//         // },
//         // role: {
//         //   type: dataTypes.TINYINT,
//         //   defaultValue: 2,
//         //   comment: '用户权限：1 - admin, 2 - 普通用户',
//         // },
//         // github: {
//         //   type: dataTypes.TEXT, // github 登录用户 直接绑定在 user 表
//         // },
//         // disabledDiscuss: {
//         //   type: dataTypes.BOOLEAN, // 是否禁言
//         //   defaultValue: false,
//         // },
//         // createdAt: {
//         //   type: dataTypes.DATE,
//         //   defaultValue: dataTypes.NOW,
//         //   get() {
//         //     return moment(this.getDataValue('createdAt')).format(
//         //       'YYYY-MM-DD HH:mm:ss',
//         //     );
//         //   },
//         // },
//         // updatedAt: {
//         //   type: dataTypes.DATE,
//         //   defaultValue: dataTypes.NOW,
//         //   get() {
//         //     return moment(this.getDataValue('updatedAt')).format(
//         //       'YYYY-MM-DD HH:mm:ss',
//         //     );
//         //   },
//         // },
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
//   User: UserTemp,
// };