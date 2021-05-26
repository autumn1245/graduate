const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router({ prefix: '/collect' });
const {
    uploadCollect,
    findStarPic
} = require('../controllers/collect');


router.post('/', uploadCollect) //收藏图片
router.post('/findStar',findStarPic)

module.exports = router;
