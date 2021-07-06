const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router({ prefix: '/admin' });
const {
    findUser,
    getList,
    updateUser,
    delete: del,
    register,
    login,
    picList,
    deletePic
} = require('../controllers/user');

router.get('/find/:username', findUser)
router.post('/list', getList) // 获取列表
router.post('/picList',picList)
router.get('/login', login)
router.post('/register', register)
router.post('/delPic',deletePic)//删除图片
router.put('/:userId', updateUser) // 更新用户信息
router.post('/del', del); // 删除用户

module.exports = router;
