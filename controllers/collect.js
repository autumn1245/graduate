const Joi = require('joi')
const axios = require('axios')
// const PSW = require('../utils/password')
const { Collect } = require('../models/collect');
const { Picture } = require('../models/picture');
const {User} = require('../models/user');
// const picture = require('../models/picture');
const Sequelize = require('sequelize');

class CollectController{
    static async uploadCollect(ctx) {
        const { uid, pid } = ctx.request.body
        const result = await Collect.findOne({ where: { c_uid: uid ,c_pid:pid} });
        if (result) {
            ctx.body= {status:204,text:'已收藏，请勿重复收藏！'}
        }
        else {
            await Collect.create({
                c_uid: uid,
                c_pid:pid
            })
            ctx.body = {status:200,text:'收藏成功！'}
        }
       
    }
    
    //搜索用户收藏的所有图片
    static async findStarPic(ctx) {
        let resu = []
        Picture.belongsTo(Collect, { foreignKey: 'id', targetKey: 'c_uid' });
        const validator = ctx.validate({...ctx.params, ...ctx.query }, {
            searchUserId: Joi.required(),
        })
        const { searchUserId } = ctx.request.body

        const tempData = await Collect.findAll({ where: { c_uid: searchUserId } })||[]

        if (validator) {
            // const data = await Collect.findAll({ where: { c_uid: searchUserId } })
            for (let i = 0; i < tempData.length; i++){
                const {c_pid} = tempData[i].dataValues
                // const data = await Picture.findAll({
                //     include: [{
                //         model: Collect,
                //         where: {
                //             id:c_pid
                //         },
                //     //    through: {
                //     //     attributes: ['createdAt'], //过滤属性
                //     //     where: {completed: true}
                //     //   },
                //         required: false  //默认为true  当userRoom表没有数据  回调将会返回为空  fasle 的时候返回用户信息 userRoom表有信息则添加一个字段 没有则之返回用户信息
                //       }]
                // }).then((data) => {
                //      console.log(data, '这里是查询的收藏的数据')
                //     resu[i]=data
                // })
                let tempDa = await Picture.findAll({ where: { id: c_pid } }).then((tem) => {
                    console.log(tem, 'tem======')
                    resu.push( tem)
                })
            }
            // const result = await Picture/findAll({where:{id:}})
            console.log(resu,'resu====',typeof(resu),resu.constructor ===Array)
            ctx.body = {status:200,data:resu}

        }
        else {
            ctx.body = {status:204,text:'查询失败！'}
        }
    }

   
}

module.exports = CollectController