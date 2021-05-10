const Router = require('koa-router');
const koaBody = require('koa-body');
const router = new Router({ prefix: '/upload' });
const {
    dealPic,
} = require('../controllers/upload');

router.post('/', dealPic)
module.exports = router; 