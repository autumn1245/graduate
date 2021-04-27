const Sequelize = require('sequelize');
const sequelize = new Sequelize('pic', 'root', 'mysql', {
    host: '127.0.0.1',
    dialect: 'mysql',
    port:'3306',
    operatorsAliases: false,
    dialectOptions: {
        //字符集
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
});

console.log('-----------------duandiajn ')
    sequelize.authenticate().then(() => { // 3、 连接数据库是否成功
        console.log('link success,连接成功');
    }).catch(err => {
        console.log('link err')
    })

sequelize.sync({
  force: false, // 每次启动都重新自动创建表
});
module.exports = {
    sequelize
};