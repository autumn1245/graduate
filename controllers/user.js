const Joi = require('joi')
const axios = require('axios')
const Sequelize = require('sequelize');

// const PSW = require('../utils/password')
const { User } = require('../models/user');
const { Picture } = require('../models/picture');


async function getGithubInfo(username) {
    const result = await axios.get(`${GITHUB.fetch_user}/${username}`)
    return result && result.data
}

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

class UserController {
    // ===== utils methods
    // 查找用户
    // static find(params) {
    //     return UserModel.findOne({ where: params })
    // }

    static async findUser(ctx) {
        const validator = ctx.validate({...ctx.params, ...ctx.query }, {
            nickname: Joi.string().required(),
        })
        if (validator) {
            const nickname = ctx.params.nickname
            const user = await User.findOne({ where: { u_nickname: nickname } });
            if (user) {
                ctx.body = { status:200, id: user.id, data: user  }
            } else {
                ctx.body = {  status : 200}
            }
        }
    }

    // 创建用户
    static createGithubUser(data, role = 2) {
        const { id, login, email } = data
        return UserModel.create({
            id,
            username: login,
            role,
            // email,
            // github: JSON.stringify(data),
        })
    }

    // 更新用户信息
    static updateUserById(userId, data) {
            return User.update(data, { where: { id: userId } })
        }

    // 登录
    static async login(ctx) {
        await UserController.defaultLogin(ctx);
    }

    // 站内用户登录
    // 使用
    static async defaultLogin(ctx) {
        console.log('4-----y', ctx.params, 'ctx-----')
            // const urlGet = ctx.url
            // const result = parseBody(urlGet)
            // const validator = ctx.validate(result, {
            //     nickname: Joi.string(),
            //     password: Joi.string(),
            // });
        const validator = ctx.validate(ctx, {
            nickname: Joi.string(),
            password: Joi.string(),
        });
        if (validator) {
            //  const { nickname, password } = result
            const { nickname, password } = ctx.params
            const user = await User.findOne({ where: { u_nickname: nickname } });
            if (!user) {
                // ctx.client(403, '用户不存在')
                ctx.body = { status: 403, text: '用户不存在' }
            } else {
                // const isMatch = await comparePassword(PSW.default.decrypt(password), user.password)
                const isMatch = password === user.u_password
                if (!isMatch) {
                    // ctx.client(403, '密码不正确')
                    // ctx.throw(403, '密码不正确')
                    ctx.body = { status: 403, text: '密码不正确' }
                } else {
                    const { id, u_name,u_nickname } = user
                    // ctx.client(200, '登录成功', { username: user.username, role, userId: id, token })
                    // ctx.body = { username: user.u_username, userId: id }
                    ctx.body = { status: 200, text: '登录成功', data: { username: u_name, nickname:u_nickname,userId: id } }
                }
            }
        }
    }

    // github 登录
    // static async githubLogin(ctx, code) {
    //     const result = await axios.post(GITHUB.access_token_url, {
    //         client_id: GITHUB.client_id,
    //         client_secret: GITHUB.client_secret,
    //         code,
    //     })

    //     const access_token = decodeQuery(result.data)
    //     if (access_token) {
    //         // 拿到 access_token 去获取用户信息
    //         // const result2 = await axios.get(`${GITHUB.fetch_user_url}?access_token=${access_token['access_token']}`)
    //         const result2 = await axios.get(`${GITHUB.fetch_user_url}`, {
    //             headers: { Authorization: `token ${access_token['access_token']}` },
    //         })
    //         const githubInfo = result2.data
    //         let target = await UserController.find({ id: githubInfo.id }) // 在数据库中查找该用户是否存在
    //         if (!target) {
    //             target = await UserModel.create({
    //                 id: githubInfo.id,
    //                 username: githubInfo.name || githubInfo.username,
    //                 github: JSON.stringify(githubInfo),
    //                 email: githubInfo.email,
    //             })
    //         } else {
    //             if (target.github !== JSON.stringify(githubInfo)) {
    //                 // github 信息发生了变动
    //                 // console.log(`${githubInfo.login}: github 信息发生改变， 更新 user....`)
    //                 const { id, login, email } = githubInfo
    //                 const data = {
    //                     username: login,
    //                     email,
    //                     github: JSON.stringify(githubInfo),
    //                 }
    //                 await UserController.updateUserById(id, data)
    //             }
    //         }
    //         // username: user.username, role, userId: id, token
    //         const token = createToken({ userId: githubInfo.id, role: target.role }) // 生成 token

    //         ctx.body = {
    //             github: githubInfo,
    //             username: target.username,
    //             userId: target.id,
    //             role: target.role,
    //             token,
    //         }
    //     } else {
    //         ctx.throw(403, 'github 授权码已失效！')
    //     }
    // }

    // 注册
    static async register(ctx) {
        const validator = ctx.validate(ctx.request.body, {
            username: Joi.string(),
            password: Joi.string(),
            // email: Joi.string().email().required(),
            nickname: Joi.string(),
        });
        const judgeUrl = (ctx || {}).url
        const judgeResult = judgeUrl.indexOf('admin') !== -1 //true为管理员登录，false为游客登录
        if (validator) {
            const { username , password, nickname , sex , description , region  } = ctx.request.body
            const result = await User.findOne({ where: { u_nickname: nickname } });
            if (result) {
                ctx.body = { status: 407, text: '昵称已经被占用！' }
            } else {
                const user = await User.findOne({ where: { u_name: username } });
                if (user && !user.github) {
                    ctx.throw(403, '用户名已被占用')
                } else {
                    // const decryptPassword = PSW.default.decrypt(password)
                    // const saltPassword = await encrypt(decryptPassword)
                    await User.create({
                        u_name: username,
                        u_password: password,
                        u_nickname: nickname,
                        u_dis: description||'',
                        u_sex: sex||'',
                        u_area: region||'',
                        u_key: judgeResult ? 0 : 1,
                    });
                    // ctx.client(200, '注册成功')
                    // ctx.status = 200
                    ctx.body = { status: 200, text: '注册成功！' }

                }
            }
        }
    }

    /**
     * 获取用户列表
     */
    static async getList(ctx) {
        // const validator = ctx.validate(ctx.query, {
        //     username: Joi.string().allow(''),
        //     // type: Joi.number(), // 检索类型 type = 1 github 用户 type = 2 站内用户 不传则检索所有
        //     'rangeDate[]': Joi.array(),
        //     page: Joi.string(),
        //     pageSize: Joi.number(),
        // })

        // if (validator) {
            // const { page = 1, pageSize = 10, username, type } = ctx.query
            // const rangeDate = ctx.query['rangeDate[]']
            // const where = {
            //     role: { $not: 1 },
            // }

            // if (username) {
            //     where.username = {}
            //     where.username['$like'] = `%${username}%`
            // }

            // if (type) {
            //     where.github = parseInt(type) === 1 ? { $not: null } : null
            // }

            // if (Array.isArray(rangeDate) && rangeDate.length === 2) {
            //     where.createdAt = { $between: rangeDate }
            // }
            const page = 1
            const pageSize = 10

            const result = await User.findAndCountAll({
                // where,
                offset: (page - 1) * pageSize,
                limit: parseInt(pageSize),
                row: true,
                order: [
                    ['createdAt']
                ],
                distinct: true,
            })
            // ctx.client(200, 'success', result)

            ctx.body = {status:200,data:result}
            console.log(result,'查询的用户列表')
        // }
    }


    static async picList(ctx) {
        const page = 1
        const pageSize = 10

        const result = await Picture.findAndCountAll({
            // where,
            offset: (page - 1) * pageSize,
            limit: parseInt(pageSize),
            row: true,
            order: [
                ['createdAt']
            ],
            distinct: true,
        })
        // ctx.client(200, 'success', result)

        ctx.body = {status:200,data:result}
        console.log(result,'查询的图片列表')
    }

    static async deletePic(ctx) {
        
    }

    static async delete(ctx) {
        // const validator = ctx.validate(ctx.params, {
        //     userId: Joi.number().required(),
        // })

        // if (validator) {
            // await sequelize.query(
            //     `delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.userId=${ctx.params.userId}`
            // )
            const resu= await User.destroy({ where: { id: ctx.params.userId } })
                // ctx.client(200)
            // ctx.status = 204
            ctx.body={status:200,text:'删除成功'}
        // }
        // else {
           
        // ctx.body = { status: 204, text: '删除失败，请重试！' }
        // }
        // }
    }

    /**
     * 更新用户
     */
    static async updateUser(ctx) {
        const validator = ctx.validate({
            ...ctx.params,
            ...ctx.request.body,
        }, {})

        if (validator) {
            const { id, username, password,nickname,sex,description,region } = ctx.request.body
            // const { notice, disabledDiscuss } = ctx.request.body
             await UserController.updateUserById(id, {u_name: username,u_password: password,u_nickname :nickname,u_sex: sex,u_dis :description,u_area:region })
            if (typeof disabledDiscuss !== 'undefined') {
                await IpModel.update({ auth: !disabledDiscuss }, { where: { userId: parseInt(userId) } })
            }
            ctx.body = { status: 200, text: '修改成功！' }

        }
    }

    // /**
    //  * 初始化用户
    //  * @param {String} githubLoginName - github name
    //  */
    // static async initGithubUser(githubLoginName) {
    //     try {
    //         const github = await getGithubInfo(githubLoginName)
    //         const temp = await UserController.find({ id: github.id })
    //         if (!temp) {
    //             UserController.createGithubUser(github, 1)
    //         }
    //     } catch (error) {
    //         console.trace('create github user error ==============>', error.message)
    //     }
    // }
}

module.exports = UserController