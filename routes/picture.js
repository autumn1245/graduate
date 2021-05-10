const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router({ prefix: '/pic' });
const {
    uploadPic,
    findDetail,
    loadList
} = require('../controllers/picture');


router.post('/submit', uploadPic) //上传图片
router.post('/find', findDetail) //查询图片详情
router.post('/loadlist',loadList)//获取图片列表


module.exports = router;
