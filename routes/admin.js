const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router({ prefix: '/admin' });
const {
    findUser,
    getList,
    updateUser,
    delete: del,
    register,
    login
} = require('../controllers/user');

router.get('/find/:username', findUser)
router.post('/list', getList) // 获取列表
router.get('/login', login)
router.post('/register', register)
router.put('/:userId', updateUser) // 更新用户信息
router.delete('/del', del); // 删除用户

module.exports = router;
