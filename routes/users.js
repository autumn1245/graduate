const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router({ prefix: '/user' });
const {
    findUser,
    getList,
    updateUser,
    delete: del,
    register,
    login
} = require('../controllers/user');

// router.get('/find/:nickname', findUser)
router.get('/find', findUser)// 获取用户详细信息
router.get('/list', getList) // 获取列表
router.get('/', login)
router.post('/register', register)
// router.put('/:userId', updateUser) // 更新用户信息
router.post('/update', updateUser) // 更新用户信息
router.delete('/:userId', del); // 删除用户

module.exports = router;