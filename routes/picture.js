const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router({ prefix: '/pic' });
const {
    uploadPic,
    findDetail,
    loadList,
    searchPic,
    findHistory
} = require('../controllers/picture');


router.post('/submit', uploadPic) //上传图片
router.post('/find', findDetail) //查询图片详情
router.post('/loadlist', loadList)//获取图片列表
router.post('/search', searchPic)// 搜索某个分类的图片
router.post('/findHistory',findHistory)//搜索某人上传过的所有图片


module.exports = router;
