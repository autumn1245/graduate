const Joi = require('joi')
const axios = require('axios')
// const PSW = require('../utils/password')
const { Picture } = require('../models/picture');
const {User} = require('../models/user');
// const picture = require('../models/picture');
const Sequelize = require('sequelize');
//解析get参数 其实ctx.params就可以拿到
parseBody = (str) => {
    const arr = str.split('?')
    const temp = arr[1]
    const obj = {}
    const res = temp.split('&')
    res.forEach(element => {
        let resultA = element.split('=')
        obj[resultA[0]] = resultA[1]
    })
    return obj
}

class PicController {
    // ===== utils methods
    // 查找用户
    // static find(params) {
    //     return UserModel.findOne({ where: params })
    // }


//上传图片
    static async uploadPic(ctx) {
        const validator = ctx.validate(ctx.request.body, {
            name: Joi.string(),
            url: Joi.string(),
            des:Joi.string()
        });
        if (validator) {
            const { uid, name, size, url, style,des,title } = ctx.request.body
            await Picture.create({
                p_uid: uid,
                p_url:url,
                p_sid : style,
                p_des: des,
                p_size: size,
                p_name: name,
                p_title:title
            })
            ctx.body={status:200,tetx:'上传成功'}
        }
        else {
            ctx.body = {status:404,text:'失败'}

        }
    }
//查看图片详情
    static async findDetail(ctx) {
        const validator = ctx.validate({...ctx.params, ...ctx.query }, {
            detailId: Joi.required(),
        })
        if (validator) {
            const detailId = ctx.params.detailId
            const pic = await Picture.findOne({ where: { id: detailId } });
            const { p_uid } = pic
            const value = await User.findOne({ where: { id: p_uid } });
            const {u_nickname} = value||{}
            if (pic) {
                ctx.body = { status:200, data: u_nickname,...pic}
            } else {
                ctx.body = {  status : 204}
            }
        }
    }
    //获取所有的图片
    static async loadList(ctx) {
        let pagesize = 11;
        let curpage = 1;
        let data = await Picture.findAndCountAll({
            limit: pagesize,
            offset: (curpage - 1) * pagesize,
            // where,
            order: [
                ['createdAt'],
            ],
            // include: [{
            //     association: Picture,
            //     // as: 'Picture_info',
            //     attributes:['p_url']
            // }],
            row: true,
            distinct: true,
        });
        ctx.body = ({status: 200, data})
    }
}

module.exports = PicController